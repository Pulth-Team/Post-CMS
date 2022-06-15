import Link from "next/link";
import axios from "axios";
import { useState, useContext } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordErrors, setPasswordErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setPasswordErrors([]);
    setEmailErrors([]);

    try {
      const response = await axios.post("/api/auth/signin", {
        email,
        password,
      });

      //if (response.status === 200) login({ token: response.data.token });
      if (response.status === 200) {
        delete response.data.token;
        const userData = response.data;

        // only for remember me conditions
        // localStorage.setItem("userData", JSON.stringify(userData));

        router.push("/dashboard");
      }
    } catch (e) {
      console.error(e);
      e.response.data.errors.map((err) => {
        if (err.field === "password") {
          const errs = [...passwordErrors, err];
          console.log(errs);
          setPasswordErrors(errs);
        } else if (err.field === "email") {
          setEmailErrors([...emailErrors, err]);
        }
      });
    }
  };

  return (
    <div className="flex flex-nowrap p-5 h-screen">
      <div className="flex justify-center items-center grow shrink">
        <div className="flex flex-col w-full items-center sm:w-3/4">
          <h1 className="text-4xl font-bold my-8">Login</h1>
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-4/5 border-2 rounded-md my-1.5 p-2"
            placeholder="Email address"
          />
          {emailErrors.length > 0 && (
            <div className="w-4/5 h-full p-1 text-gray-700">
              {emailErrors.map((err, index) => (
                <li key={index}>{err.message}</li>
              ))}
            </div>
          )}
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-4/5 border-2 rounded-md my-1.5 p-2 flex-shrink-0"
            placeholder="Password"
          />
          {passwordErrors.length > 0 && (
            <div className="w-4/5 p-2 text-gray-700">
              {passwordErrors.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </div>
          )}
          <div className="mr-3 w-3/4">
            <input type="checkbox" name="RememberMe" />
            <label htmlFor="RememberMe"> Remember me</label>
          </div>
          <button
            type="submit"
            onClick={onSubmit}
            className="w-4/5 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white h-10 mt-6"
          >
            Sign in
          </button>
          <p className="mt-1 w-4/5">
            Dont have a account? {""}
            <Link href="/signup">
              <a className="text-blue-900 ">Sign up</a>
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden md:flex md:justify-center md:items-center w-1/4 bg-slate-500 rounded-2xl grow shrink p-10 lg:p-0">
        <img className="md:h-3/4" src="Login photo.svg" />
      </div>
    </div>
  );
}
