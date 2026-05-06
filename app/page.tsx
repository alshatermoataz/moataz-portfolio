"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ArrowUpRight,
  Code2,
  Database,
  Cpu,
  Layers,
  ChevronDown,
  ExternalLink,
  Calendar,
  Building2,
  GraduationCap,
  Award,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

// Projects data from CV
const projects = [
  {
    title: "Next Green Agro",
    description:
      "Full-stack multilingual e-commerce platform for Malaysian agricultural exports with RTL support.",
    tags: ["Next.js 16", "Laravel 11", "MySQL", "i18n"],
    link: "https://nextgreenagro.com/",
    github: "#",
    color: "from-emerald-500 to-green-600",
  },
  {
    title: "Alshater Archive",
    description:
      "Document archiving system with role-based access, 2FA authentication, and audit tracking.",
    tags: ["React", "Django", "PostgreSQL", "2FA"],
    link: "https://alshater-archive.vercel.app/login",
    github: "#",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "ISS Padel Pro Tournament",
    description:
      "Real-time tournament management with live scoring, bracket visualization, and team management.",
    tags: ["Next.js", "Supabase", "TypeScript", "Realtime"],
    link: "https://iss-padelpro.vercel.app/",
    github: "#",
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "ASOMS",
    description:
      "Enterprise order management system with real-time notifications and analytics dashboard.",
    tags: ["Vue 3", "ASP.NET Core", "SignalR", "Chart.js"],
    link: "#",
    github: "https://github.com/alshatermoataz/ASOMS",
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Taylor's AI Assistant",
    description:
      "AI-powered assistant with sentiment analysis, chat analytics, and response optimization.",
    tags: ["AI/ML", "Python", "Analytics", "NLP"],
    link: "https://university.taylors.edu.my/en.html",
    github: "#",
    color: "from-rose-500 to-red-600",
  },
  {
    title: "Find Global Website",
    description:
      "Recruitment platform connecting job seekers and employers with optimized job workflows.",
    tags: ["Next.js", "SEO", "APIs", "Performance"],
    link: "https://job.findglobal.co/",
    github: "#",
    color: "from-rose-500 to-red-600",
  },
  {
    title: "Skin Masterclass",
    description:
      "CPD-accredited training platform with secure payments and certification workflows.",
    tags: ["Payment APIs", "Auth", "Certification"],
    link: "https://www.skinmasterclass.com/",
    github: "#",
    color: "from-teal-500 to-emerald-600",
  },
];

const skills = [
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "Vue.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    icon: Layers,
    color: "text-emerald-400",
  },
  {
    category: "Backend",
    items: ["Node.js", "ASP.NET Core", "Django", "Laravel", "REST APIs"],
    icon: Code2,
    color: "text-cyan-400",
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase"],
    icon: Database,
    color: "text-purple-400",
  },
  {
    category: "AI/ML",
    items: ["Python", "TensorFlow", "LangChain", "OpenAI", "RAG", "NLP"],
    icon: Sparkles,
    color: "text-pink-400",
  },
];

const experience = [
  {
    role: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    period: "2025 - Present",
    description:
      "Delivered 15+ production applications across 5 countries with AI integration and scalable architectures.",
    highlights: ["Next.js", "React Native", "Supabase", "AI Integration"],
  },
  {
    role: "Back-End Developer",
    company: "BITLAB DIGITAL",
    period: "2024 - 2025",
    description:
      "Built enterprise systems with 99.9% uptime using microservices architecture.",
    highlights: ["ASP.NET Core", "SQL Server", "Azure", "Microservices"],
  },
];

// Magnetic Button Component
function MagneticButton({
  children,
  className = "",
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.a>
  );
}

