import RevealText from "./RevealText";
export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-2 border-t border-line bg-[#E8E3D8] px-6 py-8 text-center text-xs text-[#111111]">
      <span>© {new Date().getFullYear()} M-Studios. All rights reserved.</span>
      <span>Cairo, Egypt</span>
    </footer>
  );
}