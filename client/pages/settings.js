import Dashboard from "../components/dashboard-layout";
import useUser from "../hooks/use-user";
import { useState, useEffect } from "react";
import axios from "axios";

import { Dialog } from "@headlessui/react";

import isAuthenticated from "../lib/isAuthenticated";
import redirect from "../lib/redirect";

const SettingPage = function () {
  const [alertEnabled, setAlertEnabled] = useState(false);
  const { userData, loaded } = useUser();

  const [emailDisabled, setEmailDisabled] = useState(true);
  const [usernameDisabled, setUsernameDisabled] = useState(true);
  const [passwordDisabled, setPasswordDisabled] = useState(true);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("password");
  const [currentPassword, setCurrentPassword] = useState("");

  const [initialEmail, setInitialEmail] = useState("");
  const [initialUsername, setInitialUsername] = useState("");

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const sendData = async () => {
    setAlertEnabled(true);
  };

  useEffect(() => {
    setEmail(userData.email);
    setUsername(userData.username);
    setInitialUsername(userData.username);
    setInitialEmail(userData.email);
  }, [loaded]);

  if (!loaded) return <div>Loading...</div>;

  return (
    <div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 md:container mx-auto">
        <div className="px-2">
          <div className="flex justify-between py-2 font-semibold w-full">
            <p>Username: </p>
            <a
              className="underline cursor-pointer"
              onClick={() => {
                setUsernameDisabled(!usernameDisabled);
              }}
            >
              Edit
            </a>
          </div>
          <div className="">
            <input
              onChange={usernameChangeHandler}
              className={`border-4 rounded-md p-2 w-full outline-none ${
                username != initialUsername ? "border-yellow-200" : ""
              }`}
              disabled={usernameDisabled}
              value={username || ""}
            ></input>
          </div>
        </div>
        <div className="px-2">
          <div className="flex justify-between py-2 font-semibold w-full">
            <p>Email:</p>
            <a
              className="underline cursor-pointer"
              onClick={() => {
                setEmailDisabled(!emailDisabled);
              }}
            >
              Edit
            </a>
          </div>
          <div className="">
            <input
              onChange={emailChangeHandler}
              className={`border-4 rounded-md p-2 w-full outline-none ${
                email != initialEmail ? "border-yellow-200" : ""
              }`}
              disabled={emailDisabled}
              value={email || ""}
            ></input>
          </div>
        </div>
        <div className="px-2 py-4">
          <div className="flex justify-between py-2 font-semibold w-full">
            <p>Password:</p>
            <a
              className="underline cursor-pointer"
              onClick={() => {
                if (passwordDisabled) {
                  setPassword("");
                } else {
                  setPassword("password");
                }

                setPasswordDisabled(!passwordDisabled);
              }}
            >
              Edit
            </a>
          </div>
          <div className="">
            <input
              onChange={passwordChangeHandler}
              className={`border-4 rounded-md p-2 w-full outline-none ${
                !passwordDisabled ? "border-yellow-200" : ""
              }`}
              disabled={passwordDisabled}
              type="password"
              value={password || ""}
            ></input>
            {!passwordDisabled ? (
              <p className="italic text-sm px-1">
                Discard changes by clicking Edit button again.
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Dialog
        className="relative z-10"
        open={alertEnabled}
        onClose={() => setAlertEnabled(false)}
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed flex items-center justify-center inset-0">
          <Dialog.Panel className="mx-auto max-w-sm bg-white rounded-2xl p-3">
            <Dialog.Title className="text-2xl p-2">Password Check</Dialog.Title>
            <Dialog.Description className=" p-2">
              We need your password to continue updating your account
              information.
            </Dialog.Description>
            <div className="flex p-2">
              <input
                className="border-2 rounded-md w-full p-2 outline-none text-lg"
                placeholder="Enter your password"
                type="password"
                minLength="8"
                maxLength="20"
                onChange={(event) => setCurrentPassword(event.target.value)}
              ></input>
            </div>

            <div className="flex justify-end p-2 gap-2">
              <button
                className="border-2 rounded-md p-2 border-indigo-500 text-black"
                onClick={() => setAlertEnabled(false)}
              >
                Cancel
              </button>
              <button
                className="border-2 rounded-md p-2 border-indigo-500 bg-indigo-500 text-white"
                onClick={async () => {
                  const response = await axios.put("/api/auth/settings", {
                    currentPassword,
                    username:
                      initialUsername != username ? username : undefined,
                    email: initialEmail != email ? email : undefined,
                    newPassword: !passwordDisabled ? password : undefined,
                  });
                  console.log(response);
                }}
              >
                Update
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      <div className="flex justify-center">
        <button
          className="border-2 rounded-md px-3 py-1.5 text-lg"
          disabled={
            username == initialUsername &&
            email == initialEmail &&
            passwordDisabled
          }
          onClick={sendData}
        >
          Save
        </button>
      </div>
    </div>
  );
};

SettingPage.getLayout = (page) => {
  const { userData, loaded } = useUser();

  return (
    <Dashboard title="Settings" username={userData.username}>
      {page}
    </Dashboard>
  );
};

SettingPage.getInitialProps = async (ctx) => {
  const isAuth = await isAuthenticated(ctx);
  if (!isAuth) redirect("/login", ctx);

  return { isAuth };
};

export default SettingPage;
