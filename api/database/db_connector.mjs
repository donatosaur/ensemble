import mysql from "mysql";
import "dotenv/config";

// Create a connection pool using the provided credentials
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USERNAME,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_NAME,
    dateStrings     : true
})

export default pool;
