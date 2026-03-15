import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./configs/db.js";
import "dotenv/config"
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRuter from "./routes/cartRute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import {stripeWebhooks} from "./contollers/orderController.js";

const app = express();
const port = process.env.PORT || 4000;
const allowedOrigins = ['http://localhost:5173'];

await connectDB();

// Stripe webhook mora biti PRIJE express.json() middlewarea
// jer treba raw body za verifikaciju potpisa
app.post("/stripe", express.raw({type: "application/json"}), stripeWebhooks);

// Middleware configuration
app.use(cors({origin: allowedOrigins, credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.send("API Is Working"));
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRuter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});