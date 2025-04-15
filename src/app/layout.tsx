import { ReduxProvider } from '@/lib/redux/provider';
import MainLayout from '@/components/layout/MainLayout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}