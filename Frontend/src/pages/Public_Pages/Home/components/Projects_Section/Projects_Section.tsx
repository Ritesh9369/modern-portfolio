import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FiFolder, FiExternalLink, FiGithub, FiTerminal, FiCpu, FiZap } from "react-icons/fi";

// -------------------------------------------------------------
// Projects Data
// -------------------------------------------------------------
const projectsData = [
  {
    title: "EV Charging Station Web App",
    desc: "A comprehensive digital platform for locating, managing, and booking EV charging slots in real-time with an intuitive mapping interface.",
    tech: ["React.js", "Node.js", "MySQL", "Leaflet", "OpenStreetMap", "Maps API"],
    github: "#",
    live: "#",
    color: "from-green-400 to-emerald-600",
    accentColor: "#34d399",
    glowColor: "rgba(52,211,153,0.15)",
    id: "01",
  },
  {
    title: "Employee Management Dashboard",
    desc: "A centralized administrative portal to streamline HR operations, track attendance, and manage employee records efficiently.",
    tech: ["React.js", "Bootstrap", "MySQL", "Node.js", "JWT"],
    github: "#",
    live: "#",
    color: "from-blue-400 to-cyan-600",
    accentColor: "#38bdf8",
    glowColor: "rgba(56,189,248,0.15)",
    id: "02",
  },
  {
    title: "Real-Time Face Verification System",
    desc: "A robust web-based face detection and recognition system for instant user verification using deep learning models.",
    tech: ["Python", "Flask", "DeepFace & OpenCV", "MySQL", "NumPy"],
    github: "#",
    live: "#",
    color: "from-purple-400 to-pink-600",
    accentColor: "#c084fc",
    glowColor: "rgba(192,132,252,0.15)",
    id: "03",
  },
  {
    title: "Visitor Management System",
    desc: "Secure and automated visitor tracking platform featuring digital check-ins, instant notifications, and detailed analytics.",
    tech: ["MERN Stack", "Socket.io", "JWT"],
    github: "#",
    live: "#",
    color: "from-orange-400 to-red-600",
    accentColor: "#fb923c",
    glowColor: "rgba(251,146,60,0.15)",
    id: "04",
  },
  {
    title: "Trimode Frontend Application",
    desc: "A deployed, highly responsive web application showcasing modern frontend architecture, dynamic rendering, and seamless user experiences.",
    tech: ["React.js", "Tailwind CSS", "Vercel"],
    github: "#",
    live: "https://trimode-frontend.vercel.app",
    color: "from-cyan-400 to-blue-600",
    accentColor: "#22d3ee",
    glowColor: "rgba(34,211,238,0.15)",
    id: "05",
  },
];

