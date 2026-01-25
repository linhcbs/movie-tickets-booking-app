// --- DATABASE KHỞI TẠO (MOCK DATA TỪ EXCEL) ---

// 1. MOVIES (Đầy đủ từ file Movies Records)
const defaultMovies = [
    { id: 1, name: "Avengers: Endgame", cat: "Hành động", dur: 10860, poster: "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg", desc: "Các siêu anh hùng tập hợp để đảo ngược cú búng tay của Thanos." },
    { id: 2, name: "The Dark Knight", cat: "Hành động", dur: 9120, poster: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg", desc: "Batman đối đầu với Joker." },
    { id: 3, name: "Inception", cat: "Khoa học viễn tưởng", dur: 8880, poster: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg", desc: "Đánh cắp bí mật từ giấc mơ." },
    { id: 6, name: "Spirited Away", cat: "Hoạt hình", dur: 7500, poster: "https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png", desc: "Chihiro lạc vào thế giới linh hồn." },
    { id: 17, name: "Titanic", cat: "Lãng mạn", dur: 11640, poster: "https://upload.wikimedia.org/wikipedia/en/1/19/Titanic_%28Official_Film_Poster%29.png", desc: "Tình yêu trên con tàu định mệnh." },
    { id: 41, name: "Train to Busan", cat: "Kinh dị", dur: 7080, poster: "https://upload.wikimedia.org/wikipedia/en/9/95/Train_to_Busan.jpg", desc: "Chuyến tàu sinh tử chạy trốn Zombie." },
    // Dữ liệu bổ sung từ file của bạn
    { id: 45, name: "Arrival", cat: "Khoa học", dur: 6960, poster: "https://upload.wikimedia.org/wikipedia/en/d/df/Arrival_2016_film.jpg", desc: "Giao tiếp với người ngoài hành tinh." },
    { id: 46, name: "Sing", cat: "Hoạt hình", dur: 6480, poster: "https://upload.wikimedia.org/wikipedia/en/b/bb/Sing_%282016_film%29_poster.jpg", desc: "Cuộc thi âm nhạc của các loài thú." },
    { id: 47, name: "Minions", cat: "Hoạt hình", dur: 5460, poster: "https://upload.wikimedia.org/wikipedia/en/3/3d/Minions_poster.jpg", desc: "Các Minions đi tìm kiếm chủ nhân ác nhân mới." },
    { id: 48, name: "Godzilla vs. Kong", cat: "Hành động", dur: 6780, poster: "https://upload.wikimedia.org/wikipedia/en/6/63/Godzilla_vs._Kong.png", desc: "Đại chiến giữa hai quái vật huyền thoại." },
    { id: 5, name: "Parasite", cat: "Tâm lý", dur: 7920, poster: "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png", desc: "Sự cộng sinh kỳ lạ giữa hai gia đình." }
];

// 2. SCHEDULES (Lịch chiếu giả lập)
const defaultSchedules = [
    { id: 101, movieId: 1, time: "2025-02-10 19:00", price: 90000, room: "R01" },
    { id: 102, movieId: 1, time: "2025-02-10 21:30", price: 95000, room: "R02" },
    { id: 103, movieId: 2, time: "2025-02-11 20:00", price: 85000, room: "R01" },
    { id: 104, movieId: 6, time: "2025-02-11 18:00", price: 70000, room: "R03" },
    { id: 105, movieId: 17, time: "2025-02-12 19:30", price: 100000, room: "VIP" },
    { id: 106, movieId: 48, time: "2025-02-13 20:00", price: 120000, room: "IMAX" },
    { id: 107, movieId: 47, time: "2025-02-14 10:00", price: 60000, room: "R05" }
];

// 3. USERS (Từ file Users Records)
const defaultUsers = [
    { id: 1, user: "johndoe", pass: "iloveyou123", name: "John Doe", email: "johndoe@gmail.com" },
    { id: 2, user: "ladiesman217", pass: "qwerty456", name: "Sam Witwicky", email: "sam@gmail.com" },
    { id: 3, user: "admin", pass: "abc123", name: "Admin", email: "admin@gmail.com" },
    { id: 4, user: "yilongmao", pass: "chuateb0ngtoi12345", name: "Yi Long Mao", email: "yilong@gmail.com" }
];

// 4. TICKETS (Vé đã đặt sẵn)
const defaultTickets = [
    { id: 1, scheduleId: 101, seat: "A01", userId: 3 }, // Admin booked
    { id: 2, scheduleId: 101, seat: "A02", userId: 3 },
    { id: 3, scheduleId: 102, seat: "E05", userId: 2 }
];

// --- HỆ THỐNG LƯU TRỮ (LOCAL STORAGE) ---
// Hàm giúp lấy dữ liệu: Nếu chưa có trong Storage thì lấy từ biến default
function loadData(key, defaultValue) {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Khởi tạo các biến Global
let dbMovies = defaultMovies;
let dbSchedules = defaultSchedules;
let dbUsers = loadData('cinema_users', defaultUsers); // Load user từ storage để cập nhật user mới đăng ký
let dbTickets = loadData('cinema_tickets', defaultTickets);
let currentUser = loadData('cinema_currentUser', null);

let currentMovie = null;
let currentSchedule = null;
let selectedSeats = [];

// --- LOGIC GIAO DIỆN CHÍNH ---

function renderMovies() {
    const container = document.getElementById('movie-container');
    container.innerHTML = "";
    dbMovies.forEach(m => {
        const div = document.createElement('div');
        div.className = "movie-card";
        div.dataset.name = m.name.toLowerCase(); // Để phục vụ search
        const durationMin = Math.floor(m.dur / 60);
        div.innerHTML = `
            <img src="${m.poster}" onerror="this.src='https://via.placeholder.com/300x450?text=No+Poster'">
            <div class="movie-info">
                <h3>${m.name}</h3>
                <span class="tag">${m.cat}</span>
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
            <span class="user-greeting">Xin chào, ${currentUser.name}</span>
            <button class="btn-login" style="background:#555" onclick="logout()">Thoát</button>
        `;
    } else {
        panel.innerHTML = `<button class="btn-login" onclick="openModal('login-modal')">Đăng Nhập</button>`;
    }
}

function handleLogin(e) {
    e.preventDefault();
    const u = document.getElementById('login-username').value;
    const p = document.getElementById('login-password').value;

    const user = dbUsers.find(x => x.user === u && x.pass === p);
    if (user) {
        currentUser = user;
        saveData('cinema_currentUser', currentUser);
        closeModal('login-modal');
        updateUserPanel();
        alert(`Chào mừng ${user.name} quay trở lại!`);
    } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-fullname').value;
    const user = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-password').value;
    const confirmPass = document.getElementById('reg-confirm-pass').value;

    if (pass !== confirmPass) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
    }

    // Kiểm tra trùng username
    if (dbUsers.some(u => u.user === user)) {
        alert("Tên đăng nhập đã tồn tại! Vui lòng chọn tên khác.");
        return;
    }

    // Tạo user mới
    const newUser = {
        id: dbUsers.length + 1,
        user: user,
        pass: pass,
        name: name,
        email: email
    };

    // Lưu vào mảng và Storage
    dbUsers.push(newUser);
    saveData('cinema_users', dbUsers);

    alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
    closeModal('register-modal');
    openModal('login-modal');
    
    // Điền sẵn username cho tiện
    document.getElementById('login-username').value = user;
}

function logout() {
    if(confirm("Bạn có chắc muốn đăng xuất?")) {
        currentUser = null;
        saveData('cinema_currentUser', null);
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
    
    document.getElementById('modal-poster').src = movie.poster;
    document.getElementById('modal-title').innerText = movie.name;
    document.getElementById('modal-category').innerText = movie.cat;
    document.getElementById('modal-duration').innerText = Math.floor(movie.dur / 60);
    document.getElementById('modal-desc').innerText = movie.desc;

    const schedules = dbSchedules.filter(s => s.movieId === movie.id);
    const select = document.getElementById('schedule-select');
    select.innerHTML = "";

    if (schedules.length === 0) {
        select.innerHTML = "<option value=''>Chưa có lịch chiếu</option>";
        document.getElementById('seat-map-container').innerHTML = "<p style='text-align:center; padding:20px'>Vui lòng chọn phim khác</p>";
    } else {
        schedules.forEach(s => {
            select.innerHTML += `<option value="${s.id}">${s.time} - ${s.room} (${s.price.toLocaleString()}đ)</option>`;
        });
        loadSeatMap();
    }
}

function loadSeatMap() {
    const scheduleId = parseInt(document.getElementById('schedule-select').value);
    if (!scheduleId) return;

    currentSchedule = dbSchedules.find(s => s.id === scheduleId);
    selectedSeats = [];
    updateSummary();

    // Lấy danh sách ghế đã đặt từ DB
    const bookedSeats = dbTickets
        .filter(t => t.scheduleId === scheduleId)
        .map(t => t.seat);

    const container = document.getElementById('seat-map-container');
    container.innerHTML = "";
    container.style.gridTemplateColumns = "repeat(10, 1fr)"; // 10 ghế/hàng

    const rows = ['A','B','C','D','E','F','G','H'];
    rows.forEach(row => {
        for (let i = 1; i <= 10; i++) {
            const num = i < 10 ? '0'+i : i;
            const seatCode = row + num;
            const seatDiv = document.createElement('div');
            seatDiv.className = 'seat';
            seatDiv.innerText = seatCode;

            if (bookedSeats.includes(seatCode)) {
                seatDiv.classList.add('occupied');
            } else {
                seatDiv.onclick = () => toggleSeat(seatDiv, seatCode);
            }
            container.appendChild(seatDiv);
        }
    });
}

function toggleSeat(el, code) {
    if (el.classList.contains('selected')) {
        el.classList.remove('selected');
        selectedSeats = selectedSeats.filter(s => s !== code);
    } else {
        el.classList.add('selected');
        selectedSeats.push(code);
    }
    updateSummary();
}

function updateSummary() {
    document.getElementById('selected-seats-text').innerText = selectedSeats.length ? selectedSeats.join(', ') : '---';
    const total = selectedSeats.length * (currentSchedule ? currentSchedule.price : 0);
    document.getElementById('total-price').innerText = total.toLocaleString();
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

    if(confirm(`Xác nhận thanh toán ${document.getElementById('total-price').innerText} VND?`)) {
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
        renderMovies(); // Refresh để cập nhật lại ghế
    }
}

// --- UTILS ---
function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

// --- INIT ---
renderMovies();