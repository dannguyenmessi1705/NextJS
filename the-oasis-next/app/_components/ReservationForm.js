"use client";

import { useReservation } from "./ReservationContext";
import { differenceInDays } from "date-fns";

import { createReservation } from "../_lib/serverAction";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  // CONTEXT PROVIDER (only Client Component)
  const { range, resetRange } = useReservation();
  // CHANGE
  const { maxCapacity, regularPrice, discount, id } = cabin;
  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const createReservationWithData = createReservation.bind(null, {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  }); // Tạo 1 hàm mới từ hàm createReservation, với giá trị đầu vào là {startDate, endDate, numNights, cabinPrice, cabinId}, đây là giá trị truyền vào ở bên ngoài form qua hàm bind (createReservation.bind(null, bookingData)), trong đó null thể hiện không tham chiếu đến đối tượng nào, bookingData = bookingData

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createReservationWithData(formData); // Thực hiện hàm createReservationWithData với giá trị formData truyền vào
          resetRange(); // Reset lại range (from, to) về giá trị ban đầu
        }} // action với 2 lệnh thực hiện, nên sẽ khai báo như này
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!startDate || !endDate ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton labelPending="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
