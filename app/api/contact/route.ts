import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company: string;
  interest?: string;
  message: string;
}

function validate(body: Partial<ContactPayload>): string | null {
  if (!body.name?.trim()) return "El nombre es obligatorio.";
  if (!body.email?.trim() || !EMAIL_RE.test(body.email.trim())) return "El email no es válido.";
  if (!body.company?.trim()) return "La empresa es obligatoria.";
  if (!body.message?.trim()) return "Cuéntanos sobre tu proyecto.";
  return null;
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Cuerpo de la solicitud inválido." }, { status: 400 });
  }

  const validationError = validate(body);
  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const leadToEmail = process.env.LEAD_TO_EMAIL || gmailUser;

  if (!gmailUser || !gmailAppPassword || !leadToEmail) {
    console.error("Faltan variables de entorno para el envío de correo (GMAIL_USER/GMAIL_APP_PASSWORD/LEAD_TO_EMAIL).");
    return Response.json(
      { error: "El formulario no está disponible en este momento. Escríbenos directamente a contacto@saintsoft.com." },
      { status: 500 }
    );
  }

  const { name, email, phone, company, interest, message } = body as ContactPayload;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailAppPassword },
  });

  try {
    await transporter.sendMail({
      from: `"Landing SaintSoft" <${gmailUser}>`,
      to: leadToEmail,
      replyTo: email.trim(),
      subject: `Nuevo lead: ${name.trim()} (${company.trim()})`,
      text: [
        `Nombre: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Teléfono: ${phone?.trim() || "No proporcionado"}`,
        `Empresa: ${company.trim()}`,
        `Interés: ${interest?.trim() || "No especificado"}`,
        "",
        "Mensaje:",
        message.trim(),
      ].join("\n"),
    });
  } catch (err) {
    console.error("Error enviando el correo del lead:", err);
    return Response.json(
      { error: "No se pudo enviar el mensaje. Intenta de nuevo o escríbenos a contacto@saintsoft.com." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
