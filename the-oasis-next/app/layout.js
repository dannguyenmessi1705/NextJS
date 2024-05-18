import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import "@/app/_styles/globals.css";
export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "The Wild Oasis",
  },
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-primary-950 text-primary-100">
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>The Copyright by Di Dan</footer>
      </body>
    </html>
  );
}
