'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion, useScroll, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, FileText, Menu, X, ArrowUpRight, ExternalLink, Brain, Cpu, Activity } from 'lucide-react'
import Image from 'next/image'

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('projects')
  const [lightboxImage, setLightboxImage] = useState(null)
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

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (lightboxImage) {
          setLightboxImage(null)
        } else if (isMenuOpen) {
          setIsMenuOpen(false)
        }
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [lightboxImage, isMenuOpen])

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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-6xl w-full"
            >
              <Image
                src={lightboxImage}
                alt="Project preview"
                width={1920}
                height={1080}
                className="w-full h-auto rounded-lg"
              />
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 rounded-full text-xs font-medium text-[var(--accent-primary)] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]"></span>
                In Active Development
              </div>

              <div className="grid lg:grid-cols-[1.2fr,1fr] gap-8">
                <div>
                  <h3 className="text-2xl font-medium text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                    Studi
                  </h3>
                  
                  <p className="text-[var(--text-secondary)] text-sm font-medium mb-3">
                    Study coordination for UW–Madison students
                  </p>
                  
                  <p className="text-[var(--text-tertiary)] text-sm mb-6 leading-relaxed">
                    Connects students with study sessions based on class enrollment and preferences. Solving session discovery and peer coordination at scale.
                  </p>

                  <div className="mb-6 pb-6 border-b border-[var(--border-subtle)]">
                    <p className="text-xs font-medium text-[var(--text-primary)] mb-2">What I Built</p>
                    <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">
                      Mobile app and backend: authentication, class-aware matching, real-time messaging, analytics, and moderation.
                    </p>
                  </div>

                  <div className="space-y-2 mb-6">
                    <p className="text-xs uppercase tracking-wide text-[var(--text-tertiary)] font-medium">Key Systems</p>
                    {[
                      'Session discovery with class-based matching',
                      'Real-time sync via Firestore',
                      'Rate limiting and privacy controls',
                      'Funnel instrumentation with PostHog'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-[var(--accent-primary)] mt-0.5 text-xs">→</span>
                        <span className="text-[var(--text-tertiary)]">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {['React Native', 'TypeScript', 'Firebase', 'Firestore', 'PostHog'].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* iPhone with Real Screenshot */}
                <div className="hidden lg:flex items-center justify-center">
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    onClick={() => setLightboxImage('/project-images/studi-mobile.png')}
                    className="relative w-full max-w-xs aspect-[9/19] bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-[2.5rem] p-3 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                  >
                    <div className="w-full h-full bg-[var(--bg-primary)] rounded-[2rem] border border-[var(--border-subtle)] overflow-hidden">
                      <Image
                        src="/project-images/studi-mobile.png"
                        alt="Studi mobile app showing Good evening Kartik, upcoming study sessions, and class schedule"
                        width={375}
                        height={812}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[var(--bg-primary)] rounded-b-2xl z-10"></div>
                  </motion.div>
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
                      Completed • Team project
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
                  Real-time AI pipeline: financial headlines → FinBERT sentiment → market data → ML predictions → unified dashboard.
                </p>

                {/* Browser Preview */}
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                  onClick={() => setLightboxImage('/project-images/ai-dashboard.png')}
                  className="mb-4 rounded-md border border-[var(--border-subtle)] overflow-hidden bg-[var(--bg-tertiary)] cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="h-6 bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] flex items-center px-3 gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="p-2">
                    <Image
                      src="/project-images/ai-dashboard.png"
                      alt="AI Market Sentiment Dashboard with sentiment analysis, probability mix, NVDA price history, and market headlines"
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>

                <div className="space-y-1.5 mb-4">
                  {[
                    'Backend/frontend API contracts for real-time data',
                    'Market data pipelines with validation',
                    'Coordinated 5-member team development'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-[var(--accent-primary)] mt-0.5 text-xs">→</span>
                      <span className="text-[var(--text-tertiary)]">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {['FastAPI', 'React', 'Python', 'FinBERT', 'NLP'].map((tech) => (
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
                      Hackathon • 24 hours
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
                  Real-time mutual-aid platform: request/offer posting, Firestore matching, live feed sync.
                </p>

                <div className="space-y-1.5 mb-4">
                  {[
                    'Shipped complete platform in 24 hours',
                    'Real-time matching and database sync',
                    'Authentication and live interactions'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-[var(--accent-primary)] mt-0.5 text-xs">→</span>
                      <span className="text-[var(--text-tertiary)]">{item}</span>
                    </div>
                  ))}
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

              {/* CNN Image Recognition - Typography/Icon Focused */}
              <motion.div
                variants={itemVariants}
                className="group relative p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--accent-primary)]/30 transition-all duration-300 hover:translate-y-[-2px] md:col-span-2"
              >
                <div className="grid md:grid-cols-[1fr,auto] gap-8">
                  <div>
                    <h3 className="text-xl font-medium text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-primary)] transition-colors">
                      CNN Image Recognition for Medical Imaging
                    </h3>
                    <p className="text-xs text-[var(--text-tertiary)] font-medium mb-4">
                      Research project
                    </p>

                    <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed max-w-2xl">
                      Convolutional neural network for medical image classification using transfer learning and data augmentation.
                    </p>

                    <div className="space-y-1.5 mb-4">
                      {[
                        'Transfer learning from pre-trained models',
                        'Data preprocessing with augmentation',
                        'Cross-validation and performance metrics'
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-[var(--accent-primary)] mt-0.5 text-xs">→</span>
                          <span className="text-[var(--text-tertiary)]">{item}</span>
                        </div>
                      ))}
                    </div>

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

                  {/* Icon Visual */}
                  <div className="hidden md:flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4 p-8">
                      <div className="relative">
                        <Brain size={48} className="text-[var(--accent-primary)]/30" />
                        <Cpu size={32} className="absolute -bottom-2 -right-2 text-[var(--accent-primary)]/50" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity size={20} className="text-[var(--accent-primary)]/40" />
                        <span className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] font-medium">CNN</span>
                      </div>
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

      {/* About Section */}
      <section id="about" className="py-20 sm:py-24">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[var(--text-primary)] mb-3">
                About
              </h2>
              <p className="text-[var(--text-secondary)] text-lg">
                Building systems that work reliably at scale.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="max-w-3xl">
              <p className="text-[var(--text-tertiary)] text-base leading-relaxed mb-6">
                I'm a Computer Science and Data Science student at UW–Madison focused on backend systems, mobile applications, and data pipelines. I build products that turn complex workflows into reliable, maintainable systems.
              </p>
              
              <p className="text-[var(--text-tertiary)] text-base leading-relaxed mb-6">
                My work spans real-time data synchronization, class-based matching algorithms, sentiment analysis pipelines, and mobile-first architectures. I care about system design, clean abstractions, and delivering features that users can trust.
              </p>

              <p className="text-[var(--text-tertiary)] text-base leading-relaxed">
                Currently building Studi — a study coordination platform for UW–Madison students that solves session discovery and peer matching at scale.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Technical Profile Section */}
      <section className="py-20 sm:py-24 bg-[var(--bg-secondary)]/30">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[var(--text-primary)] mb-3">
                Technical Profile
              </h2>
              <p className="text-[var(--text-secondary)] text-lg">
                Tools and technologies I work with to build reliable systems.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Languages */}
              <motion.div variants={itemVariants} className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg">
                <h3 className="text-sm uppercase tracking-wide text-[var(--text-primary)] font-medium mb-4">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'TypeScript', 'JavaScript', 'Java', 'SQL', 'C++'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Backend & Data */}
              <motion.div variants={itemVariants} className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg">
                <h3 className="text-sm uppercase tracking-wide text-[var(--text-primary)] font-medium mb-4">
                  Backend & Data
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['FastAPI', 'Node.js', 'Firebase', 'PostgreSQL', 'MongoDB', 'Firestore', 'Redis'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Frontend & Mobile */}
              <motion.div variants={itemVariants} className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg">
                <h3 className="text-sm uppercase tracking-wide text-[var(--text-primary)] font-medium mb-4">
                  Frontend & Mobile
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['React Native', 'React', 'Next.js', 'Tailwind CSS', 'Framer Motion'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* ML & AI */}
              <motion.div variants={itemVariants} className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg">
                <h3 className="text-sm uppercase tracking-wide text-[var(--text-primary)] font-medium mb-4">
                  ML & AI
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['TensorFlow', 'Keras', 'PyTorch', 'scikit-learn', 'Pandas', 'NumPy', 'FinBERT'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Tools & Platforms */}
              <motion.div variants={itemVariants} className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg md:col-span-2">
                <h3 className="text-sm uppercase tracking-wide text-[var(--text-primary)] font-medium mb-4">
                  Tools & Platforms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Git', 'Docker', 'AWS', 'Vercel', 'PostHog', 'Jupyter', 'VS Code', 'Linux'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-24">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[var(--text-primary)] mb-4">
                Get in Touch
              </h2>
              <p className="text-[var(--text-secondary)] text-lg mb-8">
                Open to discussing projects, collaborations, or opportunities.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href="mailto:kgangwar@wisc.edu"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-primary)] text-white rounded-md hover:bg-[var(--accent-primary)]/90 transition-colors font-medium"
              >
                Email Me
              </a>
              <a
                href="/2026GangwarKartikResume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-md hover:border-[var(--accent-primary)]/30 transition-colors font-medium"
              >
                <FileText size={18} />
                View Resume
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-center gap-6">
              <a
                href="https://github.com/Kgan3039"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
              >
                <Github size={20} />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/kartik-gangwar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
              >
                <Linkedin size={20} />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-[var(--border-subtle)]">
              <p className="text-sm text-[var(--text-tertiary)]">
                © 2026 Kartik Gangwar. Built with Next.js and Tailwind CSS.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
