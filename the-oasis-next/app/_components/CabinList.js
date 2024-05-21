import { getCabins } from "@/app/_lib/data-service";
import CabinCard from "@/app/_components/CabinCard";

async function CabinList({ filter }) {
  // CHANGE
  const cabins = await getCabins();
  if (!cabins.length) return null;
  let filterCabins;
  if (filter === "all") {
    filterCabins = cabins;
  } else if (filter === "small") {
    filterCabins = cabins.filter((cabin) => cabin.maxCapacity <= 2);
  } else if (filter === "medium") {
    filterCabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 2 && cabin.maxCapacity <= 4
    );
  } else if (filter === "large") {
    filterCabins = cabins.filter((cabin) => cabin.maxCapacity > 4);
  }
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filterCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
