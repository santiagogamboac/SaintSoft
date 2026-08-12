import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SaintSoft | Desarrollo de Software Corporativo a Medida",
  description: "Soluciones de software a medida, escalables y seguras para CEOs y CTOs que exigen excelencia técnica. Transformación digital, automatización y plataformas enterprise.",
  keywords: ["desarrollo de software a medida", "software corporativo", "automatización de procesos", "integraciones API", "plataformas web empresariales", "apps móviles", "IA empresarial", "staff augmentation", "consultoría tecnológica"],
  authors: [{ name: "SaintSoft" }],
  openGraph: {
    title: "SaintSoft | Desarrollo de Software Corporativo a Medida",
    description: "Construimos el Software que Impulsa a las Empresas del Futuro",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaintSoft | Desarrollo de Software Corporativo a Medida",
    description: "Construimos el Software que Impulsa a las Empresas del Futuro",
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
