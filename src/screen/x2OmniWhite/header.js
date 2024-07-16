import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import LogoEcovacs from '../../assets/x2-omni/images/ecovacs-logo-vector.svg'

const HeaderX2Omni = () => {

  const [modal, setModal] = useState(false)

  const toggleModal = () => setModal(!modal)

  const handleLogoClick = () => {
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    let prevScrollTop = window.pageYOffset

    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      prevScrollTop = scrollTop
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return (
    <header className="header">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="menu__item left">
            <ul className="list-unstyled d-flex mb-0">
              <li className="menu__item ">
                <Link to={'#'} className="text-decoration-none text-black " >ECOVACS DEEBOT X2 OMNI</Link>
              </li>
            </ul>
          </div>
          <div className="menu__item center flex-1 text-center">
            <Link to={'/'} onClick={handleLogoClick}>
              <img src={LogoEcovacs} />
            </Link>
          </div>
          <div className="menu__item right">
            <ul className="list-unstyled d-flex mb-0 align-items-center">
              <li className="menu__item mr-25">
                <Link to={'#'} className="text-decoration-none text-black fw-500">Hotline: 0358.071.170</Link>
              </li>

              <li className="menu__item">
                <Link to={'#'} className="btn buy text-decoration-none text-white" onClick={toggleModal}>Mua ngay</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )

}

export default HeaderX2Omni