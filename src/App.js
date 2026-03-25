import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu,
  X,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Award,
  Briefcase,
  Send,
  Moon,
  Sun,
  ChevronUp,
  Code2,
  Coffee,
  Trophy,
  BookOpen,
} from "lucide-react";
import "./App.css";

// ─── Custom Hooks ───────────────────────────────────────────

const useScrollAnimation = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return [ref, isVisible];
};

const useTypingEffect = (texts, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout;

    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
};

// ─── Data ───────────────────────────────────────────────────

const skills = [
  { name: "Kotlin", category: "Mobile", level: 90, icon: "🎯" },
  { name: "Flutter/Dart", category: "Mobile", level: 85, icon: "📱" },
  { name: "Jetpack Compose", category: "Mobile", level: 80, icon: "🚀" },
  { name: "PHP/Laravel", category: "Backend", level: 85, icon: "⚡" },
  { name: "MySQL", category: "Database", level: 80, icon: "🗄️" },
  { name: "Firebase", category: "Cloud", level: 75, icon: "🔥" },
  { name: "Python", category: "Programming", level: 65, icon: "🐍" },
  { name: "JavaScript", category: "Web", level: 50, icon: "⚙️" },
  { name: "Apache Superset", category: "Data/BI", level: 70, icon: "📊" },
  { name: "Git/GitHub", category: "Version Control", level: 80, icon: "🔀" },
  { name: "REST API", category: "Backend", level: 80, icon: "🔗" },
  { name: "Postman", category: "Testing", level: 75, icon: "📬" },
];

const projects = [
  {
    title: "Dicoding Submission - StoryApp",
    description:
      "StoryApp is a learning project developed during the Dicoding Android Intermediate course. The application was built to implement modern Android development practices such as Jetpack Compose, CameraX, and Retrofit.",
    tech: ["Kotlin", "Room", "Retrofit", "Paging 3", "Maps SDK"],
    github: "https://github.com/HeruAryasuta",
    demo: "#",
    image: "/StoryApp.png",
  },
  {
    title: "Siakad Mobile App",
    description:
      "This mini project is a simple Student Information System (SIAKAD) designed to display academic data in a clear and accessible way. It includes features such as grade statistics and student dashboard.",
    tech: ["Flutter", "Dart"],
    github: "https://github.com/HeruAryasuta",
    demo: "#",
    image: "/Siakad.png",
  },
  {
    title: "Helpdesk Ticketing System BKPSDM",
    description:
      "An online support portal for the Human Resources and Personnel Development Agency in Lhokseumawe city. The system helps streamline requests and ensures better communication.",
    tech: ["PHP", "HTML", "CSS", "JavaScript", "MySQL"],
    github: "https://github.com/HeruAryasuta/helpdesk-bkpsdm",
    demo: "https://helpdesk-bkpsdm.lhokseumawekota.go.id/",
    image: "/image.png",
  },
  {
    title: "Web VR Bukit Indah University Tour",
    description:
      "A virtual campus tour website for Universitas Malikussaleh, allowing users to explore the faculty buildings at the Bukit Indah campus through an interactive viewing experience.",
    tech: ["Laravel", "PHP", "3D Vista", "JavaScript"],
    github: "https://github.com/HeruAryasuta/vr-unimal-bukitindah",
    demo: "https://vrunimal.satuakademik.com/",
    image: "/vr-unimal.png",
  },
];

