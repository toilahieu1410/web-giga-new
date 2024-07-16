import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useParams  } from "react-router-dom"
import { routes } from "../../route"
import { getCategoryBySlug, getProductDetail } from "../../redux/product/action"
import LoginModal from "../layout/loginModal"

const MobileNavigation = () => {

  const dispatch = useDispatch()

  const { categorySlug, slug } = useParams()

  const location = useLocation()

  const productDetail = useSelector((store) => store.product.productDetail)
  const [modal, setModal] = useState(false)

  const toggleModal = () => setModal(!modal)

  const newSlug =  productDetail.categorySlug

  const parts = location.pathname.split('/')[1]

  useEffect(() => {
    window.scrollTo(0, 0)
    const params = {
      slug: slug
    }
    dispatch(getProductDetail(params))
    // return () => {
    //   dispatch({ type: "CLEAR_DATA" })
    // }
  }, [slug])

  useEffect(() => {
    dispatch(getCategoryBySlug(categorySlug))
  }, [categorySlug])



  return (
    newSlug === parts ? (
      ''
    ) : (
      <nav className="nav navigation">
      <Link to={'/'} className={`nav__link ${location.pathname === '/' ? 'active' : ''}`}>
        <span className="ti-home fa"></span>
        <span className="nav__text mt-1">Trang chủ</span>
      </Link>
      {/* <Link to={'/uu-dai'} className={`nav__link ${location.pathname === '/uu-dai' ? 'active' : ''}`}>
        <span className="ti-gift fa"></span>
        <span className="nav__text mt-1">Ưu đãi</span>
      </Link> */}
      <Link to={'/tin-tuc'} className={`nav__link ${location.pathname === '/tin-tuc' ? 'active' : ''}`}>
        <span className="ti-book fa"></span>
        <span className="nav__text mt-1">Tin tức</span>
      </Link>
      <Link to={'#'} onClick={toggleModal} className="nav__link">
        <span className="ti-id-badge fa"></span>
        <span className="nav__text mt-1">Đăng nhập</span>
      </Link>
      <Link to={'/don-hang/gio-hang'} className={`nav__link ${location.pathname === '/don-hang/gio-hang' ? 'active' : ''}`}>
        <span className="ti-shopping-cart fa"></span>
        <span className="nav__text mt-1">Giỏ hàng</span>
      </Link>
      <LoginModal modal={modal} setModal={setModal} toggleModal={toggleModal} />
    </nav>
    )
   
  )
}

export default MobileNavigation