import mysql from 'mysql';
import 'dotenv/config'

// import * as dotenv from 'dotenv';
// import path from 'path'

// const __dirname = path.resolve()
// dotenv.config({path: path.join(__dirname, "/.env")});
// console.log(__dirname)


// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USERNAME,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_NAME
})

export default pool;