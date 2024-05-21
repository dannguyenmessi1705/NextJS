import NextAuth from "next-auth"; // Import NextAuth
import Google from "next-auth/providers/google"; // Import Google provider

const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    authorized({auth, request}) {
      console.log(auth, request)
      return !!auth?.user
    } // Khai báo 1 trình middleware xác thực người dùng
  } // Khai báo các đối tượng được gọi callback
}; // Khai báo cấu hình cho NextAuth với Google provider

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig); // export các hàm cần thiết từ NextAuth
