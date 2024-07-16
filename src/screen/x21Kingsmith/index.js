import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router-dom"
import ReactHtmlParser from 'react-html-parser'
import Slider from 'react-slick'
import { Link as LinkTo, Element, scroller } from 'react-scroll'
import "../../assets/x21-kingsmith/scss/app.scss"

import { getProductFromGigaDigital } from '../../redux/product/action'

import LoadingHome from '../../components/notification/loadingHome'
import HeaderKingSmith from './header'

import FooterKingSmith from './footer'
import { checkNumber, checkVideoServer } from '../../utilities/checkNumber'
import Comment from '../../components/product/comment'
import { Breadcrumb, BreadcrumbItem, Nav, NavItem } from 'reactstrap'
import LikeShareFacebook from '../../components/layout/likeShareFacebook'
import LogoStar from '../../assets/imgs/icon-header/star.svg'

//anh
import ImageA1 from '../../assets/x21-kingsmith/images/anh-chi-tiet/a1.jpg'
import ImageA2 from '../../assets/x21-kingsmith/images/anh-chi-tiet/a2.jpg'
import ImageA3 from '../../assets/x21-kingsmith/images/anh-chi-tiet/a3.jpg'
import ImageA4 from '../../assets/x21-kingsmith/images/anh-chi-tiet/a4.jpg'
import ImageA5 from '../../assets/x21-kingsmith/images/anh-chi-tiet/a5.jpg'
import ImageA6 from '../../assets/x21-kingsmith/images/anh-chi-tiet/a6.jpg'
import ImageA7 from '../../assets/x21-kingsmith/images/anh-chi-tiet/a7.jpg'
import ImageA8 from '../../assets/x21-kingsmith/images/anh-chi-tiet/a8.jpg'
import ImageA9 from '../../assets/x21-kingsmith/images/anh-chi-tiet/a9.jpg'
import ImageA10 from '../../assets/x21-kingsmith/images/anh-chi-tiet/a10.jpg'
import ImageA11 from '../../assets/x21-kingsmith/images/anh-chi-tiet/a11.jpg'
import ImageA13 from '../../assets/x21-kingsmith/images/anh-chi-tiet/a13.png'

//anh-san-pham
import ImageV1 from '../../assets/x21-kingsmith/images/anh-dai-dien/v1.jpg'
import ImageV2 from '../../assets/x21-kingsmith/images/anh-dai-dien/v2.jpg'
import ImageV3 from '../../assets/x21-kingsmith/images/anh-dai-dien/v3.jpg'
import ImageV4 from '../../assets/x21-kingsmith/images/anh-dai-dien/v4.jpg'
import ImageV5 from '../../assets/x21-kingsmith/images/anh-dai-dien/v5.jpg'
import ImageV6 from '../../assets/x21-kingsmith/images/anh-dai-dien/v6.jpg'
import ImageV7 from '../../assets/x21-kingsmith/images/anh-dai-dien/v7.jpg'
import ImageV8 from '../../assets/x21-kingsmith/images/anh-dai-dien/v8.jpg'
import ImageV9 from '../../assets/x21-kingsmith/images/anh-dai-dien/v9.jpg'
import ImageV10 from '../../assets/x21-kingsmith/images/anh-dai-dien/v10.jpg'
import ImageV11 from '../../assets/x21-kingsmith/images/anh-dai-dien/v11.jpg'
import ImageV12 from '../../assets/x21-kingsmith/images/anh-dai-dien/v12.jpg'
import ImageV13 from '../../assets/x21-kingsmith/images/anh-dai-dien/v13.jpg'
import ImageV14 from '../../assets/x21-kingsmith/images/anh-dai-dien/v14.jpg'

//anh-chung-nhan
import ImageChungNhan1 from '../../assets/x21-kingsmith/images/anh-chung-nhan/if.jpg'
import ImageChungNhan2 from '../../assets/x21-kingsmith/images/anh-chung-nhan/reddot.jpg'
import ImageChungNhan3 from '../../assets/x21-kingsmith/images/anh-chung-nhan/good_design.jpg'

