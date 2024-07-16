import React, {useEffect} from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"

const LikeShareFacebook = (props) => {

  const { dataHref, name, description, thumb } = props
  
  useEffect(() => {
    // Gọi Facebook SDK load mã JavaScript
    if (window.FB) {
      window.FB.XFBML.parse()
    }
  }, [])
  
  return (
    <HelmetProvider>
      <Helmet>
        <meta property="og:url" content={`${process.env.REACT_APP_REDIRECT_URL}${dataHref}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={thumb} />
      </Helmet>
      <div 
        className="fb-like" 
        data-href={`${process.env.REACT_APP_REDIRECT_URL}${dataHref}`}
        data-layout="button_count" 
        data-action="like" 
        data-size="small" 
        data-share="true"
      >
      </div>
    </HelmetProvider>
  )
}

export default LikeShareFacebook