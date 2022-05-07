import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordErrors, setPasswordErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();

    axios;
    event.preventDefault();
    setPasswordErrors([]);
    setEmailErrors([]);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        {
          email,
          password,
        }
      );
    } catch (e) {
      e.response.data.errors.map((err) => {
        if (err.field === "password") {
          setPasswordErrors([...passwordErrors, err]);
        } else if (err.field === "email") {
          setEmailErrors([...emailErrors, err]);
        }
      });
    }
  };

  return (
    <div className="flex flex-nowrap p-5 h-screen ">
      <div className="flex justify-center items-center grow shrink">
        <div className="flex flex-col w-full items-center sm:w-3/4">
          <h1 className="text-4xl font-bold my-8">Sign up</h1>
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
            Sign up
          </button>
        </div>
      </div>
      <div className="hidden md:flex md:justify-center md:items-center w-1/4 bg-slate-500 rounded-2xl grow shrink p-10 lg:p-0">
        <img className="md:h-3/4" src="Login photo.svg" />
      </div>
    </div>
  );
}
