import React, { useEffect, useState } from 'react'

export default function ImageLoad (props) {
  const [src, setSrc] = useState(null)
  const [loaded, setLoaded] = useState(null)
  
  const onLoad = ({target: img}) => {
    setSrc(img.src)
    setLoaded('loaded-image')
  }

  return (
    <div className={`${loaded} ${props.class}`} style={{ backgroundImage: `url(${src})`, backgroundColor: props.color }} >
      <img className='dn' src={props.src} onLoad={onLoad}/>
    </div>
  )

}