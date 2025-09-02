import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Briefcase, Users, Plane, MapPin, Leaf, Clock, Shield, Star } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: Briefcase,
      title: "Déplacements professionnels",
      description:
        "Transport d'affaires ponctuel et discret pour vos rendez-vous importants, réunions et événements corporate.",
      features: ["Ponctualité garantie", "Véhicule premium", "Discrétion assurée", "Facturation entreprise"],
    },
    {
      icon: Users,
      title: "Déplacements particuliers",
      description: "Service personnalisé pour tous vos trajets personnels : shopping, visites, sorties en famille.",
      features: ["Service sur-mesure", "Flexibilité horaire", "Confort optimal", "Tarifs attractifs"],
    },
    {
      icon: Star,
      title: "Événements et soirées",
      description: "Transport élégant pour vos événements spéciaux : mariages, anniversaires, soirées de gala.",
      features: ["Service premium", "Véhicule décoré", "Chauffeur en tenue", "Photos souvenirs"],
    },
    {
      icon: Plane,
      title: "Transferts aéroports et gares",
      description: "Liaison directe vers les aéroports de Rennes, Nantes et les principales gares de la région.",
      features: ["Suivi des vols", "Aide aux bagages", "Accueil personnalisé", "Tarifs fixes"],
    },
    {
      icon: MapPin,
      title: "Trajets longue distance",
      description: "Voyages confortables vers toute la France avec arrêts possibles selon vos besoins.",
      features: ["Confort longue durée", "Arrêts personnalisés", "Véhicule spacieux", "Devis sur mesure"],
    },
    {
      icon: Leaf,
      title: "Véhicule électrique",
      description:
        "Option écologique avec notre véhicule 100% électrique pour un transport respectueux de l'environnement.",
      features: ["Zéro émission", "Silence de roulage", "Technologies avancées", "Engagement écologique"],
    },
  ]

  const guarantees = [
    {
      icon: Clock,
      title: "Ponctualité",
      description: "Arrivée garantie à l'heure convenue",
    },
    {
      icon: Shield,
      title: "Sécurité",
      description: "Véhicules assurés et chauffeur professionnel",
    },
    {
      icon: Star,
      title: "Qualité",
      description: "Service haut de gamme et satisfaction client",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/images/hero-car.jpg)",
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nos <span className="text-accent">Services</span>
          </h1>
          <p className="text-xl text-white/90">
            Une gamme complète de services de transport premium adaptés à tous vos besoins
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <service.icon className="h-8 w-8 text-accent" />
                    <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nos garanties</h2>
            <p className="text-xl text-muted-foreground">Un engagement qualité pour chaque trajet</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="text-center">
                <guarantee.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{guarantee.title}</h3>
                <p className="text-muted-foreground">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Card className="p-8 border-accent/20">
            <CardContent className="p-0">
              <h2 className="text-3xl font-bold text-foreground mb-4">Besoin d'un transport sur mesure ?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Contactez-nous pour discuter de vos besoins spécifiques. Nous adaptons nos services à vos exigences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/booking">Réserver maintenant</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
