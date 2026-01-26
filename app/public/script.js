// --- DATABASE KHỞI TẠO (MOCK DATA TỪ EXCEL) ---

async function fetchData(url) {

    try {
        const response = await fetch(url);
        const payload = await response.json();

        if (payload.success === false) {
            console.error("Error response from " + url);
            return [];
        }

        return payload.data;
    }
    catch (error) {
        console.error("Error fetching data from " + url, error);
        return [];
    }
}

// Khởi tạo các biến Global
let dbMovies = [];
let dbSchedules = [];
let dbUsers = [];
let dbTickets = [];
let currentUser = null;

let currentMovie = null;
let currentSchedule = null;
let selectedSeats = [];

// --- LOGIC GIAO DIỆN CHÍNH ---

// hiển thị danh sách phim
function renderMovies(movies = dbMovies) {
    const container = document.getElementById('movie-container');
    container.innerHTML = "";
    movies.forEach(m => {
        const div = document.createElement('div');
        div.className = "movie-card";
        div.dataset.name = m.MovieName.toLowerCase(); // Để phục vụ search
        const durationMin = Math.floor(m.MovieDuration / 60);
        div.innerHTML = `
            <img src="${m.MoviePosterURL}" onerror="this.src='https://via.placeholder.com/300x450?text=No+Poster'">
            <div class="movie-info">
                <h3>${m.MovieName}</h3>
                <span class="tag">${m.MovieCategory}</span>
                <span style="float:right; font-size:12px; color:#888">⏱ ${durationMin}p</span>
            </div>
        `;
        div.onclick = () => openBookingModal(m);
        container.appendChild(div);
    });
    updateUserPanel();
}

function filterMovies() {
    const term = document.getElementById('search-box').value.toLowerCase();
    const cards = document.querySelectorAll('.movie-card');
    cards.forEach(card => {
        const name = card.dataset.name;
        if (name.includes(term)) card.style.display = "block";
        else card.style.display = "none";
    });
}

// --- LOGIC AUTHENTICATION (Đăng nhập / Đăng ký) ---

function updateUserPanel() {
    const panel = document.getElementById('user-panel');
    if (currentUser) {
        panel.innerHTML = `
            <span class="user-greeting">Xin chào, ${currentUser.Fullname}</span>
            <button class="btn-login" style="background:#555" onclick="logout()">Thoát</button>
        `;
    } else {
        panel.innerHTML = `<button class="btn-login" onclick="openModal('login-modal')">Đăng Nhập</button>`;
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/api/customers/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (result.success) {
            currentUser = result.data;
            // console.log(currentUser)
            closeModal('login-modal');
            updateUserPanel();
            alert(`Chào mừng ${result.data.Fullname} quay trở lại!`);
            // Clear input fields
            document.getElementById('login-email').value = '';
            document.getElementById('login-password').value = '';
        } else {
            alert(result.error || "Sai email hoặc mật khẩu!");
        }
    } catch (error) {
        alert("Lỗi kết nối server: " + error.message);
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const fullname = document.getElementById('reg-fullname').value;
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPass = document.getElementById('reg-confirm-pass').value;

    if (password !== confirmPass) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
    }

    try {
        const response = await fetch('/api/customers/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email, fullname })
        });

        const result = await response.json();
        if (result.success) {
            alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
            closeModal('register-modal');
            openModal('login-modal');
            
            // Điền sẵn email cho tiện
            document.getElementById('login-username').value = email;
            
            // Clear input fields
            document.getElementById('reg-fullname').value = '';
            document.getElementById('reg-username').value = '';
            document.getElementById('reg-email').value = '';
            document.getElementById('reg-password').value = '';
            document.getElementById('reg-confirm-pass').value = '';
        } else {
            alert(result.error || "Đăng ký thất bại!");
        }
    } catch (error) {
        alert("Lỗi kết nối server: " + error.message);
    }
}

function logout() {
    if (confirm("Bạn có chắc muốn đăng xuất?")) {
        currentUser = null;
        updateUserPanel();
        window.location.reload();
    }
}

function switchToRegister() {
    closeModal('login-modal');
    openModal('register-modal');
}

function switchToLogin() {
    closeModal('register-modal');
    openModal('login-modal');
}

// --- LOGIC ĐẶT VÉ (BOOKING) ---

