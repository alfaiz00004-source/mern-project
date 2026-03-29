const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');

dotenv.config({ path: path.join(__dirname, '.env') }); // load backend/.env reliably

const app = express();

// middleware
app.use(express.json()); // ✅ FIXED
app.use(cors());

// routes
app.get('/', (req, res) => {
    res.send('server is running');
});

app.use('/api/user', userRoutes); // ✅ routes first

// PRODUCT ROUTES
app.use('/api/products',productRoutes)

// 404 handler
app.use((req, res, next) => {
    res.status(404);
    throw new Error('Route Not Found')
})

// 🔥 error handler LAST me
app.use(errorHandler);

// server start (skip during tests)
if (process.env.NODE_ENV !== 'test') {
    connectDB(); // connect DB
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
