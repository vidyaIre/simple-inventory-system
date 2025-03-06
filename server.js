const express = require('express');

const app = express();
const PORT = 5000;
app.use(express.json());


let products = [];

const getProducts = () => products;

app.get('/products', (req, res) => {
    //res.status(200).send("hello simple inventory management system");
    res.json(products);
})



app.post('/addProduct', (req, res) => {
    console.log("add product api call");

    if (req.body?.product) {
        //console.log("product data", req.body.product);
        products.push(req.body.product);
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Product added successfully",
            data: req.body.product
        });

    } else {
        res.status(400).json({
            success: false,
            statusCode: 400,
            message: "Product data is required"
        });
    }

})


// app.get('/products/:id',(req, res) =>{
//     //console.log("get product by id api call");
//     console.log(" current products", products);
//     const {id} = req.params;
//     console.log("product id", id);
//     const product = products.find(p => p.id === id);
//    console.log("product", product);
  
//    res.json(product);
// })

app.get("/products/:id", (req, res) => {
    const productId = Number(req.params.id);
    //console.log("Requested Product ID:", productId);
    //console.log("Current Products List:", products);

    if (isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = products.find(p => p.id === productId);

    if (!product) {
        console.log("Product not found for ID:", productId);
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
});

app.patch("/products/:id", (req, res) => {
    //console.log("Update Product API Called");
    const product = products.find(p => p.id === parseInt(req.params.id));
    //console.log("Product:", product);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { id, productName,price,size } = req.body;
    if (id !== undefined) product.id = id;
    if (productName !== undefined) product.productName = productName;
    if(price !== undefined) product.price = price;
    if(size !== undefined) product.size = size;

    res.json(product);
});

app.delete("/products/:id", (req, res) => {
    //console.log("Delete Product API Called");
    const productId = parseInt(req.params.id);
    //console.log("Product ID:", productId);
    const productIndex = products.findIndex(p => p.id === productId);
    //console.log("Product Index:", productIndex);
    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }
    const deletedProduct = products.splice(productIndex, 1);
    //console.log("Deleted Product:", deletedProduct);
    res.json(deletedProduct);
});


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));