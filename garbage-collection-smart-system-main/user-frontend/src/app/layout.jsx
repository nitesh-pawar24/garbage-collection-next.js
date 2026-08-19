import ClientShell from "./ClientShell";
import "./globals.css";

export const metadata = {
  title: "EcoSyz - Smart Waste Collection & Management",
  description: "Citizen & Company portal for smart garbage collection, complaint reporting, and tracking.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  );
}
