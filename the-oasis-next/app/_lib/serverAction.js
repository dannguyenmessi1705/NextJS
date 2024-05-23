"use server"; // Báo cho NextJS biết file naỳ chỉ gọi và chạy trên server (không lộ cho client)
import { signIn, signOut } from "./oauth";
import { supabase } from "./supabase";
import { auth } from "./oauth";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  return signIn("google", {
    redirectTo: "/account",
  });
}

export async function signOutAction() {
  return signOut({
    redirectTo: "/",
  });
}

// Update Profile
export async function updateGuestProfile(formData) {
  // Luôn luôn phải xác minh uỷ quyền rồi mới thực hiện thay đổi vào db
  const session = await auth();
  if (!session?.user) throw new Error("Not Authorized");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const updateData = { nationalID, nationality, countryFlag };
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.id);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/acsount/profile"); // Revalidate lại trang profile (xoá cache cũ để render lại UI)
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session?.user) throw new Error("Not Authorized");

  const bookings = await getBookings(session.user.id);
  const bookingIds = bookings.map((booking) => booking.id);

  if (!bookingIds.includes(bookingId)) throw new Error("Not Authorized");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations"); // Revalidate lại trang reservations (xoá cache cũ để render lại UI)
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));

  const session = await auth();
  if (!session?.user) throw new Error("Not Authorized");

  const bookings = await getBookings(session.user.id);
  const bookingIds = bookings.map((booking) => booking.id);

  if (!bookingIds.includes(bookingId)) throw new Error("Not Authorized");

  const updateData = {
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations"),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${bookingId}`); // Revalidate lại trang edit reservation (xoá cache cũ để render lại UI)
  revalidatePath(`/account/reservations`); // Revalidate lại trang reservations (xoá cache cũ để render lại UI)

  redirect("/account/reservations"); // Redirect về trang reservations
}

export async function createReservation(bookingData, formData) {
  // bookingData chính là giá trị truyền vào ở bên ngoài form qua hàm bind (createReservation.bind(null, bookingData)), trong đó null thể hiện không tham chiếu đến đối tượng nào, bookingData = bookingData
  // formData chính là giá trị của form khi submit
  const session = await auth();
  if (!session?.user) throw new Error("Not Authorized");

  const newBooking = {
    ...bookingData,
    guestId: session.user.id,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`); // Revalidate lại trang reservations (xoá cache cũ để render lại UI)

  redirect("/cabins/thankyou");
}
