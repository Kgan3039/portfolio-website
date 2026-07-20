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
              className="group relative mb-8 p-8 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--border-muted)] transition-all duration-300 hover:translate-y-[-2px]"
            >
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-full text-xs font-medium text-[var(--text-secondary)] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]"></span>
                In active development — preparing for UW–Madison launch
              </div>

              <div className="grid lg:grid-cols-[1fr,1.5fr] gap-8">
                {/* Left Column - Overview */}
                <div>
                  <h3 className="text-2xl font-medium text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent-primary)] transition-colors">
                    Studi
                  </h3>
                  
                  <p className="text-[var(--text-secondary)] text-base mb-6 leading-relaxed">
                    A study coordination platform helping UW–Madison students discover relevant study sessions and connect with classmates.
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-wide text-[var(--text-tertiary)] mb-3 font-medium">Technology</p>
                    <div className="flex flex-wrap gap-2">
                      {['React Native', 'Expo', 'TypeScript', 'Firebase Auth', 'Firestore', 'Expo Router', 'PostHog'].map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Role */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-[var(--text-tertiary)] mb-2 font-medium">My Role</p>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      Building the mobile application and backend architecture, including authentication, session discovery, matching logic, messaging workflows, analytics instrumentation, and reliability improvements.
                    </p>
                  </div>
                </div>

                {/* Right Column - Engineering Highlights */}
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--text-tertiary)] mb-4 font-medium">Engineering Highlights</p>
                  <div className="space-y-4">
                    {[
                      {
                        title: 'Session Discovery & Matching',
                        desc: 'Designed class- and preference-aware session discovery and matching workflows'
                      },
                      {
                        title: 'Real-time Synchronization',
                        desc: 'Built real-time session, messaging, and user-state synchronization with Firestore'
                      },
                      {
                        title: 'Safety & Privacy',
                        desc: 'Added rate limiting, moderation/reporting foundations, and privacy-focused access controls'
                      },
                      {
                        title: 'Analytics Instrumentation',
                        desc: 'Instrumented onboarding, session creation, joining, and messaging funnels through PostHog'
                      }
                    ].map((highlight, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-md"
                      >
                        <h4 className="text-sm font-medium text-[var(--text-primary)] mb-1.5">
                          {highlight.title}
                        </h4>
                        <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">
                          {highlight.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Supporting Projects Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* AI Market Sentiment Dashboard */}
              <motion.div
                variants={itemVariants}
                className="group relative p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--border-muted)] transition-all duration-300 hover:translate-y-[-2px]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-medium text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                      AI Market Sentiment Dashboard
                    </h3>
                    <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide font-medium">
                      Completed team project / working MVP
                    </p>
                  </div>
                  <a
                    href="https://github.com/Kgan3039/ai-market-sentiment-dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    <Github size={20} />
                  </a>
                </div>

                <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">
                  A market intelligence dashboard that combines financial headlines, sentiment analysis, market data, and ML prediction outputs.
                </p>

                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wide text-[var(--text-tertiary)] mb-2 font-medium">Key Contributions</p>
                  <ul className="space-y-1.5 text-sm text-[var(--text-tertiary)]">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--accent-primary)] mt-0.5">→</span>
                      <span>Developed backend/frontend API contracts supporting real-time financial headlines and ML outputs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--accent-primary)] mt-0.5">→</span>
                      <span>Built market data ingestion pipelines and dashboard visualization systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--accent-primary)] mt-0.5">→</span>
                      <span>Coordinated full-stack development across a 5-member engineering team</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
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
                className="group relative p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--border-muted)] transition-all duration-300 hover:translate-y-[-2px]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-medium text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                      TrueNeed
                    </h3>
                    <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide font-medium">
                      Hackathon project
                    </p>
                  </div>
                  <a
                    href="https://github.com/Kgan3039/TrueNeed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    <Github size={20} />
                  </a>
                </div>

                <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">
                  A real-time mutual-aid platform with request/offer posting, resource matching, authentication, and synchronized feeds.
                </p>

                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wide text-[var(--text-tertiary)] mb-2 font-medium">What Made It Hard</p>
                  <ul className="space-y-1.5 text-sm text-[var(--text-tertiary)]">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--accent-primary)] mt-0.5">→</span>
                      <span>Built during hackathon with 80+ participants — shipped in 24 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--accent-primary)] mt-0.5">→</span>
                      <span>Designed Firestore-backed matching systems and real-time database synchronization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--accent-primary)] mt-0.5">→</span>
                      <span>Implemented authentication workflows and live user interactions under time pressure</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* Placeholder sections */}
      <section id="experience" className="py-20 section-container">
        <div className="h-96 flex items-center justify-center border border-[var(--border-subtle)] rounded-lg">
          <p className="text-[var(--text-tertiary)]">Experience Section (Stage 4)</p>
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