// Text Scramble Effect
function ScrambleText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const [text, setText] = useState(children);
  const [isHovered, setIsHovered] = useState(false);
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  useEffect(() => {
    if (!isHovered) {
      setText(children);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setText(
        children
          .split("")
          .map((char, index) => {
            if (index < iteration) return children[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );
      iteration += 1 / 3;
      if (iteration >= children.length) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered, children]);

  return (
    <span
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </span>
  );
}

// Reveal Text Animation
function RevealText({
  children,
  className = "",
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "100%", rotateX: -80 }}
        animate={isInView ? { y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Floating Navigation
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["About", "Projects", "Experience", "Skills", "Contact"];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-2xl border-b border-white/5"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <motion.a
            href="#"
            className="text-2xl font-black text-white tracking-tighter"
            whileHover={{ scale: 1.05 }}
          >
            M<span className="text-emerald-400">.</span>
          </motion.a>

          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-gray-400 hover:text-white transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                <ScrambleText>{item}</ScrambleText>
                <motion.span
                  className="absolute -bottom-1 left-0 h-px bg-emerald-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <MagneticButton
              href="mailto:alshatermoataz@gmail.com"
              className="hidden md:flex px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-emerald-400 transition-colors"
            >
              Let&apos;s Talk
            </MagneticButton>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-white p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-white p-2"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-4xl font-bold text-white hover:text-emerald-400 transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Hero Section
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-black to-cyan-900/20"
          animate={{
            background: [
              "radial-gradient(ellipse at 20% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
              "radial-gradient(ellipse at 80% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
              "radial-gradient(ellipse at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-sm text-gray-300 font-medium">
            Open to opportunities
          </span>
        </motion.div>

        {/* Main heading with staggered reveal */}
        <div className="mb-8">
          <h1 className="text-[clamp(3rem,15vw,12rem)] font-black leading-[0.85] tracking-tighter">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className="text-white"
              >
                MOATAZ
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient"
              >
                AL-SHATER
              </motion.div>
            </div>
          </h1>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-400 font-light tracking-wide">
            Full-Stack Engineer <span className="text-emerald-400">/</span> AI
            Enthusiast
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-12 mb-16"
        >
          {[
            { value: "10+", label: "Projects" },
            { value: "4", label: "Countries" },
            { value: "3.97", label: "CGPA" },
            { value: "2+", label: "Years" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center group cursor-default"
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="text-4xl md:text-5xl font-black text-white group-hover:text-emerald-400 transition-colors"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <MagneticButton
            href="#projects"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-emerald-400 transition-all"
          >
            View Projects
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </MagneticButton>

          <MagneticButton
            href="https://www.linkedin.com/in/moataz-al-shater"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-white/20 text-white font-bold hover:border-emerald-400 hover:text-emerald-400 transition-all"
          >
            <Linkedin className="w-5 h-5" />
            Connect
          </MagneticButton>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex items-center justify-center gap-2 mt-16 text-gray-500"
        >
          <MapPin className="w-4 h-4" />
          <span className="text-sm tracking-wide">Johor Bahru, Malaysia</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600">
            Scroll
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-emerald-400 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Marquee Section
function MarqueeSection() {
  const techs = [
    "REACT",
    "NEXT.JS",
    "TYPESCRIPT",
    "VUE.JS",
    "ASP.NET",
    "DJANGO",
    "PYTHON",
    "POSTGRESQL",
    "SUPABASE",
    "DOCKER",
    "AWS",
  ];

  return (
    <section className="py-16 border-y border-white/5 overflow-hidden bg-black/50">
      <div className="flex">
        <motion.div
          className="flex shrink-0 gap-16"
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...techs, ...techs].map((tech, i) => (
            <div key={i} className="flex items-center gap-16">
              <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white/10 to-white/5 whitespace-nowrap hover:from-emerald-400/50 hover:to-cyan-400/50 transition-all duration-500 cursor-default">
                {tech}
              </span>
              <Sparkles className="w-6 h-6 text-emerald-500/30" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
            className="relative"
          >
            <div className="relative aspect-square">
              {/* Animated circles */}
              <motion.div
                className="absolute inset-0 rounded-full border border-emerald-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-8 rounded-full border border-cyan-500/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-16 rounded-full border border-emerald-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Center content */}
              <div className="absolute inset-24 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <span className="text-6xl md:text-7xl font-black text-black">
                  M
                </span>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-10 right-10 px-4 py-2 rounded-full bg-black border border-white/10 text-sm text-white"
              >
                <Code2 className="w-4 h-4 inline mr-2 text-emerald-400" />
                Full-Stack
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-20 left-0 px-4 py-2 rounded-full bg-black border border-white/10 text-sm text-white"
              >
                <Cpu className="w-4 h-4 inline mr-2 text-cyan-400" />
                AI/ML
              </motion.div>
            </div>
          </motion.div>

          {/* Content side */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="text-emerald-400 text-sm font-bold uppercase tracking-[0.3em]"
            >
              About Me
            </motion.span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-6 mb-10 leading-tight">
              <RevealText delay={0.1}>Crafting</RevealText>{" "}
              <RevealText delay={0.2}>Digital</RevealText>
              <br />
              <span className="text-emerald-400">
                <RevealText delay={0.3}>Experiences</RevealText>
              </span>
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="space-y-6 text-gray-400 text-lg leading-relaxed"
            >
              <p>
                I&apos;m an aspiring Software Engineer committed to innovating
                AI and machine learning techniques to address complex,
                real-world challenges with scalable solutions.
              </p>
              <p>
                I hold a BSc (Hons) in Computer Science with Software
                Engineering Specialization at University Technology Malaysia,
                maintaining a{" "}
                <span className="text-emerald-400 font-bold">3.97 CGPA</span>.
              </p>
            </motion.div>

            {/* Info cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-4 mt-10"
            >
              {[
                {
                  icon: GraduationCap,
                  label: "UTM University",
                  sub: "Software Engineering Specialization",
                },
                {
                  icon: Award,
                  label: "Dean's List",
                  sub: "All Semesters",
                },
                { icon: Building2, label: "ISS-Yemen", sub: "Treasurer" },
                { icon: Calendar, label: "Graduated", sub: "August 2025" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, borderColor: "rgba(16, 185, 129, 0.5)" }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/5 transition-all"
                >
                  <item.icon className="w-5 h-5 text-emerald-400 mb-3" />
                  <div className="text-white font-semibold text-sm">
                    {item.label}
                  </div>
                  <div className="text-gray-500 text-xs">{item.sub}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Project Card Component
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer perspective-1000"
    >
      <div
        className={`relative h-[450px] rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 ${isHovered ? "border-emerald-500/50" : ""}`}
      >
        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
        />
        <div className="absolute inset-0 bg-black/80" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Content */}
        <div
          className="absolute inset-0 p-8 flex flex-col justify-end"
          style={{ transform: "translateZ(50px)" }}
        >
          {/* Index number */}
          <div className="absolute top-6 left-8 text-7xl font-black text-white/5">
            0{index + 1}
          </div>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2 mb-4"
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.7 }}
          >
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white border border-white/10"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-3xl md:text-4xl font-black text-white mb-4"
            animate={{ y: isHovered ? -5 : 0 }}
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-gray-400 text-base leading-relaxed mb-6"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            {project.description}
          </motion.p>

          {/* Links */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          >
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-emerald-400 transition-colors"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition-colors"
              >
                <Github size={14} />
                Code
              </a>
            )}
          </motion.div>
        </div>

        {/* Hover glow */}
        <motion.div
          className={`absolute top-0 right-0 w-40 h-40 rounded-full bg-gradient-to-br ${project.color} blur-3xl`}
          animate={{
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.3 : 0.1,
          }}
        />
      </div>
    </motion.div>
  );
}

// Projects Section
function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-emerald-400 text-sm font-bold uppercase tracking-[0.3em]"
          >
            Selected Work
          </motion.span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mt-6">
            <RevealText delay={0.1}>Featured</RevealText>{" "}
            <span className="text-emerald-400">
              <RevealText delay={0.2}>Projects</RevealText>
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Experience Section
function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/10 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left - Header */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="text-emerald-400 text-sm font-bold uppercase tracking-[0.3em]"
            >
              Career
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-6 mb-8 leading-tight">
              <RevealText delay={0.1}>Professional</RevealText>
              <br />
              <span className="text-emerald-400">
                <RevealText delay={0.2}>Experience</RevealText>
              </span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg"
            >
              Building impactful solutions across startups and enterprises
              worldwide.
            </motion.p>
          </div>

          {/* Right - Timeline */}
          <div className="space-y-8">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.2 }}
                className="relative pl-8 border-l-2 border-white/10 hover:border-emerald-500/50 transition-colors group"
              >
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-black border-2 border-white/20 group-hover:border-emerald-500 group-hover:bg-emerald-500 transition-all" />

                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all group-hover:bg-white/[0.07]">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-emerald-400 text-sm font-semibold">
                      {exp.period}
                    </span>
                    <span className="text-gray-600">|</span>
                    <span className="text-gray-400 text-sm">{exp.company}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {exp.role}
                  </h3>
                  <p className="text-gray-400 mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((h, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Skills Section
function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-emerald-400 text-sm font-bold uppercase tracking-[0.3em]"
          >
            Expertise
          </motion.span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mt-6">
            <RevealText delay={0.1}>Skills &</RevealText>{" "}
            <span className="text-emerald-400">
              <RevealText delay={0.2}>Technologies</RevealText>
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all"
            >
              <skill.icon className={`w-8 h-8 ${skill.color} mb-6`} />
              <h3 className="text-xl font-bold text-white mb-6">
                {skill.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, j) => (
                  <motion.span
                    key={j}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + j * 0.05 }}
                    className="px-3 py-1.5 text-sm rounded-full bg-white/5 text-gray-300 border border-white/10 hover:border-emerald-500/50 hover:text-emerald-400 transition-all cursor-default"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socials = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:alshatermoataz@gmail.com",
      value: "alshatermoataz@gmail.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/moataz-al-shater",
      value: "moataz-alshater",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/alshatermoataz",
      value: "alshatermoataz",
    },
  ];

  return (
    <section id="contact" ref={ref} className="py-32 relative">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-emerald-400 text-sm font-bold uppercase tracking-[0.3em]"
        >
          Get In Touch
        </motion.span>

        <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mt-6 mb-8">
          <RevealText delay={0.1}>Let&apos;s Work</RevealText>
          <br />
          <span className="text-emerald-400">
            <RevealText delay={0.2}>Together</RevealText>
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-16"
        >
          I&apos;m always open to discussing new opportunities, creative ideas,
          or potential collaborations.
        </motion.p>

        {/* Contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-4 mb-16"
        >
          {socials.map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={
                social.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              whileHover={{ y: -5, borderColor: "rgba(16, 185, 129, 0.5)" }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 transition-all group"
            >
              <social.icon className="w-8 h-8 text-emerald-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-white font-semibold mb-1">
                {social.label}
              </div>
              <div className="text-gray-500 text-sm group-hover:text-emerald-400 transition-colors">
                {social.value}
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Big CTA */}
        <MagneticButton
          href="mailto:alshatermoataz@gmail.com"
          className="group inline-flex items-center gap-4 px-12 py-6 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-black text-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
        >
          Start a Conversation
          <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </MagneticButton>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-2xl font-black text-white">
            M<span className="text-emerald-400">.</span>
          </div>

          <div className="flex items-center gap-6">
            {[
              { icon: Github, href: "https://github.com/alshatermoataz" },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/moataz-al-shater",
              },
              { icon: Mail, href: "mailto:alshatermoataz@gmail.com" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-gray-500 hover:text-emerald-400 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Moataz Al-Shater
          </div>
        </div>
      </div>
    </footer>
  );
}

// Loading Screen
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="text-8xl font-black text-white mb-8"
        >
          M<span className="text-emerald-400">.</span>
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mx-auto"
        />
      </div>
    </motion.div>
  );
}

// Main Page
export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <main className="bg-black text-white min-h-screen overflow-x-hidden">
        <Navigation />
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
