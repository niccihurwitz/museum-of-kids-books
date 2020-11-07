import React, { useEffect, useState } from 'react'
import { getNavBooks } from '../store/selectors'
import { store } from '../store'
import { Link } from 'react-router-dom'

export default function Nav (props) {
  const [books, setBooks] = useState([])

  const fetchBooks = () => {
    const data = getNavBooks(store.getState(), props.currentBook.permalink)
    if (data !== books) {
      setBooks(data)
    }
  }
  useEffect(() => {
    fetchBooks()
  },[])

console.log(books)
let prev
let next
const loaded = books.length > 0
if (loaded) {
  prev = books[0][1]
  next = books[1][1]
console.log(prev)
}
  
  return (
    <div className='flex mh4 mv3'>
      {loaded && 
        <div className='w-100 flex flex-row justify-between'>
          <Link className='mw5 pointer link p-black pointer items-center flex' to={`books${prev.permalink}`} alt={ prev.title } title={ prev.title } >
            <img className='nav-icon' src={require(`../books${props.currentBook.permalink}/prev.png`).default}/>
            <div className='flex items-center w-50'>
              <h4 className='mh4 center tc'>{prev.title}</h4>
            </div> 
      </Link>

      <Link className='mw5 pointer link p-black pointer items-center flex' to={`books${next.permalink}`} alt={ next.title } title={ next.title } >
        <div className='flex items-center w-50'>
          <h4 className='mh4 center tc'>{next.title}</h4>
        </div> 
        <img className='nav-icon' src={require(`../books${props.currentBook.permalink}/next.png`).default}/>
        
      </Link>
        </div>
      }
    </div>
  )
}