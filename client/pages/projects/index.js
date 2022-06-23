import Dashboard from "../../components/dashboard-layout";
import axios from "axios";
import { useState, useEffect } from "react";

import { FolderAddIcon, PlusIcon } from "@heroicons/react/outline";

import useUser from "../../hooks/use-user";

import ProjectCard from "../../components/project-card";

export default function CreatePage() {
  const { userData, loaded } = useUser();
  const [myArticles, setMyArticles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (userData.id) {
        const response = await axios.get("/api/article/user/" + userData.id);

        console.log(response);
        setMyArticles(response.data);
      }
    }
    fetchData();
  }, [loaded]);

  const NoProjectComp = myArticles.length == 0 && (
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

  const ProjectList = myArticles.map((article) => {
    return <ProjectCard data={article} key={article._id} />;
  });
  return (
    <div>
      {NoProjectComp}
      <div className="grid grid-cols-2 gap-2">
        {myArticles.length > 0 && ProjectList}
      </div>
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
