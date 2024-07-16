import React, { Fragment } from "react"
import Header from "./layout/header"
import Footer from './layout/footer'
import TapTop from "./layout/tapTop"
import { withRouter } from "react-router-dom"

const News = ({children}) => {
  return (
    <div className="layout-desktop">
      <Fragment>
        <div className='d-block'>
          {/* <TapTop/> */}
          <div className="hoplongtech">
            <Header/>
            <div className="container position-relative">{children}</div>
            <Footer />
          </div>
        </div>
      </Fragment>
    </div>
  )
}

export default withRouter(News)