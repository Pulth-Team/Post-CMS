import Dashboard from "../components/dashboard-layout";
import useUser from "../hooks/use-user";
import dynamic from "next/dynamic";
import axios from "axios";

import isAuthenticated from "../lib/isAuthenticated";
import redirect from "../lib/redirect";

import { useState } from "react";

const CustomEditor = dynamic(
  () => import("../components/Editor/index").then((mod) => mod.EditorContainer),
  { ssr: false }
);

const CreatePage = () => {
  const [editorInstance, setEditorInstance] = useState({});
  const [isReady, setIsReady] = useState(false);

  const [title, setTitle] = useState("");

  return (
    <div key="ContentEditor" id="slugy">
      <div className="mb-3 pt-0">
        <input
          type="text"
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          className="px-3 py-4 placeholder-slate-300 text-slate-600 relative bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
        />
      </div>
      <hr></hr>
      {CustomEditor && (
        <CustomEditor
          editorRef={setEditorInstance}
          options={{
            placeholder: "Enter for new paragraph",
            autofocus: true,
            /**
             * onReady callback
             */
            onReady: () => {
              setIsReady(true);
            },

            /**
             * onChange callback
             */
            onChange: () => {},
          }}
        ></CustomEditor>
      )}
      <hr></hr>
      <button
        className="border p-2 rounded-md my-2"
        disabled={!isReady}
        onClick={async () => {
          const savedata = await editorInstance.save();
          delete savedata.time;
          savedata.title = title;
          const response = await axios.post("/api/article/create", {
            title,
            version: savedata.version,
            blocks: savedata.blocks,
          });
          console.log(savedata);
        }}
      >
        Save
      </button>
      <button
        className="border p-2 rounded-md m-2"
        disabled={!isReady}
        onClick={async () => {
          console.log(await editorInstance.save());
        }}
      >
        Publish
      </button>
    </div>
  );
};

CreatePage.getLayout = function getLayout(page) {
  const { userData, loaded } = useUser();

  return (
    <Dashboard title="Create New" username={userData.username}>
      {page}
    </Dashboard>
  );
};

CreatePage.getInitialProps = async (ctx) => {
  const isAuth = await isAuthenticated(ctx);
  if (!isAuth) redirect("/login", ctx);

  return { isAuth };
};

export default CreatePage;
