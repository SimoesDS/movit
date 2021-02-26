import '../styles/global.css';

import { ChallengesProvider } from "../contexts/ChallengesContext";

// MyApp incorpora todas as telas da aplicação
function MyApp({ Component, pageProps }) {
  return (
      <ChallengesProvider>
        <Component {...pageProps} />
      </ChallengesProvider>
  )
}

export default MyApp
