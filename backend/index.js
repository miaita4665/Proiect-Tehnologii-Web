require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); 
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

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