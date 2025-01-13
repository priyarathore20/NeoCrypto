import Footer from '@/components/UI/Footer';
import Navbar from '@/components/UI/Navbar';
import './globals.css';

export const metadata = {
  title: 'NeoCrypto',
  description:
    'Track real-time cryptocurrency prices and trends effortlessly with NeoCrypto. Explore interactive charts, stay updated on market insights, and elevate your crypto journey—all in one sleek platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
