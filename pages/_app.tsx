import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Nunito, Nunito_Sans, Roboto } from '@next/font/google'

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"]
})

const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  weight: ['200', '300', "400", "600", "700", "800"]
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${nunito.variable} ${nunito_sans.variable}`}>
      <Component {...pageProps} />
    </main>
  )
}
