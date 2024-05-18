import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png"; // Phương pháp nhập tĩnh file cho Image

export const metadata = {
  title: "The Wild Oasis",
};

export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        alt="Mountains and forests with two cabins"
        placeholder="blur" // Tạo hiệu ứng mờ khi tải ảnh
        fill // Làm cho ảnh tràn màn hình (giống set image-background)
        className="object-cover object-top"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
