"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import { createLink } from "./actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link2, Plus } from "lucide-react";

export function CreateLinkDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setError(null);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const result = await createLink({ url, customSlug });
        if ("error" in result) {
          setError(result.error ?? "Unable to create your short link. Please try again.");
          return;
        }

        setUrl("");
        setCustomSlug("");
        setOpen(false);
        router.refresh();
      } catch (caughtError) {
        console.error("Failed to submit a new link.", caughtError);
        setError("Unable to create your short link. Please try again.");
      }
    });
  }

  return (
    <>
      <Button
        type="button"
        className="h-10 rounded-md bg-[#1d3554] px-4 text-white hover:bg-[#28486e] dark:bg-[#a9c5e4] dark:text-[#132338] dark:hover:bg-[#c0d5ec]"
        onClick={() => handleOpenChange(true)}
      >
        <Plus aria-hidden="true" />
        Create link
      </Button>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a short link</DialogTitle>
            <DialogDescription>
              Enter the destination URL and we&apos;ll create a shareable short
              link.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <label htmlFor="destination-url" className="font-medium">
                Destination URL
              </label>
              <Input
                id="destination-url"
                type="url"
                autoComplete="url"
                placeholder="https://example.com/page"
                value={url}
                onChange={(event) => {
                  setUrl(event.target.value);
                  setError(null);
                }}
                required
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "create-link-error" : undefined}
                disabled={isPending}
              />
              <label htmlFor="custom-slug" className="mt-3 font-medium">
                Custom slug <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <Input
                id="custom-slug"
                type="text"
                autoComplete="off"
                placeholder="my-custom-link"
                value={customSlug}
                onChange={(event) => {
                  setCustomSlug(event.target.value);
                  setError(null);
                }}
                maxLength={50}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "create-link-error" : "custom-slug-hint"}
                disabled={isPending}
              />
              <p id="custom-slug-hint" className="text-xs text-muted-foreground">
                Use letters, numbers, hyphens, or underscores. Leave blank to generate one.
              </p>
              {error && (
                <p id="create-link-error" role="alert" className="text-destructive">
                  {error}
                </p>
              )}
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending || !url.trim()}>
                <Link2 aria-hidden="true" />
                {isPending ? "Creating..." : "Create short link"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
