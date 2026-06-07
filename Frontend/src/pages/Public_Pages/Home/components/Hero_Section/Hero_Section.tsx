import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring,  } from "framer-motion";
import type { Variants } from "framer-motion";
import { FiArrowRight, FiGithub, FiLinkedin, FiCode, FiCpu, FiZap } from "react-icons/fi";

// ─────────────────────────────────────────────
// GIF import – keep your original path
// ─────────────────────────────────────────────
import homegif from "../../../../../assets/Home_imge/home.gif";

// ─────────────────────────────────────────────
// Typewriter hook (multi-word loop)
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
// Particle canvas – floating dots
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

    const DOTS = Array.from({ length: 55 }, () => ({
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

      // draw faint connection lines
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
// Mouse spotlight
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
      className="absolute inset-0 pointer-events-none z-[3]"
      style={{
        background: `radial-gradient(350px circle at ${sx.get()}px ${sy.get()}px, rgba(6,182,212,0.06), transparent 70%)`,
      }}
    />
  );
};

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
const Hero_Section = () => {
  const typed = useTypewriter(
    ["Full Stack Developer", "React.js Engineer", "Node.js Architect", "UI/UX Craftsman"],
    78, 2200
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 38, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  };

  // letter-by-letter for the terminal badge
  const badgeText = ">_ SYSTEM.INITIALIZED // FULL-STACK DEV";
  const letterVariants: Variants = {
    hidden: { opacity: 0, display: "none" },
    visible: { opacity: 1, display: "inline-block" },
  };

  // social links
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
      {/* ── BG GIF ── */}
      <motion.img
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        src={homegif}
        alt="Cyberpunk Background"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.22] z-[1]"
      />

      {/* ── Gradient overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/85 via-[#020617]/55 to-[#020617]/95 z-[1]" />

      {/* ── Grid ── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d407_1px,transparent_1px),linear-gradient(to_bottom,#06b6d407_1px,transparent_1px)] bg-[size:48px_48px] z-[1] pointer-events-none" />

      {/* ── Particles ── */}
      <ParticleCanvas />

      {/* ── Mouse Spotlight ── */}
      <MouseSpotlight />

      {/* ── Ambient orbs ── */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none z-[1]"
      />
      <motion.div
        animate={{ scale: [1, 1.22, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none z-[1]"
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[2px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent z-[2]" />

      {/* ── Main Content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-6 sm:px-10 lg:px-20 text-center max-w-5xl mx-auto flex flex-col items-center pb-24 pt-4"
      >

        {/* ── Top badge: terminal typewriter ── */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-cyan-500/30 bg-[#020617]/70 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.12)]">
            <FiCpu className="text-cyan-400 text-xs animate-pulse shrink-0" />
            <motion.p
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.042, delayChildren: 0.6 }}
              variants={{ hidden: { opacity: 1 }, visible: { opacity: 1 } }}
              className="text-cyan-400 text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase"
            >
              {badgeText.split("").map((ch, i) => (
                <motion.span key={i} variants={letterVariants}>
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.75, ease: "linear" }}
                className="inline-block w-[5px] h-[13px] bg-cyan-400 ml-1 align-middle rounded-sm"
              />
            </motion.p>
            <FiZap className="text-cyan-400 text-xs animate-pulse shrink-0" />
          </div>
        </motion.div>

        {/* ── Name line ── */}
        <motion.div variants={itemVariants} className="mb-2">
          <span className="text-slate-500 text-sm sm:text-base tracking-[0.3em] uppercase font-semibold font-sans">
            Hi, I'm
          </span>
          <span className="text-white text-sm sm:text-base tracking-[0.3em] uppercase font-black ml-2 font-sans">
            Ritesh Chauhan
          </span>
        </motion.div>

        {/* ── Main heading ── */}
      <motion.h3
  variants={itemVariants}
  className="font-black leading-none tracking-tight mb-4"
>
  <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
    Architecting Scalable
  </span>

  <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
    Digital Ecosystems
  </span>
</motion.h3>

        {/* ── Typewriter role ── */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-7 h-7">
          <span className="text-slate-500 text-sm font-sans">—</span>
          <span className="text-cyan-400 text-sm sm:text-base font-bold tracking-wider">
            {typed}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-[2px] h-5 bg-cyan-400 ml-0.5 align-middle rounded-full"
            />
          </span>
          <span className="text-slate-500 text-sm font-sans">—</span>
        </motion.div>

        {/* ── Description ── */}
        <motion.p
          variants={itemVariants}
          className="text-slate-400 text-sm md:text-base lg:text-[0.95rem] max-w-2xl mx-auto leading-relaxed font-sans mb-10 border-l-2 border-cyan-500/30 pl-4 text-left"
        >
          I build <span className="text-slate-200 font-semibold">high-performance, production-grade web applications</span> — from
          rock-solid REST APIs and real-time backends to pixel-perfect, animated frontends. My stack spans
          React, Node.js, TypeScript, and beyond. I don't just ship features —
          I engineer systems that{" "}
          <span className="text-cyan-300 font-semibold">scale, perform, and leave a lasting impression</span>.
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mb-12"
        >
          {/* Primary */}
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group relative w-full sm:w-auto px-8 py-3.5 border border-cyan-400 bg-transparent text-cyan-400 font-black tracking-[0.18em] uppercase text-sm overflow-hidden flex items-center justify-center gap-3 transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(6,182,212,0.4)]"
          >
            <span className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 group-hover:text-[#020617] transition-colors duration-300 flex items-center gap-3">
              View Projects <FiArrowRight className="text-base group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
            {/* corner accents */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
          </motion.a>

          {/* Secondary */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group relative w-full sm:w-auto px-8 py-3.5 border border-slate-700 bg-transparent text-slate-400 font-black tracking-[0.18em] uppercase text-sm overflow-hidden flex items-center justify-center gap-3 transition-all duration-300 hover:border-slate-400 hover:text-white"
          >
            Hire Me
          </motion.a>
        </motion.div>

        {/* ── Social Links ── */}
        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <span className="text-[9px] tracking-[0.25em] uppercase text-slate-600 font-bold">Connect</span>
          <div className="w-8 h-px bg-slate-800" />
          {socials.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-800 bg-[#070d1a] text-slate-500 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_14px_rgba(6,182,212,0.2)] transition-all duration-300"
            >
              <Icon className="text-base" />
            </motion.a>
          ))}
          <div className="w-8 h-px bg-slate-800" />
          {/* Available badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/8 border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-emerald-400 text-[9px] font-bold tracking-[0.2em] uppercase">Open to Work</span>
          </div>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex items-center gap-0 divide-x divide-slate-800 border border-slate-800/60 rounded-xl overflow-hidden bg-[#070d1a]/50 backdrop-blur-sm"
        >
          {[
            { val: "5+", label: "Projects" },
            { val: "12+", label: "Technologies" },
            { val: "2+", label: "Years Exp." },
            { val: "100%", label: "Dedication" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center px-6 py-3.5 gap-0.5">
              <span className="text-xl font-black text-white" style={{ fontFamily: "'Fira Code', monospace" }}>
                {s.val}
              </span>
              <span className="text-[9px] tracking-[0.18em] uppercase text-slate-600">{s.label}</span>
            </div>
          ))}
        </motion.div>

      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[9px] tracking-[0.25em] uppercase text-slate-600 font-semibold">Scroll</span>
        <div className="relative w-px h-10 bg-slate-800 overflow-hidden rounded-full">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
          />
        </div>
      </motion.div>

      {/* ── Bottom vignette ── */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020617] to-transparent z-[4] pointer-events-none" />
    </section>
  );
};

export default Hero_Section;