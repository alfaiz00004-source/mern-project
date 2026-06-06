const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

if (process.env.NODE_ENV !== 'test') {
  connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
