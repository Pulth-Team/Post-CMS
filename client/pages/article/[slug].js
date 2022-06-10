import Dashboard from "../../components/dashboard-layout";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

import isAuthenticated from "../../lib/isAuthenticated";
import redirect from "../../lib/redirect";

import useUser from "../../hooks/use-user";

import Header from "../../components/slug/header";
import Paragraph from "../../components/slug/paragraph";
import List from "../../components/slug/list";
import Delimiter from "../../components/slug/delimiter";
import Image from "../../components/slug/image";

export default function SlugPage({ data }) {
  const router = useRouter();
  const { slug } = router.query;
  const { blocks, title } = data;

  return (
    <div className="mx-auto w-full p-5 sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12">
      {blocks.map((block) => {
        switch (block.type) {
          case "header":
            return (
              <Header
                key={block.id}
                level={block.data.level}
                id={block.id}
                text={block.data.text}
              />
            );
            break;
          case "paragraph":
            return <Paragraph key={block.id} text={block.data.text} />;
            break;
          case "list":
            return <List key={block.id} items={block.data.items} />;
          case "delimiter":
            return <Delimiter key={block.id} />;
          case "image":
            return <Image key={block.id} data={block.data} />;
        }
      })}
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
