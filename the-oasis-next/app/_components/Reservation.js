import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { auth } from "@/app/_lib/oauth";
import LoginMessage from "@/app/_components/LoginMessage"

async function Reservation({ cabin }) {
  const session = await auth();
  const [settings, bookedDate] = await Promise.all([
    (getSettings(), getBookedDatesByCabinId(cabin.id))
  ]);
  return (
    <div className="grid grid-cols-2 min-h-[400px] border border-primary-800">
      <DateSelector cabin={cabin} bookedDate={bookedDate} settings={settings} />
      {session?.user ? <ReservationForm cabin={cabin} user={session.user}/> : <LoginMessage />}
    </div>
  );
}

export default Reservation;
