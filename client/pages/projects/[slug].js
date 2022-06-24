import Dashboard from "../../components/dashboard-layout";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";

import isAuthenticated from "../../lib/isAuthenticated";
import redirect from "../../lib/redirect";

import useUser from "../../hooks/use-user";

const CustomEditor = dynamic(
  () =>
    import("../../components/Editor/index").then((mod) => mod.EditorContainer),
  { ssr: false }
);

export default function EditPage({ data }) {
  const router = useRouter();
  const { slug } = router.query;
  const { blocks, title } = data;

  const [editorInstance, setEditorInstance] = useState({});
  const [isReady, setIsReady] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  return (
    <div key="ContentEditor" id="slugy">
      <div className="mb-3 pt-0">
        <input
          type="text"
          value={title}
          disabled
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
            data: { blocks },
            /**
             * onChange callback
             */
            onChange: () => {
              setIsChanged(true);
              console.log("changed");
              console.log(isChanged);
            },
          }}
        ></CustomEditor>
      )}
      <hr></hr>
      <button
        className="border p-2 rounded-md my-2"
        disabled={!isReady}
        onClick={async () => {
          // Todo update current document
          const savedData = await editorInstance.save();
          console.log(isChanged);
          const response = await axios.put("/api/article/update", {
            slug,
            blocks: isChanged ? savedData.blocks : undefined,
          });
          console.log(response);
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
}

EditPage.getLayout = function getLayout(page) {
  const { userData, loaded } = useUser({});

  if (page.props.error || page.props.errorData) {
    console.log("error", page.props.error);
    console.log("error Response Data", page.props.errorData);
  }

  return !page.props.error ? (
    <Dashboard title={page.props.data.title} username={userData.username}>
      {page}
    </Dashboard>
  ) : (
    <Dashboard title="Error Happened" username={userData.username}>
      <p className="bg-red-400 rounded-md text-black p-2 text-xl">
        Error Happened during getting article information from backend
      </p>
      <pre className="my-2 text-gray-500">
        for more detail please look through console...
      </pre>
    </Dashboard>
  );
};

EditPage.getInitialProps = async (ctx) => {
  // TODO make sure user is owner of this article
  const isAuth = await isAuthenticated(ctx);
  if (!isAuth) redirect("/login", ctx);

  const slug = ctx.query.slug;
  let error;
  const response = await axios.get("/api/article/" + slug).catch((err) => {
    console.log(err);
    error = err;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  });

  if (response && response.data)
    return {
      data: response.data,
    };
  else
    return {
      error,
      errorData: error.response && error.response.data,
      resp: response,
    };
};
