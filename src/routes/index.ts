import express from "express";
import userRouter from "@/modules/user/user.routes.js";
import postRouter from "@/modules/post/post.routes.js";

const apiRouter = express.Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/posts", postRouter);

export default apiRouter;
