import React, { useEffect, useState } from 'react'
import { getBooks } from '../store/selectors'
import { store } from '../store'
import { Link } from 'react-router-dom'
import ImageLoad from './image'


export default function HomePage (props) {
  const [books, setBooks] = useState([])
  const [width, setWidth] = useState(0)

  const fetchBooks = () => {
    const data = getBooks(store.getState())
    if (data !== books) {
      setBooks(data)
    }
  }

  const updateSize = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    fetchBooks()
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  },[])
  let containerWidth = width
  if (width < 960) {
    containerWidth = width * 3.75
  }
  return (
    <div className='page ma3 mb6'>
      <div className='w-100 page'>
        <div className='title mw6 center'>
          <Link to={'/'} className='link p-black'>
            <h2 className='mt5 mb5 mb4-l tc'>The Immersive Museum<br/>of Children's Books</h2>
          </Link>
        </div>
      </div>
      <div className='books-container flex w-100 flex-column flex-wrap' style={{height: containerWidth}}>
        {Array.from(books).map((pro, key) => {
          const book = pro[1]
          let margin = '0px'
          if ((key === 4 || key === 11) && width >= 960) {
            console.log(key)
            margin =`${width / 4 / 2}px`
          } else if (key === 7 && width < 960){
            margin =`${width / 2 / 2}px`
          }

          return(
            <Link className='w-50 w-25-l pointer link p-black pointer book-icon' style={{marginTop: margin}}to={`books${book.permalink}`} key={key} alt={ book.title } title={ book.title } >
              {/* <img src={require(`../books${book.permalink}/home-icon.png`).default}/> */}
                <div className='w-100 relative'>
                  <div className='absolute icon-image placeholder' style={{backgroundColor: book.color}}/>
                  <ImageLoad class='image-container icon-image' color={book.color} src={require(`../books${book.permalink}/home-icon.png`).default} />
                </div>
              <div className='absolute icon-title flex items-center'>
                <h4 className='mh4 center tc'>{book.title}</h4>
              </div> 
            </Link>
          )
        })}
          
      </div>
      <div className='w-100 flex flex-column flex-row-l p-black f5 pt4 pl4-l home-copy'>
        <div className='w-100 w-50-l mw6 pr5-l'>
          <p><span className='b'>'Design an interactive experience around your favourite children's book.'</span> — This was the brief for Visual Communication students at the University of Technology, Sydney.</p>
          <p>With storytelling at the core, students developed skills in conceptual development, user experience and interface design. In 6 weeks they created an interactive physical-digital museum experience. Now the projects live here for all to enjoy :-)</p>
        </div>
        <div className='w-100 w-50-l mw6 pr5-l'>
          <p>A big thanks to course coordinator, Nicky Hardcastle!<br/>And to Ros Skinner for coding this website.</p>
          <p >Experimental Interactive Design course & site design by <a href='https://niccihurwitz.com/' target='_blank' className='link' style={{color: '#FD8197'}}>Nicci Hurwitz.</a></p>
        </div>
      </div>
    </div>
  )
}