const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Endpoint API backend
const backendUrl = 'http://10.0.2.231:3000';

app.get('/', async (req, res) => {
    try {
        // Dapatkan produk dari backend
        const response = await axios.get(`${backendUrl}/products`);
        res.render('index', { products: response.data });
    } catch (error) {
        console.error('Error mengambil produk:', error);
        res.status(500).send('Error mengambil produk');
    }
});

app.listen(port, () => {
    console.log(`Aplikasi frontend berjalan di http://localhost:${port}`);
});