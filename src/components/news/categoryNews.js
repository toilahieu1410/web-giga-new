import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import { getCategoryBySlug, getNewsByCate } from "../../redux/news/action"
import moment from "moment"
import ReactHtmlParser from 'react-html-parser'
import { checkImageNews } from '../../utilities/checkNumber'
import CategoryVideoHot from "./homeNews/video-hot/categoryVideoHot"
import ListNewByCreatedAt from "./homeNews/listNewByCreateAt"
import Paginations from "../layout/pagination"
import Loading from "../notification/loading"
import LoadingHome from "../notification/loadingHome"

const perPage = 8

const CategoryNews = () => {

  const dispatch = useDispatch()
  const { slug } = useParams()

  const listNews = useSelector(store => store.news.listNews)
  const categorySlug = useSelector(store => store.news.categorySlug)

  const countNew = useSelector((store) => store.news.countNew)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
    dispatch(getCategoryBySlug(slug))
  }, [slug])


  useEffect(() => {
    window.scrollTo(0, 0)
    let typeCategory = ''
    if (categorySlug) {
      if (categorySlug.type == 0) { typeCategory = "categorySlug" }
      if (categorySlug.type == 1) { typeCategory = "subCategorySlug" }
    }
    const params = {
      type: typeCategory,
      slug: slug,
      page: page,
      perPage: perPage
    }
    dispatch(getNewsByCate(params))
  }, [slug, page, categorySlug])


  if (slug === 'video-hot') {
    return (
      <CategoryVideoHot />
    )
  }

  return (
    <div className="category-news">
      <div className="row">
        {
          listNews && listNews.length > 0 ? (
            <div className="col-md-12">
              {/* <div className="categoryNews-title mt-3">
                <h4 className="text-uppercase">{listNews[0].name}</h4>
              </div> */}
              <div className="categoryNews-banner mt-4">
                {
                  listNews[0].slug == 'danh-gia-tivi-xiaomi-top-3-mau-tivi-xiaomi-chat-luong-nhat-hien-nay' ? (
                    <Link rel="nofollow" to={`/tin-tuc/${listNews[0].categorySlug}/${listNews[0].slug}`} className="list-categoryNews position-relative mr-15">
                      <div className="categoryNews-thumb">
                        <img src={checkImageNews(listNews[0].thumb)} alt={listNews[0].name} className="w-100 h-100" />
                      </div>
                      <div className="categoryNews-content position-absolute bottom-0">
                        <div className="categoryNews-content-title">
                          <p className="d-inline-block text-white">{listNews[0].categoryName}</p>
                          <h5 className="text-white my-3">{listNews[0].name}</h5>
                        </div>
                        <p className="createAt text-white">{moment(listNews[0].createdAt).format('DD-MM-YYYY')}</p>
                      </div>
                    </Link>
                  ) : (
                    <Link to={`/tin-tuc/${listNews[0].categorySlug}/${listNews[0].slug}`} className="list-categoryNews position-relative mr-15">
                      <div className="categoryNews-thumb">
                        <img src={checkImageNews(listNews[0].thumb)} className="w-100 h-100" />
                      </div>
                      <div className="categoryNews-content position-absolute bottom-0">
                        <div className="categoryNews-content-title">
                          <p className="d-inline-block text-white">{listNews[0].categoryName}</p>
                          <h5 className="text-white my-3">{listNews[0].name}</h5>
                        </div>
                        <p className="createAt text-white">{moment(listNews[0].createdAt).format('DD-MM-YYYY')}</p>
                      </div>
                    </Link>
                  )
                }
                {
                  listNews.map((item, index) => (
                    index >= 1 && index < 3 && (
                      item.slug == 'danh-gia-tivi-xiaomi-top-3-mau-tivi-xiaomi-chat-luong-nhat-hien-nay' ? (
                        <Link rel="nofollow" to={`/tin-tuc/${item.categorySlug}/${item.slug}`} className="list-categoryNews-right position-relative">
                          <div className="categoryNews-thumb position-relative">
                            <img src={checkImageNews(item.thumb)} className="w-100 " />
                          </div>
                          <div className="categoryNews-content position-absolute bottom-0">
                            <div className="categoryNews-content-title">
                              <p className="d-inline-block text-white">{item.categoryName}</p>
                              <h5 className="text-white mt-2 mb-0">{item.name}</h5>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <Link to={`/tin-tuc/${item.categorySlug}/${item.slug}`} className="list-categoryNews-right position-relative">
                          <div className="categoryNews-thumb position-relative">
                            <img src={checkImageNews(item.thumb)} className="w-100 " />
                          </div>
                          <div className="categoryNews-content position-absolute bottom-0">
                            <div className="categoryNews-content-title">
                              <p className="d-inline-block text-white">{item.categoryName}</p>
                              <h5 className="text-white mt-2 mb-0">{item.name}</h5>
                            </div>
                          </div>
                        </Link>
                      )
                    )
                  ))
                }
              </div>

              <div className="categoryNews-section d-inline-block w-100 mt-4">
                <div className="row">
                  <div className="col-md-8">
                    {
                      listNews.map((item, index) => (
                        index >= 3 && (
                          <div className="list-categoryNews__left d-inline-block w-100 mb-4">
                            <div className="categoryNews-thumb position-relative float-left">
                              {
                                item.slug == 'danh-gia-tivi-xiaomi-top-3-mau-tivi-xiaomi-chat-luong-nhat-hien-nay' ? (
                                  <Link rel="nofollow" to={`/tin-tuc/${item.categorySlug}/${item.slug}`}>
                                    <img src={checkImageNews(item.thumb)} className="w-100 h-100" />
                                  </Link>
                                ) : (
                                  <Link to={`/tin-tuc/${item.categorySlug}/${item.slug}`}>
                                    <img src={checkImageNews(item.thumb)} className="w-100 h-100" />
                                  </Link>
                                )
                              }

                            </div>
                            <div className="categoryNews-content">
                              <h6>
                                <b>
                                  {
                                    item.slug == 'danh-gia-tivi-xiaomi-top-3-mau-tivi-xiaomi-chat-luong-nhat-hien-nay' ? (
                                      <Link rel="nofollow" to={`/tin-tuc/${item.categorySlug}/${item.slug}`}>{item.name}</Link>
                                    ) : (
                                      <Link to={`/tin-tuc/${item.categorySlug}/${item.slug}`}>{item.name}</Link>
                                    )
                                  }
                                </b>
                              </h6>
                              <p className="createAt">
                                {item.categoryName != undefined ? (<span
                                  style={{
                                    backgroundColor: item.categorySlug === 'tin-moi' && '#47c757' ||
                                      item.categorySlug === 'meo-hay' && '#f58b37' ||
                                      item.categorySlug === 'nau-an' && '#aaa' ||
                                      item.categorySlug === 'video-hot' && '#425A8B' ||
                                      item.categorySlug === 'danh-gia-tu-van' && '#7b5ebe'
                                  }}
                                  className="mr-10 category text-white">{item.categoryName}</span>) : ('')}
                                <i className='fa fa-clock text-primary'></i>
                                <span className="ml-5">{moment(item.createdAt).format('DD-MM-YYYY')}</span>
                              </p>

                              <p className="content-detail mt-3">
                                {
                                  ReactHtmlParser(item.content)
                                }
                              </p>
                            </div>
                          </div>
                        )
                      ))
                    }

                    <Paginations page={page} setPage={setPage} perPage={perPage} totalItem={countNew} />
                  </div>
                  <ListNewByCreatedAt />
                </div>
              </div>
            </div>
          ) : (
            <LoadingHome />
          )
        }
      </div>
    </div>

  )
}

export default CategoryNews