import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, Instagram, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center mb-4" aria-label="IC VTC35 - Accueil">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-start leading-none">
                  <span className="text-accent font-extrabold text-xl md:text-2xl tracking-tight font-playfair">IC</span>
                  <span className="mt-1 block w-6 h-0.5 bg-accent rounded-sm" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-foreground font-semibold text-sm md:text-base tracking-wider uppercase">VTC35</span>
                </div>
              </div>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Votre service de VTC de confiance à Rennes et ses alentours. Transport premium, ponctuel et sécurisé pour
              tous vos déplacements.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/icvtc35"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-accent transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-accent transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-muted-foreground hover:text-accent transition-colors">
                  Réservation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" />
                <a href="tel:0652767892" className="text-muted-foreground hover:text-accent transition-colors">
                  06.52.76.78.92
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent" />
                <a
                  href="mailto:icvtc35@gmail.com"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  icvtc35@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-accent mt-0.5" />
                <span className="text-muted-foreground">Rennes et sa région</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} ICVTC35. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
