import Dashboard from "../components/dashboard-layout";
import useUser from "../hooks/use-user";

import isAuthenticated from "../lib/isAuthenticated";
import redirect from "../lib/redirect";

const SettingPage = function () {
  return <div> </div>;
};

SettingPage.getLayout = (page) => {
  const { userData, loaded } = useUser();

  return (
    <Dashboard title="Settings" username={userData.username}>
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
