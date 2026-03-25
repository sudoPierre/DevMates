import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { devProfiles } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth();
  if (!session?.user || session.user.role !== "dev") {
    throw redirect(303, "/login");
  }

  const result = await db
    .select()
    .from(devProfiles)
    .where(eq(devProfiles.userId, session.user.id))
    .limit(1);

  const profile = result[0] ?? null;
  console.log("profile chargé:", profile); // log temporaire

  return {
    user: session.user,
    profile,
  };
};