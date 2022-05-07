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

import { useState } from "react";

export default function Dashboard() {
  const MenuData = [
    {
      position: "up",
      title: "Home",
      icon: HomeIcon,
    },
    {
      position: "up",
      title: "Explore",
      icon: SearchIcon,
    },
    {
      position: "up",
      title: "Create New",
      icon: PlusCircleIcon,
    },
    {
      position: "down",
      title: "Settings",
      icon: CogIcon,
    },
  ];
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
                    className="text-white flex px-3  py-2 gap-2 items-center"
                  >
                    <val.icon className="w-6 h-6"></val.icon>
                    <p>{val.title}</p>
                  </div>
                );
            })}
          </div>

          <div>
            {MenuData.map((val) => {
              if (val.position == "down")
                return (
                  <div
                    key={val.title}
                    className="text-white flex px-3 py-2 gap-2 items-center"
                  >
                    <val.icon className="w-6 h-6"></val.icon>
                    <p>{val.title}</p>
                  </div>
                );
            })}
          </div>
        </div>

        <div className="w-full h-16 bg-neutral-300 flex items-center p-4 justify-between">
          <div className="text-lg font-mono flex items-center gap-x-2">
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
            Dashboard
          </div>

          <div className="flex items-center justify-between sm:w-32 h-16">
            <p className="hidden sm:block">Bekogeko</p>
            <Popover className="h-12">
              <Popover.Button>
                <img
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61"
                  className="rounded-full w-12 h-12 hover:cursor-pointer"
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
      </div>
    </div>
  );
}
