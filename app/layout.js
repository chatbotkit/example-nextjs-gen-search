import './globals.css'

import { GeistSans } from 'geist/font/sans'

export default function Layout({ children }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>{children}</body>
    </html>
  )
}
