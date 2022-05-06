import Head from 'next/head'
import {useState} from 'react'
import styles from '../styles/Dashboard.module.css'

export default function Dashboard() {

    const [sideBar,setSideBar] = useState(false);

    const toggleSideBar = () => setSideBar(!sideBar);


    return (
    <div>
       
       <Head>
        <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet' />
       </Head>

       <div className="container">

       <navbar className="flex items-center justify-between bg-zinc-800 w-screen h-10  box-border pl-1.5 p-9 pr-5">
            <div className="flex"> 
                <button onClick={toggleSideBar} className="menuBars">
                    <i className="bx bx-menu text-white mr-5 text-4xl m-0 p-0"></i>
                </button>
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
                <a><img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80" className="rounded-full w-12 h-12"  /></a>
            </div>
        </navbar>
        <sidebar>
            <div className={sideBar ? styles.sidebar : styles.activeSidebar}>
                <div className="h-1/5 flex align-center justify-around flex-col">
                    <div className="flex justify-start w-full p-2">
                        <i className="bx bx-layout text-zinc-500 self-center"></i>
                        <p>Control Panel</p>
                    </div>
                    <div className="flex justify-start w-full p-2">
                        <i className="bx bx-detail text-zinc-500 self-center"></i> 
                        <p>Contents</p>
                    </div>
                    <div className="flex justify-start p-2">
                        <i className="bx bx-bar-chart-square text-zinc-500 self-center"></i> 
                        <p>Statics</p>
                    </div>
                </div>
                <div className="mb-10">
                    <div className="flex justify-start p-2">
                        <i className="bx bx-cog text-zinc-500 self-center"></i> 
                        <p>Settings</p>
                    </div>
                    <div className="flex justify-start p-2">
                        <i className="bx bx-error text-zinc-500 self-center"></i> 
                        <p>Send Feedback</p>
                    </div>
                </div>
            </div>
        </sidebar>
    
       </div>
   </div>
  )
}
