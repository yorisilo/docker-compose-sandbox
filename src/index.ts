// import { serve } from "./deps.ts";
// const s = serve({ port: 3000 });
// console.log("http://localhost:3000/");
// for await (const req of s) {
//   req.respond({ body: "Hello World\n" });
// }

import { Application, Router, Status } from "./deps.ts";
import { logger } from "./middleware/logger.ts";
import { timer } from "./middleware/timer.ts";
import { blogRouter } from "./routes/blogs.ts";

const app = new Application();
const router = new Router();

app.use(logger);
app.use(timer);

router.get("/", (ctx) => {
  ctx.response.status = Status.OK;
  ctx.response.type = "json";
  ctx.response.body = {
    status: "success",
    message: "Hello World!",
    data: null,
  };
});

app.use(router.routes())
  .use(blogRouter.routes());

console.log("app running -> http://localhost:3000");
await app.listen({ port: 3000 });
