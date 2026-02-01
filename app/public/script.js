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
            <img src="${m.MoviePosterURL}" onerror="this.src='https://placeholder.co/300x450?text=No+Poster'">
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

// --- FILTER FUNCTIONS ---

// Khởi tạo bộ lọc
function initializeFilters() {
    populateGenreFilter();
    setupRangeDisplays();
}

// Lấy danh sách thể loại và tạo checkbox
function populateGenreFilter() {
    const genres = [...new Set(dbMovies.map(m => m.MovieCategory))].sort();
    const genreList = document.getElementById('genre-list');
    genreList.innerHTML = '';
    
    genres.forEach(genre => {
        const div = document.createElement('div');
        div.className = 'filter-option';
        div.innerHTML = `
            <input type="checkbox" id="genre-${genre}" value="${genre}" onchange="applyFilters()">
            <label for="genre-${genre}">${genre}</label>
        `;
        genreList.appendChild(div);
    });
}

// Cập nhật hiển thị giá trị range
function setupRangeDisplays() {
    // Duration
    const durationMin = document.getElementById('duration-min');
    const durationMax = document.getElementById('duration-max');
    durationMin.addEventListener('input', () => {
        document.getElementById('duration-min-display').innerText = durationMin.value;
        if (parseInt(durationMin.value) > parseInt(durationMax.value)) {
            durationMax.value = durationMin.value;
            document.getElementById('duration-max-display').innerText = durationMax.value;
        }
    });
    durationMax.addEventListener('input', () => {
        document.getElementById('duration-max-display').innerText = durationMax.value;
        if (parseInt(durationMax.value) < parseInt(durationMin.value)) {
            durationMin.value = durationMax.value;
            document.getElementById('duration-min-display').innerText = durationMin.value;
        }
    });

    // Price
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    priceMin.addEventListener('input', () => {
        document.getElementById('price-min-display').innerText = parseInt(priceMin.value).toLocaleString();
        if (parseInt(priceMin.value) > parseInt(priceMax.value)) {
            priceMax.value = priceMin.value;
            document.getElementById('price-max-display').innerText = parseInt(priceMax.value).toLocaleString();
        }
    });
    priceMax.addEventListener('input', () => {
        document.getElementById('price-max-display').innerText = parseInt(priceMax.value).toLocaleString();
        if (parseInt(priceMax.value) < parseInt(priceMin.value)) {
            priceMin.value = priceMax.value;
            document.getElementById('price-min-display').innerText = parseInt(priceMin.value).toLocaleString();
        }
    });

    // Seats
    const seatsMin = document.getElementById('seats-min');
    const seatsMax = document.getElementById('seats-max');
    seatsMin.addEventListener('input', () => {
        document.getElementById('seats-min-display').innerText = seatsMin.value;
        if (parseInt(seatsMin.value) > parseInt(seatsMax.value)) {
            seatsMax.value = seatsMin.value;
            document.getElementById('seats-max-display').innerText = seatsMax.value;
        }
    });
    seatsMax.addEventListener('input', () => {
        document.getElementById('seats-max-display').innerText = seatsMax.value;
        if (parseInt(seatsMax.value) < parseInt(seatsMin.value)) {
            seatsMin.value = seatsMax.value;
            document.getElementById('seats-min-display').innerText = seatsMin.value;
        }
    });
}

