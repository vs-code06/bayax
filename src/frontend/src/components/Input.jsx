import React from 'react'

const Input = ({ icon, ...props }) => {
  return (
    <div className='relative w-full'>
      <div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>{icon}</div>
      <input
        {...props}
        className='w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200'
      />
    </div>
  )
}
export default Input
