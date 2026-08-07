import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PARNIAN // CLASSIFIED',
  description: 'A cinematic birthday surprise for Parnian.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
