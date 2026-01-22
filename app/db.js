const sql = require('mssql');
require('dotenv').config(); // Nạp các biến từ file .env

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT), // Chuyển port sang kiểu số
    options: {
        encrypt: true, 
        trustServerCertificate: true 
    }
};

// Tạo một Connection Pool để dùng chung cho toàn bộ ứng dụng
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL via Pool');
        return pool;
    })
    .catch(err => {
        console.error('Error connecting to MSSQL:', err.message);
        process.exit(1); // Dừng app nếu không kết nối được DB
    });

module.exports = {
    sql,
    poolPromise
};