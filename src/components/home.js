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
    <div className='page ma3 mb6 '>
      <div className='w-100 page'>
        <div className='title mw6 center'>
          <Link to={'/'} className='link p-black'>
            <h2 className='mt5 mb3 tc'>The Immersive Museum of Children's Books</h2>
          </Link>
        </div>
      </div>
    <div className='books-container flex w-100 flex-wrap'>
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
        <div className='w-25 p-black f5 pt4 pl4'>
          <p>'Design an interactive experience around your favourite children's book.' — This was the brief for Visual Communication students at the University of Technology, Sydney.</p>
          <p>With storytelling at the core, students developed skills in conceptual development, user experience and interface design. In 6 weeks they created an interactive physical-digital museum experience. Now the projects live here for all to enjoy :-)</p>
          <p>A big thanks to course coordinator, Nicky Hardcastle!</p>
          <p>Experimental Interactive Design course & website by Nicci Hurwitz.</p>
        </div>
    </div>

    </div>
  )
}
