const Product = require('../model/productModel');

const addProduct = async (req, res) => {
    try {
        const { title, description, price, quantity } = req.body;

        if (!title || !description || !price || !quantity) {
            res.status(400).json({ message: "All fields are mandatory!" });
        }
        else {
            const product = await Product.create({
                title,
                description,
                price,
                quantity,
            });

            console.log("Product created:", product);
            res.status(200).json({ data: product, message: "Product created successfully" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to add product" });
    }
};

module.exports = addProduct;