// -------------------------------------------------------------
// Magnetic Tilt Card
// -------------------------------------------------------------
const MagneticCard = ({
  project,
  index,
}: {
  project: (typeof projectsData)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glowX = useTransform(rawX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(rawY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.92, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      style={{ perspective: 1000 }}
      className="relative"
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group relative bg-[#070d1a] border border-slate-800/80 rounded-2xl p-7 flex flex-col h-full overflow-hidden cursor-crosshair will-change-transform"
      >
        {/* Dynamic Glow Follow */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none z-0 rounded-2xl"
              style={{
                background: `radial-gradient(400px circle at ${glowX.get()}% ${glowY.get()}%, ${project.glowColor}, transparent 70%)`,
              }}
            />
          )}
        </AnimatePresence>

        {/* Sweep shine */}
        <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:animate-[sweep_1.4s_ease-in-out]  pointer-events-none" />

        {/* Top accent bar */}
        <div
          className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100 transition-all duration-500`}
        />

        {/* Corner project number */}
        <span
          className="absolute top-5 right-6 text-[52px] font-black leading-none select-none pointer-events-none z-0 transition-opacity duration-300 opacity-[0.04] group-hover:opacity-[0.07]"
          style={{ color: project.accentColor, fontFamily: "'Fira Code', monospace" }}
        >
          {project.id}
        </span>

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between mb-6">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="p-3 rounded-xl border border-slate-800 transition-all duration-300 group-hover:border-opacity-60"
            style={{ background: `${project.glowColor}`, borderColor: `${project.accentColor}30` }}
          >
            <FiFolder className="text-2xl" style={{ color: project.accentColor }} />
          </motion.div>

          <div className="flex gap-3 items-center text-slate-500">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, color: project.accentColor }}
              className="transition-colors duration-200"
            >
              <FiGithub className="text-xl" />
            </motion.a>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, color: project.accentColor }}
              className="transition-colors duration-200"
            >
              <FiExternalLink className="text-xl" />
            </motion.a>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-grow">
          <h3 className="text-xl font-bold text-slate-100 mb-3 leading-snug tracking-tight transition-colors duration-300 group-hover:text-white">
            {project.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed font-sans mb-6 group-hover:text-slate-400 transition-colors duration-300">
            {project.desc}
          </p>
        </div>

        {/* Tech stack */}
        <div className="relative z-10 mt-auto pt-5 border-t border-slate-800/60">
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 + i * 0.04 }}
                className="text-[10px] font-semibold tracking-widest px-2.5 py-1 rounded-md border border-slate-800 bg-[#050b14] uppercase"
                style={{ color: project.accentColor }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

// -------------------------------------------------------------
// Animated Counter
// -------------------------------------------------------------
const Counter = ({ to, label }: { to: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const duration = 1800;
    const fps = 60;
    const totalFrames = (fps * duration) / 1000;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));
      if (frame >= totalFrames) clearInterval(timer);
    }, 1000 / fps);
    return () => clearInterval(timer);
  }, [started, to]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-black text-white tabular-nums" style={{ fontFamily: "'Fira Code', monospace" }}>
        {count}<span className="text-cyan-400">+</span>
      </div>
      <div className="text-xs tracking-widest uppercase text-slate-500 mt-1 font-sans">{label}</div>
    </div>
  );
};

// -------------------------------------------------------------
// Main Component
// -------------------------------------------------------------
const Projects_Section = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  return (
    <section
      id="projects"
      className="relative w-full py-32 bg-[#020617] overflow-hidden"
      style={{ fontFamily: "'Fira Code', monospace" }}
    >

      {/* Grid BG */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d408_1px,transparent_1px),linear-gradient(to_bottom,#06b6d408_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* Ambient orbs */}
      <div className="absolute top-[-100px] left-[-150px] w-[600px] h-[600px] bg-cyan-700/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-150px] w-[500px] h-[500px] bg-indigo-800/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[10px] tracking-[0.25em] uppercase font-semibold mb-6"
          >
            <FiCpu className="text-xs" />
            System Architecture
            <FiZap className="text-xs animate-pulse" />
          </motion.div>

          <div className="flex flex-col gap-2">
            <div className="flex items-end gap-4 flex-wrap">
              <FiTerminal className="text-cyan-400 text-3xl shrink-0 mb-1" />
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase leading-none">
                Deployed{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">
                  Systems
                </span>
              </h2>
            </div>

            <div className="flex items-start gap-4 mt-4 max-w-2xl">
              <div className="w-[2px] h-14 bg-gradient-to-b from-cyan-500 to-transparent shrink-0 mt-1" />
              <p className="text-slate-400 text-sm md:text-base font-sans leading-relaxed">
                A curated list of my technical projects, demonstrating expertise in full-stack
                development, complex system architecture, and modern UI/UX design.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Stats Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center justify-start gap-12 mb-20 pl-2 border-l border-slate-800"
        >
          <Counter to={5} label="Projects" />
          <div className="w-px h-10 bg-slate-800" />
          <Counter to={12} label="Technologies" />
          <div className="w-px h-10 bg-slate-800" />
          <Counter to={3} label="Deployed" />
        </motion.div>

        {/* ── Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projectsData.map((project, index) => (
            <MagneticCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* ── CTA Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-24 flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative px-12 py-4 text-sm font-bold tracking-[0.25em] uppercase text-slate-300 border border-slate-700 rounded-none overflow-hidden group transition-colors duration-300 hover:text-cyan-400 hover:border-cyan-500/50"
          >
            {/* Animated underline sweep */}
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-blue-900/20 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Load More Systems</span>
          </motion.button>
        </motion.div>

      </div>

      <style>{`
        @keyframes sweep {
          0%   { transform: translateX(-200%) skewX(-15deg); opacity: 0; }
          40%  { opacity: 1; }
          100% { transform: translateX(500%) skewX(-15deg); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Projects_Section;