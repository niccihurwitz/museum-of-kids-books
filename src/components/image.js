import React, { useEffect, useState } from 'react'

export default function ImageLoad (props) {
  const [src, setSrc] = useState(null)
  const [loaded, setLoaded] = useState(null)
  
  const onLoad = ({target: img}) => {
    const interval = setInterval(() => {
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        clearInterval(interval)
        setSrc(img.src)
        setLoaded('loaded-image')
      }
    }, 100)
  }

  let style = { backgroundImage: `url(${src})`, backgroundColor: props.color, ...props.style }
  return (
    <div className={`${loaded} ${props.class}`} style={style} >
      <img className='dn' src={props.src} onLoad={onLoad}/>
    </div>
  )

}