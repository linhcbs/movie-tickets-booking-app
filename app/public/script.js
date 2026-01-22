// --- 1. MOCK DATA (Dữ liệu giả lập thay cho Database) ---
const databases = {
    movies: [
        { 
            id: 1, 
            name: "Mai", 
            category: "Tâm lý", 
            duration: "120 phút", 
            description: "Phim của Trấn Thành...", 
            price: 100000,
            schedules: ["18:00", "20:00", "22:00"] 
        },
        { 
            id: 2, 
            name: "Godzilla x Kong", 
            category: "Hành động", 
            duration: "115 phút", 
            description: "Quái vật đánh nhau...", 
            price: 120000,
            schedules: ["19:00", "21:30"]
        }
    ],
    users: [], // Lưu user đăng ký
    currentUser: null // Lưu người đang đăng nhập
};

// --- 2. CÁC HÀM CHỨC NĂNG (Theo yêu cầu ảnh) ---

// Chức năng 1: Hiện danh sách phim
function hienDanhSachPhim() {
    const listDiv = document.getElementById('movie-list');
    listDiv.innerHTML = ''; // Xóa nội dung cũ

    databases.movies.forEach(phim => {
        // Tạo thẻ HTML cho từng phim
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <h3>${phim.name}</h3>
            <p>Thể loại: ${phim.category}</p>
            <p>Thời lượng: ${phim.duration}</p>
        `;
        // Sự kiện click vào phim
        card.onclick = () => xemChiTietPhim(phim.id);
        listDiv.appendChild(card);
    });
}

// Chức năng 2: Hiện thông tin chi tiết phim (Khi click)
function xemChiTietPhim(id) {
    // Tìm phim trong "database"
    const phim = databases.movies.find(m => m.id === id);
    if (!phim) return;

    // Hiển thị thông tin ra giao diện
    const detailContent = document.getElementById('detail-content');
    detailContent.innerHTML = `
        <h1>${phim.name}</h1>
        <p><strong>Mô tả:</strong> ${phim.description}</p>
        <p><strong>Giá vé:</strong> ${phim.price} VNĐ</p>
        <p><strong>Ghế trống:</strong> 50/100 (Giả lập)</p>
    `;

    // Load lịch chiếu vào ô chọn (Dropdown)
    const select = document.getElementById('schedule-select');
    select.innerHTML = '';
    phim.schedules.forEach(gio => {
        const option = document.createElement('option');
        option.value = gio;
        option.text = gio;
        select.appendChild(option);
    });

    // Lưu phim đang chọn tạm thời để dùng cho nút đặt vé
    window.currentMovieId = id; 

    chuyenTrang('movie-detail');
}

// Chức năng 3: Đặt vé & Log thông tin
function datVe() {
    if (!databases.currentUser) {
        alert("Bạn phải đăng nhập mới được đặt vé!");
        chuyenTrang('login');
        return;
    }

    const movie = databases.movies.find(m => m.id === window.currentMovieId);
    const time = document.getElementById('schedule-select').value;

    // Log thông tin như yêu cầu
    console.log("--- ĐẶT VÉ THÀNH CÔNG ---");
    console.log("User:", databases.currentUser.username);
    console.log("Phim:", movie.name);
    console.log("Lịch chiếu:", time);
    console.log("Giá:", movie.price);
    
    alert(`Đặt vé thành công phim ${movie.name} suất ${time}. Kiểm tra Console (F12) để xem log.`);
}

// Chức năng 4 + 5: Đăng ký & Log
function dangKy() {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;
    const fullname = document.getElementById('reg-fullname').value;
    const username = document.getElementById('reg-username').value;

    // Lưu vào mảng users (giả lập lưu DB)
    const newUser = { email, pass, fullname, username };
    databases.users.push(newUser);

    console.log("Đăng ký user mới:", newUser);
    alert("Đăng ký thành công! Hãy đăng nhập.");
    chuyenTrang('login');
}

// Chức năng 6: Đăng nhập & Log
function dangNhap() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    // Tìm user trong mảng users
    const user = databases.users.find(u => u.email === email && u.pass === pass);

    if (user) {
        databases.currentUser = user;
        console.log("Đăng nhập thành công:", user);
        alert(`Chào mừng ${user.fullname} quay trở lại!`);
        chuyenTrang('home');
    } else {
        console.log("Đăng nhập thất bại: Sai thông tin");
        alert("Sai email hoặc mật khẩu (Bạn đã đăng ký chưa?)");
    }
}

// Hỗ trợ: Hàm chuyển đổi giữa các màn hình (Ẩn/Hiện div)
function chuyenTrang(sectionId) {
    // Ẩn tất cả các div container
    document.querySelectorAll('.container').forEach(div => div.classList.add('hidden'));
    // Hiện div mong muốn
    document.getElementById(sectionId).classList.remove('hidden');
}

// KHỞI CHẠY LẦN ĐẦU
hienDanhSachPhim();