import { useEffect } from "react";
import Router from "next/router";
import nextCookie from "next-cookies";
import cookie from "js-cookie";

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
    if (typeof window === "undefined") {
      ctx.res.writeHead(302, { Location: "/login" });
      ctx.res.end();
    } else {
      Router.push("/login");
    }
  }

  return session;
};

export const logout = () => {
  cookie.remove("session");
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now());
  Router.push("/login");
};

export const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === "logout") {
        console.log("logged out from storage!");
        Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);
    const getLayout = WrappedComponent.getLayout || ((page) => page);
    return getLayout(<WrappedComponent {...props} />);
  };

  Wrapper.getInitialProps = async (ctx) => {
    const session = auth(ctx);

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, session };
  };

  return Wrapper;
};
