import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import Header from '../../components/Header/Header';
import GlobalProvider from '../../providers/GlobalProvider';
import type { Metadata } from 'next';
// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Comic Strips',
  icons: {
    icon: '/favicon.svg',
  },
};
import '../index.css';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<LayoutProps>) {
  const { locale } = await params;

  const locales = ['en', 'de'];
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
   <html lang={locale}>
      <body>
        <ErrorBoundary>
          <GlobalProvider locale={locale} messages={messages}>
            <div className="app-layout-root">
              <Header />
              <main className="app-content-frame">{children}</main>
            </div>
          </GlobalProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
