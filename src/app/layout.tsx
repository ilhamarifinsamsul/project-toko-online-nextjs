import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          {children}
          <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />
        </ThemeProvider>
      </body>
    </html>
  );
}
