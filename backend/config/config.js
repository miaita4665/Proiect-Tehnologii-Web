require('dotenv').config(); 
console.log("Config Debug - DATABASE_URL este:", process.env.DATABASE_URL);
JWT_SECRET="1234567890abcdef"
module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'mysql',
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: 'mysql',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'mysql',
  }
};