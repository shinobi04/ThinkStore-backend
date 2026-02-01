import { Router } from "express";
import { singupController } from "../controller/signup.controller";
import { loginController } from "../controller/login.controller";

const authRoute = Router();

authRoute.post("/signup", singupController);
authRoute.post("/login", loginController);

export default authRoute;
