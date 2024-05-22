"use server"; // Báo cho NextJS biết file naỳ chỉ gọi và chạy trên server (không lộ cho client)
import { signIn, signOut } from "./oauth";

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