// Áp dụng tất cả bộ lọc
function applyFilters() {
    const searchTerm = document.getElementById('search-box').value.toLowerCase();
    
    // Lấy các thể loại được chọn
    const selectedGenres = [];
    document.querySelectorAll('#genre-list input:checked').forEach(input => {
        selectedGenres.push(input.value);
    });
    
    // Lấy các giá trị range
    const durationMin = parseInt(document.getElementById('duration-min').value);
    const durationMax = parseInt(document.getElementById('duration-max').value);
    const priceMin = parseInt(document.getElementById('price-min').value);
    const priceMax = parseInt(document.getElementById('price-max').value);
    const seatsMin = parseInt(document.getElementById('seats-min').value);
    const seatsMax = parseInt(document.getElementById('seats-max').value);
    const filterDate = document.getElementById('filter-date').value;
    
    // Lọc danh sách phim
    let filteredMovies = dbMovies.filter(movie => {
        // Filter by search term
        if (searchTerm && !movie.MovieName.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        // Filter by genre
        if (selectedGenres.length > 0 && !selectedGenres.includes(movie.MovieCategory)) {
            return false;
        }
        
        // Filter by duration
        if (movie.MovieDuration < durationMin * 60 || movie.MovieDuration > durationMax * 60) {
            return false;
        }
        
        // Filter by date (kiểm tra nếu có suất chiếu vào ngày được chọn)
        if (filterDate) {
            const selectedSchedules = dbSchedules.filter(s => 
                s.MovieID === movie.MovieID && 
                new Date(s.Showtime).toISOString().split('T')[0] === filterDate
            );
            if (selectedSchedules.length === 0) {
                return false;
            }
        }
        
        // Filter by price (kiểm tra nếu có suất chiếu trong khoảng giá)
        const movieSchedules = dbSchedules.filter(s => s.MovieID === movie.MovieID);
        const priceMatch = movieSchedules.some(s => s.TicketPrice >= priceMin && s.TicketPrice <= priceMax);
        if (movieSchedules.length > 0 && !priceMatch) {
            return false;
        }
        
        // Filter by available seats
        const seatsMatch = movieSchedules.some(s => s.AvailableSeats >= seatsMin && s.AvailableSeats <= seatsMax);
        if (movieSchedules.length > 0 && !seatsMatch) {
            return false;
        }
        
        return true;
    });
    
    renderMovies(filteredMovies);
}

// Đặt lại tất cả bộ lọc
function resetFilters() {
    // Reset search
    document.getElementById('search-box').value = '';
    
    // Reset genre checkboxes
    document.querySelectorAll('#genre-list input').forEach(input => {
        input.checked = false;
    });
    
    // Reset range inputs
    document.getElementById('duration-min').value = 0;
    document.getElementById('duration-max').value = 300;
    document.getElementById('duration-min-display').innerText = 0;
    document.getElementById('duration-max-display').innerText = 300;
    
    document.getElementById('price-min').value = 0;
    document.getElementById('price-max').value = 200000;
    document.getElementById('price-min-display').innerText = '0';
    document.getElementById('price-max-display').innerText = '200000';
    
    document.getElementById('seats-min').value = 0;
    document.getElementById('seats-max').value = 80;
    document.getElementById('seats-min-display').innerText = 0;
    document.getElementById('seats-max-display').innerText = 80;
    
    // Reset date
    document.getElementById('filter-date').value = '';
    
    // Apply empty filters
    renderMovies(dbMovies);
}

// --- LOGIC AUTHENTICATION (Đăng nhập / Đăng ký) ---

function updateUserPanel() {
    const panel = document.getElementById('user-panel');
    if (currentUser) {
        // TRƯỜNG HỢP 1: Đã đăng nhập -> Hiện tên, nút xem vé và nút Thoát
        panel.innerHTML = `
            <button class="btn-login" style="background:#0066cc" onclick="viewMyTickets()">Vé Của Tôi</button>
            <span class="user-greeting" style="cursor: pointer;" onclick="openProfileModal()">${currentUser.Fullname}</span>
            <button class="btn-login" style="background:#555" onclick="logout()">Thoát</button>
        `;
    } else {
        // TRƯỜNG HỢP 2: Chưa đăng nhập -> Hiện cả nút Đăng Nhập và Đăng Ký
        panel.innerHTML = `
            <button class="btn-login" onclick="openModal('login-modal')">Đăng Nhập</button>
            <button class="btn-register" onclick="openModal('register-modal')">Đăng Ký</button>
        `;
    }
}

async function viewMyTickets() {
    openModal('my-tickets-modal');

    const container = document.getElementById('tickets-list');
    // toolbar + content area so toggle can re-render only the content
    container.innerHTML = `
        <div id="tickets-toolbar" style="display:flex;/* justify-content:flex-end; */padding:8px;align-items: center;">
            <input type="checkbox" id="show-cancelled-toggle" style="margin-right:6px;width: fit-content; cursor: pointer;">
            <label style="font-size: 16px; cursor: pointer;" for="show-cancelled-toggle">Hiện vé đã hủy</label>
        </div>
        <div id="tickets-content"><p style="text-align: center; padding: 20px;">Đang tải...</p></div>
    `;

    try {
        const response = await fetch(`/api/tickets/${currentUser.UserID}`);
        const result = await response.json();
        const allTickets = (result.success && Array.isArray(result.data)) ? result.data : [];

        const content = document.getElementById('tickets-content');
        const toggle = document.getElementById('show-cancelled-toggle');

        function renderList() {
            content.innerHTML = '';
            const showCancelled = toggle && toggle.checked;

            const ticketsToShow = showCancelled ? allTickets : allTickets.filter(t => t.TicketStatus === 'booked');

            if (!ticketsToShow || ticketsToShow.length === 0) {
                content.innerHTML = '<p style="text-align: center; padding: 20px;">Bạn chưa có vé nào.</p>';
                return;
            }

            ticketsToShow.forEach(ticket => {
                const ticketDiv = document.createElement('div');
                ticketDiv.className = 'ticket-item';
                ticketDiv.innerHTML = `
                <div class="ticket">
                        <img src="./assets/ticket.png" alt="Ticket" class="ticket-image">
                        <div class="ticket-text">
                            <h4 class="cinema-name">T1F1 Cinema</h4>
                            <div class="wrapper-box">
                                <h2 class="movie-name">${ticket.MovieName}</h2>
                                <h4 class="show-time">Thời gian chiếu: ${ticket.Showtime}</h4>
                            </div>
                            <div class="wrapper-box details">
                                <div class="details-row">
                                    <p><strong>Rạp:</strong> ${ticket.RoomID}</p>
                                    <p><strong>Ghế:</strong> ${ticket.SeatNumber}</p>
                                </div>
                                <div class="details-row">
                                    <p><strong>Đơn giá:</strong> ${ticket.TicketPrice.toLocaleString()} VND</p>
                                </div>
                                <p><strong>Ngày đặt:</strong> ${ticket.BookingDate}</p>
                                <p><strong>Khách hàng:</strong>${ticket.Fullname}</p>
                            </div>
                            <div class="strip-container">
                                <div class="star-strip" aria-hidden="true">
                                    ★★★★★★
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 80px;">
                        <div class="ticket-status">
                            ${ticket.TicketStatus == 'booked' ? 'Đã Đặt ✅' : 'Đã Hủy ❌'}
                        </div>

                        <button class="btn-cancel" onclick="cancelTicket(${ticket.TicketID}, this)" ${ticket.TicketStatus !== 'booked' ? 'disabled' : ''}>Hủy Vé</button>
                    </div>`;

                content.appendChild(ticketDiv);
            });
        }

        // initial render: default hide cancelled
        if (toggle) toggle.checked = false;
        renderList();

        // re-render when toggle changes
        if (toggle) toggle.addEventListener('change', () => renderList());

    } catch (error) {
        const content = document.getElementById('tickets-content');
        content.innerHTML = '<p style="text-align: center; padding: 20px; color: red;">Lỗi kết nối: ' + error.message + '</p>';
    }
}

async function cancelTicket(ticketId, buttonEl) {
    if (!ticketId) {
        alert('Không tìm thấy mã vé');
        return;
    }

    if (!confirm('Bạn có chắc muốn hủy vé này? Tiền sẽ được hoàn lại.')) {
        return;
    }

    // Disable button để tránh nhấn nhiều lần
    if (buttonEl) {
        buttonEl.disabled = true;
        buttonEl.style.opacity = '0.5';
        buttonEl.style.cursor = 'not-allowed';
    }

    try {
        const response = await fetch('/api/tickets/cancel/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ticketId })
        });

        const result = await response.json();
        
        if (result.success) {
            alert('✅ Hủy vé thành công! Tiền đã được hoàn lại.');
            // Reload danh sách vé
            viewMyTickets();
        } else {
            alert('❌ Lỗi: ' + (result.error || 'Không thể hủy vé'));
        }
    } catch (error) {
        alert('❌ Lỗi kết nối: ' + error.message);
    } finally {
        // Re-enable button
        if (buttonEl) {
            buttonEl.disabled = false;
            buttonEl.style.opacity = '1';
            buttonEl.style.cursor = 'pointer';
        }
    }
}

