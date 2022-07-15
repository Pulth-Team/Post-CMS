import Dashboard from "../../components/dashboard-layout";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

import { FolderAddIcon, PlusIcon } from "@heroicons/react/outline";

import ProjectCard from "../../components/project-card";

import { Dialog } from "@headlessui/react";

export default function ProjectsPage({ myArticles }) {
  //   const { userData, loaded } = useUser();

  let [isOpen, setOpen] = useState(false);

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
          <div onClick={() => setOpen(true)}>
            <div className="group border-2 rounded-md flex flex-col items-center justify-center border-dashed hover:border-solid active:bg-neutral-200 hover:border-indigo-500 p-5">
              <div>
                <p className="group-hover:text-indigo-500 flex items-center gap-1">
                  <PlusIcon className="w-4 inline-block "></PlusIcon>Create
                  Project
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Dialog
        className="fixed inset-0"
        open={isOpen}
        onClose={() => setOpen(false)}
      >
        <Dialog.Panel>
          <Dialog.Title>Create Project</Dialog.Title>
          <Dialog.Description>Proje açıyon he haberin olsun</Dialog.Description>
          <p>Osuurk</p>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}

ProjectsPage.getLayout = function getLayout(page) {
  return <Dashboard title="Projects">{page}</Dashboard>;
};
ProjectsPage.getInitialProps = async (ctx) => {
  var session = ctx.req.cookies.session;
  var cookieValue = Buffer.from(session, "base64").toString();
  var cookieJSON = JSON.parse(cookieValue);
  var userDataBase64 = cookieJSON.jwt.split(".")[1];
  var userDataValue = Buffer.from(userDataBase64, "base64").toString();
  var userDataJSON = JSON.parse(userDataValue);

  const response = await axios.get("/api/article/user/" + userDataJSON.id);
  console.log(userDataJSON);

  return { myArticles: response.data || [] };
};
