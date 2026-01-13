require('dotenv').config();
const cloudinary=require('cloudinary').v2;
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); 
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const PORT = process.env.PORT || 5000;
const conferenceRoutes = require('./routes/conferenceRoutes');

app.use('/api/conferences', conferenceRoutes);
app.use('/api/auth', authRoutes);

// Testam conexiunea și pornim serverul
sequelize.authenticate()
  .then(() => {
    app.listen(PORT, () => console.log(` Server pe portul ${PORT} la adresa http://localhost:${PORT}`));
  })
  .catch(err => console.error(' Eroare conexiune:', err));
const paperRoutes = require('./routes/paperRoutes');
app.use('/api/papers', paperRoutes);