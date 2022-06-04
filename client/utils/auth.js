import { useEffect } from "react";
import Router from "next/router";
import nextCookie from "next-cookies";
import cookie from "js-cookie";

// saving token to cookie and redirecting to /dashboard
export const login = ({ token }) => {
  cookie.set("session", token, { expires: 1 });
  Router.push("/dashboard");
};

export const auth = (ctx) => {
  const { session } = nextCookie(ctx);

  console.log("session ", session);
  console.log("ctx cookie", nextCookie(ctx));

  // If there's no token, it means the user is not logged in.
  if (!session) {
    // if window is undefined it means we are in server side
    if (typeof window === "undefined") {
      // set temporaly redirection and redirect to /login
      ctx.res.writeHead(302, { Location: "/login" });

      // end response and send
      ctx.res.end();
    } else {
      // if window is defined it means we are in client side  redirect to login via router
      Router.push("/login");
    }
  } // if session is defined

  // return session
  return session;
};

// this method only be called from client so window is always defined
export const logout = () => {
  // remove session from cookies
  cookie.remove("session");
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now());
  Router.push("/login");
};

// middleware for making the page visible for only authenticated user
export const withAuth = (WrappedComponent) => {
  // wrapper component in react
  const Wrapper = (props) => {
    // local storage event callback
    const syncLogout = (event) => {
      if (event.key === "logout") {
        console.log("logged out from storage!");
        Router.push("/login");
      }
    };

    useEffect(() => {
      // add local storage event
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);

    // get layout if its defined in wrapped page if not use componenet itself
    const getLayout = WrappedComponent.getLayout || ((page) => page);
    return getLayout(<WrappedComponent {...props} />);
  };

  Wrapper.getInitialProps = async (ctx) => {
    // get session if we have otherwise redirect automaticaly
    const session = auth(ctx);

    // combine wrapped Pages initialProps and call method with both ctx
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    // return with session and session (comes from auth method and always defined)
    return { ...componentProps, session };
  };

  return Wrapper;
};
