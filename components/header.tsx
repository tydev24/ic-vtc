"use client"

import { useState } from "react"
import Link from "next/link"
// Image removed; logo replaced by styled text
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Réservation", href: "/booking" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="bg-black border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="IC VTC35 - Accueil">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-start leading-none">
                <span className="font-extrabold text-2xl md:text-3xl tracking-tight font-playfair" style={{ color: '#C79C3E' }}>IC</span>
                <span className="mt-1 block w-8 h-0.5 rounded-sm" style={{ backgroundColor: '#C79C3E' }} aria-hidden="true" />
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-sm md:text-base tracking-wider uppercase text-white">VTC35</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[#C79C3E] hover:text-[#C79C3E]/90 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Phone & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:0652767892"
              className="flex items-center space-x-2 text-[#C79C3E] hover:text-[#C79C3E]/90 transition-colors"
            >
              <Phone className="h-4 w-4" style={{ color: '#C79C3E' }} />
              <span className="font-medium">06.52.76.78.92</span>
            </a>
            <Button asChild className="bg-transparent border border-[#C79C3E] text-[#C79C3E] hover:bg-[#C79C3E]/10">
              <Link href="/booking">Réserver</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-[#C79C3E] hover:text-[#C79C3E]/90"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" style={{ color: '#C79C3E' }} /> : <Menu className="h-6 w-6" style={{ color: '#C79C3E' }} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[#C79C3E] hover:text-[#C79C3E]/90 transition-colors duration-200 font-medium px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                <a
                  href="tel:0652767892"
                  className="flex items-center space-x-2 text-[#C79C3E] hover:text-[#C79C3E]/90 transition-colors px-2"
                >
                  <Phone className="h-4 w-4" style={{ color: '#C79C3E' }} />
                  <span className="font-medium">06.52.76.78.92</span>
                </a>
                <Button asChild className="bg-transparent border border-[#C79C3E] text-[#C79C3E] hover:bg-[#C79C3E]/10 mx-2">
                  <Link href="/booking">Réserver</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
