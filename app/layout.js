import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Your Name - Portfolio',
  description: 'Computer Science & Data Science Student Portfolio - Building innovative solutions through code and data',
  keywords: 'computer science, data science, portfolio, software engineer, machine learning, web development',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
