import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div>
        {/*Header is fixed*/}
        <Header/>
        {/*Outlet is the placeholder for the components for the dynamic main*/}
        <div className=' container mt-5 mb-2 ' style={{minHeight:"81vh"}}>
          <Outlet/>
        </div>
        <div className='mb-0'>
          <Footer/>
        </div>
        {/*Footer is fixed*/}
       
    </div>
  )
}
