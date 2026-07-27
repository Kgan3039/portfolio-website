'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion, useScroll, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, FileText, Menu, X, ArrowUpRight, ExternalLink } from 'lucide-react'
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
      const navOffset = 100 // Navbar height + some padding
      
      // Get contact element position for later checks
      const contactElement = document.getElementById('contact')
      const contactTop = contactElement ? contactElement.offsetTop : Infinity
      
      // CRITICAL: Check if user is at/near the bottom of the page first
      // This ensures Contact becomes active when reaching the end
      const nearBottom = 
        window.innerHeight + window.scrollY >= 
        document.documentElement.scrollHeight - 80
      
      if (nearBottom) {
        setActiveSection('contact')
        return
      }
      
      // Normal section-boundary logic for all other cases
      let current = sections[0]
      
      // Get positions of all sections
      const sectionPositions = sections.map(sectionId => {
        const element = document.getElementById(sectionId)
        if (element) {
          return {
            id: sectionId,
            top: element.offsetTop,
            bottom: element.offsetTop + element.offsetHeight
          }
        }
        return null
      }).filter(Boolean)
      
      const scrollPos = window.scrollY + navOffset
      
      // Check if we've scrolled well into Contact section
      // Use a higher threshold for Contact to avoid premature activation
      if (scrollPos >= contactTop + 150) {
        current = 'contact'
      } else {
        // Find the section whose range includes the current scroll position
        for (let i = sectionPositions.length - 1; i >= 0; i--) {
          const section = sectionPositions[i]
          
          // Skip contact as it's handled above
          if (section.id === 'contact') continue
          
          // Special handling: About section extends until Contact begins
          // This covers both About and Technical Profile sections
          if (section.id === 'about') {
            if (scrollPos >= section.top && scrollPos < contactTop + 150) {
              current = 'about'
              break
            }
          } else {
            // For other sections, check if scroll position is past their top
            if (scrollPos >= section.top) {
              current = section.id
              break
            }
          }
        }
      }
      
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once on mount
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

  // Enhanced animation variants for polish pass
  const heroStaggerVariants = shouldReduceMotion ? {} : {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const heroItemVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0, 0, 0.2, 1] }
    }
  }

  const sectionHeaderVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0, 0, 0.2, 1] }
    }
  }

  const timelineVariants = shouldReduceMotion ? {} : {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const timelineItemVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: [0, 0, 0.2, 1] }
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-full max-h-full flex items-center justify-center"
            >
              <Image
                src={lightboxImage}
                alt="Project preview"
                width={1920}
                height={1080}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg"
                style={{ objectFit: 'contain' }}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxImage(null)
                }}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors z-10"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled ? 'bg-[#0a0a0a]/98 backdrop-blur-lg border-b border-[var(--border-subtle)]' : 'bg-transparent'
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
                href="/Kartik_Gangwar_Resume.pdf"
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
                href="/Kartik_Gangwar_Resume.pdf"
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
          <motion.div 
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={heroStaggerVariants}
          >
            <motion.h1
              variants={heroItemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--text-primary)] mb-4"
            >
              Kartik Gangwar
            </motion.h1>

            <motion.p
              variants={heroItemVariants}
              className="text-xl sm:text-2xl text-[var(--text-secondary)] mb-6"
            >
              I build systems that turn complex workflows into reliable products.
            </motion.p>

            <motion.p
              variants={heroItemVariants}
              className="text-base sm:text-lg text-[var(--text-tertiary)] leading-relaxed mb-8 max-w-2xl"
            >
              Computer Science and Data Science at UW–Madison. I work on backend systems, mobile products, data pipelines, and machine-learning applications.
            </motion.p>

            <motion.div
              variants={heroItemVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <a
                href="https://joinstudi.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Studi website - study coordination platform for UW-Madison students"
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
                  href="/Kartik_Gangwar_Resume.pdf"
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
          </motion.div>
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
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-2xl font-medium text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                        Studi
                      </h3>
                      
                      <p className="text-[var(--text-secondary)] text-sm font-medium">
                        Study coordination for UW–Madison students
                      </p>
                    </div>
                    <a
                      href="https://joinstudi.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit Studi website"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[var(--accent-primary)] hover:text-[var(--accent-hover)] bg-[var(--accent-primary)]/10 hover:bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/20 rounded-md transition-all duration-200"
                    >
                      <span>Visit Website</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                  
                  <p className="text-[var(--text-tertiary)] text-sm mb-6 leading-relaxed">
                    Connects students with study sessions based on class enrollment and preferences. Solving session discovery and peer coordination at scale.
                  </p>

                  <div className="mb-6 pb-6 border-b border-[var(--border-subtle)]">
                    <p className="text-sm md:text-xs font-semibold md:font-medium text-[var(--text-primary)] mb-2">What I Built</p>
                    <p className="text-base md:text-sm text-[var(--text-secondary)] md:text-[var(--text-tertiary)] leading-relaxed" style={{ lineHeight: '1.6' }}>
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

                  <div className="flex flex-wrap gap-1.5 mb-8 lg:mb-0">
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

                {/* iPhone with Real Screenshot - Desktop */}
                <div className="hidden lg:flex items-center justify-center">
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    onClick={() => setLightboxImage('/project-images/studi-mobile.png')}
                    className="relative w-full max-w-xs aspect-[9/19] bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-[2.5rem] shadow-lg cursor-pointer hover:shadow-xl transition-shadow overflow-hidden"
                  >
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[var(--bg-primary)] rounded-b-2xl z-10"></div>
                    
                    {/* Screen with Screenshot */}
                    <div className="absolute inset-3 bg-[var(--bg-primary)] rounded-[2rem] overflow-hidden">
                      <Image
                        src="/project-images/studi-mobile.png"
                        alt="Studi app home screen showing Hi Kartik, Your next session card for HISTORY 101 Review for 5th quiz, and Your classes list with COMP SCI 400, MATH 320, and HISTORY 101"
                        width={375}
                        height={812}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* iPhone Mockup - Mobile Only */}
              <div className="lg:hidden flex justify-center mt-8">
                <motion.div
                  onClick={() => setLightboxImage('/project-images/studi-mobile.png')}
                  className="relative w-[75vw] max-w-[280px] aspect-[9/19] bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-[2.5rem] shadow-lg cursor-pointer active:scale-95 transition-transform overflow-hidden"
                >
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[var(--bg-primary)] rounded-b-2xl z-10"></div>
                  
                  {/* Screen with Screenshot */}
                  <div className="absolute inset-2 bg-[var(--bg-primary)] rounded-[1.8rem] overflow-hidden">
                    <Image
                      src="/project-images/studi-mobile.png"
                      alt="Studi app home screen showing Hi Kartik, Your next session card for HISTORY 101 Review for 5th quiz, and Your classes list with COMP SCI 400, MATH 320, and HISTORY 101"
                      width={375}
                      height={812}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* FiPet - Flagship Product */}
            <motion.div
              variants={itemVariants}
              className="group relative mb-8 p-8 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--accent-primary)]/30 transition-all duration-300 hover:translate-y-[-2px]"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 rounded-full text-xs font-medium text-[var(--accent-primary)] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]"></span>
                Live mobile product · 2,000+ downloads
              </div>

              <div className="grid lg:grid-cols-[1.2fr,1fr] gap-8">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-2xl font-medium text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                        FiPet
                      </h3>
                      
                      <p className="text-[var(--text-secondary)] text-sm font-medium">
                        A gamified financial-literacy app combining learning quests, pet progression, customization, and real-time social features.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href="https://fipet.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit FiPet website"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[var(--accent-primary)] hover:text-[var(--accent-hover)] bg-[var(--accent-primary)]/10 hover:bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/20 rounded-md transition-all duration-200"
                      >
                        <span>Visit Website</span>
                        <ExternalLink size={12} />
                      </a>
                      <a
                        href="https://apps.apple.com/us/app/fipet/id6751675558"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Download FiPet on the App Store"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[var(--accent-primary)] hover:text-[var(--accent-hover)] bg-[var(--accent-primary)]/10 hover:bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/20 rounded-md transition-all duration-200"
                      >
                        <span>App Store</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <p className="text-xs uppercase tracking-wide text-[var(--text-tertiary)] font-medium">Engineering Focus</p>
                    {[
                      'Designed Firestore data models and real-time synchronization workflows',
                      'Built authentication, gamification, and data-validation services',
                      'Reduced data-sync defects by 35% through stronger validation and testing',
                      'Coordinated feature integration and code-review workflows across a 25+ person team'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-[var(--accent-primary)] mt-0.5 text-xs">→</span>
                        <span className="text-[var(--text-tertiary)]">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-8 lg:mb-0">
                    {['React Native', 'TypeScript', 'Firebase', 'Firestore'].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* iPhone with FiPet Screenshot - Desktop */}
                <div className="hidden lg:flex items-center justify-center">
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    onClick={() => setLightboxImage('/project-images/fipet-mobile.webp')}
                    className="relative w-full max-w-xs aspect-[9/19] bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-[2.5rem] shadow-lg cursor-pointer hover:shadow-xl transition-shadow overflow-hidden"
                  >
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[var(--bg-primary)] rounded-b-2xl z-10"></div>
                    
                    {/* Screen with Screenshot */}
                    <div className="absolute inset-3 bg-[var(--bg-primary)] rounded-[2rem] overflow-hidden">
                      <Image
                        src="/project-images/fipet-mobile.webp"
                        alt="FiPet app home screen showing Level 2 orange fox pet, XP progress, daily streak tracker, and financial literacy quests"
                        width={375}
                        height={812}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* iPhone Mockup - Mobile Only */}
              <div className="lg:hidden flex justify-center mt-8">
                <motion.div
                  onClick={() => setLightboxImage('/project-images/fipet-mobile.webp')}
                  className="relative w-[75vw] max-w-[280px] aspect-[9/19] bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-[2.5rem] shadow-lg cursor-pointer active:scale-95 transition-transform overflow-hidden"
                >
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[var(--bg-primary)] rounded-b-2xl z-10"></div>
                  
                  {/* Screen with Screenshot */}
                  <div className="absolute inset-2 bg-[var(--bg-primary)] rounded-[1.8rem] overflow-hidden">
                    <Image
                      src="/project-images/fipet-mobile.webp"
                      alt="FiPet app home screen showing Level 2 orange fox pet, XP progress, daily streak tracker, and financial literacy quests"
                      width={375}
                      height={812}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Supporting Projects Grid */}
            <div className="grid md:grid-cols-2 gap-6">{/* AI Market Sentiment Dashboard */}
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
                    'Authentication and live interactions',
                    'Firestore queries with geolocation filtering'
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 sm:py-18 bg-[var(--bg-secondary)]/30">
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
                      'Coordinated 20+ club members to demo full-stack AI market sentiment dashboard using FinBERT, FastAPI, and React',
                      'Built backend REST APIs for financial data pipelines with validation and testing infrastructure',
                      'Reduced ML service latency through debugging and optimization of Python prediction endpoints'
                    ],
                    impact: 'Built an end-to-end AI market sentiment platform with real-time sentiment analysis',
                    tech: ['FastAPI', 'React', 'Python', 'FinBERT']
                  },
                  {
                    company: 'FiPet',
                    role: 'Lead Software Engineer',
                    time: 'October 2025 – Present',
                    contributions: [
                      'Leading technical development for gamified financial literacy platform (2,000+ downloads)',
                      'Reduced authentication sync defects by 35% through improved testing and error handling',
                      'Coordinated feature integration and code reviews across 25+ person engineering team'
                    ],
                    impact: 'Built scalable Firebase backend with real-time gamification systems',
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
                I'm a Computer Science and Data Science student at UW–Madison who builds scalable backend systems, mobile applications, and machine learning pipelines. I take products from concept to deployment, focusing on scalable architecture and reliable software.
              </p>
              
              <p className="text-[var(--text-tertiary)] text-base leading-relaxed mb-6">
                My work includes real-time data sync systems, RESTful API design, Firebase-backed mobile platforms, and ML-driven sentiment analysis. I've shipped features used across a platform with 2,000+ downloads, reduced data-sync defects by 35% through stronger validation and testing, and built systems supporting real-time interactions.
              </p>

              <p className="text-[var(--text-tertiary)] text-base leading-relaxed">
                Currently engineering Studi — a class-based study coordination platform for UW–Madison that matches students with sessions through enrollment data and preference algorithms.
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
                  {['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Frameworks & Technologies */}
              <motion.div variants={itemVariants} className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg">
                <h3 className="text-sm uppercase tracking-wide text-[var(--text-primary)] font-medium mb-4">
                  Frameworks & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'React Native', 'FastAPI', 'Firebase', 'Firestore', 'Node.js'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Backend & Tools */}
              <motion.div variants={itemVariants} className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg">
                <h3 className="text-sm uppercase tracking-wide text-[var(--text-primary)] font-medium mb-4">
                  Backend & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Git', 'GitHub', 'Linux', 'VS Code', 'Jupyter Notebook'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* ML / AI */}
              <motion.div variants={itemVariants} className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg md:col-span-2 lg:col-span-3">
                <h3 className="text-sm uppercase tracking-wide text-[var(--text-primary)] font-medium mb-4">
                  ML / AI
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['TensorFlow', 'PyTorch', 'scikit-learn', 'NumPy', 'Pandas', 'FinBERT'].map((skill) => (
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
                href="/Kartik_Gangwar_Resume.pdf"
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
