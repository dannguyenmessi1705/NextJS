"use server"; // Báo cho NextJS biết file naỳ chỉ gọi và chạy trên server (không lộ cho client)
import { signIn, signOut } from "./oauth";
import { supabase } from "./supabase";
import { auth } from "./oauth";

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
}
