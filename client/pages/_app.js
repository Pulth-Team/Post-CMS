import "../styles/globals.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";

import { useSession } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:4000";

  return (
    <SessionProvider session={pageProps.session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}

export default MyApp;
