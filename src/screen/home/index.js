import React, { Fragment, useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Header from "../../components/layout/header"
import Footer from "../../components/layout/footer"
import TapTop from "../../components/layout/tapTop"
import { withRouter } from "react-router-dom"

import MobileNavigation from "../../components/home/mobileNav"
import { routes } from "../../route"

const useViewPort = () => {

  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize)
  }, [])
  return { width }
}

const Home = ({ children, token }) => {

  const location = useLocation()

  const viewPort = useViewPort()

  const isMobile = viewPort.width <= 992

  if (isMobile) {
    return (
      <div className="layout-mobile">
        <Fragment>
          <div className='d-block'>
            <TapTop token={token} />
            <div className="hoplongtech">
              <Header token={token} isMobile={isMobile} viewPort={viewPort} useViewPort={useViewPort} />
              {location.pathname === '/danh-muc' ? (
                <>
                  {children}
                </>
              ) : (
                <div className="container">{children}</div>
              )}
              <MobileNavigation />
              <Footer />
            </div>
          </div>
        </Fragment>
      </div>
    )
  }

  return (
    <div className="layout-desktop">
      <Fragment>
        <div className='d-block'>
          <TapTop token={token} />
          <div className="hoplongtech">
            <Header token={token} />
            <div className="container"> {children}</div>
            <Footer />
          </div>
        </div>
      </Fragment>
    </div>

  )
}

export default withRouter(Home)