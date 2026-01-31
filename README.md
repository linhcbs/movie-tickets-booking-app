# Cinema Booking System

A simple web application for booking movie tickets.

Live demo: https://movie-tickets-booking-app-ten.vercel.app/

**Project Overview**
- Simple full-stack demo using Node.js for the backend and a static frontend in `public/`.
- Includes database scripts to create schema and seed sample data in `database/`.

**Features**
- Browse movies and available showtimes
- Select seats and create a booking
- Sign up and login

**Prerequisites**
- Node.js (LTS recommended)
- A SQL database (the project includes SQL scripts for SQLite/MySQL/Postgres compatibility notes)

**Quick Local Setup**

1. Clone this repository.
2. Open a terminal and change to the `app` directory.

```bash
cd app
npm install
```

3. Start the server:

```bash
node server.js
# or, if you have nodemon installed:
nodemon server.js
```

4. Open your browser to `http://localhost:3000` (or the `PORT` printed by the server).


**Project Structure**
- `app/` - Node.js server and frontend static files
	- `server.js` - Express server entrypoint
	- `db.js` - database connection helper
	- `public/` - frontend HTML/CSS/JS
- `database/` - SQL schema and sample data scripts

**Notes**
- This project is intended as a learning/demo app. It does not include production-grade authentication, input validation, or payment processing.
- Default server port is `3000` unless overridden via environment variable `PORT`.

**Contributing**
- Feel free to open issues or pull requests to improve features, add tests, or harden security.

**License & Credits**
- MIT-style permissive license. Use and modify freely for learning and demos.

**Contact**
- For questions or help, open an issue in this repository.

