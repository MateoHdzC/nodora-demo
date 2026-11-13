"use client";

import { ThemeProvider } from "next-themes";

// Pone la clase .dark en <html> antes del primer pintado (sin parpadeo)
// y recuerda la elección en localStorage.
export function ProveedorTema({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
