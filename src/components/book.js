import React, { useEffect, useState, Fragment } from 'react'
import { getBook, getNavBooks } from '../store/selectors'
import { store } from '../store'
import Loader from './loader'
import Nav from './nav'
import { Link } from 'react-router-dom'

export default function BookPage (props) {
  const [book, setBook] = useState(null)
  const [stack, setStack] = useState([])
  const [link, setLink] = useState([])
  const [delivery, setDelivery] = useState([])
  const [loaded, setloaded] = useState(false)
  const [loadedImages, setloadedImages] = useState(0)
  // let count = 0

  const onLoad = () => {
    // count++
    setloadedImages(loadedImages + 1)
    if (loadedImages + 1 === book.content.length) {
      setloaded(true)
    }
  }

  const fetchBook = () => {
    const data = getBook(store.getState(), `/${props.match.params.id}`)
    if (data !== book) {
      setBook(data)
    }
  }
  useEffect(() => {
    fetchBook()
  },[])
  
  const bookLoaded = book !== null
  let color
  if (bookLoaded) color = {color: book.color}
  return (
    <div className='page'>
      <Loader loaded={loaded} />
    {bookLoaded &&
      <div className='w-100 page'>
        <div className='w-50 flex flex-column items-center justify-center book-header center pv6 ph0 ph4-l'>
          {/* <img className='mw5' src={require(`../books${book.permalink}/icon.png`).default} /> */}
          <div className='icon h-100' style={{backgroundImage: `url(${require(`../books${book.permalink}/icon.png`).default})`}} />
          <h1 className='f4-l center tc' style={{color: book.color}}>{book.title}</h1>
          <span className='f3-l lh-title normal center tc mt3' >{book.description}</span>
        </div>
        <div className='w-100 flex flex-column justify-center items-center mt3 ph0 ph4-l'>
          <div className='w-100 flex justify-between f5 ph4 ph0-l'>
            <div className='w-50'>
              <span>Book by <a className='link' target='_blank' style={color} href={book.author[1]}>{book.author[0]}</a></span>
            </div>
            <div className='w-50 tr'>
              <span>Interactive experience by <a className='link' target='_blank' style={color} href={book.interactive[1]}>{book.interactive[0]}</a></span>
            </div>
          </div>
          <img className='w-100 mt2' onLoad={onLoad} src={require(`../books${book.permalink}/${book.header}`).default} />
          
        </div>
        <div className='content w-100 flex flex-wrap mv4 pr0 pr4-l'>
          {book.content.map((item, key) => {
            if (item.type === 'video'){
              return (
                <div className='w-100 pl0 pl4-l'  key={key}>
                  <video controls className='w-100 mv4' src={require(`../books${book.permalink}/${item.file}`).default}/>
                </div>
              )
            } else if (item.type === 'video-yt'){
              return (
                <div className='w-100 ml0 ml4-l mv4' key={key}>
                  <div className='video-container'>
                    <iframe
                    className='video'
                    src={`https://www.youtube.com/embed/${item.file}`}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
                    allowFullScreen
                    onLoad={onLoad}
                    ></iframe>
                  </div>
                  {item.caption && <div className='mt3 f5 lh-copy mh4 mh0-l'>{item.caption}</div>}
                </div>
              )
            } else {
              let width = 'w-100'
              if (item.format === 'h') width = 'w-100 w-50-l'
              return (
                <div className={`mv4 justify-between pl0 pl4-l ${width}`} key={key}>
                  <img className='w-100' onLoad={onLoad} src={require(`../books${book.permalink}/${item.file}`).default} />
                  {item.caption && <div className='mt3 mh4 mh0-l f5 lh-copy'>{item.caption}</div>}
                </div>
              )
            }
            
          })}
        </div>
        <Nav currentBook={book}/>
      </div>
      
      }
      </div>
    
  )
}
