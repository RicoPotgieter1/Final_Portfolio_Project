import { inter } from "./ui/fonts";
import "./globals.css"
import Navbar from "./ui/navbar";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar/>
        {children}
        </body>
    </html>
  );
}