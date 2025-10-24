import type {Metadata} from 'next';
import './globals.css';
import Navbar from '@/app/components/Navbar';

export const metadata: Metadata = {
  title: 'Timeuh - Portfolio',
  description: 'My personnal portfolio website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fr'>
      <body className='flex h-full w-full flex-col items-center'>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
