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

       <navbar className="flex items-center justify-between  bg-zinc-800 w-screen h-10 left-0 box-border p-9">
            <div className="flex">
                <i className="bx bx-menu text-white mr-5 self-center text-4xl m-0 p-0"></i>
                <h1 className="text-5xl font-bold tracking-tight text-gray-900 self-center mb-2">
                  <span className="text-white">Post</span>
                  <span className="text-indigo-600">CMS</span>
                </h1>
            </div>
            <div className="flex mr-5">
          
                <button className="border border-indigo-600 text-indigo-600 ml-10 font-bold text-lg rounded px-5 mr-5">
                    <p className='inline'>Create</p>
                </button>
                <a><img src="https://www.w3schools.com/howto/img_avatar2.png" className="rounded-full w-12 h-12"  /></a>

            </div>
      </navbar>

       </div>
   </div>
  )
}
