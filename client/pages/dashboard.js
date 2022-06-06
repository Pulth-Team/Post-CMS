import Dashboard from "../components/dashboard-layout";

import { useEffect, useState } from "react";

import isAuthenticated from "../lib/isAuthenticated";
import redirect from "../lib/redirect";

const DashboardPage = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem("userData"));
    setUserData(a);
  }, []);

  return <div>Hi {userData.username} welcome to Post-CMS dashboard </div>;
};

DashboardPage.getLayout = (page) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem("userData"));
    setUserData(a);
  }, []);

  return (
    <Dashboard title="Home Page" username={userData.username}>
      {page}
    </Dashboard>
  );
};

DashboardPage.getInitialProps = async (ctx) => {
  const isAuth = await isAuthenticated(ctx);
  if (!isAuth) redirect("/login", ctx);

  return { isAuth };
};

export default DashboardPage;
