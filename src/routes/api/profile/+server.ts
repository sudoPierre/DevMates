import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { db } from "$lib/server/db";
import { devProfiles } from "$lib/server/db/schema";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export const POST: RequestHandler = async ({ request, locals }) => {
  const session = await locals.auth();

  if (!session?.user || session.user.role !== "dev") {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const title = formData.get("title") as string;
  const github = formData.get("github") as string;
  const cvUrl = formData.get("cvUrl") as string | null;
  const image = formData.get("image") as File | null;

  let imageUrl: string | null = null;

  if (image && image.size > 0) {
    const uploadDir = path.join(process.cwd(), "static", "uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    const ext = image.name.split(".").pop();
    const filename = `${session.user.id}.${ext}`;
    const buffer = Buffer.from(await image.arrayBuffer());
    await writeFile(path.join(uploadDir, filename), buffer);
    imageUrl = `/uploads/${filename}`;
  }

  await db.insert(devProfiles).values({
    userId: session.user.id,
    firstName,
    lastName,
    title,
    github,
    cvUrl: cvUrl || null,
    imageUrl,
  }).onConflictDoUpdate({
    target: devProfiles.userId,
    set: { firstName, lastName, title, github, cvUrl: cvUrl || null, imageUrl },
  });

  return json({ success: true });
};