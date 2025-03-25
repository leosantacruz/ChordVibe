import Link from "next/link";
const Nav = () => {
  return (
    <nav className="fixed z-50 w-full text-white top-0 ">
      <div className="flex gap-10 p-4 backdrop-blur-md">
        <div>
          {/* I still don't know the name! */}
          <strong>Piano Next</strong>
        </div>

        <Link href="/">Play</Link>
        <Link href="/collection">Collection</Link>
      </div>
      <div className="bg-white opacity-10 h-[1px]"></div>
    </nav>
  );
};

export default Nav;
