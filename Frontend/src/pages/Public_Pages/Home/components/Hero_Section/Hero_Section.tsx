import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { Variants } from "framer-motion";
import { FiArrowRight, FiGithub, FiLinkedin, FiCode, FiCpu, FiZap } from "react-icons/fi";

// ─────────────────────────────────────────────
// Background GIF
// ─────────────────────────────────────────────
import homegif from "../../../../../assets/Home_imge/home.gif";

// ─────────────────────────────────────────────
// Typewriter Hook
// ─────────────────────────────────────────────
const useTypewriter = (words: string[], speed = 80, pause = 2000) => {
  const [displayed, setDisplayed] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const w = words[wi];
    let t: ReturnType<typeof setTimeout>;
    if (!del && ci <= w.length) {
      t = setTimeout(() => { setDisplayed(w.slice(0, ci)); setCi(c => c + 1); }, speed);
    } else if (!del && ci > w.length) {
      t = setTimeout(() => setDel(true), pause);
    } else if (del && ci >= 0) {
      t = setTimeout(() => { setDisplayed(w.slice(0, ci)); setCi(c => c - 1); }, speed / 2);
    } else {
      setDel(false);
      setWi(v => (v + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [ci, del, wi, words, speed, pause]);

  return displayed;
};

// ─────────────────────────────────────────────
// Particle Canvas (Responsive)
// ─────────────────────────────────────────────
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Adjust dot count based on screen size for better mobile performance
    const dotCount = window.innerWidth < 768 ? 30 : 55;

    const DOTS = Array.from({ length: dotCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.5 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      DOTS.forEach(d => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6,182,212,${d.a})`;
        ctx.fill();
      });

      for (let i = 0; i < DOTS.length; i++) {
        for (let j = i + 1; j < DOTS.length; j++) {
          const dx = DOTS[i].x - DOTS[j].x;
          const dy = DOTS[i].y - DOTS[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(DOTS[i].x, DOTS[i].y);
            ctx.lineTo(DOTS[j].x, DOTS[j].y);
            ctx.strokeStyle = `rgba(6,182,212,${0.06 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[2]" />;
};

// ─────────────────────────────────────────────
// Mouse Spotlight (Hardware Accelerated)
// ─────────────────────────────────────────────
const MouseSpotlight = () => {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 24 });
  const sy = useSpring(y, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-[3] hidden md:block"
      style={{
        background: `radial-gradient(350px circle at ${sx.get()}px ${sy.get()}px, rgba(6,182,212,0.06), transparent 70%)`,
      }}
    />
  );
};

// ─────────────────────────────────────────────
// Main Hero Component
// ─────────────────────────────────────────────
const Hero_Section = () => {
  const typed = useTypewriter(
    ["Full Stack Developer", "React.js Engineer", "Node.js Architect", "UI/UX Craftsman"],
    78, 2200
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  const badgeText = ">_ SYSTEM.INITIALIZED // FULL-STACK DEV";
  const letterVariants: Variants = {
    hidden: { opacity: 0, display: "none" },
    visible: { opacity: 1, display: "inline-block" },
  };

  const socials = [
    { icon: FiGithub, href: "#", label: "GitHub" },
    { icon: FiLinkedin, href: "#", label: "LinkedIn" },
    { icon: FiCode, href: "#", label: "Portfolio" },
  ];

  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center bg-[#020617]"
      style={{ fontFamily: "'Fira Code', monospace" }}
    >
      {/* Background Layer */}
      <motion.img
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        src={homegif}
        alt="Cyberpunk Background"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.22] z-[1]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/85 via-[#020617]/55 to-[#020617]/95 z-[1]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d407_1px,transparent_1px),linear-gradient(to_bottom,#06b6d407_1px,transparent_1px)] bg-[size:48px_48px] z-[1] pointer-events-none" />

      {/* Interactive & Ambient Layers */}
      <ParticleCanvas />
      <MouseSpotlight />

      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/10 rounded-full blur-[100px] md:blur-[130px] pointer-events-none z-[1]"
      />
      <motion.div
        animate={{ scale: [1, 1.22, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[420px] h-[250px] md:h-[420px] bg-blue-600/10 rounded-full blur-[100px] md:blur-[130px] pointer-events-none z-[1]"
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[2px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent z-[2]" />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-4 sm:px-10 lg:px-20 text-center max-w-6xl mx-auto flex flex-col items-center pb-24 pt-10"
      >
        {/* Terminal Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-cyan-500/30 bg-[#020617]/70 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.12)] max-w-full overflow-hidden">
            <FiCpu className="text-cyan-400 text-xs md:text-sm animate-pulse shrink-0" />
            <motion.p
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.04, delayChildren: 0.6 }}
              variants={{ hidden: { opacity: 1 }, visible: { opacity: 1 } }}
              className="text-cyan-400 text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.15em] sm:tracking-[0.18em] uppercase whitespace-nowrap"
            >
              {badgeText.split("").map((ch, i) => (
                <motion.span key={i} variants={letterVariants}>
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.75, ease: "linear" }}
                className="inline-block w-[4px] md:w-[5px] h-[10px] md:h-[13px] bg-cyan-400 ml-1 align-middle rounded-sm"
              />
            </motion.p>
            <FiZap className="text-cyan-400 text-xs md:text-sm animate-pulse shrink-0" />
          </div>
        </motion.div>

        {/* Name Line */}
        <motion.div variants={itemVariants} className="mb-2 flex flex-wrap justify-center items-center gap-2">
          <span className="text-slate-500 text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase font-semibold font-sans">
            Hi, I'm
          </span>
          <span className="text-white text-sm sm:text-base md:text-lg tracking-[0.2em] sm:tracking-[0.3em] uppercase font-black font-sans text-center">
            Yogesh
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h3
          variants={itemVariants}
          className="font-black leading-tight tracking-tight mb-4 px-2"
        >
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white">
            Architecting Scalable
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1 md:mt-2">
            Digital Ecosystems
          </span>
        </motion.h3>

        {/* Typewriter Role */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-6 md:mb-8 h-6 md:h-7">
          <span className="text-slate-500 text-xs md:text-sm font-sans hidden sm:inline-block">—</span>
          <span className="text-cyan-400 text-xs sm:text-sm md:text-base font-bold tracking-widest text-center">
            {typed}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-[2px] h-4 md:h-5 bg-cyan-400 ml-1 align-middle rounded-full"
            />
          </span>
          <span className="text-slate-500 text-xs md:text-sm font-sans hidden sm:inline-block">—</span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-slate-400 text-xs sm:text-sm md:text-base lg:text-[1rem] max-w-3xl mx-auto leading-relaxed font-sans mb-10 border-l-2 border-cyan-500/30 pl-4 text-left px-2 md:px-0"
        >
          I build <span className="text-slate-200 font-semibold">high-performance, production-grade web applications</span> — from
          rock-solid REST APIs and real-time backends to pixel-perfect, animated frontends. My stack spans
          React, Node.js, TypeScript, and beyond. I don't just ship features —
          I engineer systems that <span className="text-cyan-300 font-semibold">scale, perform, and leave a lasting impression</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0 mb-10 md:mb-12"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative w-full sm:w-auto px-6 md:px-8 py-3.5 border border-cyan-400 bg-transparent text-cyan-400 font-black tracking-[0.15em] md:tracking-[0.18em] uppercase text-xs md:text-sm overflow-hidden flex items-center justify-center gap-3 transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]"
          >
            <span className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 group-hover:text-[#020617] transition-colors duration-300 flex items-center gap-3">
              View Projects <FiArrowRight className="text-base group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative w-full sm:w-auto px-6 md:px-8 py-3.5 border border-slate-700 bg-transparent text-slate-400 font-black tracking-[0.15em] md:tracking-[0.18em] uppercase text-xs md:text-sm overflow-hidden flex items-center justify-center gap-3 transition-all duration-300 hover:border-slate-400 hover:text-white"
          >
            Hire Me
          </motion.a>
        </motion.div>

        {/* Social Links (Responsive Flex-Wrap) */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 md:gap-4 w-full">
          <span className="text-[8px] md:text-[9px] tracking-[0.2em] md:tracking-[0.25em] uppercase text-slate-500 font-bold hidden sm:inline-block">Connect</span>
          <div className="w-4 md:w-8 h-px bg-slate-800 hidden sm:block" />
          
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl border border-slate-800 bg-[#070d1a] text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all duration-300"
              >
                <Icon className="text-sm md:text-base" />
              </motion.a>
            ))}
          </div>

          <div className="w-4 md:w-8 h-px bg-slate-800 hidden sm:block" />
          
          <div className="flex items-center gap-1.5 px-3 py-1.5 md:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mt-3 sm:mt-0">
            <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-emerald-400" />
            </span>
            <span className="text-emerald-400 text-[8px] md:text-[9px] font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase">Open to Work</span>
          </div>
        </motion.div>

        {/* Stats Row (Responsive Grid for Mobile, Flex for Desktop) */}
        <motion.div
          variants={itemVariants}
          className="mt-10 md:mt-14 w-full max-w-3xl grid grid-cols-2 md:flex md:items-center md:justify-between divide-y md:divide-y-0 divide-x md:divide-x-0 divide-slate-800 border border-slate-800/60 rounded-xl overflow-hidden bg-[#070d1a]/50 backdrop-blur-sm"
        >
          {[
            { val: "5+", label: "Projects" },
            { val: "12+", label: "Technologies" },
            { val: "6+", label: "months Exp." },
            { val: "100%", label: "Dedication" },
          ].map((s, i) => (
            <div key={i} className={`flex flex-col items-center justify-center px-4 py-4 md:py-5 gap-1 md:gap-0.5 md:flex-1 md:border-r border-slate-800 last:border-0`}>
              <span className="text-lg md:text-xl lg:text-2xl font-black text-white" style={{ fontFamily: "'Fira Code', monospace" }}>
                {s.val}
              </span>
              <span className="text-[8px] md:text-[9px] tracking-[0.15em] md:tracking-[0.18em] uppercase text-slate-500">{s.label}</span>
            </div>
          ))}
        </motion.div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[8px] md:text-[9px] tracking-[0.25em] uppercase text-slate-600 font-semibold hidden sm:block">Scroll</span>
        <div className="relative w-px h-8 md:h-10 bg-slate-800 overflow-hidden rounded-full">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
          />
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-[#020617] to-transparent z-[4] pointer-events-none" />
    </section>
  );
};

export default Hero_Section;