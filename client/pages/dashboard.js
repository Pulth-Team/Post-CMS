import Dashboard from "../components/dashboard-layout";

export default function TestPage() {
  return <div></div>;
}

TestPage.getLayout = function getLayout(page) {
  return (
    <Dashboard title="Home Page" username="Momirtumaaaaaa">
      {page}
    </Dashboard>
  );
};
