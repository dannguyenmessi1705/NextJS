import Link from "next/link";
import { auth } from "@/app/_lib/oauth";

export default async function Navigation() {
  const session = await auth(); // Lấy ra thông tin user đã đăng nhập qua Oauth của AuthJS
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex justify-center gap-4 items-center"
            >
              {session.user?.image && (
                <img
                  src={session.user.image}
                  className="h-8 rounded-full"
                  alt="Avatar"
                />
              )}
              {session.user.name}
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
