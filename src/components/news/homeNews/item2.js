import React from 'react'
import { checkImageNews } from '../../../utilities/checkNumber'
import { Link } from 'react-router-dom'

import BannerRight from '../../../assets/imgs/icon-tintuc/news_card.jpg'
import IconFacebook from '../../../assets/imgs/icon-tintuc/icon-fb.png'
import IconYoutube from '../../../assets/imgs/icon-tintuc/icon-you.png'
import IconTikTok from '../../../assets/imgs/icon-tintuc/icon-tik.png'
import IconLazada from '../../../assets/imgs/icon-tintuc/icon-laz.png'


const dataIcon = [
  {
    id: 1,
    name: 'Facebook',
    icon: IconFacebook,
    url: 'https://www.facebook.com/gigadigital.vn'
  },
  {
    id: 2,
    name: 'Tiktok',
    icon: IconTikTok,
    url: 'https://www.tiktok.com/@giga.digital_official'
  },
  {
    id: 3,
    name: 'Youtube',
    icon: IconYoutube,
    url: 'https://www.youtube.com/@GIGAvn'
  },
  {
    id: 4,
    name: 'Lazada',
    icon: IconLazada,
    url: 'https://www.lazada.vn/shop/gigadigital/'
  }
]


const Item2 = (props) => {

  const { listItem } = props

  const data = listItem.slice(1, 2)

  const handleClick = (url) => {
    window.open(url, '_blank')
  }

  return (
    <>
      <div className='col-md-8'>
        {
          data.map((item, parentIndex) => (
            item.slug === 'danh-gia-tu-van' ? (
              <div key={parentIndex} className='list-data-items d-inline-block w-100'>
                <div className='title-content mb-3'>
                  <h6 className=' mb-0'>{item.name}</h6>
                </div>

                <div className='col-md-12'>
                  <div className='row'>
                    {
                      item.news.slice(0, 4).map((ele, childIndex) => (
                        <div className='col-md-6' key={childIndex}>

                          <div className='item-news'>
                            <div className='image-news'>
                              <Link to={`/tin-tuc/${ele.categorySlug}/${ele.slug}`} className='post-left-thumb float-left'>
                                <img className='w-100 h-100' src={checkImageNews(ele.thumb)} />
                              </Link>
                            </div>
                            <div className='post-left-content'>
                              <p className='mb-2' style={{
                                backgroundColor: '#7b5ebe'
                              }}>
                                {ele.categoryName}
                              </p>
                              <h6>
                                <Link to={`/tin-tuc/${ele.categorySlug}/${ele.slug}`}>{ele.name}</Link>
                              </h6>
                              {/* <p className='item-dateCreated'>  <i className='fa fa-clock text-primary'></i> <span>{moment(ele.createdAt).format('DD-MM-YYYY')}</span></p> */}
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            ) : (
              <div key={parentIndex} className='list-data-items d-inline-block w-100'>
                <div className='title-content mb-3'>
                  <h6 className=' mb-0'>{item.name}</h6>
                </div>
                <div className='col-md-12'>
                  <div className='row'>
                    {
                      item.news.map((ele, childIndex) => (
                        <div className='col-md-6' key={childIndex}>

                          <div className='item-news'>
                            <div className='image-news'>
                              <Link to={`/tin-tuc/${ele.categorySlug}/${ele.slug}`} className='post-left-thumb float-left'>
                                <img className='w-100 h-100' src={checkImageNews(ele.thumb)} />
                              </Link>
                            </div>
                            <div className='post-left-content'>
                              <p className='mb-3' style={{
                                backgroundColor: '#7b5ebe'
                              }}>
                                {ele.categoryName}
                              </p>
                              <h6>
                                <Link to={`/tin-tuc/${ele.categorySlug}/${ele.slug}`}>{ele.name}</Link>
                              </h6>
                              {/* <p className='item-dateCreated'>  <i className='fa fa-clock text-primary'></i> <span>{moment(ele.createdAt).format('DD-MM-YYYY')}</span></p> */}
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            )

          ))
        }
      </div>
      <div className='col-md-4'>
        <div className='list-data-items d-inline-block w-100'>
          <div className='title-content mb-3'>
            <h6 className=' mb-0'>Theo dõi chúng tôi</h6>
          </div>
          <div className='single-follow'>
            <div className='single-box'>
              <ul className='list-unstyled d-flex align-items-center'>
                {dataIcon && dataIcon.map((item) => (
                  <li className='d-flex align-items-center' key={item.id}>
                    <Link to={'#'} onClick={() => handleClick(item.url)} className='post-left-thumb ' target={"_blank"}>
                      <img src={item.icon} className='me-3' />
                      <p>{item.name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className='news-poster'>
              <img src={BannerRight} className='w-100' />
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Item2