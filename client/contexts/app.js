import React from "react";

const AppContext = React.createContext({
  userData: {
    id: "",
    username: "",
    email: "",
  },
});

export default AppContext;
