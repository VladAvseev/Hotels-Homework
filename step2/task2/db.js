const Pool = require('pg').Pool;

const pool = new Pool({
    user: "hmnddpjk",
    password: "sg5eVIdjoBYVfCTDig01VlGaViisukum",
    host: "trumpet.db.elephantsql.com",
    port: 5432,
    database: "hmnddpjk",
});

module.exports = pool;