function openBookingModal(movie) {
    currentMovie = movie;
    openModal('booking-modal');

    document.getElementById('modal-poster').src = movie.MoviePosterURL;
    document.getElementById('modal-title').innerText = movie.MovieName;
    document.getElementById('modal-category').innerText = movie.MovieCategory;
    document.getElementById('modal-duration').innerText = Math.floor(movie.MovieDuration / 60);
    document.getElementById('modal-desc').innerText = movie.MovieDescription;

    const schedules = dbSchedules.filter(s => s.MovieID === movie.MovieID);
    const select = document.getElementById('schedule-select');  
    select.innerHTML = "";

    if (schedules.length === 0) {
        select.innerHTML = "<option value=''>Chưa có lịch chiếu</option>";
        document.getElementById('seat-map-container').innerHTML = "<p style='text-align:center; padding:20px'>Vui lòng chọn phim khác</p>";
    } else {
        schedules.forEach(s => {
            select.innerHTML += `<option value="${s.ScheduleID}">${s.Showtime} - Phòng ${s.RoomID} (${s.TicketPrice.toLocaleString()} đồng)</option>`;
        });
        loadSeatMap();
    }
}

async function loadSeatMap() {
    const scheduleId = parseInt(document.getElementById('schedule-select').value);
    if (!scheduleId) return;

    clearSummary();

    // Hiển thị "Đang tải..." trước
    const container = document.getElementById('seat-map-container');
    container.innerHTML = '<p style=" padding:20px; font-size:16px; width:100%;">Đang tải...</p>';

    // Lấy thông tin ghế đã đặt ở lịch chiếu này
    let rawSelectedSeats = await fetchData(`/api/schedules/${scheduleId}/booked-seats`);
    let schedule = await fetchData(`/api/schedules/${scheduleId}`);
    const bookedSeats = rawSelectedSeats.map(s => s.SeatNumber);

    // Sau khi load xong, render ghế
    container.innerHTML = "";
    container.style.gridTemplateColumns = "repeat(10, 1fr)"; // 10 ghế/hàng

    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    rows.forEach(row => {
        for (let i = 1; i <= 10; i++) {
            const num = i < 10 ? '0' + i : i;
            const seatCode = row + num;
            const seatDiv = document.createElement('div');
            seatDiv.className = 'seat';
            seatDiv.innerText = seatCode;
            seatDiv.dataset.seatCode = seatCode;

            if (bookedSeats.includes(seatCode)) {
                seatDiv.classList.add('occupied');
            } else {
                seatDiv.onclick = () => toggleSeat(seatDiv, seatCode, schedule[0]);
            }

            container.appendChild(seatDiv);
        }
    });

}

function toggleSeat(el, code, schedule) {
    if (el.classList.contains('selected')) {
        el.classList.remove('selected');

    } else {
        el.classList.add('selected');
    }
    updateSummary(schedule);
}

function clearSummary() {
    document.getElementById('total-price').innerText = '0';
    document.getElementById('selected-seats-text').innerText = '---';
    selectedSeats = [];
}

function updateSummary(currentSchedule = currentSchedule) {
    
    let selected_seats = document.querySelectorAll('.seat.selected')
    const total = (selected_seats.length - 1) * (currentSchedule ? currentSchedule.TicketPrice : 0); // tru cho legends
    document.getElementById('total-price').innerText = total.toLocaleString();

    let selected_seats_array = [];

    for (let i = 0; i < selected_seats.length-1; i++) {
        selected_seats_array.push(selected_seats[i].dataset.seatCode);
    }

    document.getElementById('selected-seats-text').innerText = selected_seats_array.length ? selected_seats_array.join(', ') : '---';

}

function handleBooking() {
    if (!currentUser) {
        alert("Vui lòng đăng nhập để đặt vé!");
        openModal('login-modal');
        return;
    }
    if (selectedSeats.length === 0) {
        alert("Vui lòng chọn ghế!");
        return;
    }

    if (confirm(`Xác nhận thanh toán ${document.getElementById('total-price').innerText} VND?`)) {
        selectedSeats.forEach(seat => {
            dbTickets.push({
                id: Date.now() + Math.random(),
                scheduleId: currentSchedule.id,
                seat: seat,
                userId: currentUser.id,
                status: 'booked'
            });
        });
        saveData('cinema_tickets', dbTickets);
        alert("Đặt vé thành công!");
        closeModal('booking-modal');
        renderMovies(dbMovies); // Refresh để cập nhật lại ghế
    }
}

// --- UTILS ---
function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

// --- INIT ---
async function initializeApp() {
    const container = document.getElementById('movie-container');
    container.innerHTML = '<p style="text-align: center; padding: 20px; font-size: 18px;">Đang tải...</p>';

    dbMovies = await fetchData('/api/movies');
    dbSchedules = await fetchData('/api/schedules');
    dbUsers = [];
    dbTickets = [];
    currentUser = null;

    renderMovies(dbMovies);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});