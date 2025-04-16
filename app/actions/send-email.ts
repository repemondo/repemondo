"use server"

import { Resend } from "resend"

// Inicializar Resend con la API key
const resend = new Resend(process.env.RESEND_API_KEY)

export interface ContactFormData {
  name: string
  email: string
  businessType: string
  marketingActions: string[]
  message: string
}

// Función para generar el HTML del correo directamente
function generateEmailHtml(data: {
  name: string
  email: string
  businessType: string
  marketingActions: string
  message: string
}) {
  const { name, email, businessType, marketingActions, message } = data

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Nuevo contacto desde el sitio web</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            padding: 30px;
          }
          .header {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 30px;
            color: #333;
          }
          .subheader {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #333;
          }
          .content {
            font-size: 16px;
            line-height: 1.5;
            color: #333;
            margin: 10px 0;
          }
          .divider {
            border-top: 1px solid #e6e6e6;
            margin: 20px 0;
          }
          .footer {
            font-size: 14px;
            color: #666;
            margin-top: 20px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Nuevo contacto desde el sitio web</div>
          
          <div class="subheader">Información del contacto:</div>
          <p class="content"><strong>Nombre:</strong> ${name}</p>
          <p class="content"><strong>Email:</strong> ${email}</p>
          <p class="content"><strong>Tipo de negocio:</strong> ${businessType}</p>
          <p class="content"><strong>Acciones de marketing realizadas:</strong> ${marketingActions}</p>
          
          <div class="divider"></div>
          
          <div class="subheader">Mensaje:</div>
          <p class="content">${message.replace(/\n/g, "<br>")}</p>
          
          <div class="divider"></div>
          
          <p class="footer">
            Este email fue enviado automáticamente desde el formulario de contacto de Vernon Creative Bureau.<br>
            © ${new Date().getFullYear()} Vernon Creative Bureau. Todos los derechos reservados.
          </p>
        </div>
      </body>
    </html>
  `
}

export async function sendContactFormEmail(formData: ContactFormData) {
  try {
    const { name, email, businessType, marketingActions, message } = formData

    // Validación adicional
    if (!name || !email || !businessType || marketingActions.length === 0 || !message) {
      return {
        success: false,
        error: "Todos los campos son obligatorios",
      }
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "El formato del email no es válido",
      }
    }

    // Verificar que la API key existe
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY no está configurada")
      return {
        success: false,
        error: "Error de configuración del servidor",
      }
    }

    // Generar el HTML del correo directamente
    const htmlContent = generateEmailHtml({
      name,
      email,
      businessType,
      marketingActions: marketingActions.join(", "),
      message,
    })

    const { data, error } = await resend.emails.send({
      from: "Contacto desde Vernon Creative Bureau <onboarding@resend.dev>",
      to: ["repemondo@gmail.com"], // Dirección de correo registrada en Resend
      subject: `Nuevo contacto: ${name}`,
      html: htmlContent,
    })

    if (error) {
      console.error("Error sending email:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error in sendContactFormEmail:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
