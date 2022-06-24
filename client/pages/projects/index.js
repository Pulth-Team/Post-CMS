import Dashboard from "../../components/dashboard-layout";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";

import { FolderAddIcon, PlusIcon } from "@heroicons/react/outline";

import AppContext from "../../contexts/app";

import ProjectCard from "../../components/project-card";

export default function CreatePage() {
  const { userData } = useContext(AppContext);
  //   const { userData, loaded } = useUser();
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
  }, []);

  const NoProjectComp = myArticles.length == 0 && (
    <div className="flex flex-col items-center">
      <FolderAddIcon className="stroke-1 w-12 stroke-slate-500"></FolderAddIcon>
      <div className="flex flex-col items-center my-4">
        <h1 className="font-medium">No projects</h1>
        <p className="text-slate-500">Get started by creating a new project.</p>
      </div>
      <Link href="/projects/create">
        <button className="bg-indigo-500 text-white p-2 active:bg-indigo-600 rounded-md my-2 text-sm  flex items-center gap-2">
          <PlusIcon className="w-4 inline-block "></PlusIcon>
          New Project
        </button>
      </Link>
    </div>
  );

  const ProjectList = myArticles.map((article) => {
    return <ProjectCard data={article} key={article._id} />;
  });
  return (
    <div>
      {NoProjectComp}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {myArticles.length > 0 && ProjectList}

        {myArticles.length > 0 && (
          <Link href="/projects/create">
            <div className="group border-2 rounded-md flex flex-col items-center justify-center border-dashed hover:border-solid active:bg-neutral-200 hover:border-indigo-500 p-5">
              <div>
                <p className="group-hover:text-indigo-500 flex items-center gap-1">
                  <PlusIcon className="w-4 inline-block "></PlusIcon>Create
                  Project
                </p>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

CreatePage.getLayout = function getLayout(page) {
  return <Dashboard title="Projects">{page}</Dashboard>;
};
