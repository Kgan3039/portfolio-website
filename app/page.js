'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Github, Linkedin, FileText, Menu, X, ArrowUpRight, ExternalLink } from 'lucide-react'

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('projects')
  const shouldReduceMotion = useReducedMotion()
  
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      const sections = ['projects', 'experience', 'about', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
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
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setIsMenuOpen(false)
    }
  }

  const navLinks = [
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ]

  const fadeInUp = shouldReduceMotion ? {} : {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1] }
  }

  const containerVariants = shouldReduceMotion ? {} : {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0, 0, 0.2, 1] }
    }
  }

  return (
    <div className="min-h-screen">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-[var(--accent-primary)] origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled ? 'bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border-subtle)]' : 'bg-transparent'
      }`}>
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[var(--text-primary)] font-medium text-lg hover:text-[var(--accent-primary)] transition-colors duration-150"
            >
              Kartik Gangwar
            </button>

            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`relative px-3 py-2 text-sm transition-colors duration-150 ${
                      activeSection === link.id
                        ? 'text-[var(--text-primary)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {link.label}
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-primary)]"
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      />
                    )}
                  </button>
                ))}
              </div>
              
              <a
                href="/2026GangwarKartikResume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary text-sm"
              >
                Resume
              </a>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]"
          >
            <div className="section-container py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left px-4 py-3 rounded-md transition-colors ${
                    activeSection === link.id
                      ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="/2026GangwarKartikResume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full mt-4"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="section-container">
          <div className="max-w-3xl">
            <motion.h1
              {...fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--text-primary)] mb-4"
            >
              Kartik Gangwar
            </motion.h1>

            <motion.p
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.1 }}
              className="text-xl sm:text-2xl text-[var(--text-secondary)] mb-6"
            >
              I build systems that turn complex workflows into reliable products.
            </motion.p>

            <motion.p
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="text-base sm:text-lg text-[var(--text-tertiary)] leading-relaxed mb-8 max-w-2xl"
            >
              Computer Science and Data Science at UW–Madison. I work on backend systems, mobile products, data pipelines, and machine-learning applications.
            </motion.p>

            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              {/* Currently Building - Flagship */}
              <a
                href="#studi"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('studi')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }}
                className="group inline-flex items-center gap-3 px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-md hover:border-[var(--accent-primary)] hover:bg-[var(--bg-elevated)] transition-all duration-200"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse"></span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">Currently Building</span>
                </span>
                <span className="text-sm text-[var(--accent-primary)] font-medium">Studi</span>
                <ArrowUpRight size={14} className="text-[var(--accent-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <div className="hidden sm:block w-px h-4 bg-[var(--border-subtle)]"></div>

              <div className="flex items-center gap-4">
                <a
                  href="/2026GangwarKartikResume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <FileText size={16} />
                  <span>Resume</span>
                </a>
                <a
                  href="https://github.com/Kgan3039"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/kartik-gangwar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-20 sm:py-24">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[var(--text-primary)] mb-3">
                Featured Work
              </h2>
              <p className="text-[var(--text-secondary)] text-lg">
                Building products that solve real problems through reliable systems.
              </p>
            </motion.div>

            {/* Flagship Project - Studi */}
            <motion.div
              id="studi"
              variants={itemVariants}
              className="group relative mb-8 p-8 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--accent-primary)]/30 transition-all duration-300 hover:translate-y-[-2px]"
            >
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 rounded-full text-xs font-medium text-[var(--accent-primary)] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]"></span>
                In Active Development
              </div>

              <div className="grid lg:grid-cols-[1.2fr,1fr] gap-8">
                {/* Left Column - Story */}
                <div>
                  <h3 className="text-2xl font-medium text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent-primary)] transition-colors">
                    Studi
                  </h3>
                  
                  <p className="text-[var(--text-secondary)] text-sm font-medium mb-2">
                    Study coordination platform for UW–Madison students
                  </p>
                  
                  <p className="text-[var(--text-tertiary)] text-base mb-6 leading-relaxed">
                    Connects students with relevant study sessions based on class enrollment and preferences. Built to solve session discovery and peer coordination at scale.
                  </p>

                  <div className="mb-6 pb-6 border-b border-[var(--border-subtle)]">
                    <p className="text-sm font-medium text-[var(--text-primary)] mb-3">What I Built</p>
                    <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">
                      Mobile application and backend architecture: authentication, class-aware session matching, real-time messaging, analytics instrumentation, and moderation foundations.
                    </p>
                  </div>

                  {/* Engineering Highlights - Compact */}
                  <div className="space-y-3 mb-6">
                    <p className="text-xs uppercase tracking-wide text-[var(--text-tertiary)] font-medium">Engineering Focus</p>
                    <div className="space-y-2">
                      {[
                        'Session discovery with class and preference-based matching',
                        'Real-time sync for sessions, messages, and user state via Firestore',
                        'Rate limiting, reporting workflows, and privacy-focused access controls',
                        'Onboarding and engagement funnel instrumentation with PostHog'
                      ].map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-[var(--accent-primary)] mt-1 text-xs">→</span>
                          <span className="text-[var(--text-tertiary)] leading-relaxed">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-[var(--text-tertiary)] mb-2 font-medium">Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {['React Native', 'Expo', 'TypeScript', 'Firebase', 'Firestore', 'PostHog'].map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Visual Placeholder */}
                <div className="hidden lg:flex items-center justify-center">
                  <div className="relative w-full max-w-xs aspect-[9/19] bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-[2.5rem] p-3 shadow-lg">
                    {/* iPhone Frame */}
                    <div className="w-full h-full bg-[var(--bg-primary)] rounded-[2rem] border border-[var(--border-subtle)] flex items-center justify-center">
                      <div className="text-center px-8">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30 flex items-center justify-center">
                          <span className="text-2xl">📚</span>
                        </div>
                        <p className="text-xs text-[var(--text-tertiary)]">
                          Studi
                          <br />
                          <span className="text-[var(--text-tertiary)]/50">Mockup placeholder</span>
                        </p>
                      </div>
                    </div>
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[var(--bg-primary)] rounded-b-2xl"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Supporting Projects Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* AI Market Sentiment Dashboard */}
              <motion.div
                variants={itemVariants}
                className="group relative p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--accent-primary)]/30 transition-all duration-300 hover:translate-y-[-2px]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-medium text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-primary)] transition-colors">
                      AI Market Sentiment Dashboard
                    </h3>
                    <p className="text-xs text-[var(--text-tertiary)] font-medium">
                      Completed team project
                    </p>
                  </div>
                  <a
                    href="https://github.com/Kgan3039/ai-market-sentiment-dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    <Github size={18} />
                  </a>
                </div>

                <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">
                  Real-time AI pipeline combining financial headlines, FinBERT-based sentiment analysis, market data, and ML prediction outputs into a unified dashboard.
                </p>

                <div className="mb-4 space-y-2">
                  <p className="text-xs uppercase tracking-wide text-[var(--text-tertiary)] font-medium">Engineering Challenge</p>
                  <div className="space-y-1.5">
                    {[
                      'Backend/frontend API contracts for real-time headlines and ML outputs',
                      'Market data ingestion pipelines with validation and error handling',
                      'Coordinated full-stack development across 5-member team'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-[var(--accent-primary)] mt-0.5 text-xs">→</span>
                        <span className="text-[var(--text-tertiary)] leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {['FastAPI', 'React/Vite', 'Python', 'FinBERT', 'NLP'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* TrueNeed */}
              <motion.div
                variants={itemVariants}
                className="group relative p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--accent-primary)]/30 transition-all duration-300 hover:translate-y-[-2px]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-medium text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-primary)] transition-colors">
                      TrueNeed
                    </h3>
                    <p className="text-xs text-[var(--text-tertiary)] font-medium">
                      Hackathon project • 24 hours
                    </p>
                  </div>
                  <a
                    href="https://github.com/Kgan3039/TrueNeed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    <Github size={18} />
                  </a>
                </div>

                <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">
                  Real-time mutual-aid platform with request/offer posting, Firestore-backed resource matching, and live feed synchronization.
                </p>

                <div className="mb-4 space-y-2">
                  <p className="text-xs uppercase tracking-wide text-[var(--text-tertiary)] font-medium">Challenge</p>
                  <div className="space-y-1.5">
                    {[
                      'Built complete platform in 24 hours with 80+ hackathon participants',
                      'Real-time matching system and database synchronization under pressure',
                      'Authentication workflows and live user interactions from scratch'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-[var(--accent-primary)] mt-0.5 text-xs">→</span>
                        <span className="text-[var(--text-tertiary)] leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {['React Native', 'Firebase', 'Firestore', 'TypeScript'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* CNN Image Recognition */}
              <motion.div
                variants={itemVariants}
                className="group relative p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--accent-primary)]/30 transition-all duration-300 hover:translate-y-[-2px] md:col-span-2"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-medium text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-primary)] transition-colors">
                          CNN Image Recognition for Medical Imaging
                        </h3>
                        <p className="text-xs text-[var(--text-tertiary)] font-medium">
                          Research project
                        </p>
                      </div>
                    </div>

                    <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">
                      Convolutional neural network for medical image classification using transfer learning and data augmentation techniques.
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy'].map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wide text-[var(--text-tertiary)] font-medium">Approach</p>
                    <div className="space-y-1.5">
                      {[
                        'Transfer learning from pre-trained models (ResNet, VGG)',
                        'Data preprocessing pipeline with augmentation and normalization',
                        'Model evaluation with cross-validation and performance metrics'
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-[var(--accent-primary)] mt-0.5 text-xs">→</span>
                          <span className="text-[var(--text-tertiary)] leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 sm:py-24 bg-[var(--bg-secondary)]/30">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[var(--text-primary)] mb-3">
                Experience
              </h2>
              <p className="text-[var(--text-secondary)] text-lg">
                Building production systems and shipping reliable software.
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent-primary)] via-[var(--accent-primary)]/50 to-transparent hidden md:block"></div>

              {/* Experience Items */}
              <div className="space-y-12">
                {[
                  {
                    company: 'AI@UW',
                    role: 'Software Engineering Project Manager',
                    time: 'March 2026 – Present',
                    contributions: [
                      'Built full-stack AI market sentiment dashboard across 5-member team using FastAPI, React/Vite, and FinBERT',
                      'Developed backend/frontend API contracts for real-time financial data and ML predictions',
                      'Coordinated deployment reliability and ML service integration debugging'
                    ],
                    impact: 'Shipped working MVP with end-to-end AI pipeline',
                    tech: ['FastAPI', 'React/Vite', 'Python', 'FinBERT']
                  },
                  {
                    company: 'FiPet',
                    role: 'Lead Software Engineer',
                    time: 'October 2025 – Present',
                    contributions: [
                      'Leading technical development for gamified financial literacy platform (300+ downloads)',
                      'Designed backend APIs, authentication systems, and real-time gamification workflows',
                      'Coordinated feature integration across 20-person cross-functional team'
                    ],
                    impact: 'Built scalable mobile architecture with live content systems',
                    tech: ['React Native', 'TypeScript', 'Firebase', 'Firestore']
                  },
                  {
                    company: 'iStart Valley',
                    role: 'Technology Strategy Intern',
                    time: 'June 2023 – September 2023',
                    contributions: [
                      'Developed technical prototypes for VR-based mental health platform',
                      'Designed headset interaction workflows and immersive environments',
                      'Applied lean startup principles and product-market fit analysis'
                    ],
                    impact: 'Evaluated AI-driven product concepts and UX systems',
                    tech: ['VR', 'AI Solutions', 'Product Strategy']
                  },
                  {
                    company: 'STEMShala Enrichment Center',
                    role: 'Software Engineering Instructor',
                    time: 'June 2023 – August 2025',
                    contributions: [
                      'Taught Python, JavaScript, and robotics to 40+ students',
                      'Designed technical lesson plans and engineering exercises',
                      'Built autonomous robotics challenges with sensor integration'
                    ],
                    impact: 'Developed software fundamentals curriculum',
                    tech: ['Python', 'JavaScript', 'Robotics']
                  }
                ].map((exp, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="relative md:pl-12"
                  >
                    {/* Timeline marker */}
                    <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] border-2 border-[var(--bg-primary)] hidden md:block"></div>

                    <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--accent-primary)]/30 transition-all duration-300">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-[var(--text-primary)]">
                            {exp.role}
                          </h3>
                          <p className="text-[var(--accent-primary)] text-sm font-medium">
                            {exp.company}
                          </p>
                        </div>
                        <p className="text-xs text-[var(--text-tertiary)] font-medium">
                          {exp.time}
                        </p>
                      </div>

                      {/* Contributions */}
                      <div className="space-y-2 mb-4">
                        {exp.contributions.map((contribution, cidx) => (
                          <div key={cidx} className="flex items-start gap-2">
                            <span className="text-[var(--accent-primary)] mt-1 text-xs">→</span>
                            <span className="text-sm text-[var(--text-tertiary)] leading-relaxed">
                              {contribution}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Impact */}
                      <div className="mb-4 p-3 bg-[var(--bg-tertiary)]/50 border border-[var(--border-subtle)] rounded">
                        <p className="text-xs uppercase tracking-wide text-[var(--text-tertiary)] mb-1 font-medium">
                          Impact
                        </p>
                        <p className="text-sm text-[var(--text-secondary)]">
                          {exp.impact}
                        </p>
                      </div>

                      {/* Tech */}
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tech.map((tech, tidx) => (
                          <span
                            key={tidx}
                            className="px-2 py-0.5 text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-20 section-container">
        <div className="h-96 flex items-center justify-center border border-[var(--border-subtle)] rounded-lg">
          <p className="text-[var(--text-tertiary)]">About Section (Stage 5)</p>
        </div>
      </section>

      <section id="contact" className="py-20 section-container">
        <div className="h-96 flex items-center justify-center border border-[var(--border-subtle)] rounded-lg">
          <p className="text-[var(--text-tertiary)]">Contact Section (Stage 5)</p>
        </div>
      </section>
    </div>
  )
}
