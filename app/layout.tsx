import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SaintSoft | CRM, Automatización y Software para Operaciones Reales",
  description: "Creamos CRM, automatizaciones y plataformas empresariales basadas en procesos reales. Conoce nuestro modelo de implementación y el caso JUMOCOL / TiviPlay.",
  keywords: ["CRM para servicios recurrentes", "software para call center", "automatización de recaudo", "CRM de renovaciones", "software empresarial a medida", "automatización de WhatsApp y ventas", "conciliación de pagos y servicios", "transformación digital para pymes"],
  authors: [{ name: "SaintSoft" }],
  openGraph: {
    title: "SaintSoft | CRM, Automatización y Software para Operaciones Reales",
    description: "Construimos software a partir de operaciones reales: arquitectura tecnológica, conocimiento empresarial y procesos validados.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaintSoft | CRM, Automatización y Software para Operaciones Reales",
    description: "Construimos software a partir de operaciones reales: arquitectura tecnológica, conocimiento empresarial y procesos validados.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
