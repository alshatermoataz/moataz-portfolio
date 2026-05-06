import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Moataz Al-Shater | Full-Stack Software Engineer',
  description: 'Aspiring Software Engineer committed to innovating AI and machine learning techniques. Experienced in React, Next.js, Vue.js, ASP.NET Core, Django, and more.',
  keywords: ['Software Engineer', 'Full-Stack Developer', 'React', 'Next.js', 'TypeScript', 'Malaysia'],
  authors: [{ name: 'Moataz Al-Shater' }],
  openGraph: {
    title: 'Moataz Al-Shater | Full-Stack Software Engineer',
    description: 'Aspiring Software Engineer committed to innovating AI and machine learning techniques.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
