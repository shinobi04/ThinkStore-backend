import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoute from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import contentRoute from "./routes/content.route";
import shareRouter from "./routes/link.routes";

const app = express();

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { message: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

app.set("trust proxy", 1);
app.use(helmet());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Health Good!!",
  });
});

// Apply rate limiting to auth endpoints
app.use("/auth/login", authLimiter);
app.use("/auth/signup", authLimiter);
app.use("/auth/refresh", authLimiter);

app.use("/auth", authRoute);
app.use("/api/v1", contentRoute);
app.use("/api/v1/brain", shareRouter);

export default app;
