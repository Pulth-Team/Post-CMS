import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: "",
  });

  useEffect(() => {
    const storage = localStorage.getItem("token");
    console.log({
      token: storage,
    });
    setAuthState({
      token: storage,
    });
  }, []);
  const setUserAuthInfo = ({ jwt_token }) => {
    localStorage.setItem("token", jwt_token);

    setAuthState({
      token: jwt_token,
    });
  };

  // checks if the user is authenticated or not
  const isUserAuthenticated = (checkToken) => {
    console.log(authState);
    if (!authState.token) {
      return false;
    } else if (checkToken) {
      const response = axios.get("http://localhost:4000/api/auth/check");
      console.log("response check", response);
      return "idk";
    } else {
      return true;
    }
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export default AuthContext;
export { AuthProvider };
