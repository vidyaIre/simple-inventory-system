const validateProduct = (req, res, next) => {
    const { id, productName, price, size } = req.body;
    console.log("Request body:", req.body);

    if (id === undefined || productName === undefined || price === undefined || size === undefined) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: "All product fields (id, productName, price, size) are required"
        });
    }

    if (typeof id !== "number") {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: "Product id must be a number"
        });
    }

    if (typeof productName !== "string") {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: "Product name must be a string"
        });
    }

    if (typeof price !== "number") {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: "Product price must be a number"
        });
    }

    if (typeof size !== "string") {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: "Product size must be a string"
        });
    }

    next();
};

module.exports = validateProduct;