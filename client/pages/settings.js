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

  const [usernameValid, setUsernameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("passwordd");
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

  const usernameBlurHandler = async (e) => {
    if (username.length >= 4 && username.length <= 50) setUsernameValid(true);
    else setUsernameValid(false);
  };

  const emailBlurHandler = async (e) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValid = !!email.match(mailformat);
    setEmailValid(isValid);
  };

  const passwordBlurHandler = (e) => {
    if (password.length >= 8 && password.length <= 20) setPasswordValid(true);
    else setPasswordValid(false);
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
              onBlur={usernameBlurHandler}
              className={`border-4 rounded-md p-2 w-full outline-none ${
                !usernameValid ? "border-red-500" : ""
              }${
                usernameValid && username != initialUsername
                  ? "border-yellow-200"
                  : ""
              }`}
              disabled={usernameDisabled}
              value={username || ""}
            ></input>
            <p className="italic text-red-700">
              {usernameValid
                ? ""
                : "Username must be between 4 and 50 characters"}
            </p>
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
              onBlur={emailBlurHandler}
              className={`border-4 rounded-md p-2 w-full outline-none ${
                !emailValid ? "border-red-500" : ""
              }${
                emailValid && email != initialEmail ? "border-yellow-200" : ""
              }`}
              disabled={emailDisabled}
              value={email || ""}
              type="email"
            ></input>
            <p className="italic text-red-700">
              {emailValid ? "" : "Email must be an valid email address"}
            </p>
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
                  setPassword("passwordd");
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
              onBlur={passwordBlurHandler}
              className={`border-4 rounded-md p-2 w-full outline-none ${
                !passwordValid ? "border-red-500" : ""
              }${
                passwordValid && !passwordDisabled ? "border-yellow-200" : ""
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
            <p className="italic text-red-700">
              {passwordValid
                ? ""
                : "Password must be between 8 and 20 characters"}
            </p>
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
                  const response = await axios
                    .put("/api/auth/settings", {
                      currentPassword,
                      username:
                        initialUsername != username ? username : undefined,
                      email: initialEmail != email ? email : undefined,
                      newPassword: !passwordDisabled ? password : undefined,
                    })
                    .catch((error) => {
                      console.log(error);
                      return error.response.data;
                    });
                  console.log(response);
                  if (response.errors) {
                    console.log("Kaydedilemedi");
                  } else {
                    setAlertEnabled(false);
                  }
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
            (username == initialUsername &&
              email == initialEmail &&
              passwordDisabled) ||
            !usernameValid ||
            !emailValid ||
            !passwordValid
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
