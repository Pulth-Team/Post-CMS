import "../styles/globals.css";
import axios from "axios";
import { useState, useEffect } from "react";

import AppContext from "../contexts/app";
import useUser from "../hooks/use-user";

function MyApp({ Component, pageProps }) {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:4000";

  // const [userData, setUserData] = useState({
  //   id: "",
  //   username: "",
  //   email: "",
  // });

  // const [loaded, setLoaded] = useState(false);
  // useEffect(() => {
  //   const GetData = async () => {
  //     await axios
  //       .get("/api/auth/current")
  //       .then((response) => setUserData(response.data))
  //       .catch((error) => error)
  //       .finally(() => setLoaded(true));
  //   };
  //   GetData();
  //   return () => {};
  // }, []);

  const { userData, setUserData } = useUser();

  const getLayout = Component.getLayout || ((page) => page);

  const setUserId = (id) => {
    setUserData({ ...userData, id });
  };

  const setUserName = (username) => {
    setUserData({ ...userData, username });
  };

  const setEmail = (email) => {
    setUserData({ ...userData, email });
  };

  return (
    <AppContext.Provider
      value={{
        userData: userData || "",
        setUserData,
        setUserId,
        setUserName,
        setEmail,
      }}
    >
      {getLayout(<Component {...pageProps} />)}
    </AppContext.Provider>
  );
}

export default MyApp;
