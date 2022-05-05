import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Dashboard() {
  return (
   <div>
       
       <Head>
        <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet' />
       </Head>

       <div className="container">

       <navbar className="flex items-center justify-between bg-zinc-800 w-screen h-10  box-border p-9 pr-5">
            <div className="flex"> 
                <i className="bx bx-menu text-white mr-5 self-center text-4xl m-0 p-0"></i>
                <h1 className="text-5xl font-bold tracking-tight text-gray-900 self-center mb-2">
                  <span className="text-white">Post</span>
                  <span className="text-indigo-600">CMS</span>
                </h1>
            </div>

            <div className="searchBar bg-zinc-800 rounded pl-5 flex flex-row-reverse justify-end items-center w-7/12">
                <input type="text" className="mb-1 transition duration-300 placeholder:text-zinc-500 px-5 py-2 rounded peer bg-zinc-800 text-zinc-500 w-screen focus:text-zinc-300 focus:outline-none focus:placeholder:text-zinc-800 " placeholder="Search in your profile..."></input>

                <i className="bx bx-search transition duration-300 text-lg text-zinc-500 peer-focus:text-zinc-300 self-center m-0 p-0"></i>
            </div>

            <div className="flex mr-5">
                <button className="border border-indigo-600 text-indigo-600 font-bold text-lg rounded px-5 mr-5">
                    Create
                </button>
                <a><img src="https://this-person-does-not-exist.com/img/avatar-298ec0466599b1273254f8c5232ab3d2.jpg" className="rounded-full w-12 h-12"  /></a>
            </div>
      </navbar>

       </div>
   </div>
  )
}
