import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'

function App() {
  

  return (
    <>
    <div className="absolute bottom-0 inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
     <Navbar />
      <Manager/>
     
     
    </>
  )
}

export default App
