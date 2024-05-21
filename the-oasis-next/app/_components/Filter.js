"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams(); // Lấy searchParams từ hook useSearchParams của next/navigation
  const selected = searchParams.get("capacity") ?? "all"; // Lấy giá trị capacity từ searchParams, nếu không có thì gán mặc định là "all"
  const router = useRouter(); // Lấy router từ hook useRouter của next/router dùng để thay đổi URL trình duyệt mà không cần load lại trang
  const pathName = usePathname(); // Lấy pathName từ hook usePathname của next/navigation (VD: /cabins/price)
  const handleSelect = (filter) => {
    const newSearchParams = new URLSearchParams(searchParams); // Tạo một URLSearchParams mới từ searchParams (nextjs)
    newSearchParams.set("capacity", filter); // Set giá trị capacity trong searchParams bằng filter
    router.replace(`${pathName}?${newSearchParams.toString()}`, {
      scroll: false,
    }); // Thay đổi URL trình duyệt với pathName và searchParams mới, thêm thuộc tính scroll: false để không cuộn lên đầu trang
  };
  return (
    <div className="flex border border-primary-800 rounded-lg">
      <Button onClick={() => handleSelect("all")} selected={selected} activeSelect="all">All</Button>
      <Button onClick={() => handleSelect("small")} selected={selected} activeSelect="small">Small</Button>
      <Button onClick={() => handleSelect("medium")} selected={selected} activeSelect="medium">Medium</Button>
      <Button onClick={() => handleSelect("large")} selected={selected} activeSelect="large">Large</Button>
    </div>
  );
}

function Button({ children, selected, onClick, activeSelect }) {
  return (
    <button
      onClick={onClick}
      className={` text-primary-200 px-6 py-2 rounded-lg hover:bg-accent-500 transition-all ${
        selected === activeSelect ? "bg-accent-500" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Filter;
