import Dashboard from "../../components/dashboard-layout";
import { useRouter } from "next/router";
import Error from "next/error";
import dynamic from "next/dynamic";
import axios from "axios";
import { useEffect, useState } from "react";

import isAuthenticated from "../../lib/isAuthenticated";
import redirect from "../../lib/redirect";

import useUser from "../../hooks/use-user";

const Output = dynamic(() => import("../../components/slug"), { ssr: false });

export default function SlugPage({ data, error }) {
  const router = useRouter();
  const { slug } = router.query;
  const { blocks, title } = data;

  return (
    <div
      className="mx-auto w-full p-5 sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12"
      id="slugy"
    >
      <Output blocks={blocks}></Output>
    </div>
  );
}

SlugPage.getLayout = function getLayout(page) {
  const { userData, loaded } = useUser();
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

SlugPage.getInitialProps = async (ctx) => {
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
