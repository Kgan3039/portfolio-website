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

  // Placeholder Data - Easy to replace
  const personalInfo = {
    name: "Your Name",
    tagline: "Computer Science & Data Science Student",
    bio: "Passionate about building innovative solutions at the intersection of software engineering and data science. Currently pursuing my degree and actively seeking internship opportunities to apply my skills in real-world projects.",
    email: "your.email@example.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    resume: "/resume.pdf"
  }

  const projects = [
    {
      title: "Machine Learning Model Optimizer",
      description: "Built an automated ML pipeline that improves model performance through hyperparameter tuning and feature engineering, reducing training time by 40%.",
      tech: ["Python", "TensorFlow", "Scikit-learn", "Docker"],
      github: "https://github.com/yourusername/project1",
      demo: "https://demo.example.com"
    },
    {
      title: "Real-Time Data Analytics Dashboard",
      description: "Developed a full-stack dashboard for visualizing real-time data streams with interactive charts and predictive analytics.",
      tech: ["React", "Node.js", "MongoDB", "D3.js"],
      github: "https://github.com/yourusername/project2",
      demo: "https://demo.example.com"
    },
    {
      title: "Natural Language Processing Tool",
      description: "Created an NLP application for sentiment analysis and text classification with 92% accuracy on test datasets.",
      tech: ["Python", "PyTorch", "FastAPI", "React"],
      github: "https://github.com/yourusername/project3",
      demo: "https://demo.example.com"
    },
    {
      title: "Algorithmic Trading Bot",
      description: "Designed and implemented a trading algorithm using statistical analysis and machine learning for market prediction.",
      tech: ["Python", "Pandas", "NumPy", "APIs"],
      github: "https://github.com/yourusername/project4",
      demo: null
    }
  ]

  const experiences = [
    {
      title: "Software Engineering Intern",
      company: "Tech Company Inc.",
      period: "Summer 2024",
      description: "Developed and deployed microservices handling 100K+ daily requests. Collaborated with cross-functional teams to deliver features ahead of schedule.",
      tech: ["Python", "AWS", "Docker", "PostgreSQL"]
    },
    {
      title: "Research Assistant",
      company: "University Research Lab",
      period: "Jan 2024 - Present",
      description: "Working on computer vision research projects. Published findings in conference proceedings. Mentored 3 undergraduate students.",
      tech: ["PyTorch", "OpenCV", "Python", "CUDA"]
    },
    {
      title: "Data Science Intern",
      company: "Analytics Startup",
      period: "Summer 2023",
      description: "Built predictive models for customer behavior analysis. Improved recommendation system accuracy by 25% through feature engineering.",
      tech: ["Python", "SQL", "Scikit-learn", "Tableau"]
    }
  ]

  const skills = {
    "Languages": ["Python", "JavaScript", "Java", "C++", "SQL", "R"],
    "Frameworks & Libraries": ["React", "Node.js", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas"],
    "Tools & Technologies": ["Git", "Docker", "AWS", "MongoDB", "PostgreSQL", "Linux"],
    "Data Science": ["Machine Learning", "Deep Learning", "Data Visualization", "Statistical Analysis", "NLP", "Computer Vision"]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/95 backdrop-blur-sm border-b border-slate-800/50' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-400 transition-all"
            >
              {personalInfo.name.split(' ')[0]}
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {['home', 'about', 'projects', 'experience', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`px-4 py-2 rounded-lg capitalize transition-all ${
                    activeSection === item 
                      ? 'bg-slate-800 text-blue-400' 
                      : 'text-slate-300 hover:text-blue-400 hover:bg-slate-800/50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-950/98 backdrop-blur-sm border-b border-slate-800/50">
            <div className="px-4 py-4 space-y-2">
              {['home', 'about', 'projects', 'experience', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-4 py-3 rounded-lg capitalize text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-400 font-light">
              {personalInfo.tagline}
            </p>
          </div>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Building scalable applications and solving complex problems through code and data.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button 
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white group"
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
              className="border-slate-700 hover:bg-slate-800 hover:border-slate-600"
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
              className="border-slate-700 hover:bg-slate-800 hover:border-slate-600"
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
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="space-y-6">
            <p className="text-lg text-slate-300 leading-relaxed">
              {personalInfo.bio}
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              I have a strong foundation in algorithms, data structures, and system design. My experience spans 
              full-stack development, machine learning, and data analysis. I'm particularly interested in leveraging 
              AI/ML to solve real-world problems and building scalable systems that make a difference.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              When I'm not coding, you can find me contributing to open-source projects, participating in hackathons, 
              or exploring the latest developments in technology and artificial intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className="bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600/50 transition-all duration-300 group"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-slate-100 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <Badge 
                        key={i} 
                        variant="secondary" 
                        className="bg-slate-700/50 text-slate-300 hover:bg-slate-700"
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
                        className="border-slate-700 hover:bg-slate-700 hover:border-slate-600"
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
                        className="border-slate-700 hover:bg-slate-700 hover:border-slate-600"
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
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 pb-8 border-l-2 border-slate-700 last:pb-0">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-100">{exp.title}</h3>
                    <p className="text-blue-400 font-medium">{exp.company}</p>
                    <p className="text-sm text-slate-500">{exp.period}</p>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech, i) => (
                      <Badge 
                        key={i} 
                        variant="outline" 
                        className="border-slate-700 text-slate-400"
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
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items], index) => (
              <Card 
                key={index}
                className="bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60 transition-all"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-slate-100 flex items-center gap-2">
                    {category === "Languages" && <Code className="h-5 w-5 text-blue-400" />}
                    {category === "Data Science" && <Brain className="h-5 w-5 text-purple-400" />}
                    {category === "Tools & Technologies" && <Database className="h-5 w-5 text-green-400" />}
                    {category === "Frameworks & Libraries" && <Code className="h-5 w-5 text-pink-400" />}
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, i) => (
                      <Badge 
                        key={i}
                        variant="secondary"
                        className="bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-blue-400 transition-colors"
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
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            I'm currently looking for internship opportunities for Summer 2025. If you have any positions available 
            or just want to chat about tech, feel free to reach out!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
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
              className="border-slate-700 hover:bg-slate-800 hover:border-slate-600 w-full sm:w-auto"
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
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href={`mailto:${personalInfo.email}`}
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
