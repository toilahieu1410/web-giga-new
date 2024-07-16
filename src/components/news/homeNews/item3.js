import React from "react"
import { checkImageNews } from '../../../utilities/checkNumber'
import { Link } from 'react-router-dom'
import Slider from "react-slick"
import moment from "moment"

const PostItem = ({ post, index }) => (
  <div className='list-post-cooking-content '>

    <div className='image-news position-relative'>
      <img className='w-100 ' src={checkImageNews(post.thumb)} />
      <p className='mb-2 text-white' style={{
        backgroundColor: '#aaa'
      }}>
        {post.categoryName}
      </p>
    </div>

    <div className='post-left-content'>
      <p className='item-dateCreated'>  <i className='fa fa-clock text-primary'></i> <span>{moment(post.createdAt).format('DD-MM-YYYY')}</span></p>
      <h6>
        <Link to={`/tin-tuc/${post.categorySlug}/${post.slug}`}>{post.name}</Link>
      </h6>
    </div>
  </div>
)

const Item3 = (props) => {
  const { listItem } = props
  const data1 = listItem.slice(3, 4)

  return (
    <div className='col-md-12'>
      {data1.map((item, index) => (
        <div key={index} className='list-data-items d-inline-block w-100'>
          <div className='title-content mb-3'>
            <h6 className=' mb-0'>{item.name}</h6>
          </div>
          <div className='col-md-12'>
            <div className="row">
              <Slider
                loop={true}
                dots={true}
                autoplay={true}
                slidesToShow={item.news.length == undefined || item.news.length >= 4 ? 4 : item.news.length}
                slidesToScroll={1}
                speed={1500}
                autoplaySpeed={3000}
                responsive={
                  [
                    {
                      breakpoint: 1199,
                      settings: {
                        slidesToShow: item.news.length == undefined || item.news.length >= 3 ? 3 : item.news.length,
                      }
                    },
                    {
                      breakpoint: 992,
                      settings: {
                        slidesToShow: item.news.length == undefined || item.news.length >= 2 ? 2 : item.news.length,
                      }
                    },
                    {
                      breakpoint: 767,
                      settings: {
                        slidesToShow: item.news.length == undefined || item.news.length >= 2 ? 2 : item.news.length,
                      }
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: item.news.length == undefined || item.news.length >= 1 ? 1 : item.news.length,
                      }
                    },
                  ]
                }
              >
                {
                  item.news.map((post, postIndex) => (
                    <PostItem key={post._id} post={post} index={postIndex} />
                  ))
                }
              </Slider>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Item3