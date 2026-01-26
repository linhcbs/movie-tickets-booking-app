-- Đây là file insert records vào db
use cinema_booking_system;

-- MOVIES -- 
INSERT INTO Movies (MovieID, MovieName, MovieCategory, MovieDuration, MoviePosterURL, MovieDescription)
VALUES 
(1, N'Avengers: Endgame', N'Action', 10860, 'https://upload.wikimedia.org/wikipedia/vi/2/2d/Avengers_Endgame_bia_teaser.jpg', N'Sau những sự kiện tàn khốc của Thanos, các siêu anh hùng còn lại tập hợp để đảo ngược hành động của hắn.'),
(2, N'The Dark Knight', N'Action', 9120, 'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg', N'Batman phải đối mặt với thử thách tâm lý và thể xác lớn nhất khi chiến đấu với Joker.'),
(3, N'Inception', N'Sci-Fi', 8880, 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg', N'Một kẻ trộm có khả năng đi vào giấc mơ của người khác để đánh cắp bí mật từ tiềm thức.'),
(4, N'Interstellar', N'Sci-Fi', 10140, 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg', N'Một nhóm phi hành gia du hành qua một lỗ hổng trong không gian để đảm bảo sự sinh tồn của nhân loại.'),
(5, N'Parasite', N'Drama', 7920, 'https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png', N'Sự cộng sinh kỳ lạ giữa một gia đình nghèo và một gia đình giàu có dẫn đến những kết cục không ngờ.'),
(6, N'Spirited Away', N'Animation', 7500, 'https://upload.wikimedia.org/wikipedia/en/thumb/d/db/Spirited_Away_Japanese_poster.png/250px-Spirited_Away_Japanese_poster.png', N'Một cô bé lạc vào thế giới của các linh hồn và phải tìm cách cứu cha mẹ mình.'),
(7, N'The Lion King', N'Animation', 5340, 'https://upload.wikimedia.org/wikipedia/en/9/9d/Disney_The_Lion_King_2019.jpg', N'Hành trình của sư tử Simba để giành lại vương quốc sau cái chết của cha mình.'),
(8, N'Joker', N'Drama', 7320, 'https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg', N'Câu chuyện về sự sa đọa của Arthur Fleck, một diễn viên hài thất bại, trở thành tội phạm khét tiếng.'),
(9, N'John Wick', N'Action', 6060, 'https://upload.wikimedia.org/wikipedia/en/9/98/John_Wick_TeaserPoster.jpg', N'Một sát thủ đã giải nghệ quay lại thế giới ngầm để trả thù cho chú chó của mình.'),
(10, N'Spider-Man: No Way Home', N'Action', 8880, 'https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Spider-Man_No_Way_Home_poster.jpg/250px-Spider-Man_No_Way_Home_poster.jpg', N'Peter Parker nhờ đến Doctor Strange để xóa ký ức thế giới, nhưng lại vô tình mở ra đa vũ trụ.'),
(11, N'Your Name', N'Animation', 6360, 'https://upload.wikimedia.org/wikipedia/en/0/0b/Your_Name_poster.png', N'Hai thiếu niên ở hai nơi khác nhau bỗng nhiên hoán đổi thân xác cho nhau qua những giấc mơ.'),
(12, N'The Conjuring', N'Horror', 6720, 'https://upload.wikimedia.org/wikipedia/en/8/8c/The_Conjuring_poster.jpg', N'Hai chuyên gia hiện tượng siêu nhiên điều tra một gia đình bị quấy nhiễu bởi thế lực hắc ám.'),
(13, N'Deadpool', N'Comedy', 6480, 'https://upload.wikimedia.org/wikipedia/en/2/23/Deadpool_%282016_poster%29.png', N'Một cựu lính đặc nhiệm tham gia thí nghiệm và có được khả năng hồi phục phi thường cùng tính cách lầy lội.'),
(14, N'Coco', N'Animation', 6300, 'https://upload.wikimedia.org/wikipedia/en/9/98/Coco_%282017_film%29_poster.jpg', N'Cậu bé Miguel bước vào vùng đất linh hồn để tìm hiểu về truyền thống âm nhạc của gia đình mình.'),
(15, N'Gladiator', N'Epic', 9300, 'https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png', N'Một vị tướng La Mã bị phản bội và trở thành võ sĩ giác đấu để trả thù hoàng đế tàn ác.'),
(16, N'Frozen', N'Animation', 6120, 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Frozen_%282013_film%29_poster.jpg/250px-Frozen_%282013_film%29_poster.jpg', N'Anna lên đường tìm kiếm chị gái Elsa để giải lời nguyền mùa đông vĩnh cửu.'),
(17, N'Titanic', N'Romance', 11640, 'https://upload.wikimedia.org/wikipedia/vi/2/22/Titanic_poster.jpg', N'Câu chuyện tình yêu giữa Rose và Jack trên con tàu định mệnh Titanic.'),
(18, N'Avatar', N'Sci-Fi', 9720, 'https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg', N'Một người lính bị liệt tham gia vào dự án điều khiển cơ thể người ngoài hành tinh tại hành tinh Pandora.'),
(19, N'Harry Potter 1', N'Fantasy', 9120, 'https://upload.wikimedia.org/wikipedia/vi/7/71/HP1_posters.jpg', N'Cậu bé mồ côi Harry Potter phát hiện mình là phù thủy và bắt đầu học tại trường Hogwarts.'),
(20, N'Dune', N'Sci-Fi', 9300, 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Dune_%282021_film%29.jpg/250px-Dune_%282021_film%29.jpg', N'Paul Atreides phải đến hành tinh nguy hiểm nhất vũ trụ để đảm bảo tương lai của gia tộc.'),
(21, N'Up', N'Animation', 5760, 'https://upload.wikimedia.org/wikipedia/en/0/05/Up_%282009_film%29.jpg', N'Một ông lão dùng hàng ngàn quả bóng bay để đưa ngôi nhà của mình đến Nam Mỹ.'),
(22, N'Toy Story', N'Animation', 4860, 'https://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg', N'Cuộc sống bí mật của những món đồ chơi khi con người không có mặt.'),
(23, N'Soul', N'Animation', 6060, 'https://upload.wikimedia.org/wikipedia/en/3/39/Soul_%282020_film%29_poster.jpg', N'Một nhạc sĩ jazz bị tai nạn và phải tìm đường quay lại cơ thể từ vùng đất linh hồn.'),
(24, N'The Godfather', N'Crime', 10500, 'https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', N'Câu chuyện về gia đình mafia Corleone tại Mỹ.'),
(25, N'Pulp Fiction', N'Crime', 9240, 'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg', N'Những câu chuyện đan xen về thế giới ngầm tội phạm ở Los Angeles.'),
(26, N'Shrek', N'Animation', 5400, 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Shrek_%282001_animated_feature_film%29.jpg/250px-Shrek_%282001_animated_feature_film%29.jpg', N'Một gã chằn tinh xanh đi giải cứu công chúa để lấy lại đầm lầy của mình.'),
(27, N'How to Train Your Dragon', N'Animation', 5880, 'https://upload.wikimedia.org/wikipedia/en/9/99/How_to_Train_Your_Dragon_Poster.jpg', N'Một cậu bé Viking kết bạn với một con rồng thay vì săn đuổi nó.'),
(28, N'Fast & Furious 7', N'Action', 8220, 'https://upload.wikimedia.org/wikipedia/en/b/b8/Furious_7_poster.jpg', N'Nhóm của Dominic Toretto bị tấn công bởi một sát thủ muốn báo thù cho em trai.'),
(29, N'Doctor Strange', N'Action', 6900, 'https://play-lh.googleusercontent.com/Bma8znG8MyasCosD2p0MH5GFzxF-7mAQckY6zSyio-zgeXX9XUJNIEqFo0samF0b63U=w240-h480-rw', N'Sau một tai nạn, bác sĩ phẫu thuật thần kinh tìm đến nghệ thuật thần bí để chữa lành.'),
(30, N'Black Panther', N'Action', 8040, 'https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_.jpg', N'T''Challa trở về quê hương Wakanda để kế vị ngai vàng và bảo vệ thế giới.'),
(31, N'Wonder Woman', N'Action', 8460, 'https://upload.wikimedia.org/wikipedia/en/b/b0/Wonder_Woman_%282017_film%29_poster.jpg', N'Công chúa Diana rời hòn đảo của mình để chiến đấu trong Thế chiến I và khám phá sức mạnh bản thân.'),
(32, N'Bohemian Rhapsody', N'Musical', 8040, 'https://m.media-amazon.com/images/M/MV5BMTA2NDc3Njg5NDVeQTJeQWpwZ15BbWU4MDc1NDcxNTUz._V1_.jpg', N'Phim tiểu sử về ban nhạc Queen và ca sĩ huyền thoại Freddie Mercury.'),
(33, N'A Quiet Place', N'Horror', 5400, 'https://upload.wikimedia.org/wikipedia/en/e/e7/A_Quiet_Place_Day_One_%282024%29_poster.jpg', N'Một gia đình phải sống trong im lặng để tránh sự săn đuổi của các sinh vật nhạy cảm với âm thanh.'),
(34, N'Blade Runner 2049', N'Sci-Fi', 9840, 'https://upload.wikimedia.org/wikipedia/en/9/9b/Blade_Runner_2049_poster.png', N'Một cảnh sát phát hiện ra một bí mật có thể gây hỗn loạn xã hội tương lai.'),
(35, N'Inside Out', N'Animation', 5700, 'https://upload.wikimedia.org/wikipedia/en/0/0a/Inside_Out_%282015_film%29_poster.jpg', N'Các cảm xúc bên trong tâm trí của một cô bé 11 tuổi phải làm việc cùng nhau.'),
(36, N'Moana', N'Animation', 6420, 'https://upload.wikimedia.org/wikipedia/en/2/26/Moana_Teaser_Poster.jpg', N'Một cô gái trẻ can đảm vượt đại dương để cứu người dân trên đảo của mình.'),
(37, N'Mad Max: Fury Road', N'Action', 7200, 'https://upload.wikimedia.org/wikipedia/en/6/6e/Mad_Max_Fury_Road.jpg', N'Trong một thế giới hậu tận thế, Max hỗ trợ một nhóm phụ nữ chạy trốn khỏi một tên bạo chúa.'),
(38, N'Tenet', N'Sci-Fi', 9000, 'https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Tenet_movie_poster.jpg/250px-Tenet_movie_poster.jpg', N'Một đặc vụ phải sử dụng sự đảo ngược thời gian để ngăn chặn Thế chiến III.'),
(39, N'Top Gun: Maverick', N'Action', 7860, 'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Top_Gun_Maverick_Poster.jpg/250px-Top_Gun_Maverick_Poster.jpg', N'Maverick trở lại huấn luyện một thế hệ phi công trẻ cho một nhiệm vụ nguy hiểm.'),
(40, N'Everything Everywhere All at Once', N'Sci-Fi', 8340, 'https://upload.wikimedia.org/wikipedia/en/1/1e/Everything_Everywhere_All_at_Once.jpg', N'Một phụ nữ gốc Hoa phải kết nối với các phiên bản khác của chính mình để cứu đa vũ trụ.'),
(41, N'Train to Busan', N'Horror', 7080, 'https://upload.wikimedia.org/wikipedia/en/9/95/Train_to_Busan.jpg', N'Những hành khách trên một chuyến tàu cao tốc phải chiến đấu để sống sót trước đại dịch zombie.'),
(42, N'Oldboy', N'Action', 7200, 'https://upload.wikimedia.org/wikipedia/en/b/bb/Oldboy_2013_film_poster.jpg', N'Một người đàn ông bị bắt giam 15 năm mà không rõ lý do, sau đó lên kế hoạch trả thù.'),
(43, N'The Wolf of Wall Street', N'Comedy', 10800, 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/The_Wolf_of_Wall_Street_%282013%29.png/250px-The_Wolf_of_Wall_Street_%282013%29.png', N'Dựa trên câu chuyện có thật về sự nghiệp của tay môi giới chứng khoán Jordan Belfort.'),
(44, N'Whiplash', N'Musical', 6420, 'https://upload.wikimedia.org/wikipedia/en/0/01/Whiplash_poster.jpg', N'Một tay trống trẻ đầy tham vọng chịu áp lực khắc nghiệt từ một giáo viên dạy nhạc tàn nhẫn.'),
(45, N'Arrival', N'Sci-Fi', 6960, 'https://upload.wikimedia.org/wikipedia/en/d/df/Arrival%2C_Movie_Poster.jpg', N'Một chuyên gia ngôn ngữ học cố gắng giao tiếp với những người ngoài hành tinh vừa hạ cánh xuống Trái Đất.'),
(46, N'Sing', N'Animation', 6480, 'https://upload.wikimedia.org/wikipedia/en/b/bb/Sing_%282016_film%29_poster.jpg', N'Một chú gấu túi tổ chức một cuộc thi ca hát để cứu lấy nhà hát cũ của mình.'),
(47, N'Minions', N'Animation', 5460, 'https://upload.wikimedia.org/wikipedia/en/1/19/Minions_%282015_film%29.jpg', N'Các Minions đi tìm kiếm một chủ nhân mới là kẻ ác nhân nhất thế giới.'),
(48, N'Godzilla vs. Kong', N'Action', 6780, 'https://upload.wikimedia.org/wikipedia/en/6/63/Godzilla_vs._Kong.png', N'Cuộc đại chiến giữa hai quái vật huyền thoại đe dọa sự tồn vong của thế giới.'),
(49, N'Ratatouille', N'Animation', 6660, 'https://upload.wikimedia.org/wikipedia/en/5/50/RatatouillePoster.jpg', N'Một chú chuột có tài nấu nướng kết hợp với một anh chàng vụng về tại một nhà hàng Pháp.'),
(50, N'Grave of the Fireflies', N'Animation', 5340, 'https://m.media-amazon.com/images/M/MV5BNTY5MmE2OGMtN2IxNC00MDY4LTkwMGEtZDUzOTYyNWE0ZTNjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', N'Câu chuyện cảm động về hai anh em tìm cách sống sót tại Nhật Bản cuối Thế chiến II.');

-- select * from Movies;


-- MOVIES SCHEDULES --

INSERT INTO MovieSchedules(ScheduleID, MovieID, Showtime, AvailableSeats, TicketPrice, RoomID)
VALUES 
(1, 1, '2025-01-16 09:00:00', 150, 45000, 'A01'),
(2, 2, '2025-01-17 14:30:00', 85, 50000, 'A02'),
(3, 3, '2025-01-18 19:15:00', 120, 55000, 'A03'),
(4, 4, '2025-01-20 20:00:00', 45, 60000, 'A04'),
(5, 5, '2025-01-22 10:30:00', 200, 65000, 'A05'),
(6, 6, '2025-01-25 13:45:00', 110, 70000, 'A06'),
(7, 7, '2025-01-28 16:00:00', 90, 75000, 'A07'),
(8, 8, '2025-02-01 18:30:00', 75, 80000, 'A08'),
(9, 9, '2025-02-04 21:00:00', 130, 85000, 'A09'),
(10, 10, '2025-02-08 12:15:00', 12, 90000, 'A10'),
(11, 11, '2025-02-12 15:45:00', 160, 95000, 'A11'),
(12, 12, '2025-02-15 22:30:00', 55, 100000, 'A12'),
(13, 13, '2025-02-19 09:30:00', 80, 110000, 'A13'),
(14, 14, '2025-02-22 13:00:00', 105, 120000, 'A14'),
(15, 15, '2025-02-26 17:15:00', 140, 130000, 'A15'),
(16, 16, '2025-03-01 11:00:00', 95, 140000, 'A16'),
(17, 17, '2025-03-05 14:45:00', 0, 150000, 'A17'),
(18, 18, '2025-03-09 19:30:00', 180, 45000, 'A18'),
(19, 19, '2025-03-13 21:15:00', 60, 50000, 'A19'),
(20, 20, '2025-03-17 10:00:00', 115, 55000, 'A20'),
(21, 21, '2025-03-21 13:30:00', 150, 60000, 'A21'),
(22, 22, '2025-03-25 16:45:00', 140, 65000, 'A22'),
(23, 23, '2025-03-29 20:00:00', 125, 70000, 'A23'),
(24, 24, '2025-04-02 12:30:00', 40, 75000, 'A24'),
(25, 25, '2025-04-06 15:15:00', 70, 80000, 'A25'),
(26, 26, '2025-04-10 18:45:00', 110, 85000, 'A26'),
(27, 27, '2025-04-14 22:00:00', 95, 90000, 'A27'),
(28, 28, '2025-04-18 09:15:00', 85, 95000, 'A28'),
(29, 29, '2025-04-22 13:45:00', 130, 100000, 'A29'),
(30, 30, '2025-04-26 17:00:00', 50, 110000, 'B01'),
(31, 31, '2025-04-30 20:30:00', 160, 120000, 'B02'),
(32, 32, '2025-05-04 11:30:00', 105, 130000, 'B03'),
(33, 33, '2025-05-08 15:00:00', 25, 140000, 'B04'),
(34, 34, '2025-05-12 19:15:00', 180, 150000, 'B05'),
(35, 35, '2025-05-16 21:45:00', 200, 45000, 'B06'),
(36, 36, '2025-05-20 10:15:00', 115, 50000, 'B07'),
(37, 37, '2025-05-24 14:00:00', 10, 55000, 'B08'),
(38, 38, '2025-05-28 17:30:00', 80, 60000, 'B09'),
(39, 39, '2025-06-01 20:45:00', 140, 65000, 'B10'),
(40, 40, '2025-06-05 12:00:00', 125, 70000, 'B11'),
(41, 41, '2025-06-09 15:45:00', 60, 75000, 'B12'),
(42, 42, '2025-06-13 18:15:00', 45, 80000, 'B13'),
(43, 43, '2025-06-17 22:30:00', 150, 85000, 'B14'),
(44, 44, '2025-06-21 09:45:00', 170, 90000, 'B15'),
(45, 45, '2025-06-25 13:30:00', 190, 100000, 'B16'),
(46, 46, '2025-06-29 17:15:00', 110, 110000, 'B17'),
(47, 47, '2025-07-03 20:00:00', 95, 120000, 'B18'),
(48, 48, '2025-07-07 11:00:00', 75, 130000, 'B19'),
(49, 49, '2025-07-11 15:30:00', 130, 140000, 'C01'),
(50, 50, '2025-07-15 19:45:00', 20, 150000, 'C02');

-- select * from MovieSchedules;

-- USERS
INSERT INTO Users (UserID, Username, Password, Email, Fullname)
VALUES 
(1, N'johndoe', 'iloveyou123', 'johndoe@gmail.com', 'John Doe'),
(2, N'ladiesman217', 'qwerty456', 'ladiesman217@gmail.com', 'Sam Witwicky'),
(3, N'admin', 'abc123', 'admin@gmail.com', 'Admin'),
(4, N'yilongmao', 'chuateb0ngtoi12345', 'ctbgt2009@gmail.com', 'Yi Long Mao'),
(5, N'tungtungtungsahur', 'threeTS6767', 'tungtungtungsahur67@gmail.com', 'Tung Tung Tung Sahur');

-- select * from users;


-- TICKETS
INSERT INTO Tickets (TicketID, ScheduleID, CustomerID, TicketStatus, SeatNumber, BookingDate)
VALUES
(1, 5, 3, 'booked', 'A01', '2025-01-10 9:00:00'),
(2, 2, 2, 'paid', 'B05', '2025-01-12 9:00:00'),
(3, 10, 2, 'cancelled', 'DO9', '2025-01-02 9:00:00'),
(4, 3, 1, 'booked', 'F01', '2024-12-25 9:00:00'),
(5, 7, 5, 'paid', 'Z02', '2024-12-05 9:00:00');

-- SELECT * FROM TICKETS;