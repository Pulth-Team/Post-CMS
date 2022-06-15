import Dashboard from "../components/dashboard-layout";

import isAuthenticated from "../lib/isAuthenticated";
import redirect from "../lib/redirect";
import useUser from "../hooks/use-user";

const DashboardPage = () => {
  const { userData, loaded } = useUser();

  if (loaded)
    return <div>Hi {userData.username} welcome to Post-CMS dashboard </div>;
  else return <div> Loading ...</div>;
};

DashboardPage.getLayout = (page) => {
  const { userData, loaded } = useUser();

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
