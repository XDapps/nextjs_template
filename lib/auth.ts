/**
 * Auth stub — replace with your auth implementation.
 *
 * Common choices: NextAuth.js, Clerk, Lucia, Auth.js
 * Install the package of your choice, then replace this file.
 */

// TODO: install your auth package and implement getSession / requireAuth

export type Session = {
  userId: string;
  email: string;
};

/** Returns the current session, or null if unauthenticated. */
export async function getSession(): Promise<Session | null> {
  throw new Error("getSession() is not implemented — see lib/auth.ts");
}

/** Throws or redirects if the user is not authenticated. */
export async function requireAuth(): Promise<Session> {
  throw new Error("requireAuth() is not implemented — see lib/auth.ts");
}
