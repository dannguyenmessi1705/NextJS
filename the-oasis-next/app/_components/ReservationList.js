"use client";
import { useOptimistic } from "react"; // Sử dụng hook useOptimistic
import { deleteReservation } from "../_lib/serverAction";
import ReservationCard from "./ReservationCard";

function ReservationList({ bookings }) {
  const [optimisticState, setOptimistic] = useOptimistic(
    bookings, // Lấy giá trị sẽ thực hiện useOptimistic
    (currentBookings, bookingId) => {
      // currentBookings: danh sách booking hiện tại, bookingId: id của booking cần xóa (giá trị truyền vào setOptimistic)
      return currentBookings.filter((booking) => booking.id !== bookingId);
    } // Xử lý việc xóa booking khỏi danh sách (hiển thị ngay lập tức UI update, trong khi đó server sẽ chạy trong nền)
  ); // Sử dụng hook useOptimistic để xử lý việc xóa booking khỏi danh sách (hiển thị ngay lập tức UI update, trong khi đó server sẽ chạy trong nền)

  async function handleDeleteReservation(bookingId) {
    // Xử lý việc xóa booking ở UI truyền vào setOptimistic, sau đó sẽ chạy server
    setOptimistic(bookingId); // Xóa booking khỏi danh sách hiển thị ngay lập tức
    await deleteReservation(bookingId); // Xóa booking ở server
  }
  return (
    <ul className="space-y-6">
      {optimisticState.map((booking) => ( // thay bookings bằng optimisticState (vì optimisticState sẽ bằng giá trị sau khi thực hiện setOptimistic, còn bookings chỉ thay đổi khi server trả về kết quả)
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDeleteReservation}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
