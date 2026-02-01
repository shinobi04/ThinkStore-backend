import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.routes";
import cookieParser from "cookie-parser";

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Health Good!!",
  });
});

app.use("/auth", authRoute);

export default app;
