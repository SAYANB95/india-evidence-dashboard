import { auth, currentUser } from "@clerk/nextjs/server";

export const editorialRoles = ["editor", "reviewer", "publisher"] as const;
export type EditorialRole = (typeof editorialRoles)[number];

export type EditorialActor = {
  userId: string;
  displayName: string;
  email: string;
  role: EditorialRole | null;
};

export async function getEditorialActor(): Promise<EditorialActor | null> {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await currentUser();
  const candidate = user?.publicMetadata?.role;
  const role = typeof candidate === "string" && editorialRoles.includes(candidate as EditorialRole)
    ? candidate as EditorialRole
    : null;
  return {
    userId,
    displayName: user?.fullName || user?.username || "Editorial user",
    email: user?.primaryEmailAddress?.emailAddress || "No primary email",
    role,
  };
}

export function canSubmitReview(role: EditorialRole | null, reviewType: string) {
  if (!role) return false;
  if (reviewType === "publication") return role === "publisher";
  return role === "editor" || role === "reviewer" || role === "publisher";
}
