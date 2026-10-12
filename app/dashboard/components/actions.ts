"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createLinkForUser,
  deleteLinkForUser,
  updateLinkForUser,
} from "@/data/links";

interface CreateLinkInput {
  url: string;
  customSlug?: string;
}

const customSlugSchema = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z
    .string()
    .trim()
    .min(1, "Custom slugs cannot be empty.")
    .max(50, "Custom slugs must be 50 characters or fewer.")
    .regex(
      /^[A-Za-z0-9_-]+$/,
      "Custom slugs can only contain letters, numbers, hyphens, and underscores.",
    )
    .optional(),
);

const createLinkSchema = z.object({
  url: z
    .string()
    .trim()
    .url("Enter a valid URL.")
    .refine((value) => {
      const protocol = new URL(value).protocol;
      return protocol === "http:" || protocol === "https:";
    }, "Enter a URL beginning with http:// or https://."),
  customSlug: customSlugSchema,
});

const linkIdSchema = z.number().int().positive();
const editLinkSchema = z.object({
  id: linkIdSchema,
  shortCode: z
    .string()
    .trim()
    .min(1, "Link name cannot be empty.")
    .max(50, "Link names must be 50 characters or fewer.")
    .regex(
      /^[A-Za-z0-9_-]+$/,
      "Link names can only contain letters, numbers, hyphens, and underscores.",
    ),
  url: z
    .string()
    .trim()
    .url("Enter a valid URL.")
    .refine((value) => {
      const protocol = new URL(value).protocol;
      return protocol === "http:" || protocol === "https:";
    }, "Enter a URL beginning with http:// or https://."),
});
const deleteLinkSchema = z.object({ id: linkIdSchema });

export async function createLink(input: CreateLinkInput) {
  const validation = createLinkSchema.safeParse(input);
  if (!validation.success) {
    return { error: validation.error.issues[0]?.message ?? "Enter a valid URL." };
  }

  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "You must be signed in to create a link." };
    }

    const link = await createLinkForUser({
      url: validation.data.url,
      userId,
      customSlug: validation.data.customSlug,
    });
    if (!link) {
      return { error: "That custom slug is already in use. Please choose another." };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to create link.", error);
    return { error: "Unable to create your short link. Please try again." };
  }
}

export async function editLink(input: {
  id: number;
  shortCode: string;
  url: string;
}) {
  const validation = editLinkSchema.safeParse(input);
  if (!validation.success) {
    return { error: validation.error.issues[0]?.message ?? "Enter a valid URL." };
  }

  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "You must be signed in to edit a link." };
    }

    const result = await updateLinkForUser({
      ...validation.data,
      userId,
    });
    if (result === "slug-taken") {
      return { error: "That link name is already in use. Please choose another." };
    }
    if (result === "not-found") {
      return { error: "This link could not be found." };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to edit link.", error);
    return { error: "Unable to update this link. Please try again." };
  }
}

export async function deleteLink(input: { id: number }) {
  const validation = deleteLinkSchema.safeParse(input);
  if (!validation.success) {
    return { error: "Invalid link." };
  }

  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "You must be signed in to delete a link." };
    }

    const deleted = await deleteLinkForUser({
      ...validation.data,
      userId,
    });
    if (!deleted) {
      return { error: "This link could not be found." };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete link.", error);
    return { error: "Unable to delete this link. Please try again." };
  }
}
