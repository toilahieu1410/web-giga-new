import React, {useEffect, useState} from 'react'

const LoadingComment = () => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])


  return (
    <>
      {
        loading && (
          <div className='position-absolute loading loading-screen-home-comment' >
            <div className="loadingspinner"></div>
          </div>
        )
      }
    </>
    
  )
}

export default LoadingComment