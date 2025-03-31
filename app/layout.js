"use client";
import { Poppins } from 'next/font/google';
import Navbar from "../components/navbar";
import './globals.css';
import { usePathname } from 'next/navigation';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins'
});

export default function Layout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins">
        {pathname !== '/login' && <Navbar />}
        <div style={{ padding: '20px' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
