require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movie');
const userRoutes = require('./routes/user');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes); // ✅ must be included
connectDB().then(() => {
  app.listen(3000, () => {
    console.log('🚀 Server is running on port 3000');
  });
});
