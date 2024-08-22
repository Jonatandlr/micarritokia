'use client'
import React from 'react'

export default function page() {
  const [state, setState] = React.useState(0)
  const picameYox = () => {
    //counter
    setState(state + 1)
  }

  return (
    <main className=' h-s'>
      <div className='flex items-center justify-center h-full'>
        <div className='text-white text-3xl'>Hello World</div>
      </div>
      <div className='text-red-400'>{state}</div>
      <button onClick={()=>{picameYox()}}>prensame yox</button>
      
    </main>
  )
}
