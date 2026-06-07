import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  FiSend, FiUser, FiMail, FiPhone, FiMessageSquare,
  FiTerminal, FiCheckCircle, FiAlertCircle, FiCopy,
  FiGithub, FiLinkedin, FiTwitter, FiMapPin, FiZap,
} from "react-icons/fi";

// ─────────────────────────────────────────────
// Typewriter Hook
// ─────────────────────────────────────────────
const useTypewriter = (words: string[], speed = 80, pause = 1800) => {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
};

// ─────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────
type FormData = { name: string; email: string; phone: string; subject: string; message: string };
type Errors = Partial<Record<keyof FormData, string>>;

const validate = (data: FormData): Errors => {
  const e: Errors = {};
  if (!data.name.trim() || data.name.trim().length < 2)
    e.name = "Name must be at least 2 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    e.email = "Enter a valid email address.";
  const digits = data.phone.replace(/\D/g, "");
  if (data.phone && (digits.length < 10 || digits.length > 13))
    e.phone = "Enter a valid phone number.";
  if (!data.subject.trim() || data.subject.trim().length < 3)
    e.subject = "Subject must be at least 3 characters.";
  if (!data.message.trim() || data.message.trim().length < 20)
    e.message = "Message must be at least 20 characters.";
  return e;
};

// ─────────────────────────────────────────────
// Phone auto-format  →  +91 98765 43210
// ─────────────────────────────────────────────
const formatPhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, "").slice(0, 13);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `+${digits}`;
  if (digits.length <= 7) return `+${digits.slice(0, 2)} ${digits.slice(2)}`;
  if (digits.length <= 12)
    return `+${digits.slice(0, 2)} ${digits.slice(2, 7)} ${digits.slice(7)}`;
  return `+${digits.slice(0, 2)} ${digits.slice(2, 7)} ${digits.slice(7, 12)}`;
};

