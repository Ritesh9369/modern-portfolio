import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaGithub,
  FaLinkedin,
  FaBars,
  FaTimes,
} from "react-icons/fa";

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

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-10 text-lg font-medium text-white">
              
              <li>
                <Link
                  to="/"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/skills"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  Skills
                </Link>
              </li>

              <li>
                <Link
                  to="/projects"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  Projects
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  Contact
                </Link>
              </li>

            </ul>

            {/* Desktop Right Side */}
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

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden text-3xl text-cyan-400"
            >
              <FaBars />
            </button>

          </div>

        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      ></div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] sm:w-[350px] bg-slate-950 border-l border-cyan-400/20 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

        {/* Top */}
        <div className="flex items-center justify-between p-5 border-b border-cyan-400/20">
          
          <h1 className="text-2xl font-bold text-cyan-400">
            Menu
          </h1>

          <button
            onClick={() => setIsOpen(false)}
            className="text-3xl text-cyan-400"
          >
            <FaTimes />
          </button>

        </div>

        {/* Menu Links */}
        <ul className="flex flex-col gap-8 p-8 text-xl font-medium text-white">

          <li>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-cyan-400 transition duration-300"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="hover:text-cyan-400 transition duration-300"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              to="/skills"
              onClick={() => setIsOpen(false)}
              className="hover:text-cyan-400 transition duration-300"
            >
              Skills
            </Link>
          </li>

          <li>
            <Link
              to="/projects"
              onClick={() => setIsOpen(false)}
              className="hover:text-cyan-400 transition duration-300"
            >
              Projects
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="hover:text-cyan-400 transition duration-300"
            >
              Contact
            </Link>
          </li>

        </ul>

        {/* Social Icons */}
        <div className="flex items-center gap-6 px-8 mt-10 text-white">

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

export default Navbar;