import { createAuthClient } from "better-auth/svelte";

export const authClient = createAuthClient({
  baseURL: "http://192.168.1.112:5173",
});