import { Router } from "express";
import { createLink } from "../controller/shareableLink.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const shareRouter = Router();
shareRouter.post("/brain", authenticateToken, createLink);
