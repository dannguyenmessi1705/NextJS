import { getCabin, getCabins } from "@/app/_lib/data-service";

import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

// Tạo metadata cho route động
export async function generateMetadata({ params }) {
  const cabin = await getCabin(params.cabinId);
  const { name } = cabin;
  return {
    title: `Cabin ${name}`,
  };
} // Hàm tạo ra metadata

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return ids;
} // Hàm để tạo ra các static params cho các route động (giúp NextJS tối ưu hiệu suất)

export default async function Page({ params }) {
  const cabinId = params.cabinId;
  const cabin = await getCabin(cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div className="mb-8">
        <h2 className="text-5xl font-semibold text-center">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
      </div>

      <Suspense fallback={<Spinner />}>
        <Reservation cabin={cabin} />
      </Suspense>
    </div>
  );
}
