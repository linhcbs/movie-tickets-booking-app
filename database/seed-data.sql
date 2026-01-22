-- Đây là file insert records vào db
use cinema_booking_system;

-- MOVIES -- 
INSERT INTO Movies (MovieID, MovieName, MovieCategory, MovieDuration, MoviePosterURL, MovieDescription)
VALUES 
(1, N'Avengers: Endgame', N'Action', 10860, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlhNci6Ld86Zbq9FH-hapTLyoeMI-fCZU7pg5ygMqqJ_uB9_jiKfpRArlOhh4TRP-nLJyPL3EEOZR67FlrXCLlt1KwBSfB2sSt2CxOlJUK&s=10', N'Sau những sự kiện tàn khốc của Thanos, các siêu anh hùng còn lại tập hợp để đảo ngược hành động của hắn.'),
(2, N'The Dark Knight', N'Action', 9120, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnz3a4cd0__lBgeLORV1WeGdTjVBVB2VPz454L7mVU5NcIAE8IJQhxj5ovMMi9K3XvioaJlfY_pMvZjx4xktoFLH0bvAxwaP23gw44xt4ewQ&s=10', N'Batman phải đối mặt với thử thách tâm lý và thể xác lớn nhất khi chiến đấu với Joker.'),
(3, N'Inception', N'Sci-Fi', 8880, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ptZQHmTbAZOSGg4iS64E7H8K6P0D6_T2fA&s', N'Một kẻ trộm có khả năng đi vào giấc mơ của người khác để đánh cắp bí mật từ tiềm thức.'),
(4, N'Interstellar', N'Sci-Fi', 10140, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT77-50t8hHIn5mIuoB-8as9pS90mS2S97vYST4SloT2u.jpg', N'Một nhóm phi hành gia du hành qua một lỗ hổng trong không gian để đảm bảo sự sinh tồn của nhân loại.'),
(5, N'Parasite', N'Drama', 7920, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_M-kR6Lp016v962mS4X-8as9pS90mS2S97vYST4SloT2u.jpg', N'Sự cộng sinh kỳ lạ giữa một gia đình nghèo và một gia đình giàu có dẫn đến những kết cục không ngờ.'),
(6, N'Spirited Away', N'Animation', 7500, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_uB9_jiKfpRArlOhh4TRP-nLJyPL3EEOZR67FlrXCLlt1KwBSfB2sSt2CxOlJUK&s=10', N'Một cô bé lạc vào thế giới của các linh hồn và phải tìm cách cứu cha mẹ mình.'),
(7, N'The Lion King', N'Animation', 5340, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_sKCr76Bn7mB3bYpB6T96o60Xz9c-8as9pS90mS2S97vYST4SloT2u.jpg', N'Hành trình của sư tử Simba để giành lại vương quốc sau cái chết của cha mình.'),
(8, N'Joker', N'Drama', 7320, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_udDclJoHjfjb8Ekgsd4FDteOkCU-8as9pS90mS2S97vYST4SloT2u.jpg', N'Câu chuyện về sự sa đọa của Arthur Fleck, một diễn viên hài thất bại, trở thành tội phạm khét tiếng.'),
(9, N'John Wick', N'Action', 6060, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_fZPSnd9jS09ZpX9fI5q0mH6H3N4-8as9pS90mS2S97vYST4SloT2u.jpg', N'Một sát thủ đã giải nghệ quay lại thế giới ngầm để trả thù cho chú chó của mình.'),
(10, N'Spider-Man: No Way Home', N'Action', 8880, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_1g0dh_An99mYv3GmyTSIIdNp6pX-8as9pS90mS2S97vYST4SloT2u.jpg', N'Peter Parker nhờ đến Doctor Strange để xóa ký ức thế giới, nhưng lại vô tình mở ra đa vũ trụ.'),
(11, N'Your Name', N'Animation', 6360, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_q719pFdHj1jS7I2GbdpXjuyS97u-8as9pS90mS2S97vYST4SloT2u.jpg', N'Hai thiếu niên ở hai nơi khác nhau bỗng nhiên hoán đổi thân xác cho nhau qua những giấc mơ.'),
(12, N'The Conjuring', N'Horror', 6720, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_w93GAoq89OidR6Lp016v962mS4X-8as9pS90mS2S97vYST4SloT2u.jpg', N'Hai chuyên gia hiện tượng siêu nhiên điều tra một gia đình bị quấy nhiễu bởi thế lực hắc ám.'),
(13, N'Deadpool', N'Comedy', 6480, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_y95tLv72tS97607lU96S7y38S5G-8as9pS90mS2S97vYST4SloT2u.jpg', N'Một cựu lính đặc nhiệm tham gia thí nghiệm và có được khả năng hồi phục phi thường cùng tính cách lầy lội.'),
(14, N'Coco', N'Animation', 6300, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_gGE97vYST4SloT2u99pS90mS2S-8as9pS90mS2S97vYST4SloT2u.jpg', N'Cậu bé Miguel bước vào vùng đất linh hồn để tìm hiểu về truyền thống âm nhạc của gia đình mình.'),
(15, N'Gladiator', N'Epic', 9300, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_ty8TfA1UozeX6uSJsABpALgtkW-8as9pS90mS2S97vYST4SloT2u.jpg', N'Một vị tướng La Mã bị phản bội và trở thành võ sĩ giác đấu để trả thù hoàng đế tàn ác.'),
(16, N'Frozen', N'Animation', 6120, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_kgwjIb2DdTP6vIEI3G7eo1TrGvU-8as9pS90mS2S97vYST4SloT2u.jpg', N'Anna lên đường tìm kiếm chị gái Elsa để giải lời nguyền mùa đông vĩnh cửu.'),
(17, N'Titanic', N'Romance', 11640, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_9xj7r4Sfsar1H8fwCDS6vOndmOq-8as9pS90mS2S97vYST4SloT2u.jpg', N'Câu chuyện tình yêu giữa Rose và Jack trên con tàu định mệnh Titanic.'),
(18, N'Avatar', N'Sci-Fi', 9720, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_jRXYj93bnvcIStAozq9a9osZ16V-8as9pS90mS2S97vYST4SloT2u.jpg', N'Một người lính bị liệt tham gia vào dự án điều khiển cơ thể người ngoài hành tinh tại hành tinh Pandora.'),
(19, N'Harry Potter 1', N'Fantasy', 9120, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_wuMc08IPKEatv9rnqXkvTQCp9U6-8as9pS90mS2S97vYST4SloT2u.jpg', N'Cậu bé mồ côi Harry Potter phát hiện mình là phù thủy và bắt đầu học tại trường Hogwarts.'),
(20, N'Dune', N'Sci-Fi', 9300, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_d5NXSklfzG0u4LX0fwHIn5mIuoB-8as9pS90mS2S97vYST4SloT2u.jpg', N'Paul Atreides phải đến hành tinh nguy hiểm nhất vũ trụ để đảm bảo tương lai của gia tộc.'),
(21, N'Up', N'Animation', 5760, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_vp6Yv97DiZD2znq0XzS0Z0Y9pS-8as9pS90mS2S97vYST4SloT2u.jpg', N'Một ông lão dùng hàng ngàn quả bóng bay để đưa ngôi nhà của mình đến Nam Mỹ.'),
(22, N'Toy Story', N'Animation', 4860, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_uXDp9knALWp7SclQUYHnllBZ7v-8as9pS90mS2S97vYST4SloT2u.jpg', N'Cuộc sống bí mật của những món đồ chơi khi con người không có mặt.'),
(23, N'Soul', N'Animation', 6060, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_hm58Jw4Lw8v79uXcI9Szd62v8p3-8as9pS90mS2S97vYST4SloT2u.jpg', N'Một nhạc sĩ jazz bị tai nạn và phải tìm đường quay lại cơ thể từ vùng đất linh hồn.'),
(24, N'The Godfather', N'Crime', 10500, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_3bhkrj9Sskv9pSRAZs97Z9P9o6v-8as9pS90mS2S97vYST4SloT2u.jpg', N'Câu chuyện về gia đình mafia Corleone tại Mỹ.'),
(25, N'Pulp Fiction', N'Crime', 9240, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_fIE3JCYA6T6MBzqGOL86pXIB7S5-8as9pS90mS2S97vYST4SloT2u.jpg', N'Những câu chuyện đan xen về thế giới ngầm tội phạm ở Los Angeles.'),
(26, N'Shrek', N'Animation', 5400, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_p999S9pS90mS2S97vYST4SloT2u-8as9pS90mS2S97vYST4SloT2u.jpg', N'Một gã chằn tinh xanh đi giải cứu công chúa để lấy lại đầm lầy của mình.'),
(27, N'How to Train Your Dragon', N'Animation', 5880, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_8as9pS90mS2S97vYST4SloT2u-8as9pS90mS2S97vYST4SloT2u.jpg', N'Một cậu bé Viking kết bạn với một con rồng thay vì săn đuổi nó.'),
(28, N'Fast & Furious 7', N'Action', 8220, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_8as9pS90mS2S97vYST4SloT2u-8as9pS90mS2S97vYST4SloT2u.jpg', N'Nhóm của Dominic Toretto bị tấn công bởi một sát thủ muốn báo thù cho em trai.'),
(29, N'Doctor Strange', N'Action', 6900, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_7WsyChmYDfzd0tHfunS06ve9TVO-8as9pS90mS2S97vYST4SloT2u.jpg', N'Sau một tai nạn, bác sĩ phẫu thuật thần kinh tìm đến nghệ thuật thần bí để chữa lành.'),
(30, N'Black Panther', N'Action', 8040, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_8as9pS90mS2S97vYST4SloT2u-8as9pS90mS2S97vYST4SloT2u.jpg', N'T''Challa trở về quê hương Wakanda để kế vị ngai vàng và bảo vệ thế giới.'),
(31, N'Wonder Woman', N'Action', 8460, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_8as9pS90mS2S97vYST4SloT2u-8as9pS90mS2S97vYST4SloT2u.jpg', N'Công chúa Diana rời hòn đảo của mình để chiến đấu trong Thế chiến I và khám phá sức mạnh bản thân.'),
(32, N'Bohemian Rhapsody', N'Musical', 8040, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_8as9pS90mS2S97vYST4SloT2u-8as9pS90mS2S97vYST4SloT2u.jpg', N'Phim tiểu sử về ban nhạc Queen và ca sĩ huyền thoại Freddie Mercury.'),
(33, N'A Quiet Place', N'Horror', 5400, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_8as9pS90mS2S97vYST4SloT2u-8as9pS90mS2S97vYST4SloT2u.jpg', N'Một gia đình phải sống trong im lặng để tránh sự săn đuổi của các sinh vật nhạy cảm với âm thanh.'),
(34, N'Blade Runner 2049', N'Sci-Fi', 9840, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_8as9pS90mS2S97vYST4SloT2u-8as9pS90mS2S97vYST4SloT2u.jpg', N'Một cảnh sát phát hiện ra một bí mật có thể gây hỗn loạn xã hội tương lai.'),
(35, N'Inside Out', N'Animation', 5700, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_8as9pS90mS2S97vYST4SloT2u-8as9pS90mS2S97vYST4SloT2u.jpg', N'Các cảm xúc bên trong tâm trí của một cô bé 11 tuổi phải làm việc cùng nhau.'),
(36, N'Moana', N'Animation', 6420, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_8as9pS90mS2S97vYST4SloT2u-8as9pS90mS2S97vYST4SloT2u.jpg', N'Một cô gái trẻ can đảm vượt đại dương để cứu người dân trên đảo của mình.'),
(37, N'Mad Max: Fury Road', N'Action', 7200, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_8as9pS90mS2S97vYST4SloT2u-8as9pS90mS2S97vYST4SloT2u.jpg', N'Trong một thế giới hậu tận thế, Max hỗ trợ một nhóm phụ nữ chạy trốn khỏi một tên bạo chúa.'),
(38, N'Tenet', N'Sci-Fi', 9000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_8as9pS90mS2S97vYST4SloT2u-8as9pS90mS2S97vYST4SloT2u.jpg', N'Một đặc vụ phải sử dụng sự đảo ngược thời gian để ngăn chặn Thế chiến III.'),
(39, N'Top Gun: Maverick', N'Action', 7860, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_8as9pS90mS2S97vYST4SloT2u-8as9pS90mS2S97vYST4SloT2u.jpg', N'Maverick trở lại huấn luyện một thế hệ phi công trẻ cho một nhiệm vụ nguy hiểm.'),
(40, N'Everything Everywhere All at Once', N'Sci-Fi', 8340, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_8as9pS90mS2S97vYST4SloT2u-8as9pS90mS2S97vYST4SloT2u.jpg', N'Một phụ nữ gốc Hoa phải kết nối với các phiên bản khác của chính mình để cứu đa vũ trụ.'),
(41, N'Train to Busan', N'Horror', 7080, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_8as9pS90mS2S97vYST4SloT2u-8as9pS90mS2S97vYST4SloT2u.jpg', N'Những hành khách trên một chuyến tàu cao tốc phải chiến đấu để sống sót trước đại dịch zombie.'),
(42, N'Oldboy', N'Action', 7200, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_8as9pS90mS2S97vYST4SloT2u-8as9pS90mS2S97vYST4SloT2u.jpg', N'Một người đàn ông bị bắt giam 15 năm mà không rõ lý do, sau đó lên kế hoạch trả thù.'),
(43, N'The Wolf of Wall Street', N'Comedy', 10800, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_8as9pS90mS2S97vYST4SloT2u-8as9pS90mS2S97vYST4SloT2u.jpg', N'Dựa trên câu chuyện có thật về sự nghiệp của tay môi giới chứng khoán Jordan Belfort.'),
(44, N'Whiplash', N'Musical', 6420, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_8as9pS90mS2S97vYST4SloT2u-8as9pS90mS2S97vYST4SloT2u.jpg', N'Một tay trống trẻ đầy tham vọng chịu áp lực khắc nghiệt từ một giáo viên dạy nhạc tàn nhẫn.'),
(45, N'Arrival', N'Sci-Fi', 6960, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrSQW1JDyuAwufUN2qHJMWoaTBypJEQmVAaQ&s', N'Một chuyên gia ngôn ngữ học cố gắng giao tiếp với những người ngoài hành tinh vừa hạ cánh xuống Trái Đất.'),
(46, N'Sing', N'Animation', 6480, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwqDw3SHXV87n8NEiB69k2S9KdtjBr8ni4JQ&s', N'Một chú gấu túi tổ chức một cuộc thi ca hát để cứu lấy nhà hát cũ của mình.'),
(47, N'Minions', N'Animation', 5460, 'https://upload.wikimedia.org/wikipedia/vi/3/3d/Minions_poster.jpg', N'Các Minions đi tìm kiếm một chủ nhân mới là kẻ ác nhân nhất thế giới.'),
(48, N'Godzilla vs. Kong', N'Action', 6780, 'https://play-lh.googleusercontent.com/a3yOEm1lYpHlFYfGAKV0E-RT90w9ibf6vyIF3Bs8K_IJV2BmYPaUortb6DWbG9ivBizHjbImXBvFFKnxbg', N'Cuộc đại chiến giữa hai quái vật huyền thoại đe dọa sự tồn vong của thế giới.'),
(49, N'Ratatouille', N'Animation', 6660, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlhNci6Ld86Zbq9FH-hapTLyoeMI-fCZU7pg5ygMqqJ_uB9_jiKfpRArlOhh4TRP-nLJyPL3EEOZR67FlrXCLlt1KwBSfB2sSt2CxOlJUK&s=10', N'Một chú chuột có tài nấu nướng kết hợp với một anh chàng vụng về tại một nhà hàng Pháp.'),
(50, N'Grave of the Fireflies', N'Animation', 5340, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnz3a4cd0__lBgeLORV1WeGdTjVBVB2VPz454L7mVU5NcIAE8IJQhxj5ovMMi9K3XvioaJlfY_pMvZjx4xktoFLH0bvAxwaP23gw44xt4ewQ&s=10', N'Câu chuyện cảm động về hai anh em tìm cách sống sót tại Nhật Bản cuối Thế chiến II.');

-- select * from Movies;


-- MOVIES SCHEDULES --

INSERT INTO MovieSchedules(ScheduleID, MovieID, Showtime, AvailableSeats, TicketPrice)
VALUES 
(1, 1, '2025-01-16 09:00:00', 150, 45000),
(2, 2, '2025-01-17 14:30:00', 85, 50000),
(3, 3, '2025-01-18 19:15:00', 120, 55000),
(4, 4, '2025-01-20 20:00:00', 45, 60000),
(5, 5, '2025-01-22 10:30:00', 200, 65000),
(6, 6, '2025-01-25 13:45:00', 110, 70000),
(7, 7, '2025-01-28 16:00:00', 90, 75000),
(8, 8, '2025-02-01 18:30:00', 75, 80000),
(9, 9, '2025-02-04 21:00:00', 130, 85000),
(10, 10, '2025-02-08 12:15:00', 12, 90000),
(11, 11, '2025-02-12 15:45:00', 160, 95000),
(12, 12, '2025-02-15 22:30:00', 55, 100000),
(13, 13, '2025-02-19 09:30:00', 80, 110000),
(14, 14, '2025-02-22 13:00:00', 105, 120000),
(15, 15, '2025-02-26 17:15:00', 140, 130000),
(16, 16, '2025-03-01 11:00:00', 95, 140000),
(17, 17, '2025-03-05 14:45:00', 0, 150000),
(18, 18, '2025-03-09 19:30:00', 180, 45000),
(19, 19, '2025-03-13 21:15:00', 60, 50000),
(20, 20, '2025-03-17 10:00:00', 115, 55000),
(21, 21, '2025-03-21 13:30:00', 150, 60000),
(22, 22, '2025-03-25 16:45:00', 140, 65000),
(23, 23, '2025-03-29 20:00:00', 125, 70000),
(24, 24, '2025-04-02 12:30:00', 40, 75000),
(25, 25, '2025-04-06 15:15:00', 70, 80000),
(26, 26, '2025-04-10 18:45:00', 110, 85000),
(27, 27, '2025-04-14 22:00:00', 95, 90000),
(28, 28, '2025-04-18 09:15:00', 85, 95000),
(29, 29, '2025-04-22 13:45:00', 130, 100000),
(30, 30, '2025-04-26 17:00:00', 50, 110000),
(31, 31, '2025-04-30 20:30:00', 160, 120000),
(32, 32, '2025-05-04 11:30:00', 105, 130000),
(33, 33, '2025-05-08 15:00:00', 25, 140000),
(34, 34, '2025-05-12 19:15:00', 180, 150000),
(35, 35, '2025-05-16 21:45:00', 200, 45000),
(36, 36, '2025-05-20 10:15:00', 115, 50000),
(37, 37, '2025-05-24 14:00:00', 10, 55000),
(38, 38, '2025-05-28 17:30:00', 80, 60000),
(39, 39, '2025-06-01 20:45:00', 140, 65000),
(40, 40, '2025-06-05 12:00:00', 125, 70000),
(41, 41, '2025-06-09 15:45:00', 60, 75000),
(42, 42, '2025-06-13 18:15:00', 45, 80000),
(43, 43, '2025-06-17 22:30:00', 150, 85000),
(44, 44, '2025-06-21 09:45:00', 170, 90000),
(45, 45, '2025-06-25 13:30:00', 190, 100000),
(46, 46, '2025-06-29 17:15:00', 110, 110000),
(47, 47, '2025-07-03 20:00:00', 95, 120000),
(48, 48, '2025-07-07 11:00:00', 75, 130000),
(49, 49, '2025-07-11 15:30:00', 130, 140000),
(50, 50, '2025-07-15 19:45:00', 20, 150000);

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
INSERT INTO Tickets (TicketID, ScheduleID, CustomerID, TicketStatus, SeatNumber, RoomID, BookingDate)
VALUES
(1, 5, 3, 'booked', 'A01', 5, '2025-01-10 9:00:00'),
(2, 2, 2, 'paid', 'B05', 6, '2025-01-12 9:00:00'),
(3, 10, 2, 'cancelled', 'DO9',7, '2025-01-02 9:00:00'),
(4, 3, 1, 'booked', 'F01', 2, '2024-12-25 9:00:00'),
(5, 7, 5, 'paid', 'Z02',3, '2024-12-05 9:00:00');

-- SELECT * FROM TICKETS;