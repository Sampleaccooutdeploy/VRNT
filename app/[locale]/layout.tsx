import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import '../globals.css'

export const metadata = {
  title: 'VRNT - Veda Rakshana Nidhi Trust',
  description: 'Student Information Portal for Veda Rakshana Nidhi Trust',
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../i18n/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages(locale)

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
