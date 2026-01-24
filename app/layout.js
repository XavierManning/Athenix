import './globals.css'

export const metadata = {
  title: 'Athenix - Rebuild. Refine. Rise.',
  description: 'AI-powered personalized fitness and nutrition transformation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}