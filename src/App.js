import React, { useState, useEffect } from "react";
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
  User,
  Code,
  Briefcase,
  GraduationCap,
  Send,
  Award,
  Star,
  Users,
  Zap,
  Target,
  Sparkles,
} from "lucide-react";

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: ""
  });

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        loading: false,
        success: false,
        error: "Please fill in all fields"
      });
      return;
    }

    setFormStatus({ loading: true, success: false, error: "" });

    try {
      // Menggunakan FormSubmit.co untuk mengirim email
      const response = await fetch("https://formsubmit.co/ajax/aryasutaheru08@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Contact from ${formData.name}`,
          _template: "table"
        })
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          loading: false,
          success: true,
          error: ""
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          message: ""
        });
        // Reset success message after 5 seconds
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
        error: "Failed to send message. Please try again or contact directly via email."
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "experience",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

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

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const skills = [
    { name: "Kotlin", category: "Mobile", level: 90, icon: "🎯" },
    { name: "Flutter/Dart", category: "Mobile", level: 85, icon: "📱" },
    { name: "Jetpack Compose", category: "Mobile", level: 80, icon: "🚀" },
    { name: "PHP/Laravel", category: "Backend", level: 85, icon: "⚡" },
    { name: "MySQL", category: "Database", level: 80, icon: "🗄️" },
    { name: "Firebase", category: "Cloud", level: 75, icon: "🔥" },
    { name: "Python", category: "Programming", level: 65, icon: "🐍" },
    { name: "JavaScript", category: "Web", level: 50, icon: "⚙️" },
  ];

  const projects = [
    {
      title: "Dicoding Submission - StoryApp",
      description:
        "StoryApp is a learning project developed during the Dicoding Android Intermediate course. The application was built to implement modern Android development practices such as Jetpack Compose, CameraX, and Retrofit. In this submission, key features include maintaining previous story-sharing functionality, integrating Google Maps to display stories with location, implementing Paging 3 for infinite scrolling, and adding unit testing in ViewModel to ensure data consistency and reliability.",
      tech: ["Kotlin", "Room", "Retrofit", "Paging 3", "Maps SDK"],
      github: "https://github.com/HeruAryasuta",
      demo: "#",
      image:
        "/StoryApp.png",
      category: "Mobile App",
      status: "Completed",
    },
    {
      title: "Siakad Mobile App",
      description:
        "This mini project is a simple Student Information System (SIAKAD) designed to display academic data in a clear and accessible way. It includes features such as grade statistics, a student dashboard (showing ranking, schedule, assignments, and report cards), and a school profile page. The goal of this project is to provide students, teachers, and parents with an easy-to-use, modern, and responsive platform for viewing academic information.",
      tech: ["Flutter", "Dart"],
      github: "https://github.com/HeruAryasuta",
      demo: "#",
      image:
        "/Siakad.png",
      category: "Mobile App",
      status: "Completed",
    },
    {
      title: "Helpdesk Ticketing System BKPSDM Lhokseumawe",
      description:
        "It’s an online support portal for the Human Resources and Personnel Development Agency in Lhokseumawe city. Through this helpdesk, civil servants (ASN), staff, and the public can submit questions, report issues, or request assistance related to HR matters – such as payroll, performance evaluation, and administrative services. The system helps streamline requests and ensures better communication and faster response from BKPSDM.",
      tech: ["PHP", "HTML", "CSS", "JavaScript", "MySQL"],
      github: "https://github.com/HeruAryasuta/helpdesk-bkpsdm",
      demo: "https://helpdesk-bkpsdm.lhokseumawekota.go.id/",
      image:
        "/image.png",
      category: "Web Development",
      status: "Completed",
    },
    {
      title: "Web VR Bukit Indah University Tour",
      description:
        "This project is a virtual campus tour website for Universitas Malikussaleh, allowing users to explore the faculty buildings at the Bukit Indah campus and access essential information about each faculty. It provides an interactive viewing experience through modern UI design, making it easier for students, visitors, and prospective applicants to learn about the campus facilities from anywhere.",
      tech: [
        "Laravel", "PHP", "3D Vista", "JavaScript",
      ],
      github: "https://github.com/HeruAryasuta/vr-unimal-bukitindah",
      demo: "https://vrunimal.satuakademik.com/",
      image:
        "/vr-unimal.png",
      category: "Mobile App",
      status: "Completed",
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
      color: "from-blue-500 to-cyan-600",
    },
    {
      type: "certification",
      title: "Mobile Development Cohort",
      organization: "Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)",
      period: "Aug 2023 - Dec 2023",
      description:
        "Intensive program focusing on Android development, computational thinking, and collaborative development through capstone project.",
      color: "from-indigo-500 to-purple-600",
    },
    {
      type: "experience",
      title: "Head of Research and Technology",
      organization: "HIMASI Universitas Malikussaleh",
      period: "Sep 2023 - Jul 2024",
      description:
        "Led EduTech initiatives, organized technology workshops, developed organizational systems, and upgraded association website.",
      color: "from-cyan-500 to-blue-600",
    },
    {
      type: "experience",
      title: "Information Technology Intern",
      organization: "Radio Republik Indonesia",
      period: "Jan 2024 - Feb 2024",
      description:
        "Optimized existing systems, provided technical support, and contributed to technology upgrade planning.",
      color: "from-violet-500 to-indigo-600",
    },
    {
      type: "experience",
      title: "Data Entry Intern",
      organization: "Immigration Office Kelas II TPI Lhokseumawe",
      period: "Nov 2019 - Feb 2020",
      description:
        "Handled data collection, entry, validation, and daily reporting while improving process efficiency.",
      color: "from-blue-600 to-indigo-700",
    },
  ];

  const achievements = [
    {
      title: "Bangkit 2023 Graduate",
      description: "Mobile Development Cohort",
      icon: <Award className="text-blue-400" size={24} />,
    },
    {
      title: "GPA 3.7/4.0",
      description: "Information Systems Program",
      icon: <Star className="text-cyan-400" size={24} />,
    },
    {
      title: "Leadership Experience",
      description: "Head of Research & Technology",
      icon: <Users className="text-indigo-400" size={24} />,
    },
    {
      title: "Multi-Platform Developer",
      description: "Mobile & Web Development",
      icon: <Code className="text-purple-400" size={24} />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Dark Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-slate-900/90 backdrop-blur-xl border-b border-blue-500/20 z-50 shadow-lg shadow-blue-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Heru Aryasuta
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "skills", label: "Skills" },
                { id: "projects", label: "Projects" },
                { id: "experience", label: "Experience" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative py-2 px-4 rounded-xl transition-all duration-300 font-medium ${
                    activeSection === item.id
                      ? "text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/50"
                      : "text-slate-300 hover:text-blue-400 hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl hover:bg-slate-800 transition-colors"
            >
              {isMenuOpen ? (
                <X size={24} className="text-slate-300" />
              ) : (
                <Menu size={24} className="text-slate-300" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-6 border-t border-blue-500/20">
              <div className="flex flex-col space-y-4">
                {[
                  { id: "home", label: "Home" },
                  { id: "about", label: "About" },
                  { id: "skills", label: "Skills" },
                  { id: "projects", label: "Projects" },
                  { id: "experience", label: "Experience" },
                  { id: "contact", label: "Contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left py-3 px-4 rounded-xl transition-all duration-200 font-medium ${
                      activeSection === item.id
                        ? "text-white bg-gradient-to-r from-blue-500 to-indigo-600"
                        : "text-slate-300 hover:text-blue-400 hover:bg-slate-800"
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

      {/* Dark Hero Section */}
      <section id="home" className="pt-32 pb-24 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full text-blue-300 font-medium mb-8 border border-blue-400/30">
              <Sparkles size={16} />
              Available for opportunities
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-clip-text text-transparent">
                Heru
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Aryasuta
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-6 max-w-4xl mx-auto leading-relaxed font-light">
              Information Systems Graduate | Android & Backend Developer
            </p>

            <p className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto">
              Bangkit 2023 Graduate specializing in mobile development with
              Kotlin & Flutter, backed by strong backend engineering skills and
              system analysis expertise
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://drive.google.com/file/d/1opuPTAVH1l-8-UtsX0DMyWrLOo9jCWPV/view?usp=sharing"
                target="_blank"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 font-semibold text-lg"
              >
                <Download size={20} className="group-hover:animate-bounce" />
                View Resume
              </a>
              <button
                onClick={() => scrollToSection("projects")}
                className="group inline-flex items-center gap-3 bg-slate-800 text-slate-200 px-8 py-4 rounded-2xl border-2 border-slate-700 hover:border-blue-500 hover:bg-slate-700 transition-all duration-300 font-semibold text-lg"
              >
                <ExternalLink
                  size={20}
                  className="group-hover:rotate-45 transition-transform duration-300"
                />
                View My Work
              </button>
            </div>
          </div>

          {/* Achievement Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 text-center group"
              >
                <div className="mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon}
                </div>
                <h4 className="font-bold text-slate-200 mb-1">
                  {achievement.title}
                </h4>
                <p className="text-sm text-slate-400">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark About Section */}
      <section
        id="about"
        className="py-24 bg-gradient-to-br from-slate-900 to-slate-950"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="w-full max-w-md mx-auto">
                {/* Profile Image Container */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl blur-2xl opacity-20"></div>
                  <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl shadow-2xl border border-blue-500/20">
                    <div className="w-full h-80 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center">
                      <User size={120} className="text-blue-400" />
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full shadow-lg"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-bold text-slate-100 mb-6">
                  About Me
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-8"></div>
              </div>

              <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-blue-400 first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                  I'm a passionate Information Systems graduate from Universitas
                  Malikussaleh with a strong foundation in mobile and backend
                  development. As a Bangkit 2023 Mobile Development graduate,
                  I've gained hands-on experience building Android applications
                  using Kotlin and Jetpack Compose.
                </p>

                <p>
                  My expertise spans across Android development with Kotlin,
                  cross-platform development with Flutter, and robust backend
                  systems with Laravel. I'm particularly passionate about
                  creating efficient, user-centered applications that solve
                  real-world problems.
                </p>

                <p>
                  Beyond technical skills, I've demonstrated leadership as Head
                  of Research and Technology at HIMASI, where I initiated
                  EduTech programs, organized technology workshops, and led
                  digital transformation projects. I believe in continuous
                  learning and staying at the forefront of technology trends.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href="https://www.linkedin.com/in/heru-aryasuta/"
                  target="_blank"
                  className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 group"
                >
                  <Linkedin
                    size={24}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </a>
                <a
                  href="https://github.com/HeruAryasuta"
                  target="_blank"
                  className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-2xl flex items-center justify-center hover:shadow-lg hover:shadow-slate-500/50 transition-all duration-300 group border border-slate-600"
                >
                  <Github
                    size={24}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </a>
                <a
                  href="mailto:aryasutaheru08@gmail.com"
                  className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl flex items-center justify-center hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 group"
                >
                  <Mail
                    size={24}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Skills Section */}
      <section id="skills" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-100 mb-6">
              Skills & Expertise
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Comprehensive technical skills developed through academic study,
              professional projects, and continuous learning
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl shadow-lg border border-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>

                <div className="relative z-10">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <h3 className="font-bold text-slate-100 mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-blue-400 font-medium mb-4">
                    {skill.category}
                  </p>

                  {/* Skill level indicator */}
                  <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-400">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Projects Section */}
      <section
        id="projects"
        className="py-24 bg-gradient-to-br from-slate-900 to-slate-950"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-100 mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              A collection of projects showcasing my expertise in mobile
              development, web applications, and system design
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-slate-900 rounded-3xl shadow-lg border border-blue-500/20 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-500/90 text-white text-sm font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        project.status === "Completed"
                          ? "bg-green-500/90 text-white"
                          : "bg-amber-500/90 text-white"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 text-sm font-medium rounded-xl border border-blue-400/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      className="group/link flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors duration-200 font-medium"
                    >
                      <Github
                        size={18}
                        className="group-hover/link:rotate-12 transition-transform duration-300"
                      />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      className="group/link flex items-center gap-2 text-slate-300 hover:text-indigo-400 transition-colors duration-200 font-medium"
                    >
                      <ExternalLink
                        size={18}
                        className="group-hover/link:rotate-12 transition-transform duration-300"
                      />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Experience Section */}
      <section id="experience" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-100 mb-6">
              Experience & Education
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              My professional journey through education, internships, leadership
              roles, and specialized training programs
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mt-6"></div>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="group relative">
                {/* Timeline connector */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-16 bg-gradient-to-b from-blue-400 to-indigo-400 hidden md:block"></div>
                )}

                <div className="flex gap-8 items-start bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl shadow-lg border border-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${exp.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {exp.type === "education" && (
                        <GraduationCap className="text-white" size={28} />
                      )}
                      {exp.type === "certification" && (
                        <Award className="text-white" size={28} />
                      )}
                      {exp.type === "experience" && (
                        <Briefcase className="text-white" size={28} />
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <h3 className="text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 text-sm font-medium rounded-full border border-blue-400/30">
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                        {exp.period}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-semibold text-slate-200">
                        {exp.organization}
                      </span>
                      {exp.gpa && (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded-full border border-green-400/30">
                          GPA: {exp.gpa}
                        </span>
                      )}
                    </div>

                    <p className="text-slate-300 leading-relaxed text-lg">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Contact Section */}
      <section
        id="contact"
        className="py-24 bg-gradient-to-br from-slate-900 to-slate-950 text-white relative overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Let's Create Something Amazing
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Ready to bring your ideas to life? I'm available for exciting
              opportunities and collaborations.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Get In Touch
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  I'm always excited to discuss new projects, innovative ideas,
                  or opportunities to contribute to your team. Whether you need
                  a mobile app, backend system, or technical consultation, let's
                  connect and explore the possibilities.
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-2xl border border-blue-500/20 backdrop-blur-sm hover:bg-slate-800 transition-colors duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Email</p>
                    <p className="text-white font-medium">
                      aryasutaheru08@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-2xl border border-blue-500/20 backdrop-blur-sm hover:bg-slate-800 transition-colors duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Phone</p>
                    <p className="text-white font-medium">0851-9114-4277</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-2xl border border-blue-500/20 backdrop-blur-sm hover:bg-slate-800 transition-colors duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Location</p>
                    <p className="text-white font-medium">
                      Lhokseumawe, Indonesia
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                <a
                  href="https://github.com/HeruAryasuta"
                  target="_blank"
                  className="group w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl flex items-center justify-center hover:shadow-2xl hover:shadow-slate-500/25 transition-all duration-300 border border-slate-600"
                >
                  <Github
                    size={28}
                    className="text-white group-hover:scale-110 transition-transform duration-300"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/heru-aryasuta/"
                  target="_blank"
                  className="group w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 border border-blue-500/30"
                >
                  <Linkedin
                    size={28}
                    className="text-white group-hover:scale-110 transition-transform duration-300"
                  />
                </a>
                <a
                  href="mailto:aryasutaheru08@gmail.com"
                  className="group w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-500 rounded-2xl flex items-center justify-center hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 border border-indigo-500/30"
                >
                  <Mail
                    size={28}
                    className="text-white group-hover:scale-110 transition-transform duration-300"
                  />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              
              {formStatus.success && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-2xl text-green-300 flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {formStatus.error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-2xl text-red-300 flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  {formStatus.error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-slate-300 font-medium mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-slate-900/50 border border-blue-500/20 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors duration-300 text-white placeholder-slate-500 backdrop-blur-sm"
                    placeholder="Your Name"
                    disabled={formStatus.loading}
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-slate-900/50 border border-blue-500/20 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors duration-300 text-white placeholder-slate-500 backdrop-blur-sm"
                    placeholder="your.email@example.com"
                    disabled={formStatus.loading}
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-6 py-4 bg-slate-900/50 border border-blue-500/20 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors duration-300 text-white placeholder-slate-500 resize-none backdrop-blur-sm"
                    placeholder="Tell me about your project or just say hello..."
                    disabled={formStatus.loading}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formStatus.loading}
                  className="group w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus.loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send
                        size={20}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Footer */}
      <footer className="py-12 bg-slate-950 text-white border-t border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                Heru Aryasuta
              </div>
              <p className="text-slate-400">
                Information Systems Graduate • Mobile & Backend Developer
              </p>
            </div>

            <div className="flex items-center gap-6">
              <p className="text-slate-400">
                &copy; 2024 Heru Aryasuta. All rights reserved.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/HeruAryasuta"
                  target="_blank"
                  className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/heru-aryasuta/"
                  target="_blank"
                  className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;