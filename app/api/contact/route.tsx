import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  email: z.string().email("Email invalide").max(255, "Email trop long"),
  phone: z.string().min(10, "Numéro de téléphone invalide").max(20, "Numéro de téléphone trop long"),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(1000, "Le message ne peut pas dépasser 1000 caractères"),
})

const rateLimitMap = new Map()

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  const record = rateLimitMap.get(ip)
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
    if (!rateLimit(ip)) {
      return NextResponse.json({ error: "Trop de tentatives. Veuillez réessayer dans 15 minutes." }, { status: 429 })
    }

    const body = await request.json()

    const validatedData = contactSchema.parse(body)

    // Sanitize inputs
    const sanitizedData = {
      name: validatedData.name.trim(),
      email: validatedData.email.trim().toLowerCase(),
      phone: validatedData.phone.trim(),
      message: validatedData.message.trim(),
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

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: "icvtc35@gmail.com",
      subject: `[ICVTC35] Nouveau message de contact - ${sanitizedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d97706; border-bottom: 2px solid #d97706; padding-bottom: 10px;">
            Nouveau message de contact
          </h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nom:</strong> ${sanitizedData.name}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            <p><strong>Téléphone:</strong> ${sanitizedData.phone}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #d97706; margin-top: 10px;">
              ${sanitizedData.message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Message reçu le ${new Date().toLocaleString("fr-FR")}
          </p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({
      success: true,
      message: "Message envoyé avec succès",
    })
  } catch (error) {
    console.error("Contact form error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    return NextResponse.json({ error: "Erreur lors de l'envoi du message" }, { status: 500 })
  }
}