// ─────────────────────────────────────────────
// Animated Input Field
// ─────────────────────────────────────────────
const Field = ({
  label, icon: Icon, name, type = "text", placeholder, value, error, touched,
  onChange, onBlur, textarea = false, maxLength,
}: {
  label: string; icon: React.ElementType; name: keyof FormData;
  type?: string; placeholder: string; value: string; error?: string;
  touched?: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (name: keyof FormData) => void; textarea?: boolean; maxLength?: number;
}) => {
  const [focused, setFocused] = useState(false);
  const hasError = touched && error;
  const isValid = touched && !error && value.length > 0;

  const accentColor = hasError ? "#f87171" : isValid ? "#34d399" : "#22d3ee";

  return (
    <motion.div
      layout
      className="relative flex flex-col gap-1.5"
    >
      <label className="text-[10px] tracking-[0.22em] uppercase font-bold text-slate-500 flex items-center gap-1.5">
        <Icon className="text-xs" style={{ color: accentColor }} />
        {label}
        <span className="text-red-400/70">*</span>
      </label>

      <div className="relative">
        {!textarea ? (
          <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => { setFocused(false); onBlur(name); }}
            className="w-full bg-[#070d1a] border rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-300 font-sans pr-10"
            style={{
              borderColor: focused ? accentColor : hasError ? "#f87171" : isValid ? "#34d39940" : "#1e293b",
              boxShadow: focused ? `0 0 0 1px ${accentColor}40, 0 0 20px ${accentColor}15` : "none",
            }}
          />
        ) : (
          <textarea
            name={name}
            value={value}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={5}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => { setFocused(false); onBlur(name); }}
            className="w-full bg-[#070d1a] border rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-300 font-sans resize-none"
            style={{
              borderColor: focused ? accentColor : hasError ? "#f87171" : isValid ? "#34d39940" : "#1e293b",
              boxShadow: focused ? `0 0 0 1px ${accentColor}40, 0 0 20px ${accentColor}15` : "none",
            }}
          />
        )}

        {/* Status icon */}
        <div className="absolute right-3 top-3.5 pointer-events-none">
          <AnimatePresence mode="wait">
            {isValid && (
              <motion.span key="ok" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                <FiCheckCircle className="text-emerald-400 text-base" />
              </motion.span>
            )}
            {hasError && (
              <motion.span key="err" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                <FiAlertCircle className="text-red-400 text-base" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom glow bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] rounded-b-xl"
          animate={{ width: focused ? "100%" : "0%", opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
        />
      </div>

      <AnimatePresence>
        {hasError && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="text-red-400 text-[10px] tracking-wide font-sans flex items-center gap-1"
          >
            <FiAlertCircle className="shrink-0" /> {error}
          </motion.p>
        )}
      </AnimatePresence>

      {textarea && maxLength && (
        <p className="text-[10px] text-slate-600 text-right font-sans">{value.length}/{maxLength}</p>
      )}
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Contact Info Card
// ─────────────────────────────────────────────
const InfoCard = ({
  icon: Icon, label, value, color, copyable,
}: { icon: React.ElementType; label: string; value: string; color: string; copyable?: boolean }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="flex items-center gap-4 p-4 rounded-xl border border-slate-800/60 bg-[#070d1a]/60 group cursor-default"
    >
      <div className="p-2.5 rounded-lg border" style={{ borderColor: `${color}30`, background: `${color}10` }}>
        <Icon className="text-lg" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] tracking-[0.2em] uppercase text-slate-600 font-bold">{label}</p>
        <p className="text-slate-300 text-sm font-sans truncate mt-0.5">{value}</p>
      </div>
      {copyable && (
        <button onClick={copy} className="text-slate-600 hover:text-cyan-400 transition-colors duration-200 shrink-0">
          <AnimatePresence mode="wait">
            {copied
              ? <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><FiCheckCircle className="text-emerald-400" /></motion.span>
              : <motion.span key="cp" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><FiCopy /></motion.span>
            }
          </AnimatePresence>
        </button>
      )}
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
const Contact_Section = () => {
  const typeText = useTypewriter(
    ["Let's Build Something.", "Got a Project?", "Hire Me Today.", "Drop a Message."],
    75, 2000
  );

  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const errors = validate(form);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setForm((f) => ({ ...f, phone: formatPhone(value) }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }, []);

  const handleBlur = useCallback((name: keyof FormData) => {
    setTouched((t) => ({ ...t, [name]: true }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // touch all
    setTouched({ name: true, email: true, phone: true, subject: true, message: true });
    if (Object.keys(errors).length > 0) return;

    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1800)); // simulate API
    setStatus("success");
    setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setTouched({});
    }, 3500);
  };

  // 3D tilt for left panel
  const panelRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotX = useSpring(useTransform(rawY, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 30 });
  const rotY = useSpring(useTransform(rawX, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 30 });

  const handlePanelMouseMove = (e: React.MouseEvent) => {
    if (!panelRef.current) return;
    const r = panelRef.current.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handlePanelLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <section
      id="contact"
      className="relative w-full py-32 bg-[#020617] overflow-hidden"
      style={{ fontFamily: "'Fira Code', monospace" }}
    >
      {/* Ambient orbs */}
      <motion.div animate={{ y: [0, -50, 0], scale: [1, 1.15, 1] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />
      <motion.div animate={{ y: [0, 60, 0], scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-700/8 rounded-full blur-[180px] pointer-events-none" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d406_1px,transparent_1px),linear-gradient(to_bottom,#06b6d406_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/25 bg-cyan-500/5 backdrop-blur-md mb-6"
          >
            <FiTerminal className="text-cyan-400 text-xs animate-pulse" />
            <span className="text-cyan-300 text-[10px] font-bold tracking-[0.25em] uppercase">
              Initialize.Contact
            </span>
            <FiZap className="text-cyan-400 text-xs animate-pulse" />
          </motion.div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase leading-none mb-4">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              Touch
            </span>
          </h2>

          {/* Typewriter subtitle */}
          <div className="text-slate-400 text-base sm:text-lg font-sans h-7 flex items-center gap-1">
            <span>{typeText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-[2px] h-5 bg-cyan-400 ml-0.5 rounded-full"
            />
          </div>
        </motion.div>

        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-8 items-start">

          {/* ── LEFT PANEL ── */}
          <motion.div
            ref={panelRef}
            onMouseMove={handlePanelMouseMove}
            onMouseLeave={handlePanelLeave}
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", perspective: 800 }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Intro card */}
            <div className="relative bg-[#070d1a] border border-slate-800/70 rounded-2xl p-7 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
              <p className="text-[10px] tracking-[0.25em] uppercase text-cyan-500/70 font-bold mb-3">// About Contact</p>
              <p className="text-slate-400 text-sm font-sans leading-relaxed">
                Have a project in mind or want to collaborate? I'm open to freelance opportunities,
                full-time roles, and exciting side projects. Let's connect and build something great together.
              </p>

              {/* Availability indicator */}
              <div className="flex items-center gap-2 mt-5 pt-5 border-t border-slate-800/60">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
                <span className="text-emerald-400 text-xs font-bold tracking-wider">Available for Work</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-3">
              <InfoCard icon={FiMail} label="Email" value="yourname@email.com" color="#22d3ee" copyable />
              <InfoCard icon={FiPhone} label="Phone" value="+91 98765 43210" color="#34d399" copyable />
              <InfoCard icon={FiMapPin} label="Location" value="Mumbai, Maharashtra, IN" color="#c084fc" />
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              <p className="text-[9px] tracking-[0.22em] uppercase text-slate-600 font-bold">// Follow</p>
              <div className="flex gap-3">
                {[
                  { icon: FiGithub, label: "GitHub", color: "#ffffff", href: "#" },
                  { icon: FiLinkedin, label: "LinkedIn", color: "#0A66C2", href: "#" },
                  { icon: FiTwitter, label: "Twitter", color: "#1DA1F2", href: "#" },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.12, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-[#070d1a] text-slate-400 text-xs font-bold tracking-wider transition-all duration-300 hover:border-current"
                    style={{ "--hover-color": s.color } as React.CSSProperties}
                  >
                    <s.icon className="text-base" style={{ color: s.color }} />
                    <span className="hidden sm:inline text-[10px]" style={{ color: s.color }}>{s.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: FORM ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-[#070d1a] border border-slate-800/70 rounded-2xl p-7 sm:p-9 overflow-hidden"
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

            <p className="text-[10px] tracking-[0.25em] uppercase text-cyan-500/70 font-bold mb-6">// Send Message</p>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  className="flex flex-col items-center justify-center py-20 gap-4 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                  >
                    <FiCheckCircle className="text-5xl text-emerald-400" />
                  </motion.div>
                  <h3 className="text-2xl font-black text-white">Message Sent!</h3>
                  <p className="text-slate-400 font-sans text-sm max-w-xs">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <motion.div
                    className="mt-3 h-[2px] bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 3.5, ease: "linear" }}
                  />
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                  noValidate
                >
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full Name" icon={FiUser} name="name" placeholder="John Doe"
                      value={form.name} error={errors.name} touched={touched.name}
                      onChange={handleChange} onBlur={handleBlur} maxLength={60} />
                    <Field label="Email Address" icon={FiMail} name="email" type="email" placeholder="john@email.com"
                      value={form.email} error={errors.email} touched={touched.email}
                      onChange={handleChange} onBlur={handleBlur} />
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Phone (Optional)" icon={FiPhone} name="phone" type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone} error={errors.phone} touched={touched.phone}
                      onChange={handleChange} onBlur={handleBlur} />
                    <Field label="Subject" icon={FiMessageSquare} name="subject" placeholder="Project Inquiry"
                      value={form.subject} error={errors.subject} touched={touched.subject}
                      onChange={handleChange} onBlur={handleBlur} maxLength={80} />
                  </div>

                  {/* Message */}
                  <Field label="Message" icon={FiMessageSquare} name="message" placeholder="Tell me about your project, goals, or anything you'd like to discuss..."
                    value={form.message} error={errors.message} touched={touched.message}
                    onChange={handleChange} onBlur={handleBlur} textarea maxLength={800} />

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileHover={status !== "loading" ? { scale: 1.02 } : {}}
                    whileTap={status !== "loading" ? { scale: 0.97 } : {}}
                    className="relative mt-2 w-full py-4 rounded-xl font-black text-sm tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 disabled:cursor-not-allowed"
                    style={{
                      background: status === "loading"
                        ? "linear-gradient(135deg, #0891b2, #1d4ed8)"
                        : "linear-gradient(135deg, #06b6d4, #3b82f6)",
                      boxShadow: status === "loading" ? "none" : "0 0 30px rgba(6,182,212,0.3)",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {status === "loading" ? (
                        <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-3 text-white">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Transmitting...
                        </motion.span>
                      ) : (
                        <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-3 text-[#020617]">
                          <FiSend className="text-base" />
                          Send Message
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Sweep shine on button */}
                    {status !== "loading" && (
                      <span className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:animate-[btnshine_0.8s_ease-in-out]" />
                    )}
                  </motion.button>

                  <p className="text-slate-600 text-[10px] text-center font-sans tracking-wider">
                    🔒 Your information is private and will never be shared.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes btnshine {
          0%   { transform: translateX(-200%) skewX(-15deg); opacity: 0; }
          50%  { opacity: 1; }
          100% { transform: translateX(500%) skewX(-15deg); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Contact_Section;