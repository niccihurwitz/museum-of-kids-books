import React, { useEffect, useState, Fragment } from 'react'
import { getBook } from '../store/selectors'
import { store } from '../store'
import Loader from './loader'
import Nav from './nav'
import ImageLoad from './image'

export default function BookPage (props) {
  const [book, setBook] = useState(null)
  const [stack, setStack] = useState([])
  const [link, setLink] = useState([])
  const [delivery, setDelivery] = useState([])
  const [loaded, setloaded] = useState(false)
  const [loadedImages, setloadedImages] = useState(0)
  // let count = 0

  const fetchBook = () => {
    const data = getBook(store.getState(), `/${props.match.params.id}`)
    if (data !== book) {
      setBook(data)
      setloaded(true)
    }
  }
  useEffect(() => {
    fetchBook()
  },[])
  
  const bookLoaded = book !== null
  let color
  if (bookLoaded) color = {color: book.color}
  return (
    <div className='page pt4'>
      <Loader loaded={loaded} />
    {bookLoaded &&
      <div className='w-100 page'>
        <div className='w-80 w-60-l mw8-l flex flex-column items-center justify-center book-header center pv4 pv6-l ph2 ph3-l'>
          {/* <img className='mw5' src={require(`../books${book.permalink}/icon.png`).default} /> */}
          <div className='icon h-100' style={{backgroundImage: `url(${require(`../books${book.permalink}/icon.png`).default})`}} />
          <h1 className='f4 title-l center tc' style={{color: book.color}}>{book.title}</h1>
          <span className='lh-title normal center tc mt3 description' >{book.description}</span>
        </div>
        <div className='w-100 flex flex-column justify-center items-center mt3 ph2 ph3-l'>
        <div className='w-100 flex-l flex-column flex-row-l justify-between-l f5 ph0-l mt3 dn mb3'>
            <div className='w-100'>
              <span>Book by <a className='link links b' target='_blank' style={color} href={book.author[1]}>{book.author[0]}</a></span>
            </div>
            <div className='w-100 w-50-l  tr-l'>
              <span>Interactive experience by <a className='link links b' target='_blank' style={color} href={book.interactive[1]}>{book.interactive[0]}</a></span>
            </div>
          </div>
          <div className='w-100 relative'>
            <div className='absolute header placeholder' style={{backgroundColor: book.color}}/>
            <ImageLoad class='w-100 header image-container' color={book.color} src={require(`../books${book.permalink}/${book.header}`).default} />
          </div>
          <div className='w-100 flex flex-column flex-row-l justify-between-l f5 ph0-l mt3 dn-l'>
            <div className='w-100 w-50-l lh-copy'>
              <span>Book by <a className='link links b' target='_blank' style={color} href={book.author[1]}>{book.author[0]}</a></span>
            </div>
            <div className='w-100 w-50-l lh-copy tr-l'>
              <span>Interactive experience by <a className='link links b' target='_blank' style={color} href={book.interactive[1]}>{book.interactive[0]}</a></span>
            </div>
          </div>
          
        </div>
        <div className='content w-100 flex flex-wrap mt3 mb5 pr2 pr3-l'>
          {book.content.map((item, key) => {
            if (item.type === 'video'){
              return (
                <div className='w-100 ml2 ml3-l mv3' key={key}>
                  <div className='video-container'>
                  <iframe className='video' title="vimeo-player" src={`https://player.vimeo.com/video/${item.file}`} width="640" height="361" frameBorder="0" allowFullScreen></iframe>
                </div>
                </div>
              )
            } else if (item.type === 'video-yt'){
              return (
                <div className='w-100 ml2 ml3-l mv3' key={key}>
                  <div className='video-container'>
                    <iframe
                    className='video'
                    src={`https://www.youtube.com/embed/${item.file}`}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
                    allowFullScreen
                    ></iframe>
                  </div>
                  {item.caption && <div className='mt3 f5 lh-copy'>{item.caption}</div>}
                </div>
              )
            } else {
              let width = 'w-100'
              if (item.format === 'h') width = 'w-100 w-50-l'
              const src = require(`../books${book.permalink}/${item.file}`).default

              return (
                <div className={`mt3 justify-between pl2 pl3-l ${width} relative`} key={key}>
                  <div className='w-100 relative'>
                    <div className='absolute placeholder' style={{backgroundColor: book.color}}/>
                    <ImageLoad class='image-container' color={book.color} src={src} />
                  </div>
                  {item.caption && <div className='mt3 f5 lh-copy'>{item.caption}</div>}
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
