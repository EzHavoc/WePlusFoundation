import { useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links: Array<[string, string]> = [
    ["Home", "/"],
    ["Get Involved", "/get-involved"],
    ["Donate", "/donate"],
    ["Events", "/events"],
    ["Gallery", "/gallery"],
    ["Testimonials", "/testimonials"],
  ];

  return (
    <nav className="border-4 border-black bg-yellow-300 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl sm:text-2xl font-black">
          <Heart className="h-6 w-6 sm:h-8 sm:w-8" />
          WePlus Foundation
        </Link>

        {/* Hamburger Menu - Mobile */}
        <button
          className="sm:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Nav Links - Desktop */}
        <div className="hidden sm:flex gap-6">
          {links.map(([label, path]) => (
            <Link
              key={path}
              to={path}
              className="text-base font-bold hover:underline"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-3 px-2">
          {links.map(([label, path]) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className="block w-full rounded-md px-3 py-2 text-center text-base font-bold border-2 border-black bg-white hover:bg-black hover:text-white transition"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
