export default function Footer() {
  return (
    <footer className="border-t border-[#333] py-8 text-center text-gray-500 text-sm bg-[#121212]">
      <p>© {new Date().getFullYear()} FitLog. All rights reserved.</p>
    </footer>
  );
}
