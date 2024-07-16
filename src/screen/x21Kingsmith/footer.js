import React from 'react'
import { Link } from 'react-router-dom'
import LogoAppStore from '../../assets/images/appstore.png'
import LogoGooglePlay from '../../assets/images/google-play.png'
import LogoPayment from '../../assets/images/payment.png'
import { Row, Col } from 'reactstrap'

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

const FooterKingSmith = () => {
  return (
    <div className='footer position-relative'>
      <div className='col-md-12 info'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <h4 className='footer-text-label mb-4 title-bold text-contact'>Contact</h4>
              <ul className='list-unstyled list-contact'>
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
                <a href={'https://www.facebook.com/gigadigital.vn'} target='_blank' className='mr-15'>
                  <i className='fab fa-facebook-f'></i>
                </a>
                <a href={'https://www.youtube.com/@GigaDigital'} target='_blank' className='mr-15'>
                  <i className='fab fa-youtube'></i>
                </a>
                <a href={'https://www.tiktok.com/@giga.digital_official'} target='_blank' >
                  <i className='fab fa-tiktok'></i>
                </a>
              </div>
            </div>
            <div className='col-md-3'>
              <h4 className='footer-text-label mb-4 title-bold text-contact'>Hỗ trợ khách hàng</h4>
              <ul className='list-unstyled list-contact'>
                <li className='mb-3'>
                  <Link className='text-primary' to={'/ho-tro/mua-hang-truc-tuyen'}><span className='text-primary'>Hướng dẫn mua hàng trực tuyến</span></Link>
                </li>
                <li className='mb-3'>
                  <Link to={'/ho-tro/huong-dan-thanh-toan'}><span className='text-primary'>Hướng dẫn thanh toán</span></Link>
                </li>
                <li className='mb-3'>
                  <Link to={'/ho-tro/mua-hang-tra-gop'}><span className='text-primary'>Hướng dẫn mua hàng trả góp</span></Link>
                </li>
                <li className='mb-3'>
                  <Link to={'/trung-tam-bao-hanh'} ><span className='text-primary'>Tra cứu bảo hành</span></Link>
                </li>
              </ul>
            </div>

            <div className='col-md-3'>
              <h4 className='footer-text-label mb-4 title-bold text-contact'>Chính sách chung</h4>
              <ul className='list-unstyled list-contact'>
                <li className='mb-3'>
                  <Link to={'/chinh-sach/chinh-sach-bao-mat'}><span className='text-primary'>Chính sách bảo mật</span></Link>
                </li>
                <li className='mb-3'>
                  <Link to={'/chinh-sach/chinh-sach-bao-hanh'}><span className='text-primary'>Chính sách bảo hành</span></Link>
                </li>
                <li className='mb-3'>
                  <Link to={'/chinh-sach/chinh-sach-huy-doi-tra'}><span className='text-primary'>Chính sách hủy đổi trả</span></Link>
                </li>
                <li className='mb-3'>
                  <Link to={'/chinh-sach/chinh-sach-hoan-tien'}><span className='text-primary'>Chính sách thanh toán, hoàn tiền</span></Link>
                </li>
                <li className='mb-3'>
                  <Link to={'/chinh-sach/chinh-sach-van-chuyen'}><span className='text-primary'>Chính sách vận chuyển</span></Link>
                </li>
              </ul>
            </div>
            {/* <div className='col-md-3'>
              <h4 className='footer-text-label mb-4 title-bold text-contact'>App & Payment</h4>
              <ul className='list-unstyled list-contact'>
                <li className='mb-3'>

                  <span className='text-primary fw-normal'>Download our Apps and get extra 15% Discount on your first Order…!</span>

                </li>
                <li className='mb-4'>
                  <Link to={'#'} className='text-primary text-app'>
                    <img src={LogoAppStore} className='mr-10' alt='logo app'/>
                  </Link>
                  <Link to={'#'} className='text-primary text-app'>
                    <img src={LogoGooglePlay} alt='logo app'/>
                  </Link>

                </li>
                <li className='mb-2'>
                  <span className='text-primary fw-normal'>Secured Payment Gateways</span>
                </li>
                <li className='mb-3'>
                  <Link to={'#'} className='text-primary text-app logo-payment'>
                    <img src={LogoPayment} alt='logo app'/>
                  </Link>

                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      <div className='footer-end'>
        <div className='container'>
          <div className='footer-content-1 pb-3'>
            <Link to={'#'} className='mr-10 d-inline-block'>
              <img src={LogoAppStore} className='mr-10' alt='logo app'/>
            </Link>
            <Link to={'#'} className='mr-10 d-inline-block'>
              <p className='text-primary'>giga premium</p>
            </Link>
            <Link to={'#'} className='mr-10 d-inline-block'>
              <p className='text-primary'>giga digital</p>
            </Link>
          </div>
          <div className='footer-content-2'>
            {dataFooter && dataFooter.map(item => (
              <div className='d-block mb-3'>
                <strong className='title text-primary mr-15'>{item.name}: </strong>
                <div className='tags-footer d-inline-block'>
                  {item.listData.map(data => (
                    <Link to={'#'} className='mr-10 d-inline-block'>
                      <p className='text-primary'>{data.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

          </div>
          <div className='footer-bottom'>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterKingSmith