import Dashboard from "../components/dashboard-layout";

import AppContext from "../contexts/app";
import { useContext } from "react";

import isAuthenticated from "../lib/isAuthenticated";
import redirect from "../lib/redirect";

const DashboardPage = () => {
  const { userData } = useContext(AppContext);

  console.log(userData);
  return <div>Hi {userData.username} welcome to Post-CMS dashboard </div>;
};

DashboardPage.getLayout = (page) => {
  const { userData } = useContext(AppContext);
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
