import React, { useEffect, useState, Fragment } from 'react'

export default function ImageLoad (props) {
  const [src, setSrc] = useState(null)
  const [loaded, setLoaded] = useState(null)
  
  const getSrc = () => {
  
    const { src } = props

    const imageLoader = new Image()
    imageLoader.src = src

    imageLoader.onload = () => {
      setSrc(props.src)
      setLoaded('loaded-image')
    }
  }

  useEffect(() => {
    getSrc()
  },[])

  return (<div className={`${loaded} ${props.class}`} style={{ backgroundImage: `url(${src})` }} />)

}