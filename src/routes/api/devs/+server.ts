import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { db } from "$lib/server/db";
import { devProfiles } from "$lib/server/db/schema";

export const GET: RequestHandler = async () => {
  const devs = await db.select().from(devProfiles);
  return json(devs);
};