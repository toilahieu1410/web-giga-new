import React from 'react'
import { Link } from 'react-router-dom'
import Slider from "react-slick"
import { checkImage } from '../../utilities/checkNumber'
import NoImage from '../../assets/imgs/no-image.png'

const Carousel = (props) => {

  const { listCarousel } = props
  let dragging = false;

  const settings = {
    // customPaging: function (item) {
    //   return (
    //     <h5 className='custom-paging-carousel '>
    //        {listCarousel.title_banner && listCarousel.title_banner[item].title}
    //     </h5>
    //   );
    // },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    fade:false,
    speed: 2000,
    infinite: true,
    cssEase: 'ease-in-out',
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    beforeChange: () => dragging = true,
    afterChange: () => dragging = false
  }

  if (listCarousel.title_banner) {
    listCarousel.title_banner.sort((a, b) => {
      return a.sort - b.sort
    })
  }

  if (listCarousel.sub_banner) {
    listCarousel.sub_banner.sort((a, b) => {
      return a.sort - b.sort
    })
  }

  const lastTwoItems = listCarousel.sub_banner.slice(0, 2)

  return (
    <div className='col-md-12'>
      <div className='row mt-2'>
        <div className='col-md-8'>
          <div className='carousel-home'>
            <Slider {...settings}>
              {
                listCarousel.title_banner && listCarousel.title_banner.map((item, index) => (
                  <Link style={{ cursor: 'grab' }} key={index} to={item.slug} onClick={(e) => dragging && e.preventDefault()} className='list-banner-left'>
                    {item.image === null ? (
                      <img src={NoImage} className='w-100 image-carousel-first 11' alt={item.title} />
                    ) : (
                      <img src={checkImage(item.image)} className='w-100 image-carousel-first 11' alt={item.title} />
                    )}

                  </Link>
                ))
              }
            </Slider>
            {/* <div className='d-flex justify-content-between list-advertisement'>
        {
          listCarousel.sub_banner && listCarousel.sub_banner.map((item, index) => (
            <div key={index} className="mr-10 rounded flex-1">
              <Link to={item.slug}>
                <img src={checkImage(item.image)} width={320} height={165} className='image-sub-banner rounded' alt={item.title} />
              </Link>
            </div>
          ))
        }
      </div> */}
          </div>
        </div>

        <div className='col-md-4'>
        <div className='row'>
        {lastTwoItems.map((item, index) => (
            <div className='banner-small position-relative mb-4' key={index}>
              <img src={checkImage(item.image)} className='w-100 image-carousel-last' alt={item.title} />
              <div className='position-absolute top-0 p-4 h-100'>
               {/* <h4 className='text-primary top-0 left-0 right-0 bottom-0'>{item.title}</h4> */}
               

              </div>
              <div className='mt-4 position-absolute ml-20'>
                <Link to={item.slug} className='btn '>Chi tiết <i className='fa fa-caret-right ml-5'></i></Link>
              </div>
            </div>
          ))}
        </div>
    
        </div>
      </div>
    </div>

  )
}

export default Carousel
