import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"

const bookingSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().min(10, "Numéro de téléphone invalide").max(20),
  pickupAddress: z.string().min(5, "Adresse de départ requise").max(500),
  dropoffAddress: z.string().min(5, "Adresse de destination requise").max(500),
  date: z.string().refine((date) => {
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return selectedDate >= today
  }, "La date doit être aujourd'hui ou dans le futur"),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format d'heure invalide"),
  passengers: z.number().min(1, "Au moins 1 passager requis").max(4, "Maximum 4 passagers"),
  serviceType: z.enum(["standard", "premium", "business"], {
    errorMap: () => ({ message: "Type de service invalide" }),
  }),
  specialRequests: z.string().max(1000, "Les demandes spéciales ne peuvent pas dépasser 1000 caractères").optional(),
})

const bookingRateLimitMap = new Map()

function bookingRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 1 hour
  const maxRequests = 3 // Max 3 bookings per hour

  if (!bookingRateLimitMap.has(ip)) {
    bookingRateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  const record = bookingRateLimitMap.get(ip)
  if (now > record.resetTime) {
    record.count = 1
    record.resetTime = now + windowMs
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    if (!bookingRateLimit(ip)) {
      return NextResponse.json(
        { error: "Limite de réservations atteinte. Veuillez réessayer dans 1 heure." },
        { status: 429 },
      )
    }

    const body = await request.json()

    const validatedData = bookingSchema.parse(body)

    // Sanitize inputs
    const sanitizedData = {
      ...validatedData,
      name: validatedData.name.trim(),
      email: validatedData.email.trim().toLowerCase(),
      phone: validatedData.phone.trim(),
      pickupAddress: validatedData.pickupAddress.trim(),
      dropoffAddress: validatedData.dropoffAddress.trim(),
      specialRequests: validatedData.specialRequests?.trim() || "",
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Missing email configuration")
      return NextResponse.json({ error: "Configuration email manquante" }, { status: 500 })
    }

    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const serviceTypeLabels = {
      standard: "Standard",
      premium: "Premium",
      business: "Business",
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: "icvtc35@gmail.com",
      subject: `[ICVTC35] Nouvelle réservation - ${sanitizedData.name} - ${sanitizedData.date}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <h2 style="color: #d97706; border-bottom: 2px solid #d97706; padding-bottom: 10px;">
            Nouvelle demande de réservation VTC
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Informations client</h3>
            <p><strong>Nom:</strong> ${sanitizedData.name}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            <p><strong>Téléphone:</strong> ${sanitizedData.phone}</p>
          </div>

          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Détails de la course</h3>
            <p><strong>Date:</strong> ${new Date(sanitizedData.date).toLocaleDateString("fr-FR")}</p>
            <p><strong>Heure:</strong> ${sanitizedData.time}</p>
            <p><strong>Nombre de passagers:</strong> ${sanitizedData.passengers}</p>
            <p><strong>Type de service:</strong> ${serviceTypeLabels[sanitizedData.serviceType]}</p>
            
            <div style="margin: 15px 0;">
              <p><strong>Adresse de départ:</strong></p>
              <div style="background-color: white; padding: 10px; border-left: 4px solid #10b981; margin: 5px 0;">
                ${sanitizedData.pickupAddress}
              </div>
            </div>
            
            <div style="margin: 15px 0;">
              <p><strong>Adresse de destination:</strong></p>
              <div style="background-color: white; padding: 10px; border-left: 4px solid #ef4444; margin: 5px 0;">
                ${sanitizedData.dropoffAddress}
              </div>
            </div>
            
            ${
              sanitizedData.specialRequests
                ? `
              <div style="margin: 15px 0;">
                <p><strong>Demandes spéciales:</strong></p>
                <div style="background-color: white; padding: 10px; border-left: 4px solid #d97706; margin: 5px 0;">
                  ${sanitizedData.specialRequests.replace(/\n/g, "<br>")}
                </div>
              </div>
            `
                : ""
            }
          </div>

          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>Action requise:</strong> Contactez le client pour confirmer la réservation et envoyer le lien de paiement Stripe pour l'acompte.
            </p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Réservation reçue le ${new Date().toLocaleString("fr-FR")} | IP: ${ip.substring(0, 10)}...
          </p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({
      success: true,
      message: "Réservation envoyée avec succès",
    })
  } catch (error) {
    console.error("Booking form error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    return NextResponse.json({ error: "Erreur lors de l'envoi de la réservation" }, { status: 500 })
  }
}
