import Dashboard from "../components/dashboard-layout";
import axios from "axios";
import Link from "next/link";

export default function ExplorePage({ data }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {data.map((article) => {
        return (
          <Link key={article._id} href={"/article/" + article.slug}>
            <div className="flex justify-center items-end w-full h-60 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md lg:h-40 xl:h-60 overflow-hidden group-hover:opacity-75 aspect-none hover:cursor-pointer bg-cover bg-[url('https://aquajogclub.com/wp-content/uploads/2019/12/placeholder.png')]">
              <div className="flex w-full h-2/6 justify-center bg-gray-300 rounded-md items-center">
                <h3 className="text-xl truncate px-5">{article.title}</h3>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

ExplorePage.getLayout = function getLayout(page) {
  return (
    <Dashboard title="Explore" username="Arda">
      {page}
    </Dashboard>
  );
};

ExplorePage.getInitialProps = async ({ req }) => {
  const response = await axios.get("/api/article/explore").catch((err) => {
    console.log(err);
  });

  return { data: response.data };
};
