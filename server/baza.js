const Pool = require("pg").Pool;

const pool = new Pool({
    user:"megu",
    password:"admin",
    host: "localhost",
    port: 5432, 
    database: "tjulenjbaza"
});

module.exports = pool;