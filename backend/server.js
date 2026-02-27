require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Database connection logic ekhane thakbe

const PORT = process.env.PORT || 10000; // Render usually uses 10000 or a dynamic port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
