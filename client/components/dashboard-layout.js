import Head from "next/head";
import {
  MenuIcon,
  HomeIcon,
  SearchIcon,
  PlusCircleIcon,
  CogIcon,
  UserIcon,
  LogoutIcon,
  BellIcon,
} from "@heroicons/react/outline";
import { Popover } from "@headlessui/react";

import { useRouter } from "next/router";

export default function Layout({ title, username, relatedTitle, children }) {
  const MenuData = [
    {
      position: "up",
      title: "Home",
      href: "/dashboard",
      icon: HomeIcon,
    },
    {
      position: "up",
      title: "Explore",
      href: "/explore",
      icon: SearchIcon,
    },
    {
      position: "up",
      title: "Create New",
      href: "/create",
      icon: PlusCircleIcon,
    },
    {
      position: "down",
      title: "Settings",
      href: "/settings",
      icon: CogIcon,
    },
  ];

  const titleLen = title.length;
  const soSmallTitle = title.slice(0, 20) + (titleLen > 20 ? "…" : "");
  const smallTitle = title.slice(0, 25) + (titleLen > 25 ? "…" : "");
  const mediumTitle = title.slice(0, 35) + (titleLen > 35 ? "…" : "");
  const largeTitle = title.slice(0, 60) + (titleLen > 60 ? "…" : "");

  const router = useRouter();

  return (
    <div>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>

      <div className="flex w-full h-screen">
        <div className="sm:flex sm:w-48 pt-16 flex-col hidden sm:flex-shrink-0 sm:flex-grow-0 bg-neutral-600 justify-between">
          <div>
            {MenuData.map((val) => {
              if (val.position == "up")
                return (
                  <div
                    key={val.title}
                    className="text-gray-300 flex px-3  py-2 gap-2 items-center"
                  >
                    <val.icon className="w-6 h-6"></val.icon>
                    <p
                      className={
                        router.asPath == val.href || val.title == relatedTitle
                          ? "text-white"
                          : ""
                      }
                    >
                      {val.title}
                    </p>
                  </div>
                );
            })}
          </div>

          <div className="pb-2">
            {MenuData.map((val) => {
              if (val.position == "down")
                return (
                  <div
                    key={val.title}
                    className="text-gray-300 flex px-3 py-2 gap-2 items-center"
                  >
                    <val.icon className="w-6 h-6"></val.icon>
                    <p
                      className={
                        router.asPath == val.href || val.title == relatedTitle
                          ? "text-white"
                          : ""
                      }
                    >
                      {val.title}
                    </p>
                  </div>
                );
            })}
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full h-16 bg-neutral-300 flex items-center p-4 justify-between">
            <div className="text-lg font-mono flex items-center gap-x-2 flex-shrink w-min">
              <div className="sm:hidden">
                <Popover className="h-8">
                  <Popover.Button>
                    <MenuIcon className="w-8 h-8"></MenuIcon>
                  </Popover.Button>
                  <Popover.Panel>
                    <div className="absolute flex flex-col p-4 bg-neutral-200 rounded">
                      {MenuData.map((val) => {
                        return (
                          <div
                            className="flex gap-2 items-center"
                            key={val.title}
                          >
                            <val.icon className="w-6 h-6"></val.icon>
                            <p>{val.title}</p>
                          </div>
                        );
                      })}
                    </div>
                  </Popover.Panel>
                </Popover>
              </div>
              <p className="overflow-hidden whitespace-nowrap text-ellipsis block sm:hidden">
                {soSmallTitle}
              </p>
              <p className="overflow-hidden whitespace-nowrap text-ellipsis hidden sm:block md:hidden">
                {smallTitle}
              </p>
              <p className="overflow-hidden whitespace-nowrap text-ellipsis hidden md:block lg:hidden">
                {mediumTitle}
              </p>
              <p className="overflow-hidden whitespace-nowrap text-ellipsis hidden lg:block">
                {largeTitle}
              </p>
            </div>

            <div className="flex items-center justify-between sm:w-min h-16">
              <p className="hidden sm:block mr-2">{username}</p>
              <Popover className="h-12 w-12 flex-shrink-0">
                <Popover.Button>
                  <img
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61"
                    className="rounded-full w-12 h-12 hover:cursor-pointer flex-grow-0 flex-shrink-0"
                  />
                </Popover.Button>

                <Popover.Panel className="w-16 h-16 absolute z-10 -translate-x-20">
                  <div className="w-32 bg-neutral-200 shadow-md p-2 rounded flex flex-col">
                    <div className="flex gap-2 items-center py-1">
                      <UserIcon className="w-6 h-6 "></UserIcon>
                      <p>Profile</p>
                    </div>
                    <div className="flex gap-2 items-center py-1">
                      <CogIcon className="w-6 h-6 "></CogIcon>
                      <p>Settings</p>
                    </div>
                    <div className="flex gap-2 items-center py-1">
                      <LogoutIcon className="w-6 h-6 "></LogoutIcon>
                      <p>Log out</p>
                    </div>
                  </div>
                </Popover.Panel>
              </Popover>
            </div>
          </div>
          <div className="p-4 overflow-x-hidden overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
