import { Status, RouterContext } from "../deps.ts";
import { client } from "../infra/db/mysql.ts";

export async function index(ctx: RouterContext) {
  const blogs: any = (await client.execute("SELECT * FROM blogs")).rows;

  ctx.response.status = Status.OK;
  ctx.response.type = "json";
  ctx.response.body = {
    status: "success",
    message: `${blogs.length} blogs found in database`,
    data: { blogs },
  }
}
