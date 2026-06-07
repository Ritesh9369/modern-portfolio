import { motion } from "framer-motion";
import homegif from "../../../../../assets/Home_imge/home.gif";

const Hero_Section = () => {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center bg-black">

      {/* Background GIF */}
      <img
        src={homegif}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Gradient Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10"></div>

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-20 text-center max-w-6xl mx-auto">

        {/* Small Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-5 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-md"
        >
          <p className="text-cyan-300 text-sm sm:text-base font-medium tracking-wide">
            Welcome To My Portfolio
          </p>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white font-extrabold leading-tight"
        >
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Modern React
          </span>

          <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Developer Portfolio
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-6 text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Create beautiful, modern and responsive websites using
          React, Tailwind CSS and Framer Motion with smooth animations
          and premium UI design.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="w-full sm:w-auto px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-105">
            Explore More
          </button>

          <button className="w-full sm:w-auto px-8 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
            Contact Me
          </button>
        </motion.div>
      </div>

      {/* Bottom Blur Effect */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default Hero_Section;