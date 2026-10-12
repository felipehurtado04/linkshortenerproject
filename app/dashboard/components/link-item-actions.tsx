"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { deleteLink, editLink } from "./actions";
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

interface LinkItemActionsProps {
  id: number;
  shortCode: string;
  url: string;
}

export function LinkItemActions({
  id,
  shortCode,
  url,
}: LinkItemActionsProps) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editedShortCode, setEditedShortCode] = useState(shortCode);
  const [editedUrl, setEditedUrl] = useState(url);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleEditOpenChange(nextOpen: boolean) {
    if (isPending && !nextOpen) return;
    setEditOpen(nextOpen);
    if (nextOpen) {
      setEditedShortCode(shortCode);
      setEditedUrl(url);
    } else {
      setError(null);
    }
  }

  function handleDeleteOpenChange(nextOpen: boolean) {
    if (isPending && !nextOpen) return;
    setDeleteOpen(nextOpen);
    if (!nextOpen) setError(null);
  }

  function handleEditSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const result = await editLink({
          id,
          shortCode: editedShortCode,
          url: editedUrl,
        });
        if ("error" in result) {
          setError(result.error ?? "Unable to update this link. Please try again.");
          return;
        }

        setEditOpen(false);
        router.refresh();
      } catch (caughtError) {
        console.error("Failed to submit link changes.", caughtError);
        setError("Unable to update this link. Please try again.");
      }
    });
  }

  function handleDelete() {
    setError(null);

    startTransition(async () => {
      try {
        const result = await deleteLink({ id });
        if ("error" in result) {
          setError(result.error ?? "Unable to delete this link. Please try again.");
          return;
        }

        setDeleteOpen(false);
        router.refresh();
      } catch (caughtError) {
        console.error("Failed to delete link.", caughtError);
        setError("Unable to delete this link. Please try again.");
      }
    });
  }

  return (
    <div className="flex shrink-0 items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => handleEditOpenChange(true)}
      >
        <Pencil aria-hidden="true" />
        Edit
      </Button>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        onClick={() => handleDeleteOpenChange(true)}
      >
        <Trash2 aria-hidden="true" />
        Delete
      </Button>

      <Dialog open={editOpen} onOpenChange={handleEditOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit link</DialogTitle>
            <DialogDescription>
              Update the short link name or destination URL.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-2">
              <label htmlFor={`link-name-${id}`} className="font-medium">
                Link name
              </label>
              <Input
                id={`link-name-${id}`}
                type="text"
                autoComplete="off"
                value={editedShortCode}
                onChange={(event) => {
                  setEditedShortCode(event.target.value);
                  setError(null);
                }}
                maxLength={50}
                required
                disabled={isPending}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `link-error-${id}` : `link-name-hint-${id}`}
              />
              <p id={`link-name-hint-${id}`} className="text-xs text-muted-foreground">
                Use letters, numbers, hyphens, or underscores.
              </p>
              <label htmlFor={`link-url-${id}`} className="mt-3 font-medium">
                Destination URL
              </label>
              <Input
                id={`link-url-${id}`}
                type="url"
                autoComplete="url"
                value={editedUrl}
                onChange={(event) => {
                  setEditedUrl(event.target.value);
                  setError(null);
                }}
                required
                disabled={isPending}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `link-error-${id}` : undefined}
              />
              {error && (
                <p id={`link-error-${id}`} role="alert" className="text-destructive">
                  {error}
                </p>
              )}
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleEditOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending || !editedShortCode.trim() || !editedUrl.trim()}
              >
                {isPending ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={handleDeleteOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete link?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{shortCode}</strong>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {error && (
            <p role="alert" className="text-destructive">
              {error}
            </p>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDeleteOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete link"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
