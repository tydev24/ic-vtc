import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Car, User, MapPin, Smartphone, Leaf } from "lucide-react"

export default function AboutPage() {
  const advantages = [
    {
      icon: Clock,
      title: "Ponctualité et fiabilité",
      description: "Nous respectons vos horaires et arrivons toujours à l'heure",
    },
    {
      icon: Car,
      title: "Véhicule récent et confortable",
      description: "Flotte moderne, climatisée et parfaitement entretenue",
    },
    {
      icon: User,
      title: "Chauffeur professionnel",
      description: "Courtois, expérimenté et parfaitement formé",
    },
    {
      icon: MapPin,
      title: "Disponibilité 7j/7",
      description: "Service disponible tous les jours sur Rennes et sa région",
    },
    {
      icon: Smartphone,
      title: "Réservation simple",
      description: "Processus de réservation rapide et intuitif",
    },
    {
      icon: Leaf,
      title: "Véhicule électrique",
      description: "Option écologique pour un transport non polluant",
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
            À propos d'<span className="text-accent">ICVTC35</span>
          </h1>
          <p className="text-xl text-white/90">Votre partenaire de confiance pour tous vos déplacements à Rennes</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Basés sur Rennes, nous proposons des trajets confortables, ponctuels et sécurisés pour tous vos
              déplacements : transferts vers les gares et aéroports, rendez-vous professionnels, soirées, événements, ou
              encore trajets longue distance.
            </p>

            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Notre priorité ? Vous offrir une expérience de transport haut de gamme, avec un service irréprochable.
            </p>
          </div>
        </div>
      </section>

      {/* Advantages Grid */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Pourquoi choisir IC VTC35 ?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <advantage.icon className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{advantage.title}</h3>
                      <p className="text-muted-foreground">{advantage.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="p-8 border-accent/20">
            <CardContent className="p-0">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                IC VTC35 : Bien plus qu'un transport, une vraie expérience de qualité.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nous nous engageons à vous fournir un service de transport exceptionnel, alliant professionnalisme,
                confort et ponctualité. Chaque trajet est une opportunité de vous démontrer notre engagement envers
                l'excellence.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
