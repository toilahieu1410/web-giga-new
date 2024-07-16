import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { dataImage, dataShowroom } from '../../utilities/footerData'
import LogoBCT from '../../assets/images/bct.png'
import LogoDMCA from '../../assets/images/dmca.png'
import LogoAppStore from '../../assets/images/appstore.png'
import LogoGooglePlay from '../../assets/images/google-play.png'
import LogoPayment from '../../assets/images/payment.png'
import { Row, Col } from 'reactstrap'
import { getCategory, getSubCategory } from '../../redux/product/action'
import ImageProduct from '../../assets/images/img-product.png'

const dataFooter = [
  {
    id: 1,
    name: 'Electronic',
    listData: [
      {
        name: 'Cellphone'
      },
      {
        name: 'HeadPhone'
      },
      {
        name: 'Television'
      }
    ]
  },
  {
    id: 2,
    name: 'Furniture',
    listData: [
      {
        name: 'Sofa'
      },
      {
        name: 'Chair'
      },
      {
        name: 'Kitchen'
      }
    ]
  },
]

const Footer = () => {

  const dispatch = useDispatch()


  const listCategory = useSelector((store) => store.product.listCategory)
  const listSubCategory = useSelector((store) => store.product.listSubCategory)

  const [categoryId, setCategoryId] = useState(listCategory[0])
  useEffect(() => {
    dispatch(getCategory())
  }, [])


  useEffect(() => {
    if(listCategory.length > 0 && listCategory[0]) {
      setCategoryId(listCategory[0])
    }
  }, [listCategory])

  useEffect(() => {
    if(categoryId && categoryId._id !== undefined) {
      dispatch(getSubCategory(categoryId._id))
    }
  }, [categoryId])


  const CategoryMain = listCategory.filter(item => JSON.parse(item.title_type) == true)

  CategoryMain.sort((a, b) => a.sort_order - b.sort_order)

  const categoryData = [...CategoryMain]

  
  return (
    <div className='footer position-relative'>
      <div className='d-block'>
        <div className='container'>

          <ul className='list-unstyled d-flex align-items-center justify-content-between'>
            {
              dataImage.map((item, index) => (
                <li key={index} className='float-left pr-15 w-20'>
                  <DataImage item={item} />
                </li>
              ))
            }
          </ul>
        </div>
      </div>

      <div className='list-info mt-5'>
        <BoxNewsLetter />
      </div>

      <div className='col-md-12 info'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <h4 className='footer-text-label mb-4 title-bold text-contact'>Contact</h4>
              <ul className='list-unstyled list-contact'>
                {/* <li className='mb-2'><span className='text-black fw-bold'>  © 2022 CÔNG TY TNHH GIGA DISTRIBUTION MST: 0109962502</span></li> */}
                <li className='mb-3'>
                  <p className='text-primary'><strong>Address: </strong><span className='fw-normal'>55 Thái Hà, Đống Đa, Hà Nội</span></p>
                </li>
                <li className='mb-3'>
                  <p className='text-primary'><strong>Phone: </strong><span className='fw-normal'>0358.071.170</span></p>
                </li>
                <li className='mb-3'>
                  <p className='text-primary'><strong>Email: </strong><span className='fw-normal'>info@giga.vn</span></p>
                </li>
                <li>
                  <p className='text-primary'><strong>Hours: </strong><span className='fw-normal'>8:00 - 22:00</span></p>
                </li>
              </ul>
              <div className='my-3 list-entertainment-apps'>
                <a href={'https://www.facebook.com/gigadigital.vn'} rel='nofollow' target='_blank' className='mr-15'>
                  <i className='fab fa-facebook-f'></i>
                </a>
                <a href={'https://www.youtube.com/@GigaDigital'} rel='nofollow' target='_blank' className='mr-15'>
                  <i className='fab fa-youtube'></i>
                </a>
                <a href={'https://www.tiktok.com/@giga.digital_official'} rel='nofollow' target='_blank' >
                  <i className='fab fa-tiktok'></i>
                </a>
              </div>
            </div>
            <div className='col-md-3'>
              <h4 className='footer-text-label mb-4 title-bold text-contact'>Hỗ trợ khách hàng</h4>
              <ul className='list-unstyled list-contact'>
                <li className='mb-3'>
                  <Link className='text-primary' rel='nofollow' to={'/ho-tro/mua-hang-truc-tuyen'}><span className='text-primary'>Hướng dẫn mua hàng trực tuyến</span></Link>
                </li>
                <li className='mb-3'>
                  <Link rel='nofollow' to={'/ho-tro/huong-dan-thanh-toan'}><span className='text-primary'>Hướng dẫn thanh toán</span></Link>
                </li>
                <li className='mb-3'>
                  <Link rel='nofollow' to={'/ho-tro/mua-hang-tra-gop'}><span className='text-primary'>Hướng dẫn mua hàng trả góp</span></Link>
                </li>
                <li className='mb-3'>
                  <Link rel='nofollow' to={'/trung-tam-bao-hanh'} ><span className='text-primary'>Tra cứu bảo hành</span></Link>
                </li>
              </ul>
            </div>

            <div className='col-md-3'>
              <h4 className='footer-text-label mb-4 title-bold text-contact'>Chính sách chung</h4>
              <ul className='list-unstyled list-contact'>
                <li className='mb-3'>
                  <Link rel='nofollow' to={'/chinh-sach/chinh-sach-bao-mat'}><span className='text-primary'>Chính sách bảo mật</span></Link>
                </li>
                <li className='mb-3'>
                  <Link rel='nofollow' to={'/chinh-sach/chinh-sach-bao-hanh'}><span className='text-primary'>Chính sách bảo hành</span></Link>
                </li>
                <li className='mb-3'>
                  <Link rel='nofollow' to={'/chinh-sach/chinh-sach-huy-doi-tra'}><span className='text-primary'>Chính sách hủy đổi trả</span></Link>
                </li>
                <li className='mb-3'>
                  <Link rel='nofollow' to={'/chinh-sach/chinh-sach-hoan-tien'}><span className='text-primary'>Chính sách thanh toán, hoàn tiền</span></Link>
                </li>
                <li className='mb-3'>
                  <Link rel='nofollow' to={'/chinh-sach/chinh-sach-van-chuyen'}><span className='text-primary'>Chính sách vận chuyển</span></Link>
                </li>
              </ul>
            </div>
            <div className='col-md-3'>
              <h4 className='footer-text-label mb-4 title-bold text-contact'>Thanh toán</h4>
              <ul className='list-unstyled list-contact'>
                {/* <li className='mb-3'>

                  <span className='text-primary fw-normal'>Download our Apps and get extra 15% Discount on your first Order…!</span>

                </li>
                <li className='mb-4'>
                  <Link to={'#'} className='text-primary text-app'>
                    <img src={LogoAppStore} className='mr-10' alt='logo app'/>
                  </Link>
                  <Link to={'#'} className='text-primary text-app'>
                    <img src={LogoGooglePlay} alt='logo app'/>
                  </Link>


                </li> */}
                <li className='mb-3'>
                  <span className='text-primary fw-normal'>Cổng thanh toán an toàn</span>
                </li>
                <li className='mb-3'>
                  <Link rel='nofollow' to={'#'} className='text-primary text-app logo-payment'>
                    <img src={LogoPayment} alt='logo app'/>
                  </Link>

                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-end'>
        <div className='container'>
   
     
          {/* <div className='footer-content-2'>
            {listSubCategory && listSubCategory.map(item => (
              <div className='d-block mb-3'>
      
                <strong className='title text-primary mr-15'>{item.name}: </strong>
                <div className='tags-footer d-inline-block'>
                  {item.chidrenCategories.map(data => (
                    <Link to={`/${data.slug}`} className='d-inline-block'>
      
                      <p className='text-primary'>{data.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}


          </div> */}
          {/* <div className='footer-bottom'>
            <Row>
              <Col md='6'>
                <p className='text-primary'>Copyright © 2022 Ecom Market. All rights reserved.</p>
              </Col>
              <Col md='6'>
                <ul className='list-unstyled text-right mb-0'>
                  <li className='d-inline-block'>
                    <Link to={'#'} className='text-primary'>
                      Conditions of Use
                    </Link>
                  </li>
                  <li className='d-inline-block'>
                    <Link to={'#'} className='text-primary'>
                      Privacy Notice
                    </Link>
                  </li>
                  <li className='d-inline-block'>
                    <Link to={'#'} className='text-primary'>
                    Interest-Based Ads
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Footer

const BoxNewsLetter = (props) => {
  return (
    <div className='box-newsletter bg-giga '>
      <div className='container'>
        <Row className='align-items-center'>
     
          <Col lg='8' md='7'>
            <h3 className='text-white'>Khám phá thêm các sản phẩm của chúng tôi</h3>
            <p className='text-white text-content mt-3' >Nhận cập nhật về cửa hàng mới nhất và ưu đãi đặc biệt của chúng tôi.</p>
          </Col>
          <Col lg='4' md='5'>
          <img src={ImageProduct} width={200} className='img-fuild'/>
            {/* <form className='form-news-letter position-relative'>
              <input
                className='form-control'
                placeholder='Nhập địa chỉ email'
              />
              <button className='btn btn-warning'>Sign Up</button>
            </form> */}
          </Col>
        </Row>
      </div>
    </div>
  )
}

