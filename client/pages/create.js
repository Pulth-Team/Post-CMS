import Dashboard from "../components/dashboard-layout";

export default function CreatePage() {
  return <div></div>;
}

CreatePage.getLayout = function getLayout(page) {
  return (
    <Dashboard title="Create New" username="Arda">
      {page}
    </Dashboard>
  );
};
