import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

export default function Default (props) {
  return (
    <main className='flex flex-column relative bg-white' aria-label='Content'>
      
      {props.children}
    </main>
  )
}
