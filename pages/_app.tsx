import { atkinson_hyperlegible } from "@/assets/fonts";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={atkinson_hyperlegible.className}>
      <Component {...pageProps} />
    </main>
  );
}
