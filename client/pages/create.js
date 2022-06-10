import Dashboard from "../components/dashboard-layout";
import useUser from "../hooks/use-user";

export default function CreatePage() {
  return <div></div>;
}

CreatePage.getLayout = function getLayout(page) {
  const { userData, loaded } = useUser();

  return (
    <Dashboard title="Create New" username={userData.username}>
      {page}
    </Dashboard>
  );
};
