const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Dummy data for AgriHaven
const products = [
    { id: 1, name: 'Organic Fertilizer', price: 20.99, category: 'Manure' },
    { id: 2, name: 'Tomato Seeds', price: 4.50, category: 'Seeds' },
    { id: 3, name: 'Drip Irrigation Kit', price: 150.00, category: 'Irrigation' }
];

const users = [
    { id: 1, name: 'John Doe', role: 'Farmer' },
    { id: 2, name: 'Jane Smith', role: 'Supplier' }
];

// GET endpoints
app.get('/api/products', (req, res) => {
    res.status(200).json({ success: true, count: products.length, data: products });
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, data: product });
});

app.get('/api/users', (req, res) => {
    res.status(200).json({ success: true, count: users.length, data: users });
});

// Basic Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to AgriHaven API! Access /api/products or /api/users.');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
