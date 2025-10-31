import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VRNT - Veda Rakshana Nidhi Trust',
  description: 'Student Information Portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
