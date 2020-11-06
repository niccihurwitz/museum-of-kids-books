import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

export default function Default (props) {
  return (
    <main className='flex flex-column relative bg-white' aria-label='Content'>
      <div className='nav flex flex-row justify-between mb4 top-0 left-0 w-100 bg-white'>
        
      </div>
      
      {props.children}
    </main>
  )
}
