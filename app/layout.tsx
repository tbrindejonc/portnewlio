import type {Metadata} from 'next';
import './globals.css';

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
      <body className=''>{children}</body>
    </html>
  );
}
