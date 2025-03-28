import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";

const Nav = () => {
  return (
    <nav className="fixed z-50 w-full text-white top-0 ">
      <div className="flex p-4 backdrop-blur-md items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/">
            <Image src="/images/logo.webp" width={150} height={"100"}></Image>
          </Link>
          <Link href="/">Play</Link>
          <Link href="/collection">Collection</Link>
        </div>
        <Link
          href="https://github.com/leosantacruz/ChordVibe"
          target="_blank"
          className="flex items-center gap-3"
        >
          <Github /> See on GitHub
        </Link>
      </div>
      <div className="bg-white opacity-10 h-[1px]"></div>
    </nav>
  );
};

export default Nav;
