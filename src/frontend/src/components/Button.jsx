import React from 'react'
import Auth from '../pages/Authsignin'
import { Link } from 'react-router-dom'

const Button = ({prop, link, className}) => {
  return (
    <div className={className}>
        <Link to={link}>
          <button className='bg-gradient-to-r from-cyan-500 to-blue-700 text-white sm:p-3 text-xs p-2 rounded-xl shadow transition delay-200 hover:text-black shadow-cyan-500'>{prop}</button>
        </Link>
    </div>
  )
}

export default Button