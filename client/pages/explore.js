import Dashboard from "../components/dashboard-layout";

export default function ExplorePage() {
  return <div></div>;
}

ExplorePage.getLayout = function getLayout(page) {
  return (
    <Dashboard title="Explore" username="Arda">
      {page}
    </Dashboard>
  );
};
