"use client";
import { useFormStatus } from "react-dom";
export default function SubmitButton({ labelPending, children }) {
  const { pending } = useFormStatus(); // Lấy ra trạng thái của thẻ form
  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? labelPending : children}
    </button>
  );
} // Tạo component chứa useFormStatus để đưa vào form
