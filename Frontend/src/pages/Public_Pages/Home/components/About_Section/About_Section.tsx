import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform,  } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  FiUser, FiMapPin, FiBookOpen, FiDownload,
  FiTerminal, FiCpu, FiCode, FiLayers,
  FiZap, FiGlobe, FiStar,
} from "react-icons/fi";

// ─────────────────────────────────────────────
// Typewriter Hook (Multi-word, smooth)
// ─────────────────────────────────────────────
const useTypewriter = (words: string[], speed = 90, pause = 2200) => {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx <= current.length) {
      t = setTimeout(() => { setDisplayed(current.slice(0, charIdx)); setCharIdx(c => c + 1); }, speed);
    } else if (!deleting && charIdx > current.length) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      t = setTimeout(() => { setDisplayed(current.slice(0, charIdx)); setCharIdx(c => c - 1); }, speed / 2.2);
    } else {
      setDeleting(false);
      setWordIdx(w => (w + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
};

// ─────────────────────────────────────────────
// Animated Number Counter
// ─────────────────────────────────────────────
const Counter = ({ to, suffix = "+" }: { to: number; suffix?: string }) => {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const total = 60;
    const id = setInterval(() => {
      frame++;
      setVal(Math.round((frame / total) * to));
      if (frame >= total) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [started, to]);

  return <span ref={ref} className="tabular-nums">{val}{suffix}</span>;
};

// ─────────────────────────────────────────────
// Scanning line (avatar effect)
// ─────────────────────────────────────────────
const ScanLine = () => (
  <motion.div
    animate={{ y: ["-100%", "200%"] }}
    transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
    className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#06b6d4] pointer-events-none"
  />
);

// ─────────────────────────────────────────────
// Tech Badge
// ─────────────────────────────────────────────
const TechBadge = ({ tech, index }: { tech: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.75, y: 10 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.06, type: "spring", stiffness: 200, damping: 18 }}
    whileHover={{ scale: 1.08, y: -2 }}
    className="relative px-3.5 py-1.5 bg-[#070f1e] text-cyan-300 text-[11px] font-bold tracking-widest border border-cyan-900/60 rounded-md cursor-crosshair group/b transition-colors duration-200 hover:border-cyan-400/70 hover:text-cyan-300 hover:shadow-[0_0_14px_rgba(6,182,212,0.25)]"
  >
    <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-400 opacity-0 group-hover/b:opacity-100 transition-opacity duration-200" />
    <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-400 opacity-0 group-hover/b:opacity-100 transition-opacity duration-200" />
    {tech}
  </motion.div>
);

// ─────────────────────────────────────────────
// Stat Pill
// ─────────────────────────────────────────────
const StatPill = ({
  icon: Icon, value, label, color,
}: { icon: React.ElementType; value: number; label: string; color: string }) => (
  <div className="flex flex-col items-center gap-1 px-5 py-3 rounded-xl border border-slate-800/80 bg-[#070f1e]/60">
    <Icon className="text-base mb-0.5" style={{ color }} />
    <span className="text-xl font-black text-white" style={{ fontFamily: "'Fira Code', monospace" }}>
      <Counter to={value} />
    </span>
    <span className="text-[9px] tracking-[0.2em] uppercase text-slate-600">{label}</span>
  </div>
);

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
const About_Section = () => {
  const typed = useTypewriter(
    ["Full Stack Developer", "React.js Specialist", "Node.js Engineer", "UI/UX Craftsman"],
    85, 2400
  );

  // 3D tilt for profile card
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 220, damping: 28 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 220, damping: 28 });

  const onMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  const techStack = [
    "React.js", "Node.js", "TypeScript", "JavaScript",
    "Express.js", "MongoDB", "MySQL", "Next.js",
    "Tailwind CSS", "Git & GitHub", "Bootstrap", "RESTful APIs",
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="about"
      className="relative w-full py-32 bg-[#020617] overflow-hidden"
      style={{ fontFamily: "'Fira Code', monospace" }}
    >
      {/* Ambient orbs */}
      <motion.div
        animate={{ y: [0, -55, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[560px] h-[560px] bg-cyan-600/9 rounded-full blur-[160px] pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 60, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-700/8 rounded-full blur-[160px] pointer-events-none"
      />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d407_1px,transparent_1px),linear-gradient(to_bottom,#06b6d407_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-20"
        >
          <div className="flex flex-col gap-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-[10px] tracking-[0.25em] uppercase font-bold text-cyan-400 w-fit"
            >
              <FiCpu className="animate-pulse" />
              Profile.Data
              <FiZap className="animate-pulse" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Me</span>
            </h2>
          </div>
          {/* Animated separator */}
          <div className="hidden sm:flex flex-1 items-center gap-2 mt-3">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="h-px bg-gradient-to-r from-cyan-500/60 via-cyan-500/20 to-transparent"
            />
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4] shrink-0" />
          </div>
        </motion.div>

        {/* ── Main Layout ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col lg:flex-row gap-10 items-start"
        >

          {/* ── LEFT: Profile Card ── */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-[340px] shrink-0"
            style={{ perspective: 900 }}
          >
            <motion.div
              ref={cardRef}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
              className="relative bg-[#070d1a] border border-slate-800/80 rounded-2xl overflow-hidden will-change-transform"
            >
              {/* Top gradient accent */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent" />

              {/* Corner decorations */}
              {[["top-3 left-3", "border-t border-l"], ["top-3 right-3", "border-t border-r"],
                ["bottom-3 left-3", "border-b border-l"], ["bottom-3 right-3", "border-b border-r"]].map(([pos, border], i) => (
                <div key={i} className={`absolute ${pos} w-3 h-3 ${border} border-cyan-500/40`} />
              ))}

              <div className="p-8 flex flex-col items-center">
                {/* Avatar */}
                <div className="relative w-32 h-32 rounded-full mb-6 overflow-hidden border border-slate-700 shadow-[0_0_40px_rgba(6,182,212,0.12)]">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-900 to-[#070d1a] flex items-center justify-center relative">
                    <FiUser className="text-5xl text-slate-600" />
                    <ScanLine />
                    {/* Subtle inner glow ring */}
                    <div className="absolute inset-0 rounded-full border border-cyan-500/10" />
                  </div>
                </div>

                {/* Name + typewriter */}
                <h3 className="text-xl font-black text-white tracking-wide mb-1">Ritesh Chauhan</h3>
                <div className="h-6 flex items-center justify-center mb-1">
                  <span className="text-sm text-cyan-400 font-bold tracking-wider">
                    {typed}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
                      className="inline-block w-[2px] h-4 bg-cyan-400 ml-0.5 align-middle rounded-full"
                    />
                  </span>
                </div>

                {/* Status badge */}
                <div className="flex items-center gap-2 mb-7 mt-1 px-3 py-1 rounded-full bg-emerald-500/8 border border-emerald-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-emerald-400 text-[10px] font-bold tracking-[0.2em] uppercase">Available for Work</span>
                </div>

                {/* Info rows */}
                <div className="w-full space-y-3 mb-7">
                  {[
                    { icon: FiMapPin, text: "Mumbai, Maharashtra", color: "#22d3ee" },
                    { icon: FiBookOpen, text: "Univ. of Mumbai — NKTT College", color: "#818cf8" },
                    { icon: FiGlobe, text: "Open to Remote & Hybrid", color: "#34d399" },
                  ].map(({ icon: Icon, text, color }, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-[#050b14] border border-slate-800/60 text-slate-400 text-xs font-sans"
                    >
                      <Icon style={{ color }} className="text-base shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                {/* Stats mini-row */}
                <div className="grid grid-cols-3 w-full gap-2 mb-7">
                  <StatPill icon={FiCode} value={5} label="Projects" color="#22d3ee" />
                  <StatPill icon={FiLayers} value={12} label="Skills" color="#818cf8" />
                  <StatPill icon={FiStar} value={2} label="Years" color="#fbbf24" />
                </div>

                {/* Download CV button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative w-full py-3.5 border border-cyan-500/50 bg-transparent text-cyan-400 font-bold tracking-[0.2em] uppercase text-xs overflow-hidden group/btn rounded-xl flex items-center justify-center gap-2.5 transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(6,182,212,0.25)]"
                >
                  <span className="absolute inset-0 bg-cyan-400 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out rounded-xl" />
                  <FiDownload className="relative z-10 text-base group-hover/btn:text-[#020617] transition-colors duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:scale-110 transform-gpu" />
                  <span className="relative z-10 group-hover/btn:text-[#020617] transition-colors duration-300">Download CV</span>
                  {/* Top sweep line */}
                  <span className="absolute top-0 left-0 h-[1px] w-0 bg-white group-hover/btn:w-full transition-all duration-500 z-10 rounded-full" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Bio + Terminal ── */}
          <motion.div variants={itemVariants} className="flex-1 flex flex-col gap-8 min-w-0">

            {/* Bio card */}
            <div className="relative bg-[#070d1a] border border-slate-800/70 rounded-2xl p-8 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

              <p className="text-[10px] tracking-[0.25em] uppercase text-indigo-400/70 font-bold mb-5">// Bio.System</p>

              <h3 className="text-3xl md:text-4xl lg:text-[2.6rem] font-black text-white leading-tight mb-6">
                Crafting tomorrow's web,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                  in motion.
                </span>
              </h3>

              <div className="border-l-2 border-cyan-500/40 pl-5 space-y-4 text-slate-400 text-[15px] leading-relaxed font-sans">
                <p>
                  I'm <span className="text-cyan-300 font-semibold">Ritesh Chauhan</span>, a Full Stack Developer who obsesses over two things:
                  bulletproof backend architecture and interfaces that feel alive. I architect end-to-end systems —
                  from REST APIs and relational databases to component-driven React UIs — with a relentless focus on
                  performance, scalability, and developer experience.
                </p>
                <p>
                  Every line I write is intentional. I don't just build features — I engineer solutions that scale,
                  adapt, and <span className="text-slate-200 font-medium">leave a lasting impression</span>. Whether it's
                  real-time systems with Socket.io, face-recognition pipelines with Python, or pixel-perfect
                  Tailwind UIs, I bring the same energy to every layer of the stack.
                </p>
                <p>
                  Currently seeking <span className="text-indigo-300 font-semibold">ambitious roles</span> where cutting-edge
                  technology meets real-world impact. Open to full-time, remote, or hybrid opportunities.
                </p>
              </div>
            </div>

            {/* Terminal Skills Card */}
            <div className="relative bg-[#070d1a] border border-slate-800/70 rounded-2xl overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

              {/* Terminal header */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-[#050b14] border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_6px_rgba(234,179,8,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                </div>
                <span className="text-slate-500 text-[10px] tracking-widest font-mono">sys_config/skills.json</span>
                <div className="flex items-center gap-1.5">
                  <FiTerminal className="text-cyan-500/50 text-xs" />
                  <span className="text-cyan-500/50 text-[9px] tracking-wider">bash</span>
                </div>
              </div>

              <div className="p-7">
                {/* Command line */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3 mb-6 font-mono text-sm"
                >
                  <span className="text-green-400">ritesh</span>
                  <span className="text-slate-500">@</span>
                  <span className="text-cyan-400">portfolio</span>
                  <span className="text-slate-500">~$</span>
                  <span className="text-slate-200 ml-1">execute <span className="text-yellow-400">get_skills</span></span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                    className="inline-block w-[2px] h-4 bg-cyan-400 ml-1 rounded-full"
                  />
                </motion.div>

                {/* Output line */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-4 font-bold"
                >
                  // Output: {techStack.length} modules loaded
                </motion.p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2.5">
                  {techStack.map((tech, index) => (
                    <TechBadge key={tech} tech={tech} index={index} />
                  ))}
                </div>

                {/* Status line */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2 }}
                  className="mt-7 pt-5 border-t border-slate-800/60 flex items-center gap-3 text-xs font-mono"
                >
                  <span className="text-slate-600">Process finished with exit code</span>
                  <span className="text-green-400 font-bold">0</span>
                  <span className="text-slate-700">·</span>
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-cyan-500/60 text-[10px] tracking-widest"
                  >
                    [ ALL SYSTEMS OPERATIONAL ]
                  </motion.span>
                </motion.div>
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About_Section;