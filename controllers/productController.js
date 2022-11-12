import Product from "../models/productModel.js";

export const getProductController = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);

    } catch(error) {
        console.log(error);
    }
}

export const addProductController = async (req, res) => {
    try {
        const newProducts = new Product(req.body);
        await newProducts.save();
        res.status(200).send("Product added successfully!");

    } catch(error) {
        console.log(error);
    }
}

export const updateProductController = async (req, res) => {
    try {
        await Product.findOneAndUpdate({_id: req.body.productId}, req.body, {new: true});
        res.status(200).json("Product Updated Successfully");
    } catch(error) {
        res.status(400).send(error);
        console.log(error);
    }
}

export const deleteProductController = async (req, res) => {
    try {
        await Product.findOneAndDelete({_id: req.body.productId});
        res.status(200).json("Product Deleted Successfully");
    } catch(error) {
        res.status(400).send(error);
        console.log(error);
    }
}