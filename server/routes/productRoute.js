import express from "express";
import multer from "multer";
import {addProduct, changeStock, productById, productList} from "../contollers/productController.js";
import authSeller from "../middlewares/authSeller.js";

const productRouter = express.Router();

// Multer with memory storage (needed for ImageKit buffer upload)
const storage = multer.memoryStorage();
const upload = multer({ storage });

productRouter.post("/add", authSeller, upload.array("images"), addProduct);
productRouter.get("/list", productList);
productRouter.get("/id", productById);
productRouter.get("/stock", authSeller, changeStock);

export default productRouter;