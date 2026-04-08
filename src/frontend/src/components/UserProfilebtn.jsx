import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faRightFromBracket,faBook } from '@fortawesome/free-solid-svg-icons'
import { profileButton, usernameState } from '../recoil/createUser.recoil'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { userProfileState } from '../recoil/createUser.recoil'
import { LogOutUser } from '../apiFrontend/authHandler' 
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { inView, motion } from 'framer-motion'


const UserProfilebtn = () => {
  const [profileDropDown, setProfileDropDown ] = useRecoilState(profileButton)
  const setUserProfile = useSetRecoilState(userProfileState)
  const navigate = useNavigate()
  // const setusernameState = useRecoilState(usernameState)

  const dropDownMotion = {
    initial : {y:-10, opacity : 0},
    inView : {y: 0, opacity : 1,transition : {duration: 1}}
  }
  // const logOut = async() => {
  //   // console.log(`before logOut ${document.cookie}`);
  //   await LogOutUser()
  //   document.cookie = 'accessToken=; path=/'
  //   setUserProfile(false)
  //   setProfileDropDown(false)
  //   // console.log(`after logOut ${document.cookie}`);


  //   navigate('/auth/signin')

  // }

  const logOut = async () => {
    await LogOutUser(); // Ensure this function clears the token on the server
    localStorage.removeItem('username')
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'; // Clear the cookie
    setUserProfile(false); // Update the Recoil state to reflect the user is logged out
    setProfileDropDown(false); // Close the dropdown
    navigate('/auth/signin'); // Navigate to the sign-in page
}

  return (
    
    <div className='relative grid grid-rows w-24'>
        <button className='' onClick={() => setProfileDropDown(!profileDropDown)}>
          <FontAwesomeIcon icon={faUser} className='w-3 h-4 bg-gradient-to-r from-cyan-500 to-blue-700 text-white rounded-full py-3 px-4'/>
        </button>
        <div className=''>
          {
            profileDropDown && (
              <motion.div initial='initial' whileInView='inView' variants={dropDownMotion} className=' bg-gradient-to-r from-cyan-100 to-blue-500 text-black absolute text-sm font-bold px-2 py-1 rounded  '>
                <Link to='/dashboard' onClick={() => setProfileDropDown(false)} className='flex items-center gap-1'> <FontAwesomeIcon icon={faBook} />view Lesson</Link>
                <button onClick={logOut}> <FontAwesomeIcon icon={faRightFromBracket} /> LogOut</button>
              </motion.div>
            )
          }
        </div>
    </div>
  )
}

export default UserProfilebtn