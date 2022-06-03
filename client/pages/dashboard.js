import Dashboard from "../components/dashboard-layout";
import { withAuth } from "../utils/auth";

const DashboardPage = (ctx) => {
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

export default withAuth(DashboardPage);
