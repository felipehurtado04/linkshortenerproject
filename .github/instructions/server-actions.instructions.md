---
description: Read this file before implementing or modifying server actions for data mutations in the project. 
---

# Server Actions Instructions

### Overview

All data mutations in this application must be performed usign next.js server actions. This ensures proper security, type safety, and separation of concerns.

## Core requirements

### 1. File structure

-Server actions files **MUST** be named `actions.ts` 
-Server actions ***MUST** be colocated in the same directory as the component that calls them.
-Example: 'app/dashboard/components/actions.ts' for actions called from 'app/dashboard/page.tsx'

### 2. Client-Server Boundary

-Server actions ***MUST** be called from the client component.
-Add `"use server"` directive at the top of actions file.
-Add `"use client"` directive component calling server actions.

### 3. Type Safety

-All data passed to server actions ***MUST** have appropriate TypeScript types.
-**DO NOT** use  the `formData` TypeScript type.
-Define explicit interfaces or types for action parameters.

Example:
```typescript
interface CreateLinkInput {
  url: string;
  customSlug?: string;
}

export async function createLink(input: CreateLinkInput) {
  // ...
} 
```
### 4.Validation

-All input data ***MUST** be validated using `zod` 
-Define Zod schemas for each action's input.
-Validate at the beginning of every server action using `safeParse` so invalid input can be returned without throwing.
-Server actions **MUST NOT** throw errors. Return an object with an `error` property when the action fails, or a `success` property when it succeeds.

Example:
```typescript
import { z } from "zod";

interface CreateLinkInput {
  url: string;
  customSlug?: string;
}

const createLinkSchema = z.object({
  url: z.string().url(),
  customSlug: z.string().optional(),
});

export async function createLink(input: CreateLinkInput) {
  const result = createLinkSchema.safeParse(input);
  if (!result.success) {
    return { error: "Invalid link details." };
  }

  return { success: result.data };
} 
```
### 5. Authentication

-All server actions ***MUST** check for a loggeg-in user before performing any data mutation.
-Use clerk's `auth()` function to get the current user.
-Return an object with an `error` property if the user is not logged in; do not throw.

Example:
```typescript
import { auth } from "@clerk/nextjs";

export async function createLink(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "User not authenticated." };
  }
  // ...
}
```   

### 6. Database operations

-Server actions ***MUST NOT** directly use Drizzle querie.
-ALL database operations ***MUST** be done via helper functions.
-Helper functions are located in the `data` directory
-Server actions should call these helper functions.

Example:
```typescript
// wrong - Direct Drizzle query in server action
export async function createLink(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "User not authenticated." };
  }
  const link = await db.insert(links).values({
    url: input.url,
    customSlug: input.customSlug,
    userId,
  });
  return link;
}

// correct - Using helper function for database operation
import { createLinkInDb } from "@/data/link";

export async function createLink(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "User not authenticated." };
  }
  const link = await createLinkInDb({
    url: input.url,
    customSlug: input.customSlug,
    userId,
  });
  return { success: link };
}
```

## Complete example

```typescript
"use server";

import { auth } from "@clerk/nextjs";
import { z } from "zod";
import { createLinkInDb } from "@/data/link";

interface CreateLinkInput {
  url: string;
  customSlug?: string;
}

const createLinkSchema = z.object({
  url: z.string().url(),
  customSlug: z.string().optional(),
});

export async function createLink(input: CreateLinkInput) {
  const validation = createLinkSchema.safeParse(input);
  if (!validation.success) {
    return { error: "Invalid link details." };
  }

  const { userId } = await auth();
  if (!userId) {
    return { error: "User not authenticated." };
  }

  try {
    const link = await createLinkInDb({
      url: validation.data.url,
      customSlug: validation.data.customSlug,
      userId,
    });

    return { success: link };
  } catch (error) {
    console.error("Failed to create link.", error);
    return { error: "Unable to create link." };
  }
}
```

# Summary checklist

- [ ] Server actions files are named `actions.ts` and colocated with components
- [ ] Called from client components 
- [ ] Use explicit TypeScript types (not `formData`)
- [ ] Validate input data with Zod `safeParse`
- [ ] Check for logged-in user with Clerk's `auth()` function and return an error result if unauthenticated
- [ ] Use helper functions from `data` directory for database operations.
- [ ] Return `{ error: ... }` on failure or `{ success: ... }` on success; do not throw from server actions
