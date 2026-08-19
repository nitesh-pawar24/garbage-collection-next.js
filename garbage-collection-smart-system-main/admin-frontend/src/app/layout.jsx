import Providers from "@/components/Providers";
import "./globals.css";

export const metadata = {
  title: "EcoSyz Admin - Smart Waste Management",
  description: "Panchayat Administration Portal for Waste Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
