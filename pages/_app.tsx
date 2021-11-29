import 'tailwindcss/tailwind.css';
import '@components/styles.css'
function MyApp({ Component, pageProps }) {
  return <>
  <Component {...pageProps} />
  </>
}

export default MyApp;
