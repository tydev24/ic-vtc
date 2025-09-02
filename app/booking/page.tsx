"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function BookingPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupAddress: "",
    dropoffAddress: "",
    date: "",
    time: "",
    passengers: 1,
    serviceType: "standard",
    specialRequests: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Le nom doit contenir au moins 2 caractères"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Veuillez entrer un email valide"
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      newErrors.phone = "Veuillez entrer un numéro de téléphone valide"
    }

    if (!formData.pickupAddress.trim() || formData.pickupAddress.trim().length < 5) {
      newErrors.pickupAddress = "Veuillez entrer une adresse de départ complète"
    }

    if (!formData.dropoffAddress.trim() || formData.dropoffAddress.trim().length < 5) {
      newErrors.dropoffAddress = "Veuillez entrer une adresse de destination complète"
    }

    if (!formData.date) {
      newErrors.date = "Veuillez sélectionner une date"
    } else {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.date = "La date ne peut pas être dans le passé"
      }
    }

    if (!formData.time) {
      newErrors.time = "Veuillez sélectionner une heure"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Réservation envoyée !",
          description: "Nous vous contacterons rapidement avec un devis personnalisé.",
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          pickupAddress: "",
          dropoffAddress: "",
          date: "",
          time: "",
          passengers: 1,
          serviceType: "standard",
          specialRequests: "",
        })
      } else {
        toast({
          title: "Erreur",
          description: data.error || "Une erreur est survenue. Veuillez réessayer ou nous contacter directement.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer ou nous contacter directement.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-12 sm:py-16 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/images/hero-car.jpg)",
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 text-balance">
            <span className="text-accent">Réservation</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 text-pretty">
            Réservez votre trajet en quelques clics. Nous vous contacterons rapidement avec votre devis.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-xl sm:text-2xl text-foreground text-balance">
                    Détails de votre réservation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">
                        Nom complet *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
                        required
                      />
                      {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium">
                          Téléphone *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className={`mt-1 ${errors.phone ? "border-red-500" : ""}`}
                          required
                        />
                        {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
                          required
                        />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Trip Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date" className="text-sm font-medium">
                          Date *
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange("date", e.target.value)}
                          className={`mt-1 ${errors.date ? "border-red-500" : ""}`}
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                        {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
                      </div>
                      <div>
                        <Label htmlFor="time" className="text-sm font-medium">
                          Heure *
                        </Label>
                        <Input
                          id="time"
                          type="time"
                          value={formData.time}
                          onChange={(e) => handleInputChange("time", e.target.value)}
                          className={`mt-1 ${errors.time ? "border-red-500" : ""}`}
                          required
                        />
                        {errors.time && <p className="text-sm text-red-500 mt-1">{errors.time}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="pickupAddress" className="text-sm font-medium">
                        Adresse de départ *
                      </Label>
                      <Input
                        id="pickupAddress"
                        value={formData.pickupAddress}
                        onChange={(e) => handleInputChange("pickupAddress", e.target.value)}
                        placeholder="Adresse complète de prise en charge"
                        className={`mt-1 ${errors.pickupAddress ? "border-red-500" : ""}`}
                        required
                      />
                      {errors.pickupAddress && <p className="text-sm text-red-500 mt-1">{errors.pickupAddress}</p>}
                    </div>

                    <div>
                      <Label htmlFor="dropoffAddress" className="text-sm font-medium">
                        Adresse d'arrivée *
                      </Label>
                      <Input
                        id="dropoffAddress"
                        value={formData.dropoffAddress}
                        onChange={(e) => handleInputChange("dropoffAddress", e.target.value)}
                        placeholder="Adresse complète de destination"
                        className={`mt-1 ${errors.dropoffAddress ? "border-red-500" : ""}`}
                        required
                      />
                      {errors.dropoffAddress && <p className="text-sm text-red-500 mt-1">{errors.dropoffAddress}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="passengers" className="text-sm font-medium">
                          Nombre de passagers *
                        </Label>
                        <Select onValueChange={(value) => handleInputChange("passengers", Number.parseInt(value))}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Sélectionnez le nombre de passagers" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 passager</SelectItem>
                            <SelectItem value="2">2 passagers</SelectItem>
                            <SelectItem value="3">3 passagers</SelectItem>
                            <SelectItem value="4">4 passagers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="serviceType" className="text-sm font-medium">
                          Type de service *
                        </Label>
                        <Select onValueChange={(value) => handleInputChange("serviceType", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Sélectionnez le type de service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="specialRequests" className="text-sm font-medium">
                        Demandes spécifiques
                      </Label>
                      <Textarea
                        id="specialRequests"
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        placeholder="Bagages volumineux, siège enfant, arrêts intermédiaires, etc."
                        rows={4}
                        className="mt-1"
                        maxLength={1000}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12 text-base font-medium"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg sm:text-xl text-foreground text-balance">Comment ça marche ?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Remplissez le formulaire avec vos détails de voyage
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Nous vous contactons rapidement avec un devis personnalisé
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Confirmez votre réservation et payez un acompte sécurisé
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      4
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">Profitez de votre trajet premium !</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg sm:text-xl text-foreground text-balance">Besoin d'aide ?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm">Téléphone</p>
                      <a
                        href="tel:0652767892"
                        className="text-sm text-muted-foreground hover:text-accent transition-colors break-all"
                      >
                        06.52.76.78.92
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm">Email</p>
                      <a
                        href="mailto:icvtc35@gmail.com"
                        className="text-sm text-muted-foreground hover:text-accent transition-colors break-all"
                      >
                        icvtc35@gmail.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
