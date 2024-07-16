import React from 'react'
import { checkImageNews } from '../../../utilities/checkNumber'
import moment from 'moment'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import Slider from 'react-slick'

const Item4 = (props) => {

  const { listItem } = props

  const data = listItem.slice(2, 3)


  return (
    <>
      <div className='col-md-12'>
        {
          data.map((item, index) => (
            <div key={index} className='list-data-items d-inline-block w-100'>
              <div className='title-content mb-3'>
                <h6 className=' mb-0'>{item.name}</h6>
              </div>
              
              <div className='col-md-12'>
                <div className='row'>
                  <Slider
                    loop={true}
                    dots={true}
                    autoplay={false}
                    slidesToShow={item.news.length == undefined || item.news.length >= 3 ? 3 : item.news.length}
                    slidesToScroll={1}
                    responsive={
                        [
                          {
                            breakpoint: 1199,
                            settings: {
                              slidesToShow: item.news.length == undefined || item.news.length >= 2 ? 2 : item.news.length,
                            }
                          },
                          {
                            breakpoint: 767,
                            settings: {
                              slidesToShow: item.news.length == undefined || item.news.length >= 1 ? 1 : item.news.length,
                            }
                          },
                        ]
                      }
                  >
                    {
                      item.news.map((ele, index) => (
                        <div className='item-news' key={index}>
                          <div className='image-news'>
                            <img className='w-100 h-100' src={checkImageNews(ele.thumb)} />
                          </div>
                          <div className='post-left-content'>
                            <p className='mb-2' style={{
                              backgroundColor: '#f58b37'
                            }}>
                              {ele.categoryName}
                            </p>
                            <h6>
                              <Link to={`/tin-tuc/${ele.categorySlug}/${ele.slug}`}>{ele.name}</Link>
                            </h6>
                            {/* <p className='item-dateCreated'>  <i className='fa fa-clock text-primary'></i> <span>{moment(ele.createdAt).format('DD-MM-YYYY')}</span></p> */}
                          </div>
                        </div>

                      ))
                    }
                  </Slider>
                </div>
              </div>
            </div>
          ))}


      </div>
    </>

  )
}

export default Item4