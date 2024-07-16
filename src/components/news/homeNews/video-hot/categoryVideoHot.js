import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import { getCategoryBySlug, getSubCategoryNews, getNewBySlug, getNewsByCate } from '../../../../redux/news/action'
import { _getNewsByCate } from '../../../../api/news'
import { Modal, ModalBody } from 'reactstrap'
import Slider from 'react-slick'
import { checkImageNews } from '../../../../utilities/checkNumber'
import IconGiga from '../../../../assets/imgs/giga-white.png'
import moment from "moment"
import ListNewByCreatedAt from '../listNewByCreateAt'

const CategoryVideoHot = () => {

  const dispatch = useDispatch()

  const { slug } = useParams()

  const categorySlug = useSelector(store => store.news.categorySlug)
  const listSubCategoryNews = useSelector(store => store.news.listSubCategoryNews)
  const listNews = useSelector(store => store.news.listNews)

  
  useEffect(() => {
    dispatch(getCategoryBySlug(slug))
  }, [])

  useEffect(() => {
    if (categorySlug && categorySlug._id) {
      dispatch(getSubCategoryNews(categorySlug._id))
    }
  }, [categorySlug])


  return (
    <div className='video-hot mt-4'>
      <div className='row'>
        {
          listNews && listNews.length > 0 && (
            (
              <div className='col-md-9'>
                <div className='list-video'>
                  <div className='new-video-hot'>
                    <div className='title-video d-flex justify-content-between align-items-center'>
                      <p className='d-flex align-items-center'>
                        <img src={IconGiga} style={{ width: 25 }} />
                        {/* <h3 className='text-white mb-0 ml-10'>STUDIO</h3> */}
                      </p>
                      <div className='d-flex align-items-center'>
                        <h6 className='text-white mb-0 mr-10'>Follow kênh Youtube của Giga</h6>
                        <p className='button-youtube'>
                          <Link to={process.env.REACT_APP_DEFAULT_YOUTUBE_GIGA} target={'_blank'} className='btn youtube text-white'>
                            <i className='fab fa-youtube mr-5'></i><span>Youtube</span>
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className='content-video mt-3'>
                      <p>
                        {
                          ReactHtmlParser(listNews[0].content)
                        }
                      </p>
                      <h5 className='mt-2 text-white'><p className='fw-bold text-white'>{ReactHtmlParser(listNews[0].name)}</p></h5>
                      <p className='mt-2'><span className='text-white'>{listNews[0].view} lượt xem</span><span className='text-gray ml-10'>{moment(listNews[0].createdAt).fromNow()}</span></p>
                    </div>
                  </div>
                  <div className='list-items-video'>
                    <div className='items'>
                      {
                        listSubCategoryNews.map((ele) => (
                  
                          <ItemSlide slug={ele.slug} name={ele.name}/>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        }
        <ListNewByCreatedAt/>
      </div>
    </div>
  )
}

export default CategoryVideoHot

const ItemSlide = (props) => {

  const { slug, name } = props

  const [listData, setListData] = useState([])
  const [showVideo, setShowVideo] = useState(null)

  const [modalYoutube, setModalYoutube] = useState(false)

  useEffect(() => {
    const params = {
      type: 'subCategorySlug',
      slug: slug,
      page: 1,
      perPage: 8
    }
    _getNewsByCate(params).then(res => {
      setListData(res.data)
    })
  }, [slug])

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props
    return (
      <div
      disabled={className?.includes("slick-disabled")}
        className={className}
        style={{ style, display: "block" }}
        onClick={onClick}
      />
    )
  }

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props
    return (
      <div
      disabled={className?.includes("slick-disabled")}
        className={className}
        style={{ style, display: "block" }}
        onClick={onClick}
      />
    )
  }

  const toggleModalYoutube = (value) => {
    setModalYoutube(!modalYoutube)
    setShowVideo(value)
  }

  
  return (
    <div className='list-slide-video'>
      <h6 className='mt-3 ml-5'>
        <b>{name}</b>
      </h6>
      <Slider
        className='my-3'
        autoplay={false}
        loop={true}
        slidesToShow={4}
        slidesToScroll={2}
        nextArrow={<SampleNextArrow />}
        prevArrow={<SamplePrevArrow />}
        responsive={
          [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
          ]
        }
      >
        {listData.map((item) => (
          <div className='video-slider position-relative'>
            <Link onClick={() => toggleModalYoutube(item)}>
              <img src={checkImageNews(item.thumb)} alt={item.name} className='w-100 h-100' />
            </Link>
            <div className='content-list-video mt-1'>
              <h5 className='fw-bold'><Link onClick={() => toggleModalYoutube(item)} >{item.name}</Link></h5>
              <p className='mt-1 text-gray'>{item.view != undefined && <span >{item.view} lượt xem -</span>} <span>{moment(item.createdAt).fromNow()}</span></p>
            </div>
          </div>
        ))}
      </Slider>
        <div className='text-center mb-2'>
          <Link to={`/tin-tuc/video/${slug}`} className='text-primary'>Xem thêm</Link>
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
                  <div className='detail-content mt-3'>
                    <h5>{showVideo.name}</h5>
                    <p className='mt-2 text-gray'><span>{showVideo.view} lượt xem</span> - <span>{moment(showVideo.createdAt).fromNow()}</span></p>
                  </div>
                </ModalBody>
              </Modal>
            )
          }
    </div>
  )
}