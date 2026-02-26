import authUser from "../middlewares/authUser.js";
import {updateCart} from "../contollers/cartController.js";
import express from "express";

const cartRuter = new express.Router();

cartRuter.post("/update", authUser, updateCart);

export default cartRuter;