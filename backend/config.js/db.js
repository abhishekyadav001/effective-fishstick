const { Pool } = require("pg");

const pool = new Pool({
  user: "abhishek",
  host: "localhost",
  database: "ecommerce_db",
  password: "your_db_password",
  port: 5432,
});

module.exports = pool;
