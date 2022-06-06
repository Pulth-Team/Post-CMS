import "../styles/globals.css";
import axios from "axios";

import { AuthProvider } from "../context/auth";
function MyApp({ Component, pageProps }) {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:4000";

  const getLayout = Component.getLayout || ((page) => page);
  return <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>;
}

export default MyApp;
