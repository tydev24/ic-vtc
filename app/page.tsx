import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Clock, Shield, Car, Star, CheckCircle, Phone } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Clock,
      title: "Ponctualité",
      description: "Toujours à l'heure pour vos rendez-vous importants",
    },
    {
      icon: Shield,
      title: "Sécurité",
      description: "Chauffeur professionnel et véhicule assuré",
    },
    {
      icon: Car,
      title: "Confort",
      description: "Véhicules récents et climatisés pour votre bien-être",
    },
  ]

  const services = [
    "Transferts aéroports et gares",
    "Déplacements professionnels",
    "Événements et soirées",
    "Trajets longue distance",
    "Véhicule électrique disponible",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-car.jpg" alt="Véhicule VTC premium" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Bienvenue chez <span className="text-accent">IC VTC35</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-balance">
            Votre service de VTC de confiance à Rennes et ses alentours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/booking">Réserver un trajet</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              <Link href="/about">En savoir plus</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Pourquoi choisir ICVTC35 ?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nous nous engageons à vous offrir une expérience de transport exceptionnelle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <feature.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Nos services premium</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Des trajets confortables, ponctuels et sécurisés pour tous vos déplacements. Notre priorité : vous
                offrir une expérience de transport haut de gamme.
              </p>

              <ul className="space-y-4 mb-8">
                {services.map((service, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{service}</span>
                  </li>
                ))}
              </ul>

              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/services">Découvrir tous nos services</Link>
              </Button>
            </div>

            <div className="relative">
              <Card className="p-8 border-accent/20">
                <CardContent className="p-0">
                  <div className="text-center">
                    <Star className="h-12 w-12 text-accent mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-4">Service disponible 7j/7</h3>
                    <p className="text-muted-foreground mb-6">
                      Réservation simple et rapide. Chauffeur professionnel, courtois et expérimenté à votre service.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-accent">
                      <Phone className="h-5 w-5" />
                      <span className="font-semibold text-lg">06.52.76.78.92</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à voyager avec style ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Réservez dès maintenant votre trajet et découvrez l'excellence du service ICVTC35
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/booking">Réserver maintenant</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