const experiences = [
  {
    type: "education",
    title: "Bachelor of Information Systems",
    organization: "Universitas Malikussaleh",
    period: "Sep 2021 - Aug 2025",
    gpa: "3.7/4.0",
    description:
      "Focused on software engineering, system analysis, and mobile development. Active member of HIMASI organization.",
  },
  {
    type: "certification",
    title: "Mobile Development Cohort",
    organization: "Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)",
    period: "Aug 2023 - Dec 2023",
    description:
      "Intensive program focusing on Android development, computational thinking, and collaborative development through capstone project.",
  },
  {
    type: "experience",
    title: "Head of Research and Technology",
    organization: "HIMASI Universitas Malikussaleh",
    period: "Sep 2023 - Jul 2024",
    description:
      "Led EduTech initiatives, organized technology workshops, developed organizational systems, and upgraded association website.",
  },
  {
    type: "experience",
    title: "Information Technology Intern",
    organization: "Radio Republik Indonesia",
    period: "Jan 2024 - Feb 2024",
    description:
      "Optimized existing systems, provided technical support, and contributed to technology upgrade planning.",
  },
  {
    type: "experience",
    title: "Data Entry Intern",
    organization: "Immigration Office Kelas II TPI Lhokseumawe",
    period: "Nov 2019 - Feb 2020",
    description:
      "Handled data collection, entry, validation, and daily reporting while improving process efficiency.",
  },
];

const certifications = [
  {
    title: "Bangkit Academy 2023 — Mobile Development Path",
    issuer: "Google, Tokopedia, Gojek, Traveloka",
    date: "Dec 2023",
    icon: "🎓",
  },
  {
    title: "Belajar Pengembangan Aplikasi Android Intermediate",
    issuer: "Dicoding Indonesia",
    date: "2023",
    icon: "📱",
  },
  {
    title: "Memulai Pemrograman dengan Kotlin",
    issuer: "Dicoding Indonesia",
    date: "2023",
    icon: "🎯",
  },
  {
    title: "Belajar Membuat Aplikasi Android dengan Jetpack Compose",
    issuer: "Dicoding Indonesia",
    date: "2023",
    icon: "🚀",
  },
  {
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    date: "2024",
    icon: "🤖",
  },
];

const stats = [
  { label: "Projects", value: "4+", icon: Code2 },
  { label: "Internships", value: "3+", icon: Briefcase },
  { label: "GPA", value: "3.7", icon: Trophy },
  { label: "Certifications", value: "5+", icon: BookOpen },
];

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const typingTexts = [
  "Android Developer",
  "Backend Developer",
  "Data Enthusiast",
  "Mobile Engineer",
];

