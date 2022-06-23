import Dashboard from "../../components/dashboard-layout";

import { FolderAddIcon, PlusIcon } from "@heroicons/react/outline";

import useUser from "../../hooks/use-user";

export default function CreatePage() {
  return (
    <div className="flex flex-col items-center">
      <FolderAddIcon className="stroke-1 w-12 stroke-slate-500"></FolderAddIcon>
      <div className="flex flex-col items-center my-4">
        <h1 className="font-medium">No projects</h1>
        <p className="text-slate-500">Get started by creating a new project.</p>
      </div>
      <button className="bg-indigo-500 text-white p-2 active:bg-indigo-600 rounded-md my-2 text-sm  flex items-center gap-2">
        <PlusIcon className="w-4 inline-block "></PlusIcon>
        New Project
      </button>
    </div>
  );
}

CreatePage.getLayout = function getLayout(page) {
  const { userData, loaded } = useUser();

  return (
    <Dashboard title="Projects" username={userData.username}>
      {page}
    </Dashboard>
  );
};
