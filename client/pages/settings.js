import Dashboard from "../components/dashboard-layout";

export default function SettingPage() {
  return <div></div>;
}

SettingPage.getLayout = function getLayout(page) {
  return (
    <Dashboard title="Settings Page" username="Arda">
      {page}
    </Dashboard>
  );
};
