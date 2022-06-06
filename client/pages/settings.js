import Dashboard from "../components/dashboard-layout";
import { useEffect, useState } from "react";

import isAuthenticated from "../lib/isAuthenticated";
import redirect from "../lib/redirect";

const SettingPage = function () {
  return <div></div>;
};

SettingPage.getLayout = function getLayout(page) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem("userData"));
    setUserData(a);
  }, []);

  return (
    <Dashboard title="Settings Page" username={userData.username}>
      {page}
    </Dashboard>
  );
};
SettingPage.getInitialProps = async (ctx) => {
  const isAuth = await isAuthenticated(ctx);
  if (!isAuth) redirect("/login", ctx);

  return { isAuth };
};

export default SettingPage;
