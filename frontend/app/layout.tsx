import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Winter Wonderland Chat - Mental Coach',
  description: 'A supportive mental coach in a winter wonderland',
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
