require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); 
const authRoutes = require('./routes/authRoutes');
const conferenceRoutes = require('./routes/conferenceRoutes');
const paperRoutes = require('./routes/paperRoutes');

const app = express();

// 2. Middleware-uri de baza
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// 3. Configurare Cloudinary 
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// 4. Definire rute
app.use('/api/auth', authRoutes);
app.use('/api/conferences', conferenceRoutes);
app.use('/api/papers', paperRoutes);

app.get('/', (req, res) => {
  res.send('Bine ați venit la API-ul Sistemului de Conferinte!');
});

// 5. Pornire server
const PORT = process.env.PORT || 5000;
sequelize.authenticate()
  .then(() => {
    app.listen(PORT, () => console.log(` Server la adresa http://localhost:${PORT}`));
  })
  .catch(err => console.error('Eroare conexiune DB:', err));