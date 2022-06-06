import "../styles/globals.css";
import axios from "axios";

function MyApp({ Component, pageProps }) {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:4000";

  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
