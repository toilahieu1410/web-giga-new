import React from 'react'
import { checkImageNews } from '../../../utilities/checkNumber'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'

const Item1 = (props) => {

  const { listItem } = props

  return (
    <>
      <div className='col-md-12'>
        <div className='row'>
          <Slider
            loop={true}
            dots={true}
            autoplay={false}
            slidesToShow={listItem.length == undefined || listItem.length >= 3 ? 3 : listItem.length}
            slidesToScroll={1}
            responsive={
              [
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: listItem.length == undefined || listItem.length >= 2 ? 2 : listItem.length,
                  }
                },

                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: listItem.length == undefined || listItem.length >= 1 ? 1 : listItem.length,
                  }
                },
              ]
            }
          >
            {
              listItem && listItem.map((item, index) => (
                <div className='item-news' key={index}>
                  <div className='image-news'>
                    <img className='w-100 h-100' src={checkImageNews(item.thumb)} />
                  </div>
                  <div className='post-left-content'>
                    <p className='mb-2' style={{
                      backgroundColor: item.categorySlug === 'tin-moi' && '#47c757'
                    }}>
                      {item.categoryName}
                    </p>
                    <h6>
                      <Link to={`/tin-tuc/${item.categorySlug}/${item.slug}`}>{item.name}</Link>
                    </h6>
                  </div>
                </div>

              ))
            }
          </Slider>
        </div>
      </div>
    </>
  )
}

export default Item1