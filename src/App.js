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
  GraduationCap,
  Award,
  Briefcase,
  Send,
} from "lucide-react";

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
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

      if (response.ok) {
        setFormStatus({
          loading: false,
          success: true,
          error: ""
        });
        setFormData({
          name: "",
          email: "",
          message: ""
        });
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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-medium text-gray-900">
              Heru Aryasuta
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
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
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "text-gray-900 bg-gray-100"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? (
                <X size={24} className="text-gray-900" />
              ) : (
                <Menu size={24} className="text-gray-900" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
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
                    className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? "text-gray-900 bg-gray-100"
                        : "text-gray-600"
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

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Heru Aryasuta
            </h1>

            <p className="text-xl text-gray-600 mb-4">
              Information Systems Graduate | Android & Backend Developer
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Bangkit 2023 Graduate specializing in mobile development with
              Kotlin & Flutter, backed by strong backend engineering skills and
              system analysis expertise
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://drive.google.com/file/d/1opuPTAVH1l-8-UtsX0DMyWrLOo9jCWPV/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Download size={18} />
                Resume
              </a>
              <button
                onClick={() => scrollToSection("projects")}
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ExternalLink size={18} />
                View Work
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="aspect-square bg-gray-200 rounded-2xl flex items-center justify-center">
                <img
                  src="/pict.jpg"
                  alt="Heru Aryasuta"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About Me
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
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
                  digital transformation projects.
                </p>
              </div>

              <div className="flex gap-3 mt-8">
                <a
                  href="https://www.linkedin.com/in/heru-aryasuta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Linkedin size={20} className="text-gray-700" />
                </a>
                <a
                  href="https://github.com/HeruAryasuta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Github size={20} className="text-gray-700" />
                </a>
                <a
                  href="mailto:aryasutaheru08@gmail.com"
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Mail size={20} className="text-gray-700" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Skills & Expertise
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="border border-gray-200 p-6 rounded-xl hover:border-gray-300 transition-colors"
              >
                <div className="text-2xl mb-3">{skill.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {skill.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{skill.category}</p>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-gray-900 h-1.5 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Featured Projects
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors"
              >
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
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
                      className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                    >
                      <Github size={16} />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
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

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Experience & Education
          </h2>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="border border-gray-200 p-6 rounded-xl hover:border-gray-300 transition-colors"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {exp.type === "education" && (
                        <GraduationCap className="text-gray-700" size={24} />
                      )}
                      {exp.type === "certification" && (
                        <Award className="text-gray-700" size={24} />
                      )}
                      {exp.type === "experience" && (
                        <Briefcase className="text-gray-700" size={24} />
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {exp.title}
                      </h3>
                      <span className="text-sm text-gray-500">{exp.period}</span>
                    </div>

                    <p className="text-gray-700 font-medium mb-2">
                      {exp.organization}
                      {exp.gpa && (
                        <span className="ml-2 text-sm text-gray-500">
                          • GPA: {exp.gpa}
                        </span>
                      )}
                    </p>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Get In Touch
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                I'm always excited to discuss new projects, innovative ideas,
                or opportunities to contribute to your team. Feel free to reach out.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-400" size={20} />
                  <span className="text-gray-700">aryasutaheru08@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-gray-400" size={20} />
                  <span className="text-gray-700">0851-9114-4277</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-gray-400" size={20} />
                  <span className="text-gray-700">Lhokseumawe, Indonesia</span>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <a
                  href="https://github.com/HeruAryasuta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Github size={20} className="text-gray-700" />
                </a>
                <a
                  href="https://www.linkedin.com/in/heru-aryasuta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Linkedin size={20} className="text-gray-700" />
                </a>
                <a
                  href="mailto:aryasutaheru08@gmail.com"
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Mail size={20} className="text-gray-700" />
                </a>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              {formStatus.success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {formStatus.error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {formStatus.error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                    placeholder="Your Name"
                    disabled={formStatus.loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                    placeholder="your.email@example.com"
                    disabled={formStatus.loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors resize-none"
                    placeholder="Your message..."
                    disabled={formStatus.loading}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={formStatus.loading}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
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

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <div className="font-medium text-gray-900">Heru Aryasuta</div>
              <p className="text-sm text-gray-600">
                Information Systems Graduate • Mobile & Backend Developer
              </p>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-600">
                © 2025 All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;