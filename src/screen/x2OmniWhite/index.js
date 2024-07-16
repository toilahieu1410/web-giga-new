import React, { useRef, useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import ReactPlayer from "react-player"
import debounce from "lodash/debounce"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

import { checkVideoServer } from "../../utilities/checkNumber"
import { Mousewheel, Pagination } from 'swiper/modules'
import HeaderX2Omni from "./header"
import FooterX2Omni from "./footer"
import Slider from "react-slick"

import "bootstrap/dist/css/bootstrap.css"
import "../../../src/assets/x2-omni/scss/app.scss"

import ImageBanner from '../../assets/x2-omni/images/logo-web.jpg'
import ImageBannerMobile from '../../assets/x2-omni/images/logo-mobile.jpg'
import Image1 from '../../assets/x2-omni/images/anh1.jpg'
import Image2 from '../../assets/x2-omni/images/anh2.jpg'
import Image3 from '../../assets/x2-omni/images/anh3.jpg'
import Image4 from '../../assets/x2-omni/images/anh4.jpg'
import Image5 from '../../assets/x2-omni/images/anh5.jpg'

import ImageSlider1 from '../../assets/x2-omni/images/anh9.jpg'
import ImageSlider2 from '../../assets/x2-omni/images/anh10.jpg'
import ImageSlider3 from '../../assets/x2-omni/images/anh11.jpg'
import ImageSlider4 from '../../assets/x2-omni/images/anh12.jpg'
import ImageSlider5 from '../../assets/x2-omni/images/anh14.jpg'
import ImageSlider6 from '../../assets/x2-omni/images/anh15.jpg'
import ImageSlider7 from '../../assets/x2-omni/images/anh13.jpg'
import ImageSlider8 from '../../assets/x2-omni/images/anh16.jpg'

import ImageProduct1 from '../../assets/x2-omni/images/products/product-1.png'
import ImageProduct2 from '../../assets/x2-omni/images/products/product-2.png'
import ImageProduct3 from '../../assets/x2-omni/images/products/product-3.png'
import ImageProduct4 from '../../assets/x2-omni/images/products/product-4.png'
import ImageProduct5 from '../../assets/x2-omni/images/products/product-5.png'
import ImageProduct6 from '../../assets/x2-omni/images/products/product-6.png'
import ImageProduct7 from '../../assets/x2-omni/images/products/product-7.png'
import ImageProduct8 from '../../assets/x2-omni/images/products/product-8.png'
import ImageProduct9 from '../../assets/x2-omni/images/products/product-9.png'

import ImageThongSo from '../../assets/x2-omni/images/thong-so.webp'
import ImageContent from '../../assets/x2-omni/images/anh6.jpg'
import ImageEcovacsX2White from '../../assets/x2-omni/images/ecovacsX2-white.png'
import ImageEcovacX2Black from '../../assets/x2-omni/images/ecovacsX2-black.png'

import { settingX2Omni } from "../../utilities/settingSlide"
import { checkNumber } from "../../utilities/checkNumber"
import ScrollAnimation from "react-animate-on-scroll"
import ReactHtmlParser from 'react-html-parser'

const listSlider = [
  {
    id: 1,
    image: ImageSlider1,
    title: 'Thêm tọa độ nhà trong bản đồ cấu trúc ngôi nhà, dễ dàng để bạn tùy chỉnh'
  },
  {
    id: 2,
    image: ImageSlider2,
    title: 'Có thể hiểu được các ngôn ngữ địa phương'
  },
  {
    id: 3,
    image: ImageSlider3,
    title: ' Nhiều đoạn hội thoại mới được thêm vào, giao tiếp như người thật'
  },
  {
    id: 4,
    image: ImageSlider4,
    title: ' Luôn phản hồi và hỗ trợ bạn kịp thời ngay cả khi đang offline, hay mất kết nối mạng'
  },
  {
    id: 5,
    image: ImageSlider5,
    title: 'Thêm tọa độ nhà trong bản đồ cấu trúc ngôi nhà, dễ dàng để bạn tùy chỉnh'
  },
  {
    id: 6,
    image: ImageSlider6,
    title: 'Có thể hiểu được các ngôn ngữ địa phương'
  },
  {
    id: 7,
    image: ImageSlider7,
    title: ' Nhiều đoạn hội thoại mới được thêm vào, giao tiếp như người thật'
  },
  {
    id: 8,
    image: ImageSlider8,
    title: ' Luôn phản hồi và hỗ trợ bạn kịp thời ngay cả khi đang offline, hay mất kết nối mạng'
  },
]

const listData = [
  {
    id: 1,
    image: Image1,
    title: 'Hơn cả đổi mới, hơn cả đột phá',
    description: 'Thiết kế thân vuông hoàn toàn mới theo đuổi giới hạn của ngành và là một chuyên gia làm sạch thực sự trong mọi tình huống.'
  },
  {
    id: 2,
    image: Image2,
    title: 'Sử dụng dễ dàng, trải nghiệm rảnh tay',
    description: 'Trạm sạc đa năng giúp trải nghiệm dọn dẹp rảnh tay hơn, và tính năng nhận diện nước thải thông minh đã được tích hợp, giúp vắt cho đến khi sạch hoàn toàn'
  },
  {
    id: 3,
    image: Image3,
    title: 'Thông minh, hơn cả sự mong đợi',
    description: 'Được trang bị công nghệ Gemini và Ecovacs AINA, robot có thể phản ứng linh hoạt với những thay đổi và các điều kiện môi trường khác nhau.'
  },
  {
    id: 4,
    image: Image4,
    title: 'Công nghệ nâng cấp độc quyền',
    description: '7 nâng cấp chính của trợ lý giọng nói YIKO 2.0 và công nghệ 3D Mapping 2.0 mang lại trải nghiệm tương tác chân thực.'
  },
  {
    id: 5,
    image: Image5,
    title: 'Diện mạo thanh lịch từ trong ra ngoài',
    description: 'Sự kết hợp hoàn hảo giữa phong cách phương Đông và công nghệ hiện đại, phù hợp với những không gian nhà cao cấp nhưng vẫn mang phong cách tối giản.'

  }
]

const listVideo1 = [
  {
    id: 1,
    title: `Mỏng hơn: Robot mỏng nhất chỉ <span>95</span><i>mm</i>`,
    videoId: 'giga-vn-x2-omni-video-1.mp4',
  },
  {
    id: 2,
    title: `Gọn hơn: Thân máy gọn chỉ <span>320</span><i>mm</i>`,
    videoId: 'giga-vn-x2-omni-video-2.mp4',
  },
  {
    id: 3,
    title: "Lớn hơn: Chổi chính lớn nhất <span>200</span><i>mm</i>",
    videoId: 'giga-vn-x2-omni-video-3.mp4',
  },
  {
    id: 4,
    title: `Sát hơn: Tỷ lệ bao phủ góc cao nhất <span>99.77</span><i>%</i>`,
    videoId: 'giga-vn-x2-omni-video-4.mp4',
  },
  {
    id: 5,
    title: `Cao hơn: Khả năng nâng thảm lau cao nhất <span>15</span><i>mm</i>`,
    videoId: 'giga-vn-x2-omni-video-5.mp4',
  },
  {
    id: 6,
    title: `Lực hút: <span>8000</span><i>Pa</i> lốc xoáy`,
    videoId: 'giga-vn-x2-omni-video-6.mp4',
  },
]

const listVideo2 = {
  Video7: 'giga-vn-x2-omni-video-7.mp4',
  Video9: 'giga-vn-x2-omni-video-9.mp4',
  Video10: 'giga-vn-x2-omni-video-10.mp4',
  VideoBanner: 'giga-vn-x2-omni-video-banner.mp4',
}

const dataProduct = [
  {
    id: 1,
    title: 'Ecovacs Deebot U2 Pro',
    url: 'https://gigadigital.vn/robot-hut-bui/robot-hut-bui-lau-nha-thong-minh-ecovacs-deebot-u2-pro',
    image: ImageProduct1,
    price: 4290000,
    old_price: 9090000
  },
  {
    id: 2,
    title: 'Ecovacs Deebot N10',
    url: 'https://gigadigital.vn/robot-hut-bui/robot-hut-bui-lau-nha-ecovacs-deebot-n10',
    image: ImageProduct2,
    price: 7990000,
    old_price: 11990000
  },
  {
    id: 3,
    title: 'Ecovacs Deebot T10',
    url: 'https://gigadigital.vn/robot-hut-bui/robot-hut-bui-lau-nha-ecovacs-deebot-t10',
    image: ImageProduct3,
    price: 9990000,
    old_price: 15900000
  },
  {
    id: 4,
    title: 'Ecovacs Deebot T10 Turbo',
    url: 'https://gigadigital.vn/robot-hut-bui/robot-hut-bui-lau-nha-giat-gie-tu-dong-ecovacs-deebot-t10-turbo',
    image: ImageProduct4,
    price: 13900000,
    old_price: 20900000
  },
  {
    id: 5,
    title: 'Ecovacs Deebot T10 Omni',
    url: 'https://gigadigital.vn/robot-hut-bui/robot-hut-bui-lau-nha-ecovacs-deebot-t10-omni',
    image: ImageProduct5,
    price: 16900000,
    old_price: 23990000
  },
  {
    id: 6,
    title: 'Ecovacs Deebot X1 Omni',
    url: 'https://gigadigital.vn/robot-hut-bui/robot-hut-bui-lau-nha-tu-dong-giat-re-ecovacs-deebot-x1-omni',
    image: ImageProduct6,
    price: 19900000,
    old_price: 25900000
  },
  {
    id: 7,
    title: 'Máy hút bụi lau sàn Tineco S3',
    url: 'https://gigadigital.vn/dien-gia-dung/may-hut-bui-lau-san-kho-uot-tineco-floor-one-s3',
    image: ImageProduct7,
    price: 8900000,
    old_price: 12900000
  },
  {
    id: 8,
    title: 'Máy hút bụi lau sàn Tineco S5 Pro 2',
    url: 'https://gigadigital.vn/dien-gia-dung/may-hut-bui-tineco-floor-one-s5-pro-2',
    image: ImageProduct8,
    price: 12900000,
    old_price: 18900000
  },
  {
    id: 9,
    title: 'Máy hút bụi lau sàn Tineco Pure One Mini S4',
    url: 'https://gigadigital.vn/dien-gia-dung/may-hut-bui-cam-tay-khong-day-thong-minh-tineco-pure-one-mini-s4',
    image: ImageProduct9,
    price: 2690000,
    old_price: 3590000
  }
]

const X2OmniWhite = () => {

  const mapSwiperRef = useRef(null)

  const [isLastSlide, setIsLastSlide] = useState(false)
  const [isFirstSlide, setIsFirstSlide] = useState(true)
  const [videoEnded, setVideoEnded] = useState(false)
  const [widthScreen, setWidthScreen] = useState(window.innerWidth)

  const handleResize = () => {
    setWidthScreen(window.innerWidth)
  }

  const handleVideoEnded = () => {
    setVideoEnded(true)

  }

  const handleMapSwiperChange = () => {

    if (mapSwiperRef.current) {
      const currentSlideIndex = mapSwiperRef.current.swiper.activeIndex
      setIsLastSlide(currentSlideIndex === listVideo1.length - 1)
      setIsFirstSlide(currentSlideIndex === 0)
    }
  }

  const handleMouseWheel = debounce((e) => {
    if ((isLastSlide && e.deltaY > 0) || (isFirstSlide && e.deltaY < 0)) {
      e.preventDefault()
      window.scrollTo({
        top: window.scrollY + e.deltaY,
        behavior: 'smooth',
      })
    }
  }, 200)

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('wheel', handleMouseWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleMouseWheel)
    }
  }, [isLastSlide, isFirstSlide])

  return (
      <div className="homepage">
        <HeaderX2Omni />
        <div className="list-banner">
          <div className="section-1">
            {!videoEnded && (
              <ReactPlayer
                className="data-video w-100 h-100"
                muted={true}
                playing={true}
                url={checkVideoServer(listVideo2.VideoBanner)}
                playsinline
                onEnded={handleVideoEnded}
              />
            )}
            
              {videoEnded ? widthScreen <= 767 ? <img
                className={`img-banner ${videoEnded ? 'show w-100 position-relative top-0' : ''}`}
                src={ImageBannerMobile} alt="Banner" /> : <img
                className={`img-banner ${videoEnded ? 'show w-100 position-relative top-0' : ''}`}
                src={ImageBanner} alt="Banner" /> : null}
            </div>
            <div className="section-2">
            <div className="container">
              <ScrollAnimation
                  className="slideInUp"
                  initiallyVisible={true}
                  animatePreScroll={true}
                  offset={300}
                  animateIn='slideInUp'
                  duration={0.6}
                  delay={600}
                  animateOut='slideInUp'
                  animateOnce={true}
                >
                  <div className="top-parts">
                    {listData && listData.map((item, index) => (
                      index < 2 && (
                        <div className="item-part">
                          <div className="item-img">
                            <img src={item.image} />
                          </div>
                          <h4 className="text-white">{item.title}</h4>
                          <p className="text-gray">{ReactHtmlParser(item.description)}</p>
                          {/* <Link className="text-decoration-none" to={'#'}>Mở khóa công nghệ mới <img src={IconDown} className="ml-10" width={20} /> </Link> */}
                        </div>
                      )
                    ))}
                  </div>
                  <div className="bottom-parts">
                  {listData && listData.map((item, index) => (
                    index >= 2 && (
                      <div className="item-part">
                        <div className="item-img">
                          <img src={item.image} />
                        </div>
                        <h4 className="text-white">{item.title}</h4>
                        <p className="text-gray">{item.description}</p>
                        {/* <Link className="text-decoration-none" to={'#'}>Mở khóa công nghệ mới <img src={IconDown} className="ml-10" width={20} /> </Link> */}
                      </div>
                    )
                  ))}
                </div>

                </ScrollAnimation>
            </div>
          </div>
          <div className="section-3">
            <div className="container">
              <div className="showUp">
                <ScrollAnimation
                  offset={1200}
                  animateIn='slideInUp'
                  duration={0.8}
                  delay={600}
                  animateOut='slideInUp'
                  animateOnce={true}
                >
                  <div className="video-container">
                    <img src={ImageContent} className="w-100" />
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </div>

          <div className="section-4">
            <div className="animate-box">
              <div className="box-container">
                <h4 className="mt-4">Không còn nỗi lo bụi mịn vô hình.</h4>
                <Swiper
                  ref={mapSwiperRef}
                  direction={'vertical'}
                  slidesPerView={1}
                  spaceBetween={30}
                  mousewheel={true}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Mousewheel, Pagination]}
                  className="mySwiper"
                  onSlideChange={handleMapSwiperChange}
                >
                  {
                    listVideo1.map((item) => (
                      <SwiperSlide>
                        <div className="top-item d-contents">
                          {ReactHtmlParser(item.title)}
                        </div>
                        <div>
                          <ReactPlayer
                            className="active-video w-60 h-100"
                            muted={true}
                            playing={true}
                            loop={true}
                            playsinline
                            url={checkVideoServer(item.videoId)} />
                        </div>
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
              </div>
            </div>
          </div>

          <div className="section-5">
            <div className="animate-box" style={{ overflow: 'initial' }}>
              <h2>Trạm sạc đa năng All-in-one, đem tới trải nghiệm rảnh tay mỗi khi sử dụng</h2>
              <div className="img-pro position-relative">
                {/* <img src={ImageEcovacsX2White} className='w-100' /> */}
                <img src={ImageThongSo} className="position-absolute" width={700} />
              </div>
            </div>
          </div>

          <div className="section-6">
            <div className="container">
              <ReactPlayer className="data-video-small w-100 h-100"
                muted={true}
                playing={true}
                loop={true}
                url={checkVideoServer(listVideo2.Video7)}
                playsinline
              />
            </div>
            <ReactPlayer className="data-video w-100 mt-5"
              height={600}
              muted={true}
              playsinline
              playing={true}
              loop={true}
              url={checkVideoServer(listVideo2.Video9)}
            />
          </div>

          <div className="section-7">
          </div>

          <div className="section-8">
            <ScrollAnimation
              offset={1200}
              animateIn='slideInUp'
              duration={0.8}
              delay={600}
              animateOut='slideInUp'
              animateOnce={true}
            >
              <h2>Trợ lí giọng nói YIKO 2.0 có thể làm được nhiều hơn cho bạn</h2>
              <Slider
                {...settingX2Omni}
              >
                {listSlider.map((item, index) => (
                  <div key={index} className="grid-item  float-left mb-5">
                    <img src={item.image} alt={`Image ${index + 1}`} className="img-fluid" />
                    <h5 className="mt-3">{item.title}</h5>
                  </div>
                ))}
              </Slider>
            </ScrollAnimation>
          </div>

          <div className="section-9">
            <div className="container">
              <h2>Trải nghiệm dọn dẹp - tương tác chân thực thời đại mới</h2>
              <p>
                3D Mapping 2.0 <br />
                Với bản đồ 3D mới được nâng cấp, Deebot X2 Omni sẽ tiến hành dọn dẹp khi bạn chạm vuốt ngón tay tới vị trí cần làm sạch trên ứng dụng Ecovacs Home.
              </p>
              <ReactPlayer className="data-video w-100 h-100"
                playsinline
                muted={true}
                playing={true}
                loop={true}
                url={checkVideoServer(listVideo2.Video10)} />
            </div>
          </div>

          <div className="section-10">
            <div className="container">
     
            <h2>DEEBOT X2 Omni</h2>
            <div className="d-flex align-items-center justify-content-evenly">
            <div className="x2-omni">
          
                <div className="deebot-image">
                  <a href={`https://gigadigital.vn/robot-hut-bui/robot-hut-bui-lau-nha-ecovacs-deebot-x2-omni`} className="cursor-pointer d-inline-block" target={"_blank"}>
                    <img src={ImageEcovacX2Black} className='d-block' />
                  </a>
                  <div className="price-deebot mt-3">
                    <h4 className="text-white mb-0 d-inline-block">24.900.000₫</h4>&nbsp;&nbsp;
                    <span className="text-decoration-line-through text-gray">34.900.000₫</span>
                  </div>
                  <div className="color-deebot mt-3 flex-column d-flex">
                  {/* <h5 className="text-white mb-0 d-inline-block">DEEBOT X2</h5>
                  <h5 className="text-white mb-0 d-inline-block">Màu đen</h5> */}
                  </div>
                  <a href={`https://gigadigital.vn/robot-hut-bui/robot-hut-bui-lau-nha-ecovacs-deebot-x2-omni`} className="cursor-pointer d-inline-block" target={"_blank"}>
                    <p className="btn buy mt-4">Mua ngay <span className="arrows ml-5"></span></p>
                  </a>
                </div>
              </div>
              <div className="x2-omni x2-omni-wwhite">
               
                <div className="deebot-image">
                  <a href={`https://gigadigital.vn/robot-hut-bui/robot-hut-bui-lau-nha-ecovacs-deebot-x2-omni-white`} className="cursor-pointer d-inline-block" target={"_blank"}>
                    <img src={ImageEcovacsX2White} className='d-block' />
                  </a>
                  <div className="price-deebot mt-3">
                    <h4 className="text-white mb-0 d-inline-block">24.900.000₫</h4>&nbsp;&nbsp;
                    <span className="text-decoration-line-through text-gray">34.900.000₫</span>
                  </div>
                  <div className="color-deebot mt-3 flex-column d-flex">
                  {/* <h5 className="text-white mb-0 d-inline-block">DEEBOT X2</h5>
                  <h5 className="text-white mb-0 d-inline-block">Màu trắng</h5> */}
                  </div>
                  <a href={`https://gigadigital.vn/robot-hut-bui/robot-hut-bui-lau-nha-ecovacs-deebot-x2-omni-white`} className="cursor-pointer d-inline-block" target={"_blank"}>
                    <p className="btn buy mt-4">Mua ngay <span className="arrows ml-5"></span></p>
                  </a>
                </div>
              </div>
            </div>
             
              <div className="list-contact mt-4">
                <ul className="list-unstyled d-grid ">
                  {dataProduct && dataProduct.map((item, index) => (
                    <li className="list-products-robot d-block w-100">
                      <a href={item.url} className=" d-flex align-items-center text-decoration-none border" target={"_blank"}>
                        <img src={item.image} className="img-fluid mr-20" width={100} height={150} />
                        <div className="info-right text-left">
                          <p className="text-white mb-2 text-decoration-line-through"><i>{checkNumber(item.old_price)}</i></p>
                          <h5 className="text-white fw-500 border-bottom-1 pb-2">{checkNumber(item.price)}</h5>
                          <h5 className="text-white title">{item.title}</h5>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="line-middle"></div>
            </div>
          </div>
        </div>
        <FooterX2Omni />
      </div>
  )
}

export default withRouter(X2OmniWhite)