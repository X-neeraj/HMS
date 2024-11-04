require('dotenv').config();

const config = {
  port:process.env.__PORT__||8000,
  mongourl:process.env.MONGOURL,
  jwt_key:process.env.JWT_SECRET || 'supersecretkey',
  enviornment:process.env.NODE_ENV || 'production',
  testmongourl:"mongodb://localhost:27017/hms"
};

module.exports = config;
