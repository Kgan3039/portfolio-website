'use client'

export default function ResumePage() {
  return (
    <html lang="en">
      <head>
        <title>Kartik Gangwar - Resume</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, padding: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <object
          data="/2026GangwarKartikResume.pdf"
          type="application/pdf"
          style={{ width: '100%', height: '100%' }}
        >
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh',
            backgroundColor: '#0f172a',
            color: '#e2e8f0',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            padding: '2rem'
          }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Resume - Kartik Gangwar</h1>
            <p style={{ marginBottom: '2rem', color: '#94a3b8' }}>
              Your browser doesn't support embedded PDFs.
            </p>
            <a
              href="/2026GangwarKartikResume.pdf"
              download="Kartik_Gangwar_Resume.pdf"
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontSize: '1.125rem',
                fontWeight: '600'
              }}
            >
              Download Resume PDF
            </a>
          </div>
        </object>
      </body>
    </html>
  )
}

