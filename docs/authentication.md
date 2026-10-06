# Authentication

- Use Clerk for all authentication, sessions, and user identity. Do not add another authentication provider or implement a custom authentication method.
- Require an authenticated Clerk user to access `/dashboard`. Enforce protection on the server or in Clerk middleware; do not rely on client-side UI alone.
- Redirect authenticated users who visit `/` to `/dashboard`.
- Sign-in and sign-up must use Clerk's modal flow. Trigger Clerk sign-in and sign-up with modal mode; do not expose full-page authentication forms or navigation to standalone sign-in/sign-up pages.
- Keep Clerk integration centralized through the app's existing provider and middleware.