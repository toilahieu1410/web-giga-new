import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'

const TapTop = () => {

  const [taptopStyle, setTaptopStyle] = useState('none');

  const executeScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth'})
  };

  const handleScroll = () => {
    if(window.scrollY > 600) {
      setTaptopStyle('flex')
    } else {
      setTaptopStyle('none')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll',handleScroll)
    handleScroll()
    return () => {
        window.removeEventListener('scroll', handleScroll)
      }
  },[])

  return (
    <div className='tap-top' style={{display: taptopStyle}} onClick={() => executeScroll()}>
      <FontAwesomeIcon  icon={faAngleDoubleUp} style={{fontSize:18}} />
    </div>
  )
};

export default TapTop;