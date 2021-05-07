import { Client } from "../../deps.ts";

export const client = await new Client().connect({
  hostname: Deno.env.get("DB_HOST"),
  username: Deno.env.get("DB_USER"),
  password: Deno.env.get("DB_PASSWORD"),
  db: Deno.env.get("DB_DATABASE"),
});
