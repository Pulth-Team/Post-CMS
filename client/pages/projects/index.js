import Dashboard from "../../components/dashboard-layout";
import axios from "axios";
import { useState, useEffect, Fragment, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { FolderAddIcon, PlusIcon, PhotographIcon } from "@heroicons/react/outline";

import ProjectCard from "../../components/project-card";

import { Dialog, Transition } from "@headlessui/react";

export default function ProjectsPage({ myArticles }) {
  //   const { userData, loaded } = useUser();


  const [isOpen, setOpen] = useState(false);

  const [articleTitle, setArticleTitle] = useState("");
  const [articleDesc, setArticleDesc] = useState("");

  const [titleValid, setTitleValid] = useState(false);
  const [descValid, setDescValid] = useState(false);

  const [thumbImg, setThumbImg] = useState(null);
  const [objectURL, setObjectURL] = useState(null);

  const inputFile = useRef(null);

  const uploadImageToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];

      setThumbImg(img);
      setObjectURL(URL.createObjectURL(img));
    }
  }

  const titleBlurHandler = (e) => {
    if (e.target.value.length >= 5 && e.target.value.length <= 50) {
      setTitleValid(true);
      return;
    } else {
      setTitleValid(false);
      return;
    }
  }
  const descBlurHandler = (e) => {
    console.log(e.target.value.length);
    if (e.target.value.length <= 256 && e.target.value.length >= 32) {
      setDescValid(true);
      return;
    } else {
      setDescValid(false);
      return;
    }
  }

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

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          className="fixed inset-0 relative z-10"
          onClose={() => {
            setOpen(false);
            setArticleTitle("");
            setArticleDesc("");
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                enter="ease-out duration-100"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex-grow-1 max-h-128 flex-shrink-0 transform rounded-2xl bg-white p-6 pb-6 shadow-xl transform-all">
                  <Dialog.Title className="text-4xl text-left">
                    Create Project
                  </Dialog.Title>
                  <div className="flex flex-col mt-5 w-[80vw] sm:w-[60vw] lg:w-[40vw] gap-y-7">
                    <div className="flex flex-col">
                      <label for="articleTitle" className="text-left ml-1 mb-2">Title</label>
                      <input
                        onBlur={titleBlurHandler}
                        name="articleTitle"
                        value={articleTitle}
                        onChange={(e) => setArticleTitle(e.target.value)}
                        type="text"
                        placeholder="e.g. My Project"
                        className={`px-4 py-2 border-2 outline-none rounded-xl transition-colors duration-300 focus:border-indigo-500 ${titleValid ? "" : "border-red-400"}`}
                      ></input>
                      <p className={`text-thin text-sm text-red-500 text-left ${titleValid ? "hidden" : "inline"}`}>Title must be between 5 to 50 characters</p>
                      <p className={`text-sm italic text-right ml-1 ${titleValid ? "inline" : "hidden"}`}>You can always change title in settings</p>
                    </div>
                    <div className="flex flex-col">
                      <label for="articleDesc" className="text-left ml-1 mb-2"> Description</label>
                      <textarea
                        onBlur={descBlurHandler}
                        name="articleDesc"
                        value={articleDesc}
                        onChange={(e) => setArticleDesc(e.target.value)}
                        placeholder="e.g. This is a project made by me"
                        className={`max-h-[20vh] min-h-[45px] px-4 py-2 border-2 outline-none rounded-xl transition-colors duration-300 focus:border-indigo-500 ${descValid ? "" : "border-red-400"}`}
                      >
                      </textarea>
                      <p className={`text-thin text-sm text-red-500 text-left ${descValid ? "hidden" : "inline"}`}>Description must be between 32 to 256 characters</p>
                      <p className={`text-sm italic text-right ml-1 ${descValid ? "inline" : "hidden"}`}> You can always change description in settings</p>
                    </div>
                    <div className="flex flex-col justify-start">

                      <input id="fileInput" onChange={uploadImageToClient} type="file" className="hidden" ref={inputFile}></input>
                      <div onClick={() => {
                        inputFile.current.click();
                      }} role="input" type="file" className={`bg-gray-600 hover:bg-gray-500 w-1/2 h-48 flex flex-col justify-center items-center`}>
                        <PhotographIcon className={`text-white w-12  ${objectURL ? "hidden" : "block"}`}></PhotographIcon>
                        <p className={`text-white p-2 font-thin ${objectURL ? "hidden" : "block"}`}>Select or Drag and Drop Your Image</p>
                        <img className={`object-contain h-full w-full  ${objectURL ? "block" : "hidden"}`} src={objectURL || null}></img>
                      </div>
                      <p className={`text-left italic text-sm ${objectURL ? "block" : "hidden"} `}>You can click to change image</p>
                      {/* <label for="fileInput" className="relative"><PhotographIcon className="w-16"></PhotographIcon><img className="w-[20vw] h-[12vw]" src={createImgObjectURL} /></label>
                      */}
                    </div>
                    <div className="flex flex-col gap-y-5 md:flex-row gap-x-3 justify-end">
                      <button onClick={async () => {
                        await axios.post("/api/article/create", {
                          title: articleTitle,
                          blocks: [],
                          time: Date.now(),
                        }).then(() => {
                          setOpen(false);
                          setArticleTitle("")
                          setArticleDesc("");
                        })
                      }} className="px-3 py-2 border-2 rounded-xl border-indigo-500 hover:bg-indigo-500 hover:text-white disabled:border-indigo-200 disabled:text-gray-600 transition transition-[border-color,color] duration-300 disabled:hover:bg-white" disabled={!descValid || !titleValid}>Save</button>
                    </div>

                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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
