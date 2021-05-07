import { Router } from "../deps.ts";
import { index } from "../controllers/blogs.ts";

export const blogRouter = new Router();

blogRouter.get("/blogs", index);
