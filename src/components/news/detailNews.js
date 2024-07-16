import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, Link, useLocation } from "react-router-dom"
import { getNewBySlug } from '../../redux/news/action'
import ReactHtmlParser from 'react-html-parser'
import moment from "moment"
import { checkImageNews } from '../../utilities/checkNumber'
import Slider from 'react-slick'
import LikeShareFacebook from '../layout/likeShareFacebook'
import { Link as LinkTo } from 'react-scroll'
import { Helmet } from "react-helmet"
import ListNewByCreatedAt from "./homeNews/listNewByCreateAt"
import LoadingHome from "../notification/loadingHome"

const DetailNews = () => {

  const dispatch = useDispatch()

  const { category, slug } = useParams()

  let headingCount = 0

  const dataHref = useLocation()
  const dataNew = useSelector(store => store.news.dataNew)
  const listNews = useSelector(store => store.news.listNews)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getNewBySlug(slug))
  }, [category, slug])

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "Website",
    "item": {
      "@type": "Website",
      "@id": dataNew && dataNew._id,
      "title": dataNew && dataNew.title,
      "name": dataNew && dataNew.name,
      "images": dataNew && dataNew.thumb,
    },
  
    "description": dataNew && dataNew.description,
    "brand": {
      "@type": "Brand",
      "name": dataNew && dataNew.name,
    },
    "offers": {
      "@type": "Offer",
      "name": dataNew && dataNew.name,
    }
  }

  return (
    <div className="detail-news mt-4">
      {dataNew && (
        <Helmet>
          <title>{dataNew.title}</title>
          <meta property="description" name="description" content={dataNew.description} />
          <script type="application/ld+json">
              {JSON.stringify(ldJson)}
            </script>
        </Helmet>
      )}
      {
        dataNew == null ? <LoadingHome /> : (
          <div className="row">
            <div className="col-md-8">
              <div className="category-detail">
                <div className="d-flex align-items-start justify-content-between">
                  <h1 className="mb-0 fw-bold">
                    {ReactHtmlParser(dataNew.name)}
                  </h1>
                  <LikeShareFacebook dataHref={dataHref.pathname} />
                </div>
                <p className="text-left my-2"><i className="fa fa-clock text-primary" style={{ fontWeight: 500 }}></i><span className="ml-10">{moment(dataNew.createdAt).fromNow()}</span></p>
                {
                  (category != 'video-hot') && (
                    <div className="d-block" style={{ marginBottom: 10, }}>
                      <img className="img-fluid w-100" src={checkImageNews(dataNew.thumb)} alt={checkImageNews(dataNew.thumb)}/>
                      <p className="mb-3 fw-bold mt-2"><i>{dataNew.description}</i></p>
                    </div>
                  )
                }
              </div>

              {(dataNew.content && category != 'video-hot') && (
                <Headings content={dataNew.content} />
              )}

              <div className="detailNews-left position-relative">
                <div className="detailNews-thumb">

                </div>
                <div className="detailNews-content">
                  {React.Children.map(ReactHtmlParser(dataNew.content), (child, index) => {
                    if (child.type === "h2" || child.type === "h3") {
                      headingCount++
                      return React.cloneElement(child, { id: `heading-${headingCount}` })
                    } else {
                      return child
                    }
                  })}
                </div>
              </div>
              {dataNew.tags != null && (
                <ul className="list-unstyled list-tags d-inline-block mt-2">
                  <div className="new-ribbon mr-10 my-3">TAGS</div>
                  {
                    (dataNew.tags)?.split(';').map(item => (
                      <Link to={`/tin-tuc/tag/${item}`} className='mr-10'>
                        <p>{item}</p>
                      </Link>
                    ))
                  }
                </ul>
              )}

             
            </div>
            <ListNewByCreatedAt />
            <div className="list-detailNews-info mt-4">
                <div className="title-news">
                  <h5 className="mb-0"><span>Bài viết liên quan</span></h5>
                </div>
                <div className="tab-content">
                  <div className="tab-content-post col-md-12 mb-3 animated fadeInDown">
                    <div className="row">
                      {listNews.length <= 6 ? (
                        listNews.map((item) => (
                          <div key={item._id} className="col-md-4 mt-3">
                            <Link to={`/tin-tuc/${item.categorySlug}/${item.slug}`} className="content-news-item ">
                              <div className="item-thumb position-relative">
                                <img src={checkImageNews(item.thumb)} alt={checkImageNews(item.thumb)} className='img-fluid w-100' height={70} />
                              </div>
                              <div className="item-content mt-2">
                                <h5>{item.name}</h5>
                              </div>
                            </Link>
                          </div>
                        ))

                      ) : (
                        <Slider
                          arrows={true}
                          infinite={true}
                          rows={2}
                          slidesPerRow={3}
                          className='list-slider'
                          responsive={
                            [
                              {
                                breakpoint: 1200,
                                settings: {
                                  rows: 2,
                                  slidesPerRow: 3
                                }
                              },
                              {
                                breakpoint: 991,
                                settings: {
                                  rows: 2,
                                  slidesPerRow: 2
                                }
                              },
                              {
                                breakpoint: 767,
                                settings: {
                                  rows: 2,
                                  slidesPerRow: 2
                                }
                              },
                              {
                                breakpoint: 480,
                                settings: {
                                  rows: 2,
                                  slidesPerRow: 2
                                }
                              },
                            ]
                          }
                        >
                          {
                            listNews.map((item) => (
                              <div key={item._id} className="col-md-4 mt-3">
                                <Link to={`/tin-tuc/${item.categorySlug}/${item.slug}`} className="content-news-item d-grid">
                                  <div className="item-thumb position-relative">
                                    <img src={checkImageNews(item.thumb)} alt={checkImageNews(item.thumb)} className='img-fluid w-100' height={70} />
                                  </div>
                                  <div className="item-content mt-2">
                                    <h5>{item.name}</h5>
                                  </div>
                                </Link>
                              </div>
                            ))}
                        </Slider>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          </div>
        )}
    </div>
  )
}

export default DetailNews

const Headings = (props) => {

  const { content } = props

  const headings = Array.from(new DOMParser().parseFromString(content, "text/html").querySelectorAll("h1, h2, h3"))
  return (
    headings.length !== 0 && (
      <div className="d-flex justify-content-center tableOfContent">
        <ul className='list-unstyled mb-0'>
          <h6 className="text-center"><b>Mục lục</b></h6>
          {headings.map((heading, index) => (
            <li key={index} className={heading.tagName === "H2" ? "itemContent" : "itemContentChild"}>
              <LinkTo
                className="text-primary  cursor-pointer"
                to={`heading-${index + 1}`}
                spy={true}
                smooth={true}
                duration={500}
                offset={0}
                activeClass="active"
              >{heading.textContent}</LinkTo>
            </li>
          ))}
        </ul>
      </div>
    )
  )
}