const DataImage = (props) => {

  const { item } = props

  return (
    <div key={item.id} className='d-flex align-items-center item-list'>
      <img src={item.image} />
      <p className='ml-10'>
        <span className='d-block text-primary fw-bold text-uppercase'>{item.top}</span>
        <span className='d-block text-primary text-uppercase'>{item.bottom}</span>
      </p>
    </div>
  )
}

const DataShowroom = (props) => {

  const { item } = props

  return (
    <div className='col-md-4'>
      <div className='item-address'>
        <p className='title-address'>
          <span className='number'>{item.id}</span>
          {item.ten_cua_hang}
        </p>
        <ul className='list-unstyled'>
          <li className='mb-2 text-black'>
            <i className='fa fa-map-marker-alt mr-10' ></i>
            <span>{item.dia_chi}</span>
            <Link to={item.link} className='d-block'><span className='text-primary'>[Xem đường đi]</span></Link>
          </li>
          <li className='mb-2 text-black'>
            <i className='fa fa-phone mr-10' ></i>
            <span>{item.sdt}</span>
          </li>
          <li className='mb-2 text-black'>
            <i className='fa fa-envelope mr-10' ></i>
            <span>{item.email}</span>
          </li>
          <li className='mb-2 text-black'>
            <i className='fa fa-clock mr-10' style={{ fontWeight: 500 }} ></i>
            <span>{item.gio_mo_cua}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}