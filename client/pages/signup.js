import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-nowrap p-5 h-screen ">
      <div className="flex justify-center items-center grow shrink">
        <div className="flex flex-col w-1/2 items-center p-10">
          <h1 className="text-4xl font-bold my-8">Sign up</h1>
          <input
            type="text"
            className="w-full border-2 rounded-md my-1.5 p-2"
            placeholder="Full name"
          />
          <input
            type="text"
            className="w-full border-2 rounded-md my-1.5 p-2"
            placeholder="Email address"
          />
          <input
            type="password"
            className="w-full border-2 rounded-md my-1.5 p-2"
            placeholder="Password"
          />
          <div className="self-start">
            <input type="checkbox" name="RememberMe" />
            <label for="RememberMe"> Remember me</label>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-md text-white h-10 mt-6"
          >
            <onclick>
              <Link href="/login">Sign up</Link>
            </onclick>
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center h-full bg-slate-500 rounded-2xl grow shrink">
        <img src="Login photo.svg" />
      </div>
    </div>
  );
}
