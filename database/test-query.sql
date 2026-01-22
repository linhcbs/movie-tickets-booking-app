use cinema_booking_system;

select * from Movies;

drop database cinema_booking_system;

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
WHERE t.CustomerID = 1; 

select * from Tickets;