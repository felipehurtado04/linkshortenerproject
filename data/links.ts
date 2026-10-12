import { randomBytes } from "node:crypto";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { links } from "@/db/schema";

interface CreateLinkInput {
  userId: string;
  url: string;
  customSlug?: string;
}

export function getLinksForUser(userId: string) {
  return db
    .select({
      id: links.id,
      shortCode: links.shortCode,
      url: links.url,
      createdAt: links.createdAt,
    })
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt));
}

export async function createLinkForUser({
  userId,
  url,
  customSlug,
}: CreateLinkInput) {
  if (customSlug) {
    const [link] = await db
      .insert(links)
      .values({ userId, url, shortCode: customSlug })
      .onConflictDoNothing({ target: links.shortCode })
      .returning({
        id: links.id,
        shortCode: links.shortCode,
        url: links.url,
        createdAt: links.createdAt,
      });

    return link ?? null;
  }

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const shortCode = randomBytes(6).toString("base64url");
    const [link] = await db
      .insert(links)
      .values({ userId, url, shortCode })
      .onConflictDoNothing({ target: links.shortCode })
      .returning({
        id: links.id,
        shortCode: links.shortCode,
        url: links.url,
        createdAt: links.createdAt,
      });

    if (link) {
      return link;
    }
  }

  throw new Error("Could not generate a unique short code after 5 attempts.");
}

export async function updateLinkForUser({
  id,
  userId,
  url,
  shortCode,
}: {
  id: number;
  userId: string;
  url: string;
  shortCode: string;
}) {
  const [existingLink] = await db
    .select({ id: links.id })
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);

  if (existingLink && existingLink.id !== id) {
    return "slug-taken";
  }

  const [link] = await db
    .update(links)
    .set({ url, shortCode })
    .where(and(eq(links.id, id), eq(links.userId, userId)))
    .returning({ id: links.id });

  return link ? "updated" : "not-found";
}

export async function deleteLinkForUser({
  id,
  userId,
}: {
  id: number;
  userId: string;
}) {
  const [link] = await db
    .delete(links)
    .where(and(eq(links.id, id), eq(links.userId, userId)))
    .returning({ id: links.id });

  return Boolean(link);
}

export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db
    .select({ url: links.url })
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);

  return link;
}
