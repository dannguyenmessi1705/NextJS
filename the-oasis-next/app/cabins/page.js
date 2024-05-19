import { Suspense } from "react";
import CabinList from "@/app/_components/CabinList";
import Loading from "@/app/cabins/loading"
export const metadata = {
  title: "Cabin",
};

export default async function Page() {
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
      {/* Dùng Suspense  giúp chúng ta tạm dừng việc render component con cho đến khi điều kiện nào đó được thỏa mãn. Điều này giúp chúng ta tối ưu hóa việc render component và giảm thiểu việc tải dữ liệu không cần thiết. */ }
      <Suspense fallback={<Loading />}>
        <CabinList />
      </Suspense>
    </div>
  );
}
