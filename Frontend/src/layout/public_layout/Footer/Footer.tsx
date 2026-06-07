
import { FiGithub, FiLinkedin, FiMail, FiTerminal, FiCpu, FiArrowUpRight } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#020617] border-t border-cyan-500/20 pt-16 pb-8 font-['Fira_Code'] overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[150px] bg-cyan-900/20 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Column 1: Brand & Bio */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-6">
              <FiTerminal className="text-cyan-400 text-3xl" />
              <span className="text-2xl font-black text-white tracking-widest uppercase">
                Ritesh<span className="text-cyan-500">.dev</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-sans mb-6">
              Engineering scalable digital ecosystems and immersive web experiences. Based in Mumbai, executing code globally.
            </p>
            <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-cyan-500 bg-cyan-950/30 px-4 py-2 rounded-full border border-cyan-900/50">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              System Online
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
              <FiCpu className="text-cyan-500" /> Directory
            </h3>
            <ul className="space-y-4 text-sm text-slate-400 font-medium">
              <li>
                <a href="#home" className="hover:text-cyan-400 hover:tracking-widest transition-all duration-300 flex items-center gap-2">
                  <span className="text-cyan-500/50">{">"}</span> Home_Page
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-cyan-400 hover:tracking-widest transition-all duration-300 flex items-center gap-2">
                  <span className="text-cyan-500/50">{">"}</span> Profile_Data
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-cyan-400 hover:tracking-widest transition-all duration-300 flex items-center gap-2">
                  <span className="text-cyan-500/50">{">"}</span> Core_Arsenal
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 hover:tracking-widest transition-all duration-300 flex items-center gap-2">
                  <span className="text-cyan-500/50">{">"}</span> Deployed_Systems
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Network / Socials */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
              <FiArrowUpRight className="text-cyan-500" /> Network
            </h3>
            <div className="flex flex-col gap-4">
              <a 
                href="https://github.com/" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-colors duration-300 group"
              >
                <div className="p-2 bg-[#0a1120] rounded border border-slate-800 group-hover:border-cyan-500/50 transition-colors">
                  <FiGithub className="text-lg" />
                </div>
                <span className="text-sm tracking-wide">GitHub</span>
              </a>
              
              <a 
                href="https://linkedin.com/in/ritesh-chauhan-21835b254" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-colors duration-300 group"
              >
                <div className="p-2 bg-[#0a1120] rounded border border-slate-800 group-hover:border-cyan-500/50 transition-colors">
                  <FiLinkedin className="text-lg" />
                </div>
                <span className="text-sm tracking-wide">LinkedIn</span>
              </a>

              <a 
                href="mailto:hello@ritesh.dev" 
                className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-colors duration-300 group"
              >
                <div className="p-2 bg-[#0a1120] rounded border border-slate-800 group-hover:border-cyan-500/50 transition-colors">
                  <FiMail className="text-lg" />
                </div>
                <span className="text-sm tracking-wide">Secure_Mail</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Section */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 tracking-widest uppercase">
          <p>
            © {currentYear} Ritesh Chauhan. All Rights Reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with <span className="text-cyan-500">React</span> & <span className="text-cyan-500">Tailwind</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;