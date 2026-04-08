import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
  const location = useLocation()

  const hidenRouter = ['/dashboard']

  const shouldhideFooter = hidenRouter.includes(location.pathname)
  // location.pathname => gives us the current route
  return (
    <div>
        <NavBar/>
        <Outlet/>
    {/* so if shouldhideFooter is true for certain route in our case its dashboard the footer wont appear */}
        {!shouldhideFooter && <Footer/>}
    </div>
  )
}

export default Layout