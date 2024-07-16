import React, {useEffect, useState} from 'react'
import Error404 from '../layout/error404'

const LoadingHome = () => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])


  return (
    <>
      {
        loading ? (
          <div className='position-relative loading loading-screen-home' >
            <div className="loadingspinner"></div>
          </div>
        ) : (
          <Error404/>
        )
      }
    </>
    
  )
}

export default LoadingHome