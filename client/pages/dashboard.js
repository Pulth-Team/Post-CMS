import Dashboard from "../components/dashboard-layout";

import { useSession, signIn, signOut } from "next-auth/react";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  console.log(session, status);
  return (
    <Dashboard title="Home Page" username={"a"}>
      <div>
        Hi welcome to Post-CMS dashboard
        <a
          href={`/api/auth/signin`}
          className="p-1.5 bg-gray-200 m-1"
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          gidup girş
        </a>
      </div>
    </Dashboard>
  );
};

export default DashboardPage;
