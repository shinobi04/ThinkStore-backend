import { Router } from "express";
import { createLink, getLink } from "../controller/share.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const shareRouter = Router();
shareRouter.post("/share/:thisId", authenticateToken, createLink);
shareRouter.get("/share/:thisId", authenticateToken, getLink);

export default shareRouter;
