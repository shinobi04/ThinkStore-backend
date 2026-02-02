import { Router } from "express";
import { singupController } from "../controller/signup.controller";
import { loginController } from "../controller/login.controller";
import { refreshController } from "../controller/refresh.controller";
import { logoutController } from "../controller/logout.controller";
import { meController } from "../controller/me.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const authRoute = Router();

authRoute.post("/signup", singupController);
authRoute.post("/login", loginController);
authRoute.post("/refresh", refreshController);
authRoute.post("/logout", authenticateToken, logoutController);
authRoute.get("/me", authenticateToken, meController);

export default authRoute;
