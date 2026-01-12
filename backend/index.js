require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); 

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Testăm conexiunea și pornim serverul
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexiune reușită prin DATABASE_URL!');
    app.listen(PORT, () => console.log(`🚀 Server pe portul ${PORT}`));
  })
  .catch(err => console.error('❌ Eroare conexiune:', err));