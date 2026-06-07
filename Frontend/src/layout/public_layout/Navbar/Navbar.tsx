// src/components/Navbar/Navbar.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import DesktopNav from "./components/DesktopNav/DesktopNav";
import MobileNav from "./components/MobileNav/MobileNav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-cyan-400/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-cyan-400 hover:scale-105 transition duration-300">
                MyPortfolio
              </h1>
            </Link>

            {/* Desktop View (Will hide on mobile automatically) */}
            <DesktopNav />

            {/* Hamburger Button (Will hide on desktop automatically) */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden text-3xl text-cyan-400 hover:scale-110 transition-transform"
            >
              <FaBars />
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile View Sidebar (Handles its own visibility state) */}
      <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Navbar;