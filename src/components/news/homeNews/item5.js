import React, { useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import { checkImageNews } from '../../../utilities/checkNumber'
import { Modal, ModalBody } from 'reactstrap'

const Item5 = (props) => {

  const { listItem } = props

  const data = listItem.slice(4, 5)

  const [nav1, setNav1] = useState()
  const [nav2, setNav2] = useState()

  const [currentSlide, setCurrentSlide] = useState(0)

  const [showVideo, setShowVideo] = useState(null)
  const [modalYoutube, setModalYoutube] = useState(false)

  const toggleModalYoutube = (value) => {
    setModalYoutube(!modalYoutube)
    setShowVideo(value)
  }

  const NextArrow = (props) => {
    const { className, onClick } = props
    return (
      <div className={className} onClick={onClick}></div>
    )
  }

  const PrevArrow = (props) => {
    const { className, onClick } = props
    return (
      <div className={className} onClick={onClick}></div>
    )
  }

  if (nav1 === null || nav2 === null) {
    return null
  }


  return (
    <>
      <div className='col-md-12'>
        {
          data.map((item, index) => (
            <div key={index} className='list-data-items item-videos d-inline-block w-100 pb-4'>
              <div className='title-content mb-3'>
                <h6 className=' mb-0'>{item.name}</h6>
              </div>

              <div className='col-md-12'>
                <div className='row'>
                  <div className='slider-container-video'>
                    <Slider
                      asNavFor={nav2}
                      nav={true}
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
                        item.news && item.news.map((item, index) => (
                          <div key={index} className='list-items-slider position-relative ' >
                            <div className="item ">
                              {
                                ReactHtmlParser(item.content)
                              }
                            </div>
                          </div>
                        ))
                      }
                    </Slider>

                  </div>
                  <div className='col-md-12'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='content-video position-relative'>
                          <div className='content-slider'>
                            <p className='mb-2 text-white' style={{
                              backgroundColor: '#425A8B'
                            }}>
                              {item.name}
                            </p>
                          </div>

                          <h4 className=''>{item.news && item.news[currentSlide] && item.news[currentSlide].name}</h4>
                          {/* <p className='mt-2'>{item.news && item.news[currentSlide] && item.news[currentSlide].content}</p> */}
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='slider-child d-flex mt-3'>
                        
                          <Slider
                            asNavFor={nav1}
                            autoplay={false}
                            ref={slider2 => setNav2(slider2)}
                            slidesToShow={item.news == undefined || item.news.length >= 4 ? 4 : item.news.length}
                            swipeToSlide={true}
                            focusOnSelect={true}
                            slidesToScroll={1}
                            className="small-slick"
                            beforeChange={(oldIndex, newIndex) => setCurrentSlide(newIndex)}
                            responsive={
                              [
                                {
                                  breakpoint: 1199,
                                  settings: {
                                    slidesToShow: item.news == undefined || item.news.length >= 4 ? 4 : item.news.length,
                                  }
                                },
                                {
                                  breakpoint: 992,
                                  settings: {
                                    slidesToShow: item.news == undefined || item.news.length >= 3 ? 3 : item.news.length,
                                  }
                                },
                                {
                                  breakpoint: 767,
                                  settings: {
                                    slidesToShow: item.news == undefined || item.news.length >= 2 ? 2 : item.news.length,
                                  }
                                },
                                {
                                  breakpoint: 480,
                                  settings: {
                                    slidesToShow: item.news == undefined || item.news.length >= 2 ? 2 : item.news.length,
                                  }
                                },
                              ]
                            }
                          >
                            {
                              item.news.map((element, index) => (
                                <div className='d-flex list-content-video'>
                                  <div className='list-items-slider position-relative'>
                                    <div className="item" key={index}>
                                      <Link onClick={() => toggleModalYoutube(element)}>
                                        <img src={checkImageNews(element.thumb)} alt={element.name} className='w-100' />
                                      </Link>
                              
                                    </div>
                                    <p className='fw-500' onClick={() => toggleModalYoutube(element)}>{element.name}</p>
                                  </div>
                                </div>
                              ))
                            }
                          </Slider>
                        </div>
                        {
                          modalYoutube && (
                            <Modal isOpen={modalYoutube} toggle={toggleModalYoutube} size='lg' className='modal-video-slider'>
                              <ModalBody>
                                <p className='modal-video-youtube'>
                                  {
                                    (ReactHtmlParser(showVideo.content))
                                  }
                                </p>
                                {/* <div className='detail-content mt-3'>
                                  <h5>{showVideo.name}</h5>
                                  
                                </div> */}
                              </ModalBody>
                            </Modal>
                          )
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>

  )
}

export default Item5