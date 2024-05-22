import NextAuth from "next-auth"; // Import NextAuth
import Google from "next-auth/providers/google"; // Import Google provider
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    }, // Khai báo 1 trình middleware xác thực người dùng
    async signIn({ user, account, profile }) {
      try {
        const existingGuess = await getGuest(user.email); // Kiểm tra xem người dùng đã tồn tại trong database chưa

        if (!existingGuess) {
          await createGuest({
            email: user.email,
            fullName: user.name,
          }); // Lấy session của user có các mục properties này khi đăng nhập thành công
        } // Nếu chưa tồn tại thì tạo mới
        return true; // Trả về true nếu tất cả các bước trên đều thực hiện thành công
      } catch {
        return false;
      }
    }, // Middleware sẽ được chạy sau khi thực hiện hàm signIn
    async session({ session, user }) {
      const guest = await getGuest(session.user.email); // Lấy thông tin user từ database
      session.user.id = guest.id; // Gán id của user vào session
      return session; // Trả về session đã được gán id
    }, // Middleware sẽ được chạy sau khi đằng nhập, dùng để gán id của user từ database vào session, do oauth không cung cấp id
  }, // Khai báo các đối tượng được gọi callback
  pages: {
    signIn: "/login", // Khai báo custom route sẽ thực hiện chức năng đăng nhập
  }, // Khai báo custom route
}; // Khai báo cấu hình cho NextAuth với Google provider (khi làm vào /api/auth/providers để xem tuỳ chỉnh)

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig); // export các hàm cần thiết từ NextAuth