// ─── Main Component ─────────────────────────────────────────

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const typedText = useTypingEffect(typingTexts, 80, 40, 2000);

  // Scroll animation refs
  const [heroRef, heroVisible] = useScrollAnimation();
  const [aboutRef, aboutVisible] = useScrollAnimation();
  const [skillsRef, skillsVisible] = useScrollAnimation();
  const [projectsRef, projectsVisible] = useScrollAnimation();
  const [expRef, expVisible] = useScrollAnimation();
  const [certRef, certVisible] = useScrollAnimation();
  const [contactRef, contactVisible] = useScrollAnimation();

  // Dark mode persistence
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Scroll spy + scroll-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 100;

      setShowScrollTop(window.scrollY > 300);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        loading: false,
        success: false,
        error: "Please fill in all fields",
      });
      return;
    }

    setFormStatus({ loading: true, success: false, error: "" });

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/aryasutaheru08@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `New Portfolio Contact from ${formData.name}`,
            _template: "table",
          }),
        }
      );

      if (response.ok) {
        setFormStatus({ loading: false, success: true, error: "" });
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setFormStatus({ loading: false, success: false, error: "" });
        }, 5000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setFormStatus({
        loading: false,
        success: false,
        error: "Failed to send message. Please try again or contact directly via email.",
      });
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* ─── Navigation ─── */}
        <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <div className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                Heru<span className="text-blue-600 dark:text-blue-400">.</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="ml-2 p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-400"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2"
                >
                  {isMenuOpen ? (
                    <X size={24} className="text-gray-900 dark:text-white" />
                  ) : (
                    <Menu size={24} className="text-gray-900 dark:text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSection === item.id
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* ─── Hero Section ─── */}
        <section id="home" className="pt-32 pb-20">
          <div
            ref={heroRef}
            className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Coffee size={16} />
                  Available for work
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  Hi, I'm{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    Heru
                  </span>
                </h1>

                <div className="h-8 mb-6">
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    <span>{typedText}</span>
                    <span className="animate-blink text-blue-600 dark:text-blue-400 font-light">|</span>
                  </p>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-lg">
                  Bangkit 2023 Graduate specializing in mobile development with
                  Kotlin & Flutter, backed by strong backend engineering skills
                  and system analysis expertise.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://drive.google.com/file/d/1_Mv85sKP3rnAEVQe-D0AJu8hEQTVKLQT/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 font-medium"
                  >
                    <Download size={18} />
                    Download CV
                  </a>
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="inline-flex items-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium"
                  >
                    <ExternalLink size={18} />
                    View Work
                  </button>
                </div>
              </div>

              {/* Profile Photo */}
              <div className="hidden lg:flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl shadow-blue-500/10">
                    <img
                      src="/pict.jpg"
                      alt="Heru Aryasuta"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* Decorative rings */}
                  <div className="absolute -inset-4 rounded-full border-2 border-dashed border-blue-200 dark:border-blue-800 animate-[spin_20s_linear_infinite]"></div>
                  <div className="absolute -inset-8 rounded-full border border-blue-100 dark:border-blue-900/50"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── About Section ─── */}
        <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div
            ref={aboutRef}
            className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
              aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden img-hover-zoom">
                  <img
                    src="/pict.jpg"
                    alt="Heru Aryasuta"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  About Me
                </h2>

                <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>
                    I'm a passionate Information Systems graduate from
                    Universitas Malikussaleh with a strong foundation in mobile
                    and backend development. As a Bangkit 2023 Mobile
                    Development graduate, I've gained hands-on experience
                    building Android applications using Kotlin and Jetpack
                    Compose.
                  </p>
                  <p>
                    My expertise spans across Android development with Kotlin,
                    cross-platform development with Flutter, and robust backend
                    systems with Laravel. I'm particularly passionate about
                    creating efficient, user-centered applications that solve
                    real-world problems.
                  </p>
                  <p>
                    Beyond technical skills, I've demonstrated leadership as
                    Head of Research and Technology at HIMASI, where I initiated
                    EduTech programs, organized technology workshops, and led
                    digital transformation projects.
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center hover:border-blue-300 dark:hover:border-blue-600 transition-colors group"
                    >
                      <stat.icon
                        size={20}
                        className="mx-auto mb-2 text-gray-400 group-hover:text-blue-500 transition-colors"
                      />
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-8">
                  <a
                    href="https://www.linkedin.com/in/heru-aryasuta/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all"
                  >
                    <Linkedin size={20} className="text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                    href="https://github.com/HeruAryasuta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all"
                  >
                    <Github size={20} className="text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                    href="mailto:aryasutaheru08@gmail.com"
                    className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-600 transition-all"
                  >
                    <Mail size={20} className="text-gray-700 dark:text-gray-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Skills Section ─── */}
        <section id="skills" className="py-20">
          <div
            ref={skillsRef}
            className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
              skillsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Skills & Expertise
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
              Technologies and tools I've worked with throughout my journey as a developer.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="group border border-gray-200 dark:border-gray-700 p-5 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md dark:hover:shadow-blue-900/10 transition-all duration-300"
                  style={{
                    transitionDelay: skillsVisible ? `${index * 50}ms` : "0ms",
                    opacity: skillsVisible ? 1 : 0,
                    transform: skillsVisible ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
                    {skill.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {skill.category}
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div
                      className="bg-gray-900 dark:bg-white h-1.5 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: skillsVisible ? `${skill.level}%` : "0%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Projects Section ─── */}
        <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div
            ref={projectsRef}
            className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
              projectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
              A selection of projects I've built — from mobile apps to web systems.
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-xl dark:hover:shadow-blue-900/10 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
                  style={{
                    transitionDelay: projectsVisible ? `${index * 100}ms` : "0ms",
                    opacity: projectsVisible ? 1 : 0,
                    transform: projectsVisible ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 text-sm">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                      >
                        <Github size={16} />
                        Code
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                      >
                        <ExternalLink size={16} />
                        Demo
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Experience Section ─── */}
        <section id="experience" className="py-20">
          <div
            ref={expRef}
            className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
              expVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Experience & Education
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
              My professional journey and academic background.
            </p>

            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="group border border-gray-200 dark:border-gray-700 p-6 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-300"
                  style={{
                    transitionDelay: expVisible ? `${index * 80}ms` : "0ms",
                    opacity: expVisible ? 1 : 0,
                    transform: expVisible ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                        {exp.type === "education" && (
                          <GraduationCap className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" size={24} />
                        )}
                        {exp.type === "certification" && (
                          <Award className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" size={24} />
                        )}
                        {exp.type === "experience" && (
                          <Briefcase className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" size={24} />
                        )}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {exp.title}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                          {exp.period}
                        </span>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                        {exp.organization}
                        {exp.gpa && (
                          <span className="ml-2 text-sm text-blue-600 dark:text-blue-400 font-semibold">
                            • GPA: {exp.gpa}
                          </span>
                        )}
                      </p>

                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Certifications Section ─── */}
        <section id="certifications" className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div
            ref={certRef}
            className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
              certVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Certifications
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
              Professional certifications and completed courses.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-300"
                  style={{
                    transitionDelay: certVisible ? `${index * 100}ms` : "0ms",
                    opacity: certVisible ? 1 : 0,
                    transform: certVisible ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {cert.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {cert.issuer}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-500 mt-1 inline-block">
                      {cert.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Contact Section ─── */}
        <section id="contact" className="py-20">
          <div
            ref={contactRef}
            className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
              contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="space-y-4">
                  <a
                    href="mailto:aryasutaheru08@gmail.com"
                    className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all group"
                  >
                    <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="text-red-500" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <span className="text-gray-900 dark:text-white font-medium">
                        aryasutaheru08@gmail.com
                      </span>
                    </div>
                  </a>

                  <a
                    href="tel:+6285191144277"
                    className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all group"
                  >
                    <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="text-green-500" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <span className="text-gray-900 dark:text-white font-medium">
                        0851-9114-4277
                      </span>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <MapPin className="text-blue-500" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <span className="text-gray-900 dark:text-white font-medium">
                        Lhokseumawe, Indonesia
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <a
                    href="https://github.com/HeruAryasuta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <Github size={20} className="text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/heru-aryasuta/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                  >
                    <Linkedin size={20} className="text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                    href="mailto:aryasutaheru08@gmail.com"
                    className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                  >
                    <Mail size={20} className="text-gray-700 dark:text-gray-300" />
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                {formStatus.success && (
                  <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400 text-sm">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {formStatus.error && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
                    {formStatus.error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-400"
                      placeholder="Your Name"
                      disabled={formStatus.loading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-400"
                      placeholder="your.email@example.com"
                      disabled={formStatus.loading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all resize-none text-gray-900 dark:text-white placeholder-gray-400"
                      placeholder="Your message..."
                      disabled={formStatus.loading}
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={formStatus.loading}
                    className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 font-medium"
                  >
                    {formStatus.loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <div className="font-bold text-gray-900 dark:text-white">
                  Heru<span className="text-blue-600 dark:text-blue-400">.</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Information Systems Graduate • Mobile & Backend Developer
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  © 2025 Heru Aryasuta. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>

        {/* ─── Scroll to Top Button ─── */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition-all duration-300 z-50 ${
            showScrollTop
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      </div>
    </div>
  );
};

export default Portfolio;