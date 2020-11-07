import React, { useEffect, useState } from 'react'
import { getBooks } from '../store/selectors'
import { store } from '../store'
import { Link } from 'react-router-dom'

export default function HomePage (props) {
  const [books, setBooks] = useState([])

  const fetchBooks = () => {
    const data = getBooks(store.getState())
    if (data !== books) {
      setBooks(data)
    }
  }
  useEffect(() => {
    fetchBooks()
  },[])

  return (
    <div className='page'>
      <div className='w-100 ma3 page'>
        <div className='title mw6 center'>
          <Link to={'/'} className='link p-black'>
            <h2 className='mt5 mb3 tc'>The Immersive Museum of Children's Books</h2>
          </Link>
        </div>
      </div>
    <div className='page books-container flex mh3'>
        {Array.from(books).map((pro, key) => {
          const book = pro[1]

          return(
            <Link className='w-25 pointer link p-black pointer book-icon' to={`books${book.permalink}`} key={key} alt={ book.title } title={ book.title } >
              <img src={require(`../books${book.permalink}/home-icon.png`).default}/>
              <div className='absolute icon-title flex items-center'>
                <h4 className='mh4 center tc'>{book.title}</h4>
              </div> 
            </Link>
          )
        })}
    </div>

    </div>
  )
}
