import Link from "next/link";
import axios from "axios";
import { useState, useContext } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [passwordValid, setPasswordValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const [error, setError] = useState("");

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!emailValid || !passwordValid)
      return alert("Please fill in all fields");

    const response = await axios
      .post("/api/auth/signin", {
        username: username || undefined,
        email: email || undefined,
        password: password,
      })
      .catch((err) => {
        if (err.response.data.errors) {
          if (err.response.data.errors[0].message === "Invalid Credentials") {
            setError("Invalid Email or Password");
          }

          return false;
        }
      });
    if (response !== false) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-nowrap p-5 h-screen">
      <div className="flex justify-center items-center grow shrink">
        <div className="flex flex-col w-full items-center sm:w-3/4">
          <h1 className="text-4xl font-bold my-8">Login</h1>
          <div className="w-4/5">
            <input
              type="text"
              onChange={(e) => {
                if (e.target.value.includes("@")) {
                  const mailformat =
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                  const isValid =
                    !!e.target.value.match(mailformat) || e.target.value === "";

                  setUsername("");
                  setEmail(e.target.value);
                  setEmailValid(isValid);
                } else {
                  setEmail("");
                  setUsername(e.target.value);
                  setEmailValid(
                    e.target.value.length >= 4 && e.target.value.length <= 50
                  );
                }
              }}
              className="w-full p-2 border-2 rounded-md "
              // className="w-4/5 border-2 rounded-md my-1.5 p-2"
              placeholder="Email address or Username"
            />
            <p
              className={`text-sm px-1 text-red-600 ${
                !emailValid && (email !== "" || username !== "")
                  ? "block"
                  : "hidden"
              }`}
            >
              Email or Username is not valid ...
            </p>
          </div>
          <div className="w-4/5">
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
                // length > 8 and length < 20
                const isValid =
                  e.target.value.length >= 8 && e.target.value.length <= 20;

                setPasswordValid(isValid);
              }}
              className="w-full border-2 rounded-md my-1.5 p-2 flex-shrink-0"
              placeholder="Password"
            />
            <p
              className={`text-sm px-1 text-red-600 ${
                !passwordValid && password !== "" ? "block" : "hidden"
              }`}
            >
              Password is not valid ...
            </p>
          </div>
          <div
            className={`w-4/5 text-red-600 bg-red-200 p-1 rounded ${
              error ? "block" : "hidden"
            }`}
          >
            {error}
          </div>
          <button
            type="submit"
            onClick={onSubmit}
            className="focus:outline outline-4 outline-indigo-300
                        w-4/5 bg-indigo-600 hover:bg-indigo-700
                        rounded-md text-white h-10 mt-3 disabled:bg-indigo-300 disabled:outline-none disabled:cursor-default"
            disabled={!emailValid || !passwordValid}
          >
            Sign in
          </button>
          <p className="mt-1 w-4/5">
            Don't have a account? {""}
            <Link href="/signup">
              <a className="focus:outline outline-2 rounded-sm visited:outline-blue-400 visited:text-blue-500 visited:italic">
                Sign up
              </a>
            </Link>{" "}
            now!
          </p>
        </div>
      </div>
      <div className="hidden md:flex md:justify-center md:items-center w-1/4 bg-slate-500 rounded-2xl grow shrink p-10 lg:p-0">
        <img className="md:h-3/4" src="Login photo.svg" />
      </div>
    </div>
  );
}
