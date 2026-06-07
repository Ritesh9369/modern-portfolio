// src/components/Navbar/DesktopNav.tsx
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { NAV_LINKS } from "../navLinks/navLinks";

const DesktopNav = () => {
  return (
    <>
      {/* Menu Links */}
      <ul className="hidden md:flex items-center gap-10 text-lg font-medium text-white">
        {NAV_LINKS.map((link, index) => (
          <li key={index}>
            <Link
              to={link.path}
              className="hover:text-cyan-400 transition duration-300"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Social Icons & Button */}
      <div className="hidden md:flex items-center gap-5 text-white">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="text-2xl hover:text-cyan-400 hover:scale-110 transition duration-300"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/"
          target="_blank"
          rel="noreferrer"
          className="text-2xl hover:text-cyan-400 hover:scale-110 transition duration-300"
        >
          <FaLinkedin />
        </a>
        <button className="bg-cyan-400 hover:bg-cyan-300 text-black font-semibold px-5 py-2 rounded-xl transition duration-300 shadow-lg hover:scale-105">
          Hire Me
        </button>
      </div>
    </>
  );
};

export default DesktopNav;