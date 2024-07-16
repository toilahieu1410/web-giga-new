import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getNewByCreatedAt } from "../../../redux/news/action"
import { checkImageNews } from '../../../utilities/checkNumber'
import { Link } from "react-router-dom"
import moment from "moment"

const ListNewByCreatedAt = () => {

  const dispatch = useDispatch()

  const listNewByCreatedAt = useSelector(store => store.news.listNewByCreatedAt)

  const filterListNew = listNewByCreatedAt.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  useEffect(() => {
    const params = {
      page: 1,
      perPage: 6
    }
    dispatch(getNewByCreatedAt(params))
  }, [])

  const listColors = ['#47c757', '#7b5ebe', '#f58b37']

  // const randomColor = listColors[Math.floor(Math.random() * listColors.length)]
  // const itemsWithRandomColors = listNewByCreatedAt.map((item) => {
  //   const randomColor = colors[Math.floor(Math.random() * colors.length)]
  //   return { ...item, color: randomColor }
  // });

  return (
    <div className="col-md-4 list">
      <div className="detailNews-right position-relative">
        <div className="title-news">
          <h5 className="mb-0"><span>Bài viết mới</span></h5>
        </div>
        <div className="content-news">
          {
            filterListNew.length > 0 && (
              <div className="content-news-item mt-3" >
                <div className="item-thumb position-relative">
                  <Link to={`/tin-tuc/${filterListNew[0].categorySlug}/${filterListNew[0].slug}`} className="content-news-item-list d-inline-block w-100" >
                    <img src={checkImageNews(filterListNew[0].thumb)} alt={checkImageNews(filterListNew[0].thumb)} className='img-fluid w-100' style={{ minHeight: 200 }} />
                    <p className="category text-white" style={{ backgroundColor: '#e55f5f' }}>{filterListNew[0].categoryName}</p>
                  </Link>
                </div>
                <div className="item-content mt-3">
                  <h5>
                    <Link to={`/tin-tuc/${filterListNew[0].categorySlug}/${filterListNew[0].slug}`} className="content-news-item-list  d-inline-block w-100" >
                      <b>{filterListNew[0].name}</b>
                    </Link>
                  </h5>
                  <p className="mb-2 createAt"> <span>{moment(filterListNew[0].createdAt).format('DD-MM-YYYY')}</span></p>
                </div>
              </div>
            )
          }
          {
            filterListNew.map((item, index) => (
              index >= 1 && (
                <div className="content-news-item-child mt-4" key={item._id} >
                  <div className="item-thumb">

                    <Link to={`/tin-tuc/${item.categorySlug}/${item.slug}`}  >
                      <img src={checkImageNews(item.thumb)} alt={checkImageNews(item.thumb)} className='img-fluid float-left' width={100} />

                    </Link>
                  </div>
                  <div className="item-content">
                    <Link className="content-tab" to={`/tin-tuc/${item.categorySlug}/${item.slug}`}  >
                      <h6>
                        {item.name}
                      </h6>
                    </Link>
                    <p className="createAt">
                      <span
                        style={{
                          backgroundColor: item.categorySlug === 'tin-moi' && '#47c757' ||
                            item.categorySlug === 'meo-hay' && '#f58b37' ||
                            item.categorySlug === 'nau-an' && '#aaa' ||
                            item.categorySlug === 'video-hot' && '#425A8B' ||
                            item.categorySlug === 'danh-gia-tu-van' && '#7b5ebe'
                        }}
                        className="mr-10 category text-white">{item.categoryName}</span>
                      <i className='fa fa-clock text-primary'></i>
                      <span className="ml-5">{moment(item.createdAt).format('DD-MM-YYYY')}</span>
                    </p>
                  </div>
                </div>
              )
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ListNewByCreatedAt