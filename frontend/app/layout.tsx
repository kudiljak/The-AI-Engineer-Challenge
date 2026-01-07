import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Japanese Bonsai Chat - Mental Coach',
  description: 'A supportive mental coach in a serene Japanese bonsai setting',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
