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

let prev
let next
const loaded = books.next
if (loaded) {
  prev = books.prev[1]
  next = books.next[1]
}
  
  return (
    <div className='flex mh4 mv3'>
      {loaded && 
        <div className='w-100 flex flex-row justify-between items-center'>
          <Link className='pointer link p-black pointer items-center flex flex-column flex-row-l' to={`/books${prev.permalink}`} alt={ prev.title } title={ prev.title } >
            <img className='nav-icon ' src={require(`../books${props.currentBook.permalink}/prev.png`).default}/>
            <img className='nav-icon dn-l' src={require(`../assets/images/arrow.svg`).default} style={{width: '40px', transform: 'scaleX(-1)'}}/>
            <div className='items-center mw5 dn flex-l'>
              <h4 className='mh4 center tl pl3' style={{color: prev.color}}>{prev.title}</h4>
            </div> 
      </Link>
      <Link to={'/'} className='link p-black'>
        <h2 className='tc f4'>The Immersive Museum <br/> of Children's Books</h2>
      </Link>
      <Link className='pointer link p-black pointer items-center flex flex-column flex-row-l' to={`/books${next.permalink}`} alt={ next.title } title={ next.title } >
        <div className='items-center mw5 dn flex-l'>
          <h4 className='mh4 center tr pr3' style={{color: next.color}}>{next.title}</h4>
        </div> 
        <img className='nav-icon' src={require(`../books${props.currentBook.permalink}/next.png`).default}/>
        <img className='nav-icon dn-l' src={require(`../assets/images/arrow.svg`).default} style={{width: '40px'}}/>
        
      </Link>
        </div>
      }
    </div>
  )
}