const Product = require('../model/productModel');

const addProduct = async (req, res) => {
    try {
        const { title, description, price, quantity } = req.body;
        console.log(req.body);
        if (!title || !description || !price || !quantity) {
            return res.status(400).json({ message: "All fields are mandatory!" });
        }

        const product = await Product.create({
            title,
            description,
            price,
            quantity,
        });
        console.log("Product created:", product);
        if (product) {
            return res.status(200).json({ data: product, message: "Product created successfully" });
        } else (
            res.send(200).json({ message: 'product data is not valid!' })
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to add product" });
    }
};

module.exports = addProduct;
