import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import LogoGiga from '../../../assets/imgs/logoGiga-white.png'
import { getCategoryNews } from '../../../redux/news/action'
import { Link } from "react-router-dom"

const Footer = () => {

  const dispatch = useDispatch()

  const listCategoryNews = useSelector(store => store.news.listCategoryNews)

  useEffect(() => {
    dispatch(getCategoryNews())
  }, [])

  listCategoryNews.sort((a, b) => a.sort_order - b.sort_order)

  return (
    <div className="footer-news mt-3">
      {/* <div className="top-footer pt-3">
        <div className="container">
          <Link className="text-white image-logo" to={`/`}>
            <img src={LogoGiga} style={{ width: 200 }} />
          </Link>

          <ul className="list-unstyled d-flex mb-0 text-uppercase">
            <li className="navbar__item-footer ">
              <Link to={`/tin-tuc`} className="text-white">Trang chủ</Link>
            </li>
            {
              listCategoryNews.map(item => (
                <li key={item._id} className="navbar__item-footer">
                  <Link to={`/tin-tuc/${item.slug}`} className="text-white">{item.name}</Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div> */}
      <div className="bottom-footer">
        <div className="container">
          <div className="content-footer mt-3 pb-3">
            <div className="row">
              <div className="col-md-12 text-center text-white">
                <h6 className="mb-3">Giga - Đồ gia dụng, công nghệ, chăm sóc sức khỏe, điện tử chính hãng</h6>
                <p className="mb-2">Địa chỉ: <span>số 55 Thái Hà - Đống Đa - Hà Nội</span></p>
                <p className="mb-2">Email: <span><a href="mailto:info@giga.vn" className="text-white">info@giga.vn</a></span></p>
                <p>Điện thoại: <span>0966.061.170</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer