import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import LogoGiga from "../../assets/images/Giga-logo.png"
import Slider from "react-slick"
import IconUser from '../../assets/x21-kingsmith/images/Icon/user.svg'
import IconSearch from '../../assets/x21-kingsmith/images/Icon/search.svg'
import IconCart from '../../assets/x21-kingsmith/images/Icon/cart.svg'

const listNav = [
  {
    id: 1,
    name: 'Thiết bị nghe nhìn',
    slug: 'thiet-bi-nghe-nhin'
  },
  {
    id: 2,
    name: 'Thiết bị gia dụng',
    slug: 'thiet-bi-gia-dung'
  },
  {
    id: 3,
    name: 'Sản phẩm tin học',
    slug: 'san-pham-tin-hoc'
  }
]

const HeaderKingSmith = () => {

  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const sliderRef = useRef(null)

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: isAutoPlay,
    autoplaySpeed: 5000,
    arrows: true,
    fade: true,
    cssEase: 'ease',
    touchThreshold: 500,
    slidesToShow: 1,
    speed: 2000,
  }

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay)
    if (sliderRef.current) {
      if (isAutoPlay) {
        sliderRef.current.slickPause()
      } else {
        sliderRef.current.slickPlay()
      }
    }
  }

  return (
    <header className="header-kingSmith">
      <div className="container">
        <div className="d-flex align-items-center header-top">
          <div className="logo">
            <Link to={'/kingsmith-x21'}>
              <img src={LogoGiga} width={200} />
            </Link>
          </div>
          <nav className="nav-header d-flex justify-content-between w-100">
            <div className="nav-list">
              <ul className="list-unstyled d-flex align-items-center mb-0 h-100">
                {
                  listNav && listNav.map(item => (
                    <li>
                      <Link to={item.slug}>
                        <span className="text-uppercase fw-500">{item.name}</span>
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="list-icon-action">
              <ul className="icons list-unstyled d-flex align-items-center mb-0">
                <li className="icon-login">
                  <Link to={''}>
                    <img src={IconUser} />
              
                  </Link>
                </li>
                <li className="icon-cart ms-3">
                  <Link to={''}>
                  <img src={IconCart} />
                  </Link>
                </li>
                <li className="icon-search ms-3">
                  <Link to={''}>
                  <img src={IconSearch} />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className=" list-slider">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between position-relative">
            <Slider ref={sliderRef} {...settings}>
              <div>
                <h6 className="mb-0"><span className="text-red fw-bold">ĐỘC QUYỀN!</span> Giảm thêm 5%++ tổng giá trị đơn hàng!</h6>
              </div>
              <div>
                <h6 className="mb-0"><span className="text-red fw-bold">ĐẶC QUYỀN HOT!</span> Nhận ngay ưu đãi dành riêng cho thành viên Giga! </h6>
              </div>

            </Slider>
            <div style={{ textAlign: "center" }} className="button-action">
              <button className="button btn border-0 rounded p-0" type="button" onClick={toggleAutoPlay}>
                {isAutoPlay ? <i className="fa fa-pause text-gray"></i> : <i className="fa fa-play text-gray"></i>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderKingSmith