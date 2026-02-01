import "dotenv/config";
import express from "express";
import authRoute from "./routes/auth.routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Heath Goo0d!!",
  });
});

app.use("/auth", authRoute);

export default app;
