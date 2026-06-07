import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Icons
import { FaReact, FaNodeJs, FaBootstrap, FaGithub } from "react-icons/fa";
import { SiTypescript, SiJavascript, SiExpress, SiMongodb, SiMysql, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { FiCpu, FiCode, FiZap, FiLayers } from "react-icons/fi";

// -------------------------------------------------------------
// Skills Data
// -------------------------------------------------------------
const skillsData = [
  {
    name: "React.js",
    desc: "Dynamic, interactive UI components with seamless state management.",
    icon: FaReact,
    color: "#61DAFB",
    level: 90,
    category: "Frontend",
  },
  {
    name: "Node.js",
    desc: "Scalable backend services and REST APIs via event-driven runtime.",
    icon: FaNodeJs,
    color: "#339933",
    level: 82,
    category: "Backend",
  },
  {
    name: "TypeScript",
    desc: "Strongly typed, bug-free enterprise-grade JavaScript code.",
    icon: SiTypescript,
    color: "#3178C6",
    level: 78,
    category: "Language",
  },
  {
    name: "JavaScript",
    desc: "Core scripting for dynamic web interactions and robust logic.",
    icon: SiJavascript,
    color: "#F7DF1E",
    level: 92,
    category: "Language",
  },
  {
    name: "Express.js",
    desc: "Fast, unopinionated web framework for Node.js server routing.",
    icon: SiExpress,
    color: "#ffffff",
    level: 80,
    category: "Backend",
  },
  {
    name: "MongoDB",
    desc: "NoSQL database for flexible, high-performance data storage.",
    icon: SiMongodb,
    color: "#47A248",
    level: 75,
    category: "Database",
  },
  {
    name: "MySQL",
    desc: "Relational DBMS for structured data and complex queries.",
    icon: SiMysql,
    color: "#4479A1",
    level: 77,
    category: "Database",
  },
  {
    name: "Next.js",
    desc: "React framework for SSR, SSG, and production-grade SEO.",
    icon: SiNextdotjs,
    color: "#ffffff",
    level: 70,
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    desc: "Utility-first CSS for rapid UI styling and responsive design.",
    icon: SiTailwindcss,
    color: "#06B6D4",
    level: 95,
    category: "Frontend",
  },
  {
    name: "Git & GitHub",
    desc: "Version control and seamless team collaboration workflow.",
    icon: FaGithub,
    color: "#ffffff",
    level: 88,
    category: "Tools",
  },
  {
    name: "Bootstrap",
    desc: "Classic responsive CSS framework with pre-built components.",
    icon: FaBootstrap,
    color: "#7952B3",
    level: 85,
    category: "Frontend",
  },
  {
    name: "RESTful APIs",
    desc: "Designing and consuming standard backend data services.",
    icon: TbApi,
    color: "#00f0ff",
    level: 87,
    category: "Backend",
  },
];

const CATEGORIES = ["All", "Frontend", "Backend", "Database", "Language", "Tools"];

const categoryColors: Record<string, string> = {
  Frontend: "#61DAFB",
  Backend: "#339933",
  Database: "#F59E0B",
  Language: "#F7DF1E",
  Tools: "#c084fc",
  All: "#22d3ee",
};

// -------------------------------------------------------------
// Animated Skill Progress Bar
// -------------------------------------------------------------
const SkillBar = ({ level, color }: { level: number; color: string }) => {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-4 relative z-10">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] tracking-widest uppercase text-slate-500 font-semibold">Proficiency</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: started ? 1 : 0 }}
          transition={{ delay: 0.4 }}
          className="text-[11px] font-bold tabular-nums"
          style={{ color }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-[3px] w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: started ? `${level}%` : 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
        >
          {/* Glowing tip */}
          <span
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full blur-[3px]"
            style={{ background: color }}
          />
        </motion.div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Single Skill Card with 3D Tilt
// -------------------------------------------------------------
const SkillCard = ({ skill, index }: { skill: (typeof skillsData)[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [7, -7]), { stiffness: 280, damping: 28 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-7, 7]), { stiffness: 280, damping: 28 });

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
    hidden: { opacity: 0, y: 50, scale: 0.88, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 130,
        damping: 18,
        delay: index * 0.07,
      },
    },
    exit: { opacity: 0, scale: 0.88, y: 20, filter: "blur(4px)", transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group relative bg-[#070d1a] border border-slate-800/70 rounded-2xl p-6 flex flex-col overflow-hidden cursor-crosshair will-change-transform h-full"
      >
        {/* Glow BG */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-2xl pointer-events-none z-0"
              style={{
                background: `radial-gradient(260px circle at 50% 0%, ${skill.color}18, transparent 70%)`,
              }}
            />
          )}
        </AnimatePresence>

        {/* Top accent line (expands on hover) */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] rounded-t-2xl"
          initial={{ width: "0%" }}
          animate={{ width: hovered ? "100%" : "0%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }}
        />

        {/* Sweep shine */}
        <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:animate-[skillsweep_1.2s_ease-in-out] pointer-events-none" />

        {/* Category badge */}
        <span
          className="absolute top-4 right-4 text-[9px] tracking-[0.2em] uppercase font-bold px-2 py-0.5 rounded-full border z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            color: categoryColors[skill.category] || "#22d3ee",
            borderColor: `${categoryColors[skill.category] || "#22d3ee"}40`,
            background: `${categoryColors[skill.category] || "#22d3ee"}10`,
          }}
        >
          {skill.category}
        </span>

        {/* Icon */}
        <div className="relative z-10 mb-5">
          <motion.div
            animate={hovered ? { scale: 1.12, rotate: 6 } : { scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-4xl sm:text-5xl drop-shadow-lg"
            style={{ color: skill.color }}
          >
            <skill.icon />
          </motion.div>
          {/* Icon halo */}
          <div
            className="absolute inset-0 rounded-full blur-2xl scale-150 transition-opacity duration-500 pointer-events-none"
            style={{
              background: skill.color,
              opacity: hovered ? 0.18 : 0,
            }}
          />
        </div>

        {/* Text */}
        <h3
          className="text-lg font-bold text-slate-100 mb-2 tracking-wide z-10 relative transition-colors duration-300"
          style={{ color: hovered ? skill.color : undefined }}
        >
          {skill.name}
        </h3>
        <p className="text-slate-500 text-xs leading-relaxed font-sans z-10 relative group-hover:text-slate-300 transition-colors duration-300 flex-grow">
          {skill.desc}
        </p>

        {/* Skill Bar */}
        <SkillBar level={skill.level} color={skill.color} />
      </motion.div>
    </motion.div>
  );
};

// -------------------------------------------------------------
// Main Component
// -------------------------------------------------------------
const Skills_Section = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((s) => s.category === activeCategory);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
  };

  return (
    <section
      id="skills"
      className="relative w-full py-32 bg-[#020617] overflow-hidden"
      style={{ fontFamily: "'Fira Code', monospace" }}
    >
      {/* Animated ambient orbs */}
      <motion.div
        animate={{ y: [0, -60, 0], x: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 70, 0], x: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-700/10 rounded-full blur-[180px] pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-800/8 rounded-full blur-[140px] pointer-events-none"
      />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d406_1px,transparent_1px),linear-gradient(to_bottom,#06b6d406_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center mb-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-cyan-500/25 bg-cyan-500/5 backdrop-blur-md mb-6 shadow-[0_0_25px_rgba(6,182,212,0.08)]"
          >
            <FiCpu className="text-cyan-400 text-sm animate-pulse" />
            <span className="text-cyan-300 font-bold tracking-[0.25em] uppercase text-xs">
              System.Abilities
            </span>
            <FiZap className="text-cyan-400 text-sm animate-pulse" />
          </motion.div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase leading-none mb-5">
            Core{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              Arsenal
            </span>
          </h2>

          <p className="text-slate-500 text-sm md:text-base font-sans max-w-xl leading-relaxed">
            The technologies I use to architect, build, and ship production-grade systems.
          </p>
        </motion.div>

        {/* ── Filter Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const catColor = categoryColors[cat] || "#22d3ee";
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-4 py-2 text-[11px] tracking-[0.2em] uppercase font-bold rounded-lg border transition-all duration-300 overflow-hidden"
                style={{
                  borderColor: isActive ? catColor : "rgba(100,116,139,0.3)",
                  color: isActive ? catColor : "#64748b",
                  background: isActive ? `${catColor}12` : "transparent",
                  boxShadow: isActive ? `0 0 18px ${catColor}25` : "none",
                }}
              >
                {/* Active indicator line */}
                {isActive && (
                  <motion.span
                    layoutId="activeCatBar"
                    className="absolute bottom-0 left-0 w-full h-[2px]"
                    style={{ background: catColor }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {cat === "All" && <FiLayers className="text-xs" />}
                  {cat === "Frontend" && <FaReact className="text-xs" />}
                  {cat === "Backend" && <FiCode className="text-xs" />}
                  {cat === "Database" && <SiMongodb className="text-xs" />}
                  {cat === "Language" && <SiJavascript className="text-xs" />}
                  {cat === "Tools" && <FaGithub className="text-xs" />}
                  {cat}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Skills Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
          >
            {filtered.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-4 border border-slate-800/60 rounded-2xl p-6 bg-[#070d1a]/50 backdrop-blur-sm"
        >
          {[
            { icon: FiCode, label: "Languages", value: "4+", color: "#F7DF1E" },
            { icon: FiLayers, label: "Frameworks", value: "8+", color: "#61DAFB" },
            { icon: FiZap, label: "Projects Built", value: "5+", color: "#22d3ee" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1 text-center">
              <stat.icon className="text-lg mb-1" style={{ color: stat.color }} />
              <span className="text-2xl sm:text-3xl font-black text-white" style={{ fontFamily: "'Fira Code', monospace" }}>
                {stat.value}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-slate-500">{stat.label}</span>
            </div>
          ))}
        </motion.div>

      </div>

      <style>{`
        @keyframes skillsweep {
          0%   { transform: translateX(-200%) skewX(-15deg); opacity: 0; }
          40%  { opacity: 1; }
          100% { transform: translateX(500%) skewX(-15deg); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Skills_Section;