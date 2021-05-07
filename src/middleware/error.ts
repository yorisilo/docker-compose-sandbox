import { isHttpError, Status, Context } from "../deps.ts";

export const error = async (ctx: Context, next: () => Promise<unknown>) => {
  try {
    await next();

    const status = ctx.response.status || Status.NotFound;

    if (status === Status.NotFound) {
      ctx.throw(Status.NotFound, "Not Found!");
    }
  } catch (err) {
    if (isHttpError(err)) {
      const status = err.status;

      ctx.response.status = status;
      ctx.response.type = "json";
      ctx.response.body = {
        status: status >= 400 && status < 500 ? "fail" : "error",
        message: err.message,
      };
    }
  }
};
