import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOS Dev Start - Comece projetos do jeito certo",
  description:
    "IA gera seu PRD, escolhe a stack, cria o plano de fases e configura tudo que o agente precisa. Gratis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
