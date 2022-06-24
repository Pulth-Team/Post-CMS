import { useState, useEffect } from "react";
import axios from "axios";

function useUser() {
  const [userData, setUserData] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("/api/auth/current")
      .then((response) => setUserData(response.data))
      .catch((error) => error)
      .finally(() => setLoaded(true));
  }, []);

  return { userData, loaded, setUserData, setLoaded };
}

export default useUser;
