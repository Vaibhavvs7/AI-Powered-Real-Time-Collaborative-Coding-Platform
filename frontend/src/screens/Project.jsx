import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Project = ({navigate}) => {
    const location = useLocation()
    console.log(location.state)
  return (
    <main className='h-screen w-screen flex'>
        <section className='left h-full min-w-80 bg-red-300'>
            <header className='flex justify-end p-3 px-4 w-full bg-slate-300'>
            <button className='p-2'><i className="ri-group-fill"></i></button>
            </header>
        </section> 

    </main>
  )
}

export default Project