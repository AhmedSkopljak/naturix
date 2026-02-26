import imageKit from "../configs/imageKit.js";
import Product from "../models/Product.js";

// Helper: upload a single file buffer to ImageKit
const uploadToImageKit = (fileBuffer, fileName) => {
    return new Promise((resolve, reject) => {
        imageKit.upload(
            {
                file: fileBuffer,
                fileName: fileName,
                folder: "/products",
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.url);
            }
        );
    });
};

//Add Product: /api/product/add
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData);
        const images = req.files;

        if (!images || images.length === 0) {
            return res.json({ success: false, message: "No images provided" });
        }

        // Upload all images to ImageKit in parallel
        const imageUrls = await Promise.all(
            images.map((image) =>
                uploadToImageKit(image.buffer, image.originalname)
            )
        );

        const product = await Product.create({
            ...productData,
            image: imageUrls,
        });

        return res.json({ success: true, message: "Product added", product });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, error: error.message });
    }
}

//Get Product: /api/product/list
export const productList = async (req, res) => {
    try{
        const products = await Product.find({});
        res.json({ success: true, products});
    }catch(error){
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//Get Single Product: /api/product/id
export const productById = async (req, res) => {
    try{
        const {id} = req.body;
        const product = await Product.findById(id);
        res.json({ success: true, product });
    }catch(error){
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//Change Product inStock: /api/product/stock
export const changeStock = async (req, res) => {
    try{
        const {id, inStock} = req.body;
        await Product.findByIdAndUpdate(id, {inStock});
        res.json({ success: true, message: "Stock Updated" });
    }catch(error){
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}