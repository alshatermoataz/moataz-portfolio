"use client";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  MapPin,
  GraduationCap,
  Briefcase,
  Code,
  Trophy,
  Calendar,
  ExternalLink,
  ChevronDown,
  Star,
  Users,
  Zap,
  Sparkles,
  Rocket,
  Brain,
  Target,
} from "lucide-react";

// Particle component for background effects
const Particle = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-60"
    style={{ left: x, top: y }}
    animate={{
      y: [0, -100, 0],
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Floating shapes component
const FloatingShape = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    className={className}
    animate={{
      y: [-20, 20, -20],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

// Project type definition
interface Project {
  title: string;
  period: string;
  description: string;
  highlights: string[];
  icon: React.ReactNode;
  link?: string; // Added optional link property
}

// Advanced card with 3D effects
const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleProjectClick = () => {
    if (project.link) {
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{
        y: -10,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="perspective-1000"
    >
      <Card
        className={`relative overflow-hidden bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-500 h-full group ${
          project.link ? "cursor-pointer" : ""
        }`}
        onClick={handleProjectClick}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-cyan-600/10"
          animate={{
            background: isHovered
              ? "linear-gradient(45deg, rgba(16, 185, 129, 0.15), rgba(20, 184, 166, 0.15), rgba(6, 182, 212, 0.15))"
              : "linear-gradient(45deg, rgba(16, 185, 129, 0.05), rgba(20, 184, 166, 0.05), rgba(6, 182, 212, 0.05))",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Floating particles inside card */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                  initial={{
                    opacity: 0,
                    scale: 0,
                    x: (i * 60) % 300,
                    y: (i * 40) % 200,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [0, -50],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        <CardHeader className="relative z-10">
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-white text-lg leading-tight group-hover:text-emerald-300 transition-colors">
              {project.title}
            </CardTitle>
            <motion.div
              animate={{ rotate: isHovered ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ExternalLink
                className={`w-5 h-5 ${
                  project.link ? "text-amber-400" : "text-gray-500"
                } flex-shrink-0`}
              />
            </motion.div>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Calendar className="w-4 h-4" />
            <span>{project.period}</span>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="text-white/80 mb-4 text-sm leading-relaxed">
            {project.description}
          </p>
          <div className="space-y-2">
            {project.highlights.map((highlight: string, idx: number) => (
              <motion.div
                key={idx}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <motion.div
                  className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: idx * 0.2,
                  }}
                />
                <span className="text-xs text-white/70">{highlight}</span>
              </motion.div>
            ))}
          </div>
          {project.link && (
            <div className="mt-4 pt-3 border-t border-emerald-500/20">
              <span className="text-xs text-emerald-400 font-medium">
                Click to view project →
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Skill bar with animation
const SkillBar = ({
  skill,
  level,
  delay,
}: {
  skill: string;
  level: number;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay }}
    className="mb-4"
  >
    <div className="flex justify-between mb-2">
      <span className="text-white/90 text-sm font-medium">{skill}</span>
      <span className="text-emerald-400 text-sm">{level}%</span>
    </div>
    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
      <motion.div
        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full relative"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 bg-white/20"
          animate={{ x: [-100, 100] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  </motion.div>
);

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isClient, setIsClient] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Set client flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Mouse tracking
  useEffect(() => {
    if (isClient) {
      const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY, isClient]);

  // Remove this entire useEffect block:
  // useEffect(() => {
  //   if (isClient) {
  //     const newParticles = Array.from({ length: 50 }, () => ({
  //       x: Math.random() * window.innerWidth,
  //       y: Math.random() * window.innerHeight,
  //       delay: Math.random() * 3,
  //     }));
  //     setParticles(newParticles);
  //   }
  // }, [isClient]);

  // Replace with fixed particles array:
  const fixedParticles = [
    { x: 100, y: 200, delay: 0.5 },
    { x: 300, y: 150, delay: 1.0 },
    { x: 500, y: 300, delay: 1.5 },
    { x: 700, y: 100, delay: 2.0 },
    { x: 900, y: 250, delay: 2.5 },
    { x: 200, y: 400, delay: 0.8 },
    { x: 600, y: 50, delay: 1.2 },
    { x: 800, y: 350, delay: 1.8 },
    { x: 150, y: 500, delay: 0.3 },
    { x: 450, y: 180, delay: 2.2 },
    { x: 250, y: 320, delay: 0.7 },
    { x: 550, y: 120, delay: 1.4 },
    { x: 750, y: 280, delay: 1.9 },
    { x: 350, y: 450, delay: 0.6 },
    { x: 650, y: 80, delay: 1.1 },
    { x: 850, y: 380, delay: 1.6 },
    { x: 180, y: 220, delay: 0.4 },
    { x: 480, y: 340, delay: 2.1 },
    { x: 780, y: 160, delay: 1.3 },
    { x: 380, y: 480, delay: 0.9 },
  ];

  const skills = {
    "Programming Languages": [
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "C++", level: 85 },
      { name: "PHP", level: 80 },
    ],
    Frameworks: [
      { name: "React.js", level: 95 },
      { name: "Flutter", level: 90 },
      { name: "Spring Boot", level: 85 },
      { name: "Vue.js", level: 80 },
    ],
    "Database & Tools": [
      { name: "SQL Server", level: 90 },
      { name: "Firebase", level: 85 },
      { name: "Git", level: 95 },
      { name: "Visual Studio", level: 90 },
    ],
  };

  const projects: Project[] = [
    {
      title: "ASOMS (Al-Shater Order Management System)",
      period: "Aug 2024 – Jan 2025",
      description:
        "A mobile-based order management system with optimized job-related APIs, enabling job postings, applications, and recruiter analytics.",
      highlights: [
        "SEO enhancements",
        "Google Job Posting schema",
        "Search engine optimization",
      ],
      icon: <Rocket className="w-6 h-6" />,
      link: "https://asoms.vercel.app/",
      // Note: No specific link provided for ASOMS
    },
    {
      title: "Taylor's AI Assistant",
      period: "Oct 2024 – Jan 2025",
      description:
        "An AI-powered assistant integrated with CMS providing analytics and streamlined user interactions.",
      highlights: [
        "Advanced analytics",
        "Sentiment analysis",
        "Excel report generation",
        "Chat analytics",
      ],
      icon: <Brain className="w-6 h-6" />,
      link: "https://university.taylors.edu.my/en.html",
    },
    {
      title: "Find Global Website",
      period: "Aug 2024 – Jan 2025",
      description:
        "A recruitment platform connecting candidates with employers featuring advanced job-matching.",
      highlights: [
        "Job-related APIs",
        "Database optimization",
        "SEO enhancements",
        "Performance optimization",
      ],
      icon: <Target className="w-6 h-6" />,
      link: "https://job.findglobal.co/",
    },
    {
      title: "Skin Masterclass",
      period: "Dec 2024 – Feb 2025",
      description:
        "Online platform for CPD-accredited skincare science training and digital consultation tools.",
      highlights: [
        "Scalable APIs",
        "Secure authentication",
        "Payment processing",
        "Certification platform",
      ],
      icon: <Sparkles className="w-6 h-6" />,
      link: "https://www.skinmasterclass.com/",
    },
    {
      title: "BUSTRUCK",
      period: "Mar 2024 – Aug 2024",
      description:
        "A bus tracking app helping UTM students navigate campus transportation.",
      highlights: [
        "Flutter development",
        "Cross-platform compatibility",
        "Node.js backend",
        "Firebase integration",
      ],
      icon: <MapPin className="w-6 h-6" />,
      link: "https://github.com/alshatermoataz/Bustrack-Flutter",
    },
    {
      title: "ClubBox",
      period: "Aug 2023 – Feb 2024",
      description:
        "Web-based platform for UTM clubs to host events and manage student registrations.",
      highlights: [
        "Dynamic event management",
        "Optimized API performance",
        "Database query optimization",
      ],
      icon: <Users className="w-6 h-6" />,
      link: "https://github.com/alshatermoataz/ClubBox-ReactJs-Firebase",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLinkedInClick = () => {
    window.open(
      "https://www.linkedin.com/in/moataz-al-shater/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleGitHubClick = () => {
    window.open(
      "https://github.com/alshatermoataz",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/20 overflow-x-hidden"
    >
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(245,158,11,0.04),transparent_50%)]" />

        {/* Animated particles */}
        {fixedParticles.map((particle, i) => (
          <Particle
            key={i}
            x={particle.x}
            y={particle.y}
            delay={particle.delay}
          />
        ))}

        {/* Floating geometric shapes */}
        <FloatingShape
          className="absolute top-20 left-10 w-20 h-20 border border-emerald-500/20 rounded-full"
          delay={0}
        >
          <div className="w-full h-full" />
        </FloatingShape>
        <FloatingShape
          className="absolute top-40 right-20 w-16 h-16 border border-teal-500/20 rotate-45"
          delay={1}
        >
          <div className="w-full h-full" />
        </FloatingShape>
        <FloatingShape
          className="absolute bottom-40 left-20 w-12 h-12 border border-amber-500/20 rounded-full"
          delay={2}
        >
          <div className="w-full h-full" />
        </FloatingShape>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-950/20 backdrop-blur-2xl border-b border-emerald-500/10"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 bg-clip-text text-transparent"
            >
              Moataz Al-Shater
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["about", "experience", "projects", "skills", "contact"].map(
                (item, index) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, color: "#10b981" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item)}
                    className="text-white/80 hover:text-emerald-400 transition-all duration-300 capitalize relative"
                  >
                    {item}
                    <motion.div
                      className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                )
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y, opacity, scale }}
          className="relative z-10 text-center px-6"
        >
          {/* Animated avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
            className="mb-8 relative"
          >
            <div className="w-40 h-40 mx-auto mb-8 relative">
              {/* Rotating rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-emerald-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-teal-500/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border-2 border-amber-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />

              {/* Avatar */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 p-1">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
                  <span className="text-4xl font-bold text-white z-10">MA</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Animated title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-6xl md:text-8xl font-bold mb-6 relative"
          >
            <motion.span
              className="bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 bg-clip-text text-transparent inline-block"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Moataz Al-Shater
            </motion.span>
          </motion.h1>

          {/* Animated subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-8"
          >
            <p className="text-xl md:text-3xl text-white/90 mb-4 font-light">
              Aspiring Software Engineer
            </p>
            <motion.p
              className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              Committed to innovating AI and machine learning techniques to
              improve data analytics processes
            </motion.p>
          </motion.div>

          {/* Contact info with animations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {[
              { icon: MapPin, text: "Malaysia" },
              { icon: Phone, text: "+60-11-39969137" },
              { icon: Mail, text: "alshatermoataz@gmail.com" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 text-white/70 bg-slate-800/30 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-500/20"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  borderColor: "rgba(16, 185, 129, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              >
                <item.icon className="w-5 h-5 text-emerald-400" />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex justify-center gap-4 mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={handleLinkedInClick}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 px-8 py-4 text-lg font-semibold rounded-full shadow-2xl shadow-emerald-500/25"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={handleGitHubClick}
                className="bg-slate-800/30 backdrop-blur-sm hover:bg-slate-700/40 text-white border border-emerald-500/20 hover:border-emerald-400/40 px-8 py-4 text-lg font-semibold rounded-full"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="cursor-pointer"
            onClick={() => scrollToSection("about")}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center"
            >
              <span className="text-white/60 text-sm mb-2">
                Scroll to explore
              </span>
              <ChevronDown className="w-8 h-8 text-emerald-400/60" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 bg-clip-text text-transparent"
            >
              About Me
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-500 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-600/5 group-hover:from-emerald-600/10 group-hover:to-teal-600/10 transition-all duration-500" />
                  <CardHeader className="relative z-10">
                    <CardTitle className="flex items-center gap-3 text-white text-2xl">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <GraduationCap className="w-8 h-8 text-emerald-400" />
                      </motion.div>
                      Education Excellence
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-white/80 relative z-10">
                    <h3 className="font-semibold text-xl mb-3 text-white">
                      University Technology Malaysia (UTM)
                    </h3>
                    <p className="mb-3 text-lg">
                      Bachelor of Computer Science (Software Engineering) with
                      Honours
                    </p>
                    <p className="text-white/60 mb-4">Feb 2021 – Aug 2025</p>
                    <motion.div
                      className="flex items-center gap-3 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 p-4 rounded-lg border border-amber-500/20"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Star className="w-6 h-6 text-amber-400" />
                      <span className="font-bold text-xl text-amber-400">
                        CGPA: 3.97/4.00
                      </span>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl border border-teal-500/20 hover:border-teal-400/50 transition-all duration-500 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600/5 to-emerald-600/5 group-hover:from-teal-600/10 group-hover:to-emerald-600/10 transition-all duration-500" />
                  <CardHeader className="relative z-10">
                    <CardTitle className="flex items-center gap-3 text-white text-2xl">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Briefcase className="w-8 h-8 text-teal-400" />
                      </motion.div>
                      Latest Role
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-white/80 relative z-10">
                    <h3 className="font-semibold text-xl mb-3 text-white">
                      Back-End Developer
                    </h3>
                    <p className="mb-3 text-lg text-teal-300">BITLAB DIGITAL</p>
                    <p className="text-white/60 mb-6">Feb 2025 – Apr 2025</p>
                    <div className="space-y-4">
                      {[
                        "Collaborated with front-end developers for seamless integration of back-end code into user interface",
                        "Integrated third-party APIs into existing applications via JSON and XML protocols",
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                        >
                          <Zap className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/80">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 bg-clip-text text-transparent"
          >
            Professional Journey
          </motion.h2>

          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-500 to-amber-500" />

            <div className="space-y-16">
              {[
                {
                  title: "Back-End Developer",
                  company: "BITLAB DIGITAL",
                  period: "Feb 2025 – Apr 2025",
                  color: "emerald",
                  achievements: [
                    "Collaborated with front-end developers to ensure smooth integration of back-end code into user interface",
                    "Integrated third-party APIs into existing applications via JSON and XML protocols",
                  ],
                },
                {
                  title: "Back-End Developer Intern",
                  company: "BITLAB DIGITAL",
                  period: "Aug 2024 – Feb 2025",
                  color: "teal",
                  achievements: [
                    "Developed and refined a robotic control system, enhancing performance",
                    "Managed testing and validation processes to ensure adherence to industry standards",
                    "Offered technical expertise, leading to a reduction in system failures",
                  ],
                },
              ].map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative pl-20"
                >
                  {/* Timeline dot */}
                  <motion.div
                    className={`absolute left-6 w-4 h-4 bg-${job.color}-500 rounded-full border-4 border-slate-900`}
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.3 }}
                  />

                  <Card className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-500 overflow-hidden group">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-${job.color}-600/5 to-emerald-600/5 group-hover:from-${job.color}-600/10 group-hover:to-emerald-600/10 transition-all duration-500`}
                    />
                    <CardHeader className="relative z-10">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white text-xl mb-2">
                            {job.title}
                          </CardTitle>
                          <CardDescription
                            className={`text-${job.color}-400 text-lg font-semibold`}
                          >
                            {job.company}
                          </CardDescription>
                        </div>
                        <Badge
                          className={`bg-${job.color}-500/20 text-${job.color}-400 border-${job.color}-500/30`}
                        >
                          {job.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="space-y-3">
                        {job.achievements.map((achievement, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <motion.div
                              className={`w-2 h-2 bg-${job.color}-400 rounded-full mt-2 flex-shrink-0`}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: idx * 0.3,
                              }}
                            />
                            <span className="text-white/80">{achievement}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 bg-clip-text text-transparent"
          >
            Technical Expertise
          </motion.h2>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
            {Object.entries(skills).map(
              ([category, skillList], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-500 h-full overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-600/5 group-hover:from-emerald-600/10 group-hover:to-teal-600/10 transition-all duration-500" />
                    <CardHeader className="relative z-10">
                      <CardTitle className="text-white flex items-center gap-3 text-xl">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Code className="w-6 h-6 text-emerald-400" />
                        </motion.div>
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="space-y-4">
                        {skillList.map((skill, index) => (
                          <SkillBar
                            key={skill.name}
                            skill={skill.name}
                            level={skill.level}
                            delay={index * 0.1}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            )}
          </div>

          {/* Leadership Section */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <h3 className="text-3xl font-bold text-center mb-12 text-white">
              Leadership Experience
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Treasurer",
                  organization: "International Student Society - Yemen",
                  period: "Nov 2023 – Nov 2024",
                  description:
                    "Managed finance and legalities, created financial reports and promotional materials.",
                  icon: Trophy,
                  color: "amber",
                },
                {
                  title: "Sales Manager",
                  organization: "AIESEC",
                  period: "Mar 2023 – Jul 2023",
                  description:
                    "Created promotional materials and documented volunteering contributions.",
                  icon: Users,
                  color: "emerald",
                },
                {
                  title: "SYLC 11.0 Volunteer",
                  organization: "AIESEC",
                  period: "Aug 2022 – Sep 2022",
                  description:
                    "Facilitated communication workshops and managed project agendas.",
                  icon: Users,
                  color: "teal",
                },
              ].map((role, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-500 h-full overflow-hidden group">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-${role.color}-600/5 to-emerald-600/5 group-hover:from-${role.color}-600/10 group-hover:to-emerald-600/10 transition-all duration-500`}
                    />
                    <CardHeader className="relative z-10">
                      <CardTitle className="text-white flex items-center gap-3">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        >
                          <role.icon
                            className={`w-6 h-6 text-${role.color}-400`}
                          />
                        </motion.div>
                        {role.title}
                      </CardTitle>
                      <CardDescription
                        className={`text-${role.color}-400 font-semibold`}
                      >
                        {role.organization}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-white/80 text-sm relative z-10">
                      <p className="mb-3 text-white/60">{role.period}</p>
                      <p>{role.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 bg-clip-text text-transparent"
            >
              Let&apos;s Connect
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-white/80 mb-16 leading-relaxed"
            >
              I&apos;m always interested in new opportunities and
              collaborations. Let&apos;s discuss how we can work together to
              create something amazing!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-6"
            >
              {[
                {
                  icon: Mail,
                  text: "alshatermoataz@gmail.com",
                  color: "emerald",
                  action: () => window.open("mailto:alshatermoataz@gmail.com"),
                },
                {
                  icon: Phone,
                  text: "+60-11-39969137",
                  color: "teal",
                  action: () => window.open("tel:+60113969137"),
                },
                {
                  icon: Linkedin,
                  text: "LinkedIn",
                  color: "emerald",
                  action: handleLinkedInClick,
                },
                {
                  icon: Github,
                  text: "GitHub",
                  color: "amber",
                  action: handleGitHubClick,
                },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Button
                    size="lg"
                    onClick={contact.action}
                    className={`bg-gradient-to-r from-${contact.color}-500/20 to-teal-500/20 hover:from-${contact.color}-500/30 hover:to-teal-500/30 text-white border border-${contact.color}-500/30 hover:border-${contact.color}-500/50 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300`}
                  >
                    <contact.icon
                      className={`w-5 h-5 mr-3 text-${contact.color}-400`}
                    />
                    {contact.text}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-emerald-500/10 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-white/60 text-lg"
          >
            © 2025 Moataz Al-Shater. Crafted with passion using Next.js and
            Tailwind CSS.
          </motion.p>
        </div>
      </footer>
    </div>
  );
}
