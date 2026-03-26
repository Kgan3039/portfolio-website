# Portfolio Customization Guide

## 🎨 Your Modern Portfolio Website is Ready!

This is a professional, dark-themed portfolio website built with Next.js, React, and Tailwind CSS. It's fully responsive and optimized for student developers seeking internships.

## 📝 How to Customize Your Content

All the content can be easily updated in `/app/app/page.js`. Here's what you need to change:

### 1. Personal Information (Lines ~42-50)
```javascript
const personalInfo = {
  name: "Your Name",              // Replace with your full name
  tagline: "Computer Science & Data Science Student",  // Your title/tagline
  bio: "...",                      // Your about me paragraph
  email: "your.email@example.com", // Your email address
  github: "https://github.com/yourusername",   // Your GitHub URL
  linkedin: "https://linkedin.com/in/yourusername",  // Your LinkedIn URL
  resume: "/resume.pdf"            // Path to your resume (place in /public folder)
}
```

### 2. Projects (Lines ~52-87)
Update the projects array with your actual projects:
```javascript
const projects = [
  {
    title: "Project Name",
    description: "Brief description of what the project does",
    tech: ["Tech1", "Tech2", "Tech3"],  // Technologies used
    github: "https://github.com/...",    // GitHub repo URL
    demo: "https://demo.example.com"     // Live demo URL (or null if none)
  },
  // Add more projects...
]
```

### 3. Experience (Lines ~89-116)
Add your work experience and internships:
```javascript
const experiences = [
  {
    title: "Job Title",
    company: "Company Name",
    period: "Jan 2024 - Present",       // Time period
    description: "What you did...",      // Your responsibilities
    tech: ["Tech1", "Tech2"]            // Technologies used
  },
  // Add more experiences...
]
```

### 4. Skills (Lines ~118-123)
Update your skills by category:
```javascript
const skills = {
  "Languages": ["Python", "JavaScript", ...],
  "Frameworks & Libraries": ["React", "Node.js", ...],
  "Tools & Technologies": ["Git", "Docker", ...],
  "Data Science": ["Machine Learning", "NLP", ...]
}
```

## 🎯 Quick Customization Tips

### Change Color Scheme
The gradient colors (blue → purple → pink) can be adjusted in the code:
- Look for classes like: `from-blue-400 via-purple-500 to-pink-500`
- Change to any Tailwind colors you prefer

### Add Your Resume
1. Place your resume PDF in the `/app/public/` folder
2. Name it `resume.pdf` or update the path in `personalInfo.resume`

### Update Meta Tags
Edit `/app/app/layout.js` to update:
- Page title
- Description
- Keywords (for SEO)

## 🚀 Features Included

✅ Fully responsive design (mobile, tablet, desktop)
✅ Smooth scroll navigation
✅ Active section highlighting in navbar
✅ Mobile hamburger menu
✅ Project cards with tech stacks
✅ Experience timeline
✅ Skills organized by category
✅ Contact section
✅ Hover effects and animations
✅ Dark theme optimized
✅ Professional gradient accents

## 📱 Sections Overview

1. **Hero** - Your name, tagline, and CTA buttons
2. **About** - Your bio and background
3. **Projects** - Showcase your best work
4. **Experience** - Timeline of your work history
5. **Skills** - Technologies organized by category
6. **Contact** - Ways to reach you
7. **Footer** - Social links and copyright

## 🔗 Important Links

- **Live Site**: https://tech-profile-69.preview.emergentagent.com
- **Edit Content**: `/app/app/page.js`
- **Edit Styles**: `/app/app/globals.css`
- **Update Meta**: `/app/app/layout.js`

## 💡 Next Steps

1. Replace all placeholder content with your actual information
2. Add your resume to `/app/public/resume.pdf`
3. Update your real GitHub and LinkedIn URLs
4. Consider adding more projects as you build them
5. Keep your experience and skills sections up to date

## 🎓 Perfect for:
- Computer Science students
- Data Science students
- Software engineering internship applications
- Full-stack developer positions
- Research opportunities

---

**Need help?** All the content is clearly marked with comments in the code. Just search for "Placeholder Data" in `/app/app/page.js` to find what needs updating!
