'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, FileText, Menu, X } from 'lucide-react'

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('projects')
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      // Update active section based on scroll position
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

  // Animation variants
  const fadeInUp = shouldReduceMotion ? {} : {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1] }
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border-subtle)]' : 'bg-transparent'
      }`}>
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Name */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[var(--text-primary)] font-medium text-lg hover:text-[var(--accent-primary)] transition-colors duration-150"
            >
              Kartik Gangwar
            </button>

            {/* Desktop Navigation */}
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
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
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="section-container">
          <div className="max-w-3xl">
            {/* Name */}
            <motion.h1
              {...fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--text-primary)] mb-4"
            >
              Kartik Gangwar
            </motion.h1>

            {/* Title */}
            <motion.p
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.1 }}
              className="text-xl sm:text-2xl text-[var(--text-secondary)] mb-6"
            >
              Software Engineer building reliable software products.
            </motion.p>

            {/* Description */}
            <motion.p
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="text-base sm:text-lg text-[var(--text-tertiary)] leading-relaxed mb-8 max-w-2xl"
            >
              Computer Science and Data Science at UW–Madison. I build backend systems, mobile products, data pipelines, and machine-learning applications.
            </motion.p>

            {/* Status + Links */}
            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
            >
              {/* Currently Building Status */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors group"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse"></span>
                <span>Currently building Studi for UW–Madison</span>
              </a>

              {/* Divider */}
              <div className="hidden sm:block w-px h-4 bg-[var(--border-subtle)]"></div>

              {/* Links */}
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

      {/* Placeholder sections for testing scroll behavior */}
      <section id="projects" className="py-20 section-container">
        <div className="h-96 flex items-center justify-center border border-[var(--border-subtle)] rounded-lg">
          <p className="text-[var(--text-tertiary)]">Projects Section (To be implemented in Stage 3)</p>
        </div>
      </section>

      <section id="experience" className="py-20 section-container">
        <div className="h-96 flex items-center justify-center border border-[var(--border-subtle)] rounded-lg">
          <p className="text-[var(--text-tertiary)]">Experience Section (To be implemented in Stage 4)</p>
        </div>
      </section>

      <section id="about" className="py-20 section-container">
        <div className="h-96 flex items-center justify-center border border-[var(--border-subtle)] rounded-lg">
          <p className="text-[var(--text-tertiary)]">About Section (To be implemented in Stage 5)</p>
        </div>
      </section>

      <section id="contact" className="py-20 section-container">
        <div className="h-96 flex items-center justify-center border border-[var(--border-subtle)] rounded-lg">
          <p className="text-[var(--text-tertiary)]">Contact Section (To be implemented in Stage 5)</p>
        </div>
      </section>
    </div>
  )
}
