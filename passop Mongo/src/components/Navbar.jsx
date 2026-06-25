import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className=" mx-auto  flex justify-between items-center h-14 py-7 px-7">

        <div className="logo  font-bold text-2xl">
          <span className='text-green-700'>&lt;</span>
          <span>Pass</span>
          <span className='text-green-700'>OP/&gt;</span>
        </div>
       <button className='text-white bg-green-700 flex justify-center items-center px-3 rounded-full hover:bg-green-600 ring-white ring-1 '>
        <img className='invert p-2 w-11 ' src="icons/github.svg" alt="" />
        <span className='font-bold'>GitHub</span>
       </button>
      </div>
    </nav>
  )
}

export default Navbar
