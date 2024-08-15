const express = require("express");
const axios = require("axios");
const app = express();

const PORT = process.env.PORT || 8080;
const BASE_URL = 'http://example.com/api';  // Replace with your actual base URL

app.use(express.json());

app.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { n, minPrice, maxPrice, sort, order, page } = req.query;

    // Basic validation
    if (!n || isNaN(n) || parseInt(n) <= 0) {
        return res.status(400).json({ error: "Parameter 'n' must be a valid positive number" });
    }

    const productsPerPage = Math.min(parseInt(n), 10);
    const pageNum = page ? parseInt(page) : 1;
    const companies = ["AMZ", "FUP", "SNP", "MYN", "AZO"];
    let products = [];

    try {
        for (const company of companies) {
            const url = `http://example.com/api/categories/${categoryname}/products?n=${n}&minPrice=${minPrice || 0}&maxPrice=${maxPrice || 100000}&sort=${sort || 'price'}&order=${order || 'asc'}`;
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${req.headers.authorization}`  // Assuming token is passed in headers
                },
            });
            products.push(...response.data.map(product => ({
                ...product,
                id: `${company}-${product.productName}-${product.price}`,
                company
            })));
        }

        // Sorting logic
        if (sort) {
            products.sort((a, b) => {
                if (!a[sort] || !b[sort]) return 0;
                if (order === 'desc') {
                    return b[sort] - a[sort];
                }
                return a[sort] - b[sort];
            });
        }

        // Pagination logic
        const paginatedProducts = products.slice((pageNum - 1) * productsPerPage, pageNum * productsPerPage);

        res.json(paginatedProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
