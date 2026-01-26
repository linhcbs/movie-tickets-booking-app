const express = require('express');
const sql = require('mssql'); 
const path = require('path');
const { poolPromise } = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// API FOR CUSTOMERS
// ==========================================

// === GET ===
// Lấy danh sách tất cả các phim hiện tại
app.get('/api/movies/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`
                SELECT * FROM Movies
            `);
        res.json({ success: true, data: result.recordset });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Lấy danh sách tất cả lịch chiếu
app.get('/api/schedules/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`
                  SELECT 
                      ms.ScheduleID, 
                      ms.MovieID, 
                      m.MovieName,
                      ms.Showtime, 
                      ms.AvailableSeats, 
                      ms.TicketPrice,
                      ms.RoomID
                  FROM MovieSchedules ms
                  JOIN Movies m ON ms.MovieID = m.MovieID;
            `);
        res.json({ success: true, data: result.recordset });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Lấy danh sách tất cả vé
app.get('/api/tickets/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`
                SELECT * FROM Tickets
            `);
        res.json({ success: true, data: result.recordset });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Lấy thông tin của một bộ phim theo ID
app.get('/api/movies/:movieID/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('movieId', sql.Int, req.params.movieID) // Truyền ID từ URL vào query
            .query(`
                SELECT * FROM Movies WHERE MovieID = @movieId
            `);
        res.json({ success: true, data: result.recordset });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Lấy lịch chiếu của một bộ phim theo ID phim
app.get('/api/movies/:movieID/schedules', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('movieId', sql.Int, req.params.movieID) // Truyền ID từ URL vào query
            .query(`
                SELECT * FROM MovieSchedules WHERE MovieID = @movieId
            `);
        res.json({ success: true, data: result.recordset });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Lấy lịch chiếu theo ID lịch chiếu
app.get('/api/schedules/:scheduleID', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('scheduleId', sql.Int, req.params.scheduleID) // Truyền ID từ URL vào query
            .query(`
                SELECT * FROM MovieSchedules 
                WHERE ScheduleID = @scheduleId;
            `);
        res.json({ success: true, data: result.recordset });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Lấy danh sách vé của một người dùng theo ID
app.get('/api/tickets/:userID', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('CustomerID', sql.Int, req.params.userID) // Truyền ID từ URL vào query
            .query(`
                SELECT 
                    t.TicketID,
                    t.CustomerID,
                    t.SeatNumber,
                    t.RoomID,
                    t.TicketStatus,
                    t.BookingDate,
                    ms.TicketPrice
                FROM Tickets t
                JOIN MovieSchedules ms ON t.ScheduleID = ms.ScheduleID
                WHERE t.CustomerID = @CustomerID; 
            `);
        res.json({ success: true, data: result.recordset });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Lấy danh sách ghế đã đặt cho một lịch chiếu cụ thể
app.get('/api/schedules/:scheduleID/booked-seats', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('ScheduleId', sql.Int, req.params.scheduleID)
            .query(`
                SELECT SeatNumber FROM Tickets WHERE ScheduleID = @ScheduleId AND NOT TicketStatus = 'cancelled'
            `);
        res.json({ success: true, data: result.recordset });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// === POST ===
// Đặt vé
/**
 * Yêu cầu body:
 * scheduleId: int
 * customerId: int
 * seatNumber: nvarchar
 * roomId: nvarchar
 */
app.post('/api/tickets/book/', async (req, res) => {
    const { scheduleId, customerId, seatNumber, roomId } = req.body;
    
    try {
        const pool = await poolPromise;
        const transaction = new sql.Transaction(pool);
        await transaction.begin(); 

        try {
            const request = new sql.Request(transaction);

            // Bước 1: Tìm ID lớn nhất hiện tại và Chèn vào bảng Tickets 
            // Chúng ta dùng ISNULL(MAX(TicketID), 0) + 1 để tạo ID mới
            await request
                .input('sId', sql.Int, scheduleId)
                .input('cId', sql.Int, customerId)
                .input('status', sql.NVarChar, 'booked')
                .input('seat', sql.NVarChar, seatNumber)
                .input('room', sql.NVarChar, roomId)
                .query(`
                    INSERT INTO Tickets (TicketID, ScheduleID, CustomerID, TicketStatus, SeatNumber, RoomID, BookingDate)
                    SELECT 
                        ISNULL(MAX(TicketID), 0) + 1, 
                        @sId, @cId, @status, @seat, @room, GETDATE()
                    FROM Tickets
                `);

            // Bước 2: Giảm số lượng ghế trống 
            const request2 = new sql.Request(transaction);
            await request2
                .input('sId', sql.Int, scheduleId)
                .query(`
                    UPDATE MovieSchedules 
                    SET AvailableSeats = AvailableSeats - 1 
                    WHERE ScheduleID = @sId AND AvailableSeats > 0
                `);

            await transaction.commit(); 
            res.json({ success: true, message: "Đặt vé thành công!" });

        } catch (error) {
            if (transaction) await transaction.rollback();
            throw error;
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Hủy vé
/**
 * Yêu cầu body:
 * ticketId: int
 */
app.post('/api/tickets/cancel/', async (req, res) => {
      const { ticketId } = req.body;

      try {
          const pool = await poolPromise;
          const transaction = new sql.Transaction(pool);
          await transaction.begin();

          try {
              const request = new sql.Request(transaction);

              // Bước 1: Xóa vé khỏi bảng Tickets
              await request
                  .input('ticketId', sql.Int, ticketId)
                  .query(`
                      UPDATE Tickets 
                      SET TicketStatus = 'cancelled' 
                      WHERE TicketID = @ticketId; 
                  `);

              // Bước 2: Tăng lại số lượng ghế trống
              const request2 = new sql.Request(transaction);
              await request2
                  .input('ticketId', sql.Int, ticketId)
                  .query(`
                      UPDATE MovieSchedules 
                      SET AvailableSeats = AvailableSeats + 1 
                      WHERE ScheduleID IN (
                          SELECT ScheduleID FROM Tickets WHERE TicketID = @ticketId
                      )
                  `);

              await transaction.commit();
              res.json({ success: true, message: "Hủy vé thành công!" });

          } catch (error) {
              if (transaction) await transaction.rollback();
              throw error;
          }
      } catch (err) {
          res.status(500).json({ success: false, error: err.message });
      }
});

// Đăng ký tài khoản
/**
 * Yêu cầu body:
 * username: nvarchar
 * password: nvarchar
 * email: nvarchar
 * fullname: nvarchar
 */
app.post('/api/customers/register/', async (req, res) => {
    const { username, password, email, fullname } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, password)
            .input('email', sql.NVarChar, email)
            .input('fullname', sql.NVarChar, fullname)
            .query(`
                -- 1. Kiểm tra xem Username hoặc Email đã tồn tại chưa
                IF EXISTS (SELECT 1 FROM Users WHERE Username = @username OR Email = @email)
                BEGIN
                    RAISERROR('Username hoặc Email đã tồn tại trong hệ thống.', 16, 1);
                END
                ELSE
                BEGIN
                    -- 2. Nếu chưa tồn tại, thực hiện tính ID và Insert
                    INSERT INTO Users (UserID, Username, Password, Email, Fullname)
                    SELECT 
                        ISNULL(MAX(UserID), 0) + 1, 
                        @username, @password, @email, @fullname
                    FROM Users;
                END
            `);

        res.json({ success: true, message: "Đăng ký tài khoản thành công!" });
    } catch (err) {
        // Trả về thông báo lỗi cụ thể (ví dụ: lỗi từ RAISERROR)
        res.status(400).json({ success: false, error: err.message });
    }
});

// Đăng nhập tài khoản
app.post('/api/customers/login/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .query(`
                SELECT UserID, Username, Email, Fullname 
                FROM Users 
                WHERE Email = @email AND Password = @password
            `);
        if (result.recordset.length > 0) {
            res.json({ success: true, data: result.recordset[0] });
        } else {
            res.status(401).json({ success: false, error: "Tên đăng nhập hoặc mật khẩu không đúng." });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// ROUTES
// ==========================================


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});