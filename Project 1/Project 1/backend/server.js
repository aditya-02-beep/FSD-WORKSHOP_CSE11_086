require('dotenv').config();
const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Student Management System API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
