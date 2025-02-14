// set up the database connection
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

// Test for the database connection
pool.getConnection()
    .then((connection) => {
        console.log("Database Connected Successfully!")
        connection.release();
    }).catch((error) => {
        console.error("MYSQL Connection Failed: " , error)
    })

export default pool