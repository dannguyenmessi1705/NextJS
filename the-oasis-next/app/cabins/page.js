import { Suspense } from "react";
import CabinList from "@/app/_components/CabinList";
import Loading from "@/app/cabins/loading";
import Filter from "@/app/_components/Filter";
import ReservationReminder from "@/app/_components/ReservationReminder";
export const metadata = {
  title: "Cabin",
};

export default async function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all"; // Lấy giá trị capacity từ searchParams, nếu không có thì gán mặc định là "all" (chỉ component này mới sử dụng được searchParams)
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature's beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>
      {/* Dùng Suspense  giúp chúng ta tạm dừng việc render component con cho đến khi điều kiện nào đó được thỏa mãn. Điều này giúp chúng ta tối ưu hóa việc render component và giảm thiểu việc tải dữ liệu không cần thiết. */}
      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      <Suspense fallback={<Loading />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
