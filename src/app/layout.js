
import "./globals.css";

export const metadata = {
  title: "DittoPetCare | Complete Care for Your Pets",
  description:
    "Discover professional pet grooming, wellness check-ups, dental care, nutritious foods and accessories for dogs and cats.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
