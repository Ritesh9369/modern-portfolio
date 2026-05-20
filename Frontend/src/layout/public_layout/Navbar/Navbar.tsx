import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaBars } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-slate-950/80 border-b border-cyan-400/20 shadow-lg">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/">
            <h1 className="text-3xl font-extrabold tracking-wide text-cyan-400 hover:scale-105 transition duration-300">
              MyPortfolio
            </h1>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10 text-lg font-medium">

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

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-5">

            {/* Social Icons */}
            <a
              href="https://github.com/"
              target="_blank"
              className="text-2xl hover:text-cyan-400 transition duration-300 hover:scale-110"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              className="text-2xl hover:text-cyan-400 transition duration-300 hover:scale-110"
            >
              <FaLinkedin />
            </a>

            {/* Hire Me Button */}
            <button className="bg-cyan-400 hover:bg-cyan-300 text-black font-semibold px-5 py-2 rounded-xl transition duration-300 shadow-lg hover:scale-105">
              Hire Me
            </button>

          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden text-3xl text-cyan-400 cursor-pointer">
            <FaBars />
          </div>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;