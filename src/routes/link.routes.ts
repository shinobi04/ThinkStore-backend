import { Router } from "express";
import { createLink } from "../controller/share.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const shareRouter = Router();
shareRouter.post("/share/:thisId", authenticateToken, createLink);

export default shareRouter;
