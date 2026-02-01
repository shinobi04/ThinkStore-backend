import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import { addContent } from "../controller/addContent.controller";
import { getContent } from "../controller/getContent.controller";

const contentRoute = Router();

contentRoute.post("/content", authenticateToken, addContent);
contentRoute.get("/content", authenticateToken, getContent);

export default contentRoute;
