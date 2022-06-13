import Dashboard from "../../components/dashboard-layout";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";
import { useEffect, useState } from "react";

import isAuthenticated from "../../lib/isAuthenticated";
import redirect from "../../lib/redirect";

import useUser from "../../hooks/use-user";

import Delimiter from "../../components/slug/delimiter";

const Output = dynamic(() => import("editorjs-react-renderer"), { ssr: false });
// import Output from "";

export default function SlugPage({ data }) {
  const router = useRouter();
  const { slug } = router.query;
  const { blocks, title } = data;

  return (
    <div
      className="mx-auto w-full p-5 sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12"
      id="slugy"
    >
      <Output
        renderers={{ delimiter: Delimiter }}
        data={{ blocks }}
        classNames=""
      ></Output>
    </div>
  );
}

SlugPage.getLayout = function getLayout(page) {
  const { userData, loaded } = useUser();

  return (
    <Dashboard title={page.props.data.title} username={userData.username}>
      {page}
    </Dashboard>
  );
};

SlugPage.getInitialProps = async (ctx) => {
  const isAuth = await isAuthenticated(ctx);
  if (!isAuth) redirect("/login", ctx);

  const slug = ctx.query.slug;
  const response = await axios.get("/api/article/" + slug).catch((err) => {
    console.log(err);
  });

  return { data: response.data };
};