// --- PROFILE FUNCTIONS ---

async function openProfileModal() {
    if (!currentUser) return;
    
    openModal('profile-modal');
    
    // Populate header info
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.Fullname)}&background=e50914&color=fff`;
    document.getElementById('profile-avatar-img').src = avatarUrl;
    document.getElementById('profile-fullname').innerText = currentUser.Fullname;
    document.getElementById('profile-username').innerText = `@${currentUser.Username}`;
    document.getElementById('profile-email').innerText = currentUser.Email;
    
    // Populate info tab
    document.getElementById('profile-display-fullname').innerText = currentUser.Fullname;
    document.getElementById('profile-display-username').innerText = currentUser.Username;
    document.getElementById('profile-display-email').innerText = currentUser.Email;
    document.getElementById('profile-display-userid').innerText = currentUser.UserID;
    
    // Load and calculate stats
    try {
        const response = await fetch(`/api/tickets/${currentUser.UserID}`);
        const result = await response.json();
        const tickets = (result.success && Array.isArray(result.data)) ? result.data : [];
        
        const totalTickets = tickets.length;
        const activeTickets = tickets.filter(t => t.TicketStatus === 'booked').length;
        const cancelledTickets = tickets.filter(t => t.TicketStatus !== 'booked').length;
        const totalSpent = tickets.reduce((sum, t) => sum + (t.TicketPrice || 0), 0);
        
        document.getElementById('profile-stat-total-tickets').innerText = totalTickets;
        document.getElementById('profile-stat-active-tickets').innerText = activeTickets;
        document.getElementById('profile-stat-cancelled-tickets').innerText = cancelledTickets;
        document.getElementById('profile-stat-total-spent').innerText = totalSpent.toLocaleString() + ' VND';
    } catch (error) {
        console.error('Error loading ticket stats:', error);
    }
}

function switchProfileTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const tabElement = document.getElementById(`profile-tab-${tabName}`);
    if (tabElement) {
        tabElement.classList.add('active');
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

function openChangePasswordModal() {
    closeModal('profile-modal');
    openModal('change-password-modal');
}

async function handleChangePassword(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-new-password').value;
    
    if (newPassword !== confirmPassword) {
        alert('Mật khẩu mới không khớp!');
        return;
    }
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
    }
    
    try {
        const response = await fetch('/api/customers/change-password/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: currentUser.UserID,
                oldPassword: currentPassword,
                newPassword
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('✅ Đổi mật khẩu thành công!');
            closeModal('change-password-modal');
            // Clear inputs
            document.getElementById('current-password').value = '';
            document.getElementById('new-password').value = '';
            document.getElementById('confirm-new-password').value = '';
        } else {
            alert('❌ ' + (result.error || 'Đổi mật khẩu thất bại'));
        }
    } catch (error) {
        alert('❌ Lỗi kết nối: ' + error.message);
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    }
}async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Disable submit button to prevent multiple submissions
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
        submitBtn.style.cursor = 'not-allowed';
    }

    try {
        const response = await fetch('/api/customers/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (result.success) {
            currentUser = result.data;
            // Lưu thông tin người dùng vào localStorage
            localStorage.setItem('currentUser', JSON.stringify(result.data));
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
    } finally {
        // Re-enable submit button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        }
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

    // Disable submit button to prevent multiple submissions
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
        submitBtn.style.cursor = 'not-allowed';
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
            document.getElementById('login-email').value = email;
            
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
    } finally {
        // Re-enable submit button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        }
    }
}

function logout() {
    if (confirm("Bạn có chắc muốn đăng xuất?")) {
        currentUser = null;
        // Xoá thông tin người dùng khỏi localStorage
        localStorage.removeItem('currentUser');
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

    selectedSeats = [];
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
        selectedSeats = selectedSeats.filter(s => s !== code);
    } else {
        el.classList.add('selected');
        selectedSeats.push(code);
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

async function handleBooking() {
    if (!currentUser) {
        alert("Vui lòng đăng nhập để đặt vé!");
        openModal('login-modal');
        return;
    }
    if (selectedSeats.length === 0) {
        alert("Vui lòng chọn ghế!");
        return;
    }

    const scheduleId = parseInt(document.getElementById('schedule-select').value);
    const schedule = dbSchedules.find(s => s.ScheduleID === scheduleId);
    const totalPrice = document.getElementById('total-price').innerText;

    if (confirm(`Xác nhận thanh toán ${totalPrice} VND?`)) {
        const orderId = Date.now();
        
        // Hiển thị loading
        const bookingBtn = document.getElementById('booking-btn');
        const loadingText = document.getElementById('booking-loading');
        
        // Check if button is already processing
        if (bookingBtn.disabled) {
            return;
        }
        
        bookingBtn.disabled = true;
        bookingBtn.style.opacity = '0.5';
        bookingBtn.style.cursor = 'not-allowed';
        loadingText.style.display = 'block';
        
        try {
            // Gửi request cho mỗi ghế được chọn
            for (const seat of selectedSeats) {
                const response = await fetch('/api/tickets/book/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        scheduleId: scheduleId,
                        customerId: currentUser.UserID,
                        seatNumber: seat,
                    })
                });

                const result = await response.json();
                if (!result.success) {
                    alert(result.error || "Đặt vé thất bại!");
                    bookingBtn.disabled = false;
                    bookingBtn.style.opacity = '1';
                    bookingBtn.style.cursor = 'pointer';
                    loadingText.style.display = 'none';
                    return;
                }
            }

            // Hiển thị modal thành công thay vì alert
            showSuccessModal(
                orderId, 
                totalPrice, 
                selectedSeats,
                currentMovie.MovieName,
                schedule.Showtime,
                currentUser.Fullname,
                schedule.RoomID
            );
            
            closeModal('booking-modal');
            renderMovies(dbMovies); // Refresh để cập nhật lại ghế
            
            // Reset loading state
            bookingBtn.disabled = false;
            bookingBtn.style.opacity = '1';
            bookingBtn.style.cursor = 'pointer';
            loadingText.style.display = 'none';
        } catch (error) {
            alert("Lỗi kết nối server: " + error.message);
            bookingBtn.disabled = false;
            bookingBtn.style.opacity = '1';
            bookingBtn.style.cursor = 'pointer';
            loadingText.style.display = 'none';
        }
    }
}

function showSuccessModal(orderId, totalPrice, seats, movieName, showtime, userName, roomId) {
    document.getElementById('order-id').innerText = orderId;
    document.getElementById('order-total').innerText = totalPrice;
    document.getElementById('order-seats').innerText = seats.join(', ');
    document.getElementById('order-movie').innerText = movieName;
    document.getElementById('order-showtime').innerText = showtime;
    document.getElementById('order-user').innerText = userName;
    document.getElementById('order-room').innerText = roomId;
    openModal('success-modal');
}

function closeSuccessModal() {
    closeModal('success-modal');
    renderMovies(dbMovies);
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
    
    // Khôi phục phiên đăng nhập từ localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
        } catch (error) {
            console.error('Lỗi phân tích dữ liệu người dùng từ localStorage:', error);
            currentUser = null;
            localStorage.removeItem('currentUser');
        }
    } else {
        currentUser = null;
    }

    renderMovies(dbMovies);
    initializeFilters();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});