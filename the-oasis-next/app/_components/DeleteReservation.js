"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    if (confirm("Are you delete this items")) {
      // USE useTransition
      // startTransition(() => deleteReservation(bookingId)); // Nếu xác nhận xóa thì gọi hàm deleteReservation và bắt đầu transition (isPending = true)

      // USE useOptimistic + useTransition
      startTransition(() => onDelete(bookingId)); // Nếu xác nhận xóa thì gọi hàm onDelete và bắt đầu transition (isPending = true) Gọi hàm onDelete truyền vào bookingId để xóa booking khỏi danh sách hiển thị ngay lập tức (UI update ngay lập tức, trong khi đó server sẽ chạy trong nền)
    }
  };
  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
