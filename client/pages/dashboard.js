import Dashboard from "../components/dashboard-layout";
import AuthContext from "../context/auth";
import { useContext } from "react";

const DashboardPage = (ctx) => {
  const authContext = useContext(AuthContext);
  console.log(authContext.isUserAuthenticated(true));
  return <div>hiiii</div>;
};

DashboardPage.getLayout = (page) => {
  return (
    <Dashboard title="Home Page" username="Arda">
      {page}
    </Dashboard>
  );
};

DashboardPage.getInitialProps = async (ctx) => {
  return { data: true };
};

export default DashboardPage;