//video
import VideoKingSmithX21Gif from '../../assets/x21-kingsmith/video/Video2.gif'
import { addressStore } from '../../assets/constant/constant'
import TapTop from '../../components/layout/tapTop'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const slug = 'may-chay-bo-thong-minh-xiaomi-kingsmith-walkingpad-x21'
const video_1 = 'giga-vn-x21-kingsmith-video1.mp4'

const listImagesX21 = [
  {
    id: 1,
    image: ImageV1
  },
  {
    id: 2,
    image: ImageV2
  },
  {
    id: 3,
    image: ImageV3
  },
  {
    id: 4,
    image: ImageV4
  },
  {
    id: 5,
    image: ImageV5
  },
  {
    id: 6,
    image: ImageV6
  },
  {
    id: 7,
    image: ImageV7
  },
  {
    id: 8,
    image: ImageV8
  },
  {
    id: 9,
    image: ImageV9
  },
  {
    id: 10,
    image: ImageV10
  },
  {
    id: 11,
    image: ImageV11
  },
  {
    id: 12,
    image: ImageV12
  },
  {
    id: 13,
    image: ImageV13
  },
  {
    id: 14,
    image: ImageV14
  },

]

const X21KingSmith = () => {

  const dispatch = useDispatch()
  const state = useLocation()

  const productFromGigaDigital = useSelector(store => store.product.productFromGigaDigital)
  const countComment = useSelector((store) => store.comment.countComment)
  const listContentRef = useRef(null)

  const [nav1, setNav1] = useState()
  const [nav2, setNav2] = useState()
  const [showFeature, setShowFeature] = useState(true)

  const [isFixedHeader, setIsFixedHeader] = useState(false)
  const [activeTab, setActiveTab] = useState(0)


  const scrollToLeft = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1)
      scrollToTab(activeTab - 1)
    }
  }

  const scrollToRight = () => {
    if (activeTab < listContentRef.current?.children.length - 1) {
      setActiveTab(activeTab + 1)
      scrollToTab(activeTab + 1)
    }
  }

  const scrollToTab = (index) => {
    scroller.scrollTo(`section${index + 1}`, {
      duration: 500,
      smooth: true,
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (listContentRef.current) {
        const { top } = listContentRef.current.getBoundingClientRect()

        if (top <= 0) {
          setIsFixedHeader(true)
        } else {
          setIsFixedHeader(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    dispatch(getProductFromGigaDigital(slug))
  }, [])

  const NextArrow = (props) => {
    const { className, onClick } = props
    return (
      <div className={className} onClick={onClick}>
      </div>
    )
  }

  const PrevArrow = (props) => {
    const { className, onClick } = props
    return (
      <div className={className} onClick={onClick}>
      </div>
    )
  }

  if (nav1 === null || nav2 === null) {
    return null
  }

  return (
    <div>
      {
        !productFromGigaDigital ? (
          <LoadingHome />
        ) : (
          <div className='x21-kingsmith'>
            <TapTop />
            <HeaderKingSmith />
            <div className='container'>
              <div className='body-content'>
                <div className='py-3'>
                  <Breadcrumb>
                    <BreadcrumbItem><a href="#">Trang chủ</a></BreadcrumbItem>
                    <BreadcrumbItem active>Máy chạy bộ KingSmith X21</BreadcrumbItem>
                  </Breadcrumb>
                </div>
                <div className='row'>
                  <div className='left-content col-md-8'>
                    <div className='product-sliders'>
                      <div className='slider-container-kingsmith'>
                        <Slider
                          asNavFor={nav2}
                          autoplay={false}
                          autoplaySpeed={3000}
                          infinite={true}
                          slidesToScroll={1}
                          slidesToShow={1}
                          variableWidth={false}
                          arrows={false}
                          ref={slider1 => (setNav1(slider1))}
                          nextArrow={<NextArrow />}
                          prevArrow={<PrevArrow />}
                        >
                          {
                            listImagesX21 && listImagesX21.map((item, index) => (
                              <div key={index} className='list-items-slider position-relative ' >
                                <div className="item ">
                                  <img alt='image' src={item.image} className='w-100' />
                                </div>
                              </div>
                            ))
                          }
                        </Slider>
                        {productFromGigaDigital.in_stock <= 0 && (
                          <div className='image-hethang position-absolute '>
                            <p className='text-white fa-2x text-center'>Hàng đang về</p>
                          </div>
                        )}
                      </div>

                      <div className='slider-child d-flex mt-3'>
                        <Slider
                          asNavFor={nav1}
                          autoplay={false}
                          ref={slider2 => setNav2(slider2)}
                          slidesToShow={listImagesX21 == undefined || listImagesX21.length >= 6 ? 6 : listImagesX21.length}
                          swipeToSlide={true}
                          focusOnSelect={true}
                          slidesToScroll={1}
                          className="small-slick"
                          responsive={
                            [
                              {
                                breakpoint: 1199,
                                settings: {
                                  slidesToShow: listImagesX21 == undefined || listImagesX21.length >= 5 ? 5 : listImagesX21.length,
                                }
                              },
                              {
                                breakpoint: 992,
                                settings: {
                                  slidesToShow: listImagesX21 == undefined || listImagesX21.length >= 4 ? 4 : listImagesX21.length,
                                }
                              },

                              {
                                breakpoint: 767,
                                settings: {
                                  slidesToShow: listImagesX21 == undefined || listImagesX21.length >= 3 ? 3 : listImagesX21.length,
                                }
                              },
                              {
                                breakpoint: 667,
                                settings: {
                                  slidesToShow: listImagesX21 == undefined || listImagesX21.length >= 2 ? 2 : listImagesX21.length,
                                }
                              },
                              {
                                breakpoint: 480,
                                settings: {
                                  slidesToShow: listImagesX21 == undefined || listImagesX21.length >= 2 ? 2 : listImagesX21.length,
                                }
                              },
                            ]
                          }
                        >

                          {
                            listImagesX21.map((element, index) => (
                              <div className='list-items-slider position-relative'>
                                <div className="item" key={index}>
                                  <img alt='image' src={(element.image)} className='w-100' />
                                </div>
                              </div>
                            ))
                          }
                        </Slider>
                      </div>
                    </div>
                  </div>
                  <div className='right-content col-md-4'>
                    <div className='info-top'>
                      <div className='text-right d-inline-block float-right'>
                        <LikeShareFacebook dataHref={state.pathname} />
                      </div>
                      <div className='small-letters d-inline-block float-left'>
                        <span className='color-gold text-uppercase text-white'>PREMIER CARE</span>
                      </div>
                      {/* <p className='text-gray my-3'>{productFromGigaDigital.brand}</p> */}
                    </div>
                    <div className='info-content'>
                      <h4 className='name-product d-inline-block w-100'>{productFromGigaDigital.name}</h4>
                      <div className='rating '>
                        <img src={LogoStar} width={15} />
                        <img src={LogoStar} width={15} />
                        <img src={LogoStar} width={15} />
                        <img src={LogoStar} width={15} />
                        <img src={LogoStar} width={15} />
                        &nbsp;<span className='fw-normal font-medium text-title'>(171)</span>
                      </div>
                      <div className='main-feature mt-4 position-relative'>
                        <div className='d-flex align-items-center justify-content-between'>
                          <h6 className=''>Các tính năng chính</h6>
                          <button type='button' className={!showFeature ? 'more-btn border-0 bg-transparent' : 'more-btn border-0 bg-transparent show'} onClick={() => setShowFeature(!showFeature)}>
                            mở rộng
                          </button>
                        </div>
                        <div className={showFeature ? 'feature-content show' : 'feature-content'} >
                          <div className='feature-list'>
                            <ul className='list-unstyled mb-0'>
                              <li><span className='fw-500'>Tốc độ: </span>0.5-12km</li>
                              <li><span className='fw-500'>Chịu tải: </span>110kg</li>
                              <li><span className='fw-500'>Động cơ: </span>Không chổi than</li>
                              <li><span className='fw-500'>Thảm chạy: </span>Nhựa 4 lớp, rộng 720mm</li>
                              <li><span className='fw-500'>Bảng điều khiển: </span>LED</li>
                            </ul>
                          </div>
                        </div>

                        <div className='delivery-list mt-4'>
                          <ul className='list-unstyled'>
                            <li className='d-flex align-items-start mb-3'>
                              <span className="ti-headphone fa me-3"></span>
                              <p>
                                Để được tư vấn sản phẩm vui lòng liên hệ <br />
                                Hotline: 0358.071.170
                              </p>
                            </li>
                            <li className='d-flex align-items-start mb-3'>
                              <span className="ti-truck fa me-3"></span>
                              <p>
                                Giao hàng miễn phí trong vòng 3-7 ngày
                              </p>
                            </li>
                            <li className='d-flex align-items-start'>
                              <span className="ti-check-box fa me-3"></span>
                              <p>
                                Đổi trả miễn phí trong vòng 15 ngày
                              </p>
                            </li>
                          </ul>
                        </div>
                        <p className='text-gray mt-3'>Đơn hàng có thể giao đến trễ hơn thời gian dự kiến do các yếu tố ngoại cảnh trong quá trình vận chuyển</p>
                        <div className='price-box-area'>
                          <div className='list-price'>
                            <ul className='list-unstyled price-ul my-3'>
                              <li className='mb-3'>
                                <div className='price-box-product d-flex justify-content-between  align-items-center'>
                                  <div className='price-left'>
                                    <p>Giá sản phẩm: </p>
                                  </div>
                                  <div className='price-right'>
                                    <p><span className='fw-bold' style={{ fontSize: 16 }}>{checkNumber(productFromGigaDigital.price)}</span>&nbsp;&nbsp;<span className='text-gray text-decoration-line-through'>{checkNumber(productFromGigaDigital.original_price)}</span></p>
                                    <p className='text-red text-right'>Khuyến mại  {100 - ((parseInt(productFromGigaDigital.price) / parseInt(productFromGigaDigital.original_price)) * 100).toFixed(0)}%</p>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div ref={listContentRef} className={`mt-3 buy`}>
                          <div className='d-flex align-items-center justify-content-between'>
                            <h5>Tổng cộng</h5>
                            <p className='text-price fw-500 text-red'>{checkNumber(productFromGigaDigital.price)}</p>
                          </div>
                          <div className='button-purchase mt-4'>
                            <a href={'https://gigadigital.vn/may-chay-bo/may-chay-bo-thong-minh-xiaomi-kingsmith-walkingpad-x21'} className='btn button-buy text-uppercase fw-bold'>
                              Mua ngay
                            </a>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className='list-icons__kingsmith'>

                </div>
              </div>
              <div className="list-content" ref={listContentRef}>
                <Nav className={`border-tab ${isFixedHeader ? 'fixed' : ''} hidden-sm`}>
                  <div className='sticky-tab__show'>
                    <p>Mua các sản phẩm tốt nhất tại <a href='https://giga.vn' className='text-primary'>Giga.vn</a> để nhận được ưu đãi cực lớn</p>
                  </div>
               
                  <div className='list-tabs'>
                    <NavItem className='cursor-pointer'>
                      <LinkTo to="section1" spy={true} smooth={true} duration={500} className="nav-link">
                        Nội dung
                      </LinkTo>
                    </NavItem>
                    <NavItem className='cursor-pointer'>
                      <LinkTo to="section2" spy={true} smooth={true} duration={500} className="nav-link ">
                        Thông số kỹ thuật
                      </LinkTo>
                    </NavItem>
                    <NavItem className='cursor-pointer'>
                      <LinkTo to="section3" spy={true} smooth={true} duration={500} className="nav-link ">
                        Chứng nhận
                      </LinkTo>
                    </NavItem>
                    <NavItem className='cursor-pointer'>
                      <LinkTo to="section4" spy={true} smooth={true} duration={500} className="nav-link">
                        Comment
                      </LinkTo>
                    </NavItem>
                    <NavItem className='cursor-pointer'>
                      <LinkTo to="section5" spy={true} smooth={true} duration={500} className="nav-link">
                        Mua sản phẩm ở đâu
                      </LinkTo>
                    </NavItem>
                  </div>
                  <div className="tab-scroll-controller">
                    <button type="button" className="scroll-left btn border-0 bg-transparent" onClick={scrollToLeft}>
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button type="button" className="scroll-right btn border-0 bg-transparent" onClick={scrollToRight}>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                </Nav>

                <Element name="section1" className='section1'>
                  <Description productFromGigaDigital={productFromGigaDigital} />
                </Element>
                <Element name="section2" className='section2'>
                  <Specification item={productFromGigaDigital} />
                </Element>
                <Element name="section3" className='section3'>
                  <Certified item={productFromGigaDigital} />
                </Element>
                <Element name="section4" className='section4'>
                  <Comment productId={productFromGigaDigital._id} countComment={countComment} productSlug={productFromGigaDigital.slug} />
                </Element>
                <Element name="section5" className='section5'>
                  <ChiNhanh />
                </Element>
              </div>
            </div>
            <FooterKingSmith />
          </div>
        )
      }
    </div>
  )
}

export default X21KingSmith

const Description = (props) => {

  const { productFromGigaDigital, className } = props

  const data = [
    {
      id: 1,
      title: 'Giao hàng miễn phí',
      content: 'Vận chuyển an toàn và miễn phí khi mua hàng tại website <a href="https://giga.vn" class="text-primary" >giga.vn</a>. Chúng tôi luôn tối ưu việc vận chuyển các đơn hàng của bạn.',
      icon: 'ti ti-truck'
    },
    {
      id: 2,
      title: '15 ngày đổi trả',
      content: 'Chính sách đổi trả 15 ngày được áp dụng miễn phí cho các sản phẩm được mua trên <a href="https://giga.vn" class="text-primary" >giga.vn</a> (Điều khoản và điều kiện áp dụng, vui lòng tham khảo chính sách mua hàng đổi trả của Giga)',
      icon: 'ti ti-reload'
    },
    {
      id: 3,
      title: '12 tháng bảo hành',
      content: 'Chính sách bảo hành được áp dụng cho các sản phẩm được mua trên <a href="https://giga.vn" class="text-primary" >giga.vn</a> và hệ thống Showroom (Điều khoản và điều kiện áp dụng, vui lòng tham khảo chính sách mua hàng đổi trả của Giga)',
      icon: 'ti-credit-card'
    },
    {
      id: 4,
      title: 'Ưu đãi hấp dẫn',
      content: 'Nhận ngay những khuyến mại đặc quyền từ giga.vn. Đăng ký nhận thông tin trên <a href="https://giga.vn" class="text-primary" >giga.vn</a> để được cập nhật những ưu đãi mới nhất.',
      icon: 'ti-plug'
    },
  ]

  const contentProduct = [
    {
      id: 1,
      title: 'Chạy bộ an toàn, ở nhà vẫn khỏe',
      content: '"Mỗi bước hướng tới một tương lai thông minh hơn, cải thiện sức khỏe hiệu quả Nhóm nghiên cứu và phát triển của USCT với 82 cải tiến độc đáo đã tạo ra trải nghiệm thể thao tại nhà độc đáo và đặc biệt."',
      image: ImageA1
    },
    {
      id: 2,
      title: 'Trên toàn cầu, xu hướng tập thể dục gia đình đã lan rộng hơn 50 quốc gia và khu vực.',
      content: 'Bằng cách áp dụng công nghệ khoa học hơn cho hoạt động thể thao tại nhà, chúng tôi muốn cải thiện trải nghiệm WalkingPad cho người dùng toàn cầu',
      image: ImageA2
    },
    {
      id: 3,
      title: 'Gấp gọn tới 2 lần với kỹ thuật gấp cải tiến',
      content: 'Máy chạy bộ WalkingPad X21 đã đạt được khả năng gập 90° sau khi gập 180° trước đó. Cấu trúc thon gọn, công nghệ hiện đại. X21 là máy chạy bộ gập siêu lý tưởng cho không gian nhỏ và có thể dễ dàng đặt vừa vặn ở mọi nơi trong nhà bạn.	',
      image: ImageA3
    },
    {
      id: 4,
      title: 'Phong cách đơn giản, một trải nghiệm lưu trữ mới lạ',
      content: 'Thiết kế gập đôi của WalkingPad chiếm ít không gian hơn 0.16m2 và có thể cất giữ chỉ qua hai bước đơn giản.',
      image: ImageA4
    },
    {
      id: 5,
      title: 'Điều chính tốc độ chạy nhanh chóng và dễ dàng',
      content: 'WalkingPad X21 tích hợp thêm bảng điều khiển vào thanh tựa tay giúp bạn thao tác dễ dàng hơn. Với phạm vi tốc độ từ 0.5 đến 12 km/h, bạn có thể điều chỉnh tốc độ chạy trong thời gian thực dựa trên trạng thái chạy của mình.',
      image: ImageA5
    },
    {
      id: 6,
      title: 'Kết nối NFC mang đến trải nghiệm tuyệt vời',
      content: 'Cảm biến thông minh hỗ trợ NFC giúp việc kết nối mạng trở nên dễ dàng, bạn sẽ có quyền truy cập trực tiếp vào giao diện và dữ liệu sẽ được cập nhật và hiển thị theo thời gian thực trên điện thoại di động và WalkingPad của bạn.',
      image: ImageA6
    },
    {
      id: 7,
      title: 'Thiết kế thẩm mỹ công nghiệp với màn hình kỹ thuật số LED ẩn',
      content: 'X21 được trang bị màn hình tích hợp. Khi chưa sử dụng, bạn có thể chiêm ngưỡng bề mặt đẹp tuyệt của máy. Sau khi bật nguồn, bạn có thể quan sát dữ liệu hiển thị trên màn hình kỹ thuật số LED',
      image: ImageA7
    },
    {
      id: 8,
      title: 'Chạy bộ tại nhà mà không phải lo lắng',
      content: 'Ứng dụng độc quyền theo dõi dữ liệu của bạn một cách thông minh <br /> Ứng dụng KS Fit ghi lại và theo dõi số liệu thống kê thể chất của bạn đồng thời kiểm soát các chế độ, khởi động, dừng, tăng tốc và giảm tốc của X21 cùng các chức năng khác.',
      image: ImageA8
    },
    {
      id: 9,
      title: 'Thiết kế hoàn mỹ, công nghệ hiện đại',
      content: 'Khung hợp kim hoàn toàn bằng nhôm và thân máy được phủ màu đen của X21 mang lại vẻ ngoài đẹp mắt và cứng cáp, là sự kết hợp giữa thiết kế mang tính thẩm mỹ cao đồng thời đem lại cảm giác mạnh mẽ và ổn định, bền bỉ.',
      image: ImageA9,
      weight: 38
    },
    {
      id: 10,
      title: 'X21 sở hữu đường băng hoàn thiện, đem tới cảm giác thoải mái để bạn tận hưởng tại nhà của mình',
      content: 'Đường chạy chuyên nghiệp bốn lớp mô phỏng hoạt động chạy thực tế và cải thiện sự thoải mái cũng như an toàn khi sử dụng tại nhà',
      image: ImageA10,
      weight: 38
    },
    {
      id: 11,
      title: 'Có thể chạy bộ ở trên lầu mà không gây ồn cho gia đình đang sinh hoạt ở tầng dưới',
      content: 'Động cơ không chổi than hiệu quả duy trì công suất đầu ra không đổi và chỉ tạo ra tiếng ồn 75dB ở tốc độ tối đa trong điều kiện không tải, cho phép bạn có thể chạy ở tốc độ tối đa mà không gây ảnh hưởng cho mọi người ở tầng dưới.',
      image: ImageA11,
      weight: 38
    }
  ]

  return (
    <div className={`w-100 ${className}`}>
      <div className='list-product-left'>
        {
          productFromGigaDigital.post ?
            <div className='product-content' >
              <div className='list-promotion'>
                <div className='promotion-header text-center'>
                  <h3 className='title mb-3'>Mua sắm trực tuyến, không còn nỗi lo!</h3>
                  <p className='mb-3'>Tìm hiểu thêm về các dịch vụ đặc biệt độc quyền khi mua sắm tại <a href='https://giga.vn/'>Giga</a></p>
                </div>
                <div className='promotion-content my-4'>
                  {data && data.map(item => (
                    <div className='box-content text-center'>
                      <span className={`fa-3x ${item.icon}`}></span> <br />
                      <h4 className='title my-3'>{item.title}</h4>
                      <p className='content text-gray '>{ReactHtmlParser(item.content)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='detail-content mt-5'>
                <div className='product-detail-video my-5'>
                  <video src={checkVideoServer(video_1)} muted autoPlay={true} loop controlsList='nodownload' controls className='w-100'>
                  </video>
                </div>
                <div className='body-content-product'>
                  {contentProduct && contentProduct.map(item => (
                    item.id === 10 ? (
                      <div className={`detail-product position-relative sp-${item.id}`}>
                        <div className='product-title'>
                          <h2 className={'text-white'}>{item.title}</h2>
                          <p className={'text-content'}>{item.content}</p>
                          <p className='big-font text-white mt-4'>460x1210<span className='text-content'>mm</span> </p>
                          <p className='small-font text-content'>Thảm chạy rộng rãi</p>
                        </div>
                        <div className='product-image'>
                          <img src={item.image} className='w-100 img-fluid' />
                        </div>
                      </div>
                    ) : item.id === 5 ? (
                      <div className={`detail-product position-relative sp-${item.id}`}>
                        <div className='product-title product_hover'>
                          <h2 className='text-white w-50'>{item.title}</h2>
                          <p className='text-content w-50'>{item.content}</p>

                        </div>
                        <div className='product-image'>
                          <img src={item.image} className='w-100 img-fluid' />
                        </div>
                      </div>
                    ) : item.id === 6 ? (
                      <div className={`detail-product position-relative sp-${item.id}`}>
                        <div className='product-title'>
                          <h2 className={'text-white'}>{item.title}</h2>
                          <p className={'text-content'}>{item.content}</p>

                        </div>
                        <div className='product-image'>
                          <img src={item.image} className='w-100 img-fluid' />
                        </div>
                      </div>
                    ) : item.id === 9 ? (
                      <div className={`detail-product position-relative sp-${item.id}`}>
                        <div className='product-title'>
                          <h2 >{item.title}</h2>
                          <p >{ReactHtmlParser(item.content)}</p>
                          {
                            item.id === 9 && (
                              <ul className='list-unstyled d-flex justify-content-center mt-3'>
                                <li className=''>
                                  <p className='number '>
                                    38
                                    <span>Kg</span>
                                  </p>
                                  <p className=''>Khối lượng</p>
                                </li>
                                <li className=''>
                                  <p className='number '>
                                    110
                                    <span>Kg</span>
                                  </p>
                                  <p className=''>Khả năng tải</p>
                                </li>
                              </ul>
                            )
                          }
                        </div>
                        <div className='product-image'>
                          <img src={item.image} className='w-100 img-fluid' />
                        </div>
                      </div>
                    ) : (
                      <div className={`detail-product position-relative sp-${item.id}`}>
                        <div className='product-title'>
                          <h2 className={(item.id == 2 || item.id == 8 || item.id == 11) && 'text-white'}>{item.title}</h2>
                          <p className={(item.id == 2 || item.id == 8 || item.id == 11) && 'text-content'}>{ReactHtmlParser(item.content)}</p>
                          {
                            item.id === 11 && (
                              <ul className='list-unstyled d-flex justify-content-center mt-3'>
                                <li className=''>
                                  <p className='number text-white'>
                                    1
                                    <span>HP</span>
                                  </p>
                                  <p className='text-white'>Mã lực mạnh mẽ</p>
                                </li>
                                <li className=''>
                                  <p className='number text-white'>
                                    75
                                    <span>DB</span>
                                  </p>
                                  <p className='text-white'>Tốc độ tối đa trong điều kiện không tải</p>
                                </li>
                              </ul>
                            )
                          }
                        </div>
                        <div className='product-image'>
                          <img src={item.image} className='w-100 img-fluid' />
                        </div>
                      </div>
                    )

                  ))}
                  <div className='video-product'>
                    <div className='detail-product position-relative'>
                      <div className='product-title'>
                        <h2 className='text-white'>Không cần cài đặt, bạn có thể được sử dụng ngay lập tức để trải nghiệm lối sống tập luyện thể thao lý tưởng ở đô thị</h2>
                        <p className='text-white'>Thiết kế tất cả trong một cho phép bạn bắt đầu kế hoạch chạy bộ ngay khi mở.</p>
                      </div>
                      <div className='product-video'>
                        <img src={VideoKingSmithX21Gif} className='w-100' />
                      </div>
                    </div>
                  </div>
                  <div className={`detail-product position-relative sp-12`}>
                    <div className='product-title'>
                      <h2 className={'text-white'}>Thiết kế sáng tạo hơn, từng chi tiết được chú trọng</h2>
                    </div>
                    <div className='product-image'>
                      <img src={ImageA13} className='w-100 img-fluid' />
                      <ul className='list-unstyled d-flex justify-content-evenly mt-4 text-center'>
                        <li>
                          <h4 className='text-content'>Bánh xe chống mài mòn cường độ cao</h4>
                          <p className='text-content mt-3'>Được làm bằng vật liệu PP chống mài mòn</p>
                        </li>
                        <li>
                          <h4 className='text-content'>Pallet có thể tháo rời</h4>
                          <p className='text-content mt-3'>Dễ dàng cố định tại chỗ, không sợ va đập</p>
                        </li>
                        <li>
                          <h4 className='text-content'>Một nút công tắc</h4>
                          <p className='text-content mt-3'>Thiết kế chi tiết màu đỏ đậm</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :
            <div>
              <label>Nội dung đang được cập nhật</label>
            </div>
        }
      </div>
    </div>
  )
}

const Specification = (props) => {

  const { item } = props

  return (
    <div className={`specification mt-5`}>
      {
        ReactHtmlParser(item && item.cau_hinh_chi_tiet)
      }
    </div>
  )
}

const Certified = () => {

  const imageChungNhan = [
    {
      id: 1,
      image: ImageChungNhan1,
      content: 'Red Dot Design Award - 2019'
    },
    {
      id: 2,
      image: ImageChungNhan2,
      content: 'IF Design Award - 2019'
    },
    {
      id: 3,
      image: ImageChungNhan3,
      content: 'Good Design Award - 2020'
    },
  ]

  return (
    <div className='certified'>
      <div className='title-design'>
        <p className='line-middle'></p>
        <h4 className='mb-0'>Đạt giải thưởng cho thiết kế xuất sắc nhất</h4>
        <p className='line-middle '></p>
      </div>
      <p className='mt-3 w-50 text-gray'>WalkingPads sở hữu thiết kế đã từng đoạt giải thưởng với kết cấu nguyên bản, thiết kế thẩm mỹ cao, các chi tiết đẹp mắt, đồng thời sở hữu quy trình sản xuất tiên tiến, công nghệ gập hiện đại, có khả năng vận hành thông minh và thân thiện với người sử dụng. </p>
      <div className='content-design mt-5'>
        <ul className='list-unstyled d-flex align-items-center'>
          {imageChungNhan && imageChungNhan.map(item => (
            <li>
              <img src={item.image} className='w-100' />
              <p className='text-center mt-3'>{item.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
const ChiNhanh = () => {

  const [address, setAddress] = useState(addressStore[0].store[0])

  const cityBranch = addressStore[0]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    setAddress(cityBranch.store[0])
  }, [cityBranch])

  return (
    <div className="chi-nhanh row">
      <div className="chi-nhanh-title mb-3 text-center">
        <h6 className="text-uppercase"><strong>Liên hệ với Giga Digital</strong></h6>
      </div>
      <div className="chi-nhanh-content">
        <div className="chi-nhanh-content-info">
          {
            addressStore.map((item, index) => (
              <div key={index} className='d-block'>
                <div className="item-list-map">
                  <p><strong >Thành phố {item.city}</strong></p>
                  {item.store.map((element, index1) => (
                    <div className='d-flex align-items-center justify-content-between'>
                      <p key={index1} ><i className="fa fa-map-marker-alt mr-10 float-left text-primary"></i><span className="d-flex" dangerouslySetInnerHTML={{ __html: element.address.replace(/\n/g, "<br />") }}></span></p>
                      <button type="button" className="border-0 bg-transparent" onClick={() => setAddress(element)}>Xem bản đồ</button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          }
        </div>
        <div className="vertical-line"></div>
        <div className="chi-nhanh-content-map">
          {
            address != '' &&
            <p>
              {
                ReactHtmlParser(address && address.map)
              }
            </p>
          }
        </div>
      </div>
    </div>
  )
}