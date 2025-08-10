import '../styles/globals.css';
import AppLayout from '@/components/AppLayout';

export const metadata = {
  title: 'Neighborhood Jobs'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
