'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Github, Linkedin, Mail, ExternalLink, Menu, X, ArrowRight, Code, Database, Brain, FileText } from 'lucide-react'

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'projects', 'experience', 'skills', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  // Personal Information
  const personalInfo = {
    name: "Kartik Gangwar",
    tagline: "CS + Data Science @ UW–Madison · Backend Engineer · ML Enthusiast",
    bio: "I'm a Computer Science and Data Science student at the University of Wisconsin–Madison with a passion for artificial intelligence, software engineering, and cloud technologies. I thrive on building scalable applications that solve real-world problems through innovative software solutions and data-driven insights. My experience spans full-stack development, machine learning projects, and cloud infrastructure, with a focus on creating meaningful impact through technology. Whether working in collaborative team environments or tackling independent projects, I'm constantly exploring new ways to leverage AI and modern development practices to build solutions that matter.",
    email: "kartik@example.com",
    github: "https://github.com/kartikgangwar",
    linkedin: "https://linkedin.com/in/kartikgangwar",
    resume: "/resume.pdf"
  }

  const projects = [
    {
      title: "FiPet",
      description: "Led backend development for a pet care application during my SWE internship. Built scalable cloud functions using Firebase and TypeScript, implemented gamification systems to increase user engagement, and architected cloud infrastructure for real-time data synchronization.",
      tech: ["TypeScript", "Firebase Functions", "Firebase", "Cloud Infrastructure", "Node.js"],
      github: "https://github.com/kartikgangwar/fipet",
      demo: null
    },
    {
      title: "TrueNeed",
      description: "Developed a community-driven mobile application at a hackathon that connects people offering help with those in need. Built the entire matching algorithm and real-time notification system, creating seamless user flows for offers and requests with Firebase backend integration.",
      tech: ["React Native", "Firebase", "JavaScript", "Real-time Database"],
      github: "https://github.com/kartikgangwar/trueneed",
      demo: null
    },
    {
      title: "Stock Sentiment ML Model",
      description: "Engineered a machine learning model that analyzes social media sentiment to predict stock price fluctuations. Implemented NLP pipelines for sentiment extraction, trained classification models, and built data processing workflows to handle large-scale social media datasets.",
      tech: ["Python", "NLP", "Machine Learning", "Pandas", "Scikit-learn"],
      github: "https://github.com/kartikgangwar/stock-sentiment",
      demo: null
    }
  ]

  const experiences = [
    {
      title: "Software Engineering Intern",
      company: "FiPet",
      period: "Summer 2024",
      description: "Developed and deployed backend features using Firebase Functions and TypeScript, handling real-time data synchronization for thousands of users. Designed and implemented gamification systems to boost user engagement by 35%. Collaborated with the product team to architect scalable cloud infrastructure and optimize application performance.",
      tech: ["TypeScript", "Firebase", "Cloud Functions", "Node.js"]
    },
    {
      title: "Robotics & JavaScript Instructor",
      company: "Code Ninjas",
      period: "Sept 2023 - May 2024",
      description: "Taught coding fundamentals, robotics programming, and JavaScript to students aged 7-14 in an interactive learning environment. Developed custom curriculum materials and guided students through building their own projects, from basic game development to advanced robot automation challenges.",
      tech: ["JavaScript", "Robotics", "Education Technology", "Curriculum Design"]
    },
    {
      title: "AI/ML Research & Development",
      company: "Independent Projects & Hackathons",
      period: "2023 - Present",
      description: "Built multiple machine learning models and AI-powered applications through hackathons and personal projects. Focused on NLP, sentiment analysis, and predictive modeling. Collaborated with cross-functional teams in fast-paced hackathon environments to deliver working prototypes within 24-48 hour timeframes.",
      tech: ["Python", "Machine Learning", "NLP", "Data Analysis"]
    }
  ]

  const skills = {
    "Languages": ["Java", "Python", "TypeScript", "JavaScript", "SQL", "HTML/CSS"],
    "Frameworks & Libraries": ["React", "React Native", "Next.js", "Node.js", "Firebase", "Scikit-learn", "Pandas"],
    "Tools & Technologies": ["Git", "GitHub", "Docker", "Cloud Functions", "VS Code", "Linux"],
    "Data Science & AI": ["Machine Learning", "Natural Language Processing", "Data Analysis", "Sentiment Analysis", "Statistical Modeling"]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 relative">
      {/* Background pattern overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(148, 163, 184) 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }}></div>
      
      {/* Gradient orbs */}
      <div className="fixed top-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/50 shadow-lg shadow-black/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:from-blue-300 hover:via-purple-400 hover:to-pink-400 transition-all duration-300 relative group"
            >
              {personalInfo.name.split(' ')[0]}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {['home', 'about', 'projects', 'experience', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 relative group ${
                    activeSection === item 
                      ? 'bg-slate-800 text-blue-400' 
                      : 'text-slate-300 hover:text-blue-400 hover:bg-slate-800/50'
                  }`}
                >
                  {item}
                  {activeSection === item && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors relative group"
            >
              {isMenuOpen ? <X size={24} className="text-blue-400" /> : <Menu size={24} className="group-hover:text-blue-400 transition-colors" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-950/98 backdrop-blur-md border-b border-slate-800/50 animate-fade-in">
            <div className="px-4 py-4 space-y-2">
              {['home', 'about', 'projects', 'experience', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left px-4 py-3 rounded-lg capitalize transition-all duration-300 ${
                    activeSection === item
                      ? 'bg-slate-800 text-blue-400'
                      : 'text-slate-300 hover:text-blue-400 hover:bg-slate-800/50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse" style={{ animationDuration: '8s' }}></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in relative z-10">
          <div className="space-y-6">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                {personalInfo.name}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-400 font-light tracking-wide">
              {personalInfo.tagline}
            </p>
          </div>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
            I ship code that scales. Built Firebase backends handling thousands of users at FiPet, 
            trained ML models predicting stock trends, and won hackathons building real-time mobile apps. 
            <span className="text-slate-200 font-semibold"> Seeking Summer 2025 SWE internships.</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white group shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
            >
              <a href={personalInfo.resume} target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-5 w-5" />
                View Resume
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-2 border-slate-700 hover:bg-slate-800 hover:border-blue-500/50 transition-all duration-300"
            >
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </a>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-2 border-slate-700 hover:bg-slate-800 hover:border-purple-500/50 transition-all duration-300"
            >
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative gradient line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
        
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
            About Me
          </h2>
          <div className="space-y-8">
            <p className="text-xl text-slate-300 leading-relaxed">
              {personalInfo.bio}
            </p>
            <p className="text-xl text-slate-300 leading-relaxed">
              Throughout my academic journey at UW–Madison, I've gained hands-on experience building production-ready 
              applications through internships, hackathons, and personal projects. From developing backend systems at 
              FiPet to creating mobile applications and machine learning models, I've learned to approach problems with 
              both technical rigor and creative thinking. I excel in collaborative team environments and am always eager 
              to learn new technologies and frameworks.
            </p>
            <p className="text-xl text-slate-300 leading-relaxed">
              When I'm not coding, you'll find me exploring cutting-edge AI research, contributing to open-source projects, 
              or mentoring students in programming and robotics. I'm actively seeking Summer 2025 internship opportunities 
              where I can contribute to impactful projects while continuing to grow as a software engineer and data scientist.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 bg-slate-900/30 relative">
        {/* Decorative gradient line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
        
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-lg mb-16 max-w-2xl">Building solutions that scale and solve real problems</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className="bg-gradient-to-br from-slate-800/60 to-slate-800/40 border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 group relative overflow-hidden backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500"></div>
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Left border accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Project number badge */}
                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center text-slate-400 text-sm font-semibold group-hover:border-blue-500/50 group-hover:text-blue-400 transition-all duration-300">
                  {index + 1}
                </div>
                
                <CardHeader className="relative z-10 pt-16">
                  <CardTitle className="text-2xl text-slate-100 group-hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                    {project.title}
                    <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-base leading-relaxed mt-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <Badge 
                        key={i} 
                        variant="secondary" 
                        className="bg-slate-700/50 text-slate-300 hover:bg-blue-600/20 hover:text-blue-400 border border-slate-600/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    {project.github && (
                      <Button 
                        asChild
                        variant="outline" 
                        size="sm"
                        className="border-slate-600 hover:bg-blue-600/10 hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300 hover:scale-105"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button 
                        asChild
                        variant="outline" 
                        size="sm"
                        className="border-slate-600 hover:bg-purple-600/10 hover:border-purple-500/50 hover:text-purple-400 transition-all duration-300 hover:scale-105"
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative gradient line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
        
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
            Experience
          </h2>
          <p className="text-slate-400 text-lg mb-16 max-w-2xl">Building products and gaining real-world experience</p>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-10 pb-12 border-l-2 border-slate-700/50 last:pb-0 group">
                {/* Animated dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50 group-hover:shadow-xl group-hover:shadow-blue-500/70 transition-all duration-300"></div>
                
                {/* Glow effect on hover */}
                <div className="absolute -left-[2px] top-[7px] w-1 h-20 bg-gradient-to-b from-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="space-y-4 bg-slate-800/30 p-6 rounded-lg border border-slate-700/30 group-hover:border-blue-500/30 group-hover:bg-slate-800/50 transition-all duration-300">
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-100 group-hover:text-blue-400 transition-colors duration-300">{exp.title}</h3>
                    <p className="text-blue-400 font-medium text-lg mt-1">{exp.company}</p>
                    <p className="text-sm text-slate-500 mt-1">{exp.period}</p>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-lg">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech, i) => (
                      <Badge 
                        key={i} 
                        variant="outline" 
                        className="border-slate-600/50 text-slate-400 hover:border-blue-500/50 hover:text-blue-400 transition-colors duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-4 sm:px-6 lg:px-8 bg-slate-900/30 relative">
        {/* Decorative gradient line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
        
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
            Skills & Technologies
          </h2>
          <p className="text-slate-400 text-lg mb-16 max-w-2xl">Tools I use to bring ideas to life</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items], index) => (
              <Card 
                key={index}
                className="bg-gradient-to-br from-slate-800/60 to-slate-800/40 border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 group relative overflow-hidden backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-purple-500/10"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500"></div>
                
                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl text-slate-100 flex items-center gap-3 group-hover:text-purple-400 transition-colors duration-300">
                    {category === "Languages" && <Code className="h-6 w-6 text-blue-400" />}
                    {category === "Data Science & AI" && <Brain className="h-6 w-6 text-purple-400" />}
                    {category === "Tools & Technologies" && <Database className="h-6 w-6 text-green-400" />}
                    {category === "Frameworks & Libraries" && <Code className="h-6 w-6 text-pink-400" />}
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, i) => (
                      <Badge 
                        key={i}
                        variant="secondary"
                        className="bg-slate-700/50 text-slate-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:text-blue-400 border border-slate-600/50 hover:border-blue-500/50 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative gradient line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
        
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
            Get In Touch
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed px-4">
            I'm currently looking for internship opportunities for Summer 2025. If you have any positions available 
            or just want to chat about tech, feel free to reach out!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-full sm:w-auto shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
            >
              <a href={`mailto:${personalInfo.email}`}>
                <Mail className="mr-2 h-5 w-5" />
                Email Me
              </a>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-2 border-slate-700 hover:bg-slate-800 hover:border-purple-500/50 w-full sm:w-auto transition-all duration-300"
            >
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5" />
                Connect on LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50 bg-gradient-to-b from-slate-950 to-slate-900/50">
        {/* Decorative gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-8">
            {/* Logo/Name */}
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {personalInfo.name}
              </h3>
              <p className="text-slate-400 text-sm">Building the future, one line of code at a time</p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-3 rounded-full bg-slate-800/50 border border-slate-700/50 group-hover:border-blue-500/50 group-hover:bg-slate-800 transition-all duration-300">
                  <Github className="h-5 w-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                </div>
              </a>
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-3 rounded-full bg-slate-800/50 border border-slate-700/50 group-hover:border-blue-500/50 group-hover:bg-slate-800 transition-all duration-300">
                  <Linkedin className="h-5 w-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                </div>
              </a>
              <a 
                href={`mailto:${personalInfo.email}`}
                className="group relative"
              >
                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-3 rounded-full bg-slate-800/50 border border-slate-700/50 group-hover:border-purple-500/50 group-hover:bg-slate-800 transition-all duration-300">
                  <Mail className="h-5 w-5 text-slate-400 group-hover:text-purple-400 transition-colors" />
                </div>
              </a>
            </div>
            
            {/* Copyright */}
            <div className="text-center space-y-2">
              <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
              </p>
              <p className="text-slate-600 text-xs">
                Designed & Built with Next.js, React, and Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
