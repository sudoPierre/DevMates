import { auth } from "$lib/server/auth";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.auth = () => auth.api.getSession({ headers: event.request.headers });
  return resolve(event);
};