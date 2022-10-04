const router = require("express").Router();
const Article = require("../schemas/ArticleSchema");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

//Create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Article(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Article.findByIdAndUpdate(
            req.params._id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params._id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get Product
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Article.findById(req.params._id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get All Products
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;

        if (qNew) {
            products = await Article.find().sort({ createdAt: -1 }).limit(5);
        } else if (qCategory) {
            products = await Article.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            products = await Article.find();
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
