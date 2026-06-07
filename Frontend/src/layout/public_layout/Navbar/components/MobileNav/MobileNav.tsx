// src/components/Navbar/MobileNav.tsx
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTimes } from "react-icons/fa";
import { NAV_LINKS } from "../navLinks/navLinks";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNav = ({ isOpen, setIsOpen }: MobileNavProps) => {
  return (
    <>
      {/* Overlay - md:hidden ensures it only works on small screens */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] sm:w-[350px] bg-slate-950 border-l border-cyan-400/20 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-cyan-400/20">
          <h1 className="text-2xl font-bold text-cyan-400">Menu</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="text-3xl text-cyan-400 hover:scale-110 transition-transform"
          >
            <FaTimes />
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-8 p-8 text-xl font-medium text-white">
          {NAV_LINKS.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="hover:text-cyan-400 transition duration-300 block w-full"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="flex items-center gap-6 px-8 mt-4 text-white">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="text-3xl hover:text-cyan-400 transition duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="text-3xl hover:text-cyan-400 transition duration-300"
          >
            <FaLinkedin />
          </a>
        </div>

        {/* Button */}
        <div className="px-8 mt-10">
          <button className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-3 rounded-xl transition duration-300 shadow-lg">
            Hire Me
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileNav;