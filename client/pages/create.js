import Dashboard from "../components/dashboard-layout";
import { useEffect, useState } from "react";

export default function CreatePage() {
  return <div></div>;
}

CreatePage.getLayout = function getLayout(page) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem("userData"));
    setUserData(a);
  }, []);

  return (
    <Dashboard title="Create New" username={userData.username}>
      {page}
    </Dashboard>
  );
};
