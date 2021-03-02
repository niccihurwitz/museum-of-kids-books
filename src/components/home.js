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

  return (
    <div className='page pa3 pb6 pt4'>
      <div className='w-100'>
        <div className='title center'>
          <Link to={'/'} className='link p-black'>
            <h2 className='mt5 mb5 mb4-l tc dn db-ns'>The Immersive Museum of Children's Books</h2>
            <h2 className='mt5 mb5 mb4-l tc dn-ns'>The Immersive Museum <br />of Children's Books</h2>
          </Link>
        </div>
      </div>
      

      <div className='books-container flex w-100 flex-row inline-flex flex-wrap content-start'>
        {Array.from(books).map((pro, key) => {
          const book = pro[1]
          let itemWidth = '0px'
          let margin = '0px'
          let leftMargin = '0px'
          // if ((key === 4 || key === 11) && width >= 960) {
          //   console.log(key)
          //   margin =`${width / 4 / 2}px`
          // } else if (key === 7 && width < 960){
          //   margin =`${width / 2 / 2}px`
          // }
          if (width >= 960) {
            itemWidth = (width / 4)
            if (key % 2 !== 0) {
              margin =`${(itemWidth / 2) -8}px`
            }
            
            if (key === books.size - 1) {
              leftMargin =`${(width / 4) -8}px`
              margin = '0px'
            }
          } else if (width < 960) {
            itemWidth = (width / 2)
            if (key % 2 !== 0) {
              margin =`${(itemWidth / 2)-8}px`
            }
            
            if (key === books.size - 1) {
              leftMargin =`${itemWidth-8}px`
              margin = '0px'
            }
          }
          

          return(
            <Link className='w-50 w-25-l pointer link p-black pointer book-icon' style={{top: margin, marginLeft: leftMargin}}to={`books${book.permalink}`} key={key} alt={ book.title } title={ book.title } >
              <div className='w-100 relative'>
                <div className='absolute icon-image placeholder' style={{backgroundColor: book.color}}/>
                <ImageLoad class='image-container icon-image' color={book.color} src={require(`../books${book.permalink}/home-icon.png`).default} />
                <div className='absolute icon-title flex items-center w-100 h-100'>
                <ImageLoad class='image-container icon-image' color={book.color} src={require(`../books${book.permalink}/hover-icon.png`).default} />
                  {/* <ImageLoad class='w-100 h-100 hover-image' style={{backgroundSize: `${itemWidth}px`}} color={book.color} src={require(`../books${book.permalink}/hover-icon.png`).default} /> */}
                {/* <h4 className='mh4 center tc'>{book.title}</h4> */}
              </div> 
              </div>
             
            </Link>
          )
        })}
          
      </div>
      <div className='w-100 flex flex-column flex-row-l p-black f5 pt4 pl4-l home-copy'>
        <div className='w-100 w-50-l mw6 pr5-l'>
          <p><span className='b'>'Design an interactive experience around your favourite children's book.'</span> — This was the brief for Visual Communication students at the University of Technology, Sydney.</p>
          <p>Over 6 weeks the students honed skills in conceptual development, UX, UI and storytelling to create a 'room' in our museum.</p>
        </div>
        <div className='w-100 w-50-l mw6 pr5-l'>
          <p>A big thanks to course director Nicky Hardcastle <br/>and to Ros Skinner for coding this site.</p>
          <p>Experimental Interactive Design course and site by <a href='https://niccihurwitz.com/' target='_blank' className='link' style={{color: '#FD8197'}}>Nicci Hurwitz.</a></p>
        </div>
      </div>
    </div>
  )
}

{/* <div className='books-container flex w-100 flex-column flex-wrap' style={{height: containerWidth}}>
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
      
  </div> */}