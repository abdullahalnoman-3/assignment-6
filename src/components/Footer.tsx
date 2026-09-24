import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#333] py-6 px-4 sm:px-6 bg-[#121212] flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
      <Link href="/" className="flex items-center gap-2 text-white font-oswald text-xl font-bold uppercase tracking-wider">
        <Image src="/logo.png" alt="FitLog Logo" width={24} height={24} className="object-contain" />
        FitLog
      </Link>
      <p className="text-gray-500 text-sm text-center sm:text-right">
        © {new Date().getFullYear()} FitLog — Workout Library. Train hard, log honest.
      </p>
    </footer>
  );
}
