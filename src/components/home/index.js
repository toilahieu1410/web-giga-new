import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Carousel from './carousel'
import { Link, useLocation } from 'react-router-dom'
import { getBrand, getCarousel, getFlashSale, getProductHome } from '../../redux/home/action'
import { getCategory } from '../../redux/product/action'
import { getNewHome } from '../../redux/news/action'
import { checkNumber, checkImage, checkImageNews, checkImageGiga } from '../../utilities/checkNumber'
import ScrollAnimation from "react-animate-on-scroll"
import FlashSaleHome from './flashSaleHome'
import LoadingHome from '../notification/loadingHome'
import Loading from '../notification/loading'
import Slider from 'react-slick'
import { settingBrands, settingCategories, settingEvents, settingsHome } from '../../utilities/settingSlide'
import { Helmet } from 'react-helmet'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'
import { capitalizeFirstLetter } from '../../utilities/checkUppercaseFirstLetter'
import NoImage from '../../assets/imgs/no-image.png'
import IconDanhMuc from '../../assets/images/icon-footer/icon-03.png'
import IconLienHe from '../../assets/images/icon-footer/icon-05.png'

const today = (new Date()).getTime()

const HomePage = (props) => {

  const dispatch = useDispatch()

  const { token } = props

  const state = useLocation()

  const listBrand = useSelector((store) => store.home.listBrand)
  const listCarousel = useSelector((store) => store.home.listCarousel)
  const listProductHome = useSelector(store => store.home.listProductHome)
  const listCategory = useSelector((store) => store.product.listCategory)
  const flashSale = useSelector(store => store.home.flashSale)
  const listNewsHome = useSelector(store => store.news.listNewsHome)
  const dataTinMoi = listNewsHome.find(item => item.slug == 'tin-moi')

  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)

  useEffect(() => {
    dispatch(getCarousel())
    dispatch(getProductHome())
    dispatch(getFlashSale())
  }, [])

  useEffect(() => {
    const params = {
      page: page,
      perPage: 20
    }
    dispatch(getBrand(params))
  }, [page, perPage])

  useEffect(() => {
    dispatch(getCategory())
  }, [])

  useEffect(() => {
    dispatch(getNewHome())
  }, [])

  const CategoryMain = listCategory.filter(item => JSON.parse(item.title_type) == true)

  CategoryMain.sort((a, b) => a.sort_order - b.sort_order)

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "https://giga.vn",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "GIGA",
        "item": "https://giga.vn"
      }
    ],
    "url": "https://giga.vn",
    "logo": "https://giga.vn/static/media/logo-gigavn.b0b5e2d8be51c9d38e44.png",
    "hasMap": "https://www.google.com/maps/place/Giga+Digital/@21.0116597,105.8190738,17z/data=!3m1!4b1!4m5!3m4!1s0x3135ab70ef9c0da9:0x3115ff2b1e823b92!8m2!3d21.0116547!4d105.8212625?hl=vi-VN",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Đống Đa",
      "addressRegion": "Hà Nội",
      "postalCode": "100000",
      "streetAddress": "55 Thái Hà"
    },
    "sameAs": ["https://www.facebook.com/gigadigital.vn"]
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(ldJson)}
        </script>
      </Helmet>

      <div className='row homepage'>
        <div className='homepageColor'></div>
        {listCarousel == null ? (
          <LoadingHome />
        ) : (
          <div className='list-banner'>
            <Carousel listCarousel={listCarousel} />
            <div className='list-brand-logo position-relative'>
              <Slider
                {...settingBrands}
                slidesToShow={listBrand == undefined || listBrand.length >= 10 ? 10 : listBrand.length}
                responsive={
                  [
                    {
                      breakpoint: 1199,
                      settings: {
                        slidesToShow: listBrand == undefined || listBrand.length >= 8 ? 8 : listBrand.length,
                      }
                    },
                    {
                      breakpoint: 991,
                      settings: {
                        slidesToShow: listBrand == undefined || listBrand.length >= 2 ? 2 : listBrand.length,
                      }
                    },
                    {
                      breakpoint: 767,
                      settings: {
                        slidesToShow: listBrand == undefined || listBrand.length >= 4 ? 4 : listBrand.length,
                      }
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: listBrand == undefined || listBrand.length >= 3 ? 3 : listBrand.length,
                        infinite: true,

                      }
                    },
                    {
                      breakpoint: 400,
                      settings: {
                        slidesToShow: listBrand == undefined || listBrand.length >= 2 ? 2 : listBrand.length,
                      }
                    },
                  ]
                }
              >
                {listBrand &&
                  listBrand
                    .sort((a, b) => (parseFloat(a.sort_order)) - (parseFloat(b.sort_order)))
                    .map((item, index) => (
                      <Link to={`/hang/${item.title}`}>
                        <div key={index} className='list-brands-slider position-relative ' >
                          <div className="item">
                            <img alt='image' src={checkImage(item.image)} className='w-100' />
                          </div>
                        </div>
                      </Link>

                    ))}
              </Slider>
            </div>

            <div className='featured-category mt-5 d-none d-lg-block'>
              <h1 className='text-uppercase mb-1'>Danh mục nổi bật </h1>
              <div className='line-middle'></div>
              <div className='list-category '>
                {listCategory.length >= 18 ? (
                  <>
                    <aside>
                      {
                        listCategory.map(item => (
                          item.total_product > 0 && (
                            <div className='d-inline-block text-center mb-3 hide-992'>
                              <Link to={`/${item.slug}`}>
                                {
                                  item.icon == null ? (
                                    <i className={`fa-2x text-primary fa fa-check`} ></i>

                                  ) : (<img src={`data:image/svg+xml;utf8,${encodeURIComponent(item.icon)}`} />)
                                }
                                <p className='text-product'>{item.name}</p>
                                <p className='text-title'>{item.total_product} sản phẩm</p>
                              </Link>
                            </div>
                          )

                        ))
                      }
                    </aside>

                    <Slider
                      className='show-992'
                      {...settingCategories}
                      slidesToShow={listCategory == undefined || listCategory.length >= 9 ? 9 : listCategory.length}
                      responsive={
                        [
                          {
                            breakpoint: 1399,
                            settings: {
                              slidesToShow: listCategory.length == undefined || listCategory.length >= 8 ? 8 : listCategory.length,
                            }
                          },
                          {
                            breakpoint: 1200,
                            settings: {
                              slidesToShow: listCategory.length == undefined || listCategory.length >= 7 ? 7 : listCategory.length,
                            }
                          },
                        ]
                      }
                    >
                      {
                        listCategory.map(item => (
                          item.total_product > 0 && (
                            <div className='d-inline-block text-center mb-3 '>
                              <Link to={`/${item.slug}`}>
                                {
                                  item.icon == null ? (
                                    <i className={`fa-2x text-primary fa fa-check`} ></i>

                                  ) : (<img src={`data:image/svg+xml;utf8,${encodeURIComponent(item.icon)}`} />)
                                }
                                <p className='text-product'>{item.name}</p>
                                <p className='text-title'>{item.total_product} sản phẩm</p>
                              </Link>
                            </div>
                          )

                        ))
                      }
                    </Slider>
                  </>

                ) : (
                  <aside className='list-category-mobile '>
                    {
                      listCategory.map(item => (
                        item.total_product > 0 && (
                          <div className='d-inline-block text-center mb-3 '>
                            <Link to={`/${item.slug}`}>
                              {
                                item.icon == null ? (
                                  <i className={`fa-2x text-primary fa fa-check`} ></i>

                                ) : (<img src={`data:image/svg+xml;utf8,${encodeURIComponent(item.icon)}`} />)
                              }
                              <p className='text-product'>{item.name}</p>
                              <p className='text-title'>{item.total_product} sản phẩm</p>
                            </Link>
                          </div>
                        )
                      ))
                    }
                  </aside>
                )}

              </div>
            </div>
            <div className='featured-category-mobile d-block d-lg-none'>
              <div className='list-category-mobile'>
                <Link to={'/danh-muc'} className='list-link'>
                  <img alt='image' src={IconDanhMuc} width={50} />
                  <span className="nav__text mt-1">Danh mục</span>
                </Link>
                {/* <Link to={'/chi-nhanh/ha-noi'} className='list-link'>
                  <img alt='image' src={IconLienHe} width={50} />
                  <span className="nav__text mt-1">Liên hệ</span>
                </Link> */}
                {
                  CategoryMain && CategoryMain.map(item => (
                    <Link to={item.slug} className='list-link'>
                      <img src={`data:image/svg+xml;utf8,${encodeURIComponent(item.icon)}`} width="50" />
                      <span className="nav__text mt-1">{item.name}</span>
                    </Link>
                  ))
                }
              </div>
            </div>
            {/* {(flashSale && flashSale.show_homepage && today < flashSale.end_date) && (
              <FlashSaleHome flashSale={flashSale} />
            )} */}
            {/* <FlashSaleHome /> */}
            <div className='compare-list-products p-0 position-relative'>
              {
                listProductHome == null ? (
                  <Loading />
                ) : (
                  listProductHome.map((item, index) => (
                    item.publish === true ? (
                      <div key={index}>
                        {
                          item.product.length > 0 && (
                            <div className='compare-title'>
                              <div className='mt-4'>
                                <div className='row'>
                                  <div className='col-md-12'>
                                    <div className='image-banner'>
                                      {
                                        item.link_image ? (
                                          <Link to={`/${item.link_image}`}>
                                            <img
                                              height={250}
                                              src={checkImage(item.images)}
                                              alt={item.name}
                                              className='w-100 h-100'
                                            />
                                          </Link>
                                        ) : (
                                          typeof item.images === 'object' ? (
                                            <div className='row'>
                                              {
                                                item.images && item.images.map((ele, index) => (

                                                  <div className='list-images-banner' style={{ width: item.images.length === 2 ? '50%' : item.images.length === 3 && '33%' }}>
                                                    <img height={270} width={450} src={checkImage(ele)} alt={ele} />
                                                  </div>
                                                ))
                                              }

                                            </div>

                                          ) : (
                                            <img

                                              height={270}
                                              src={checkImage(item.images)}
                                              alt={item.name}
                                              className='w-100 h-100'
                                            />
                                          )

                                        )
                                      }
                                    </div>

                                  </div>
                                </div>


                              </div>

                              <div className='d-flex align-items-center'>
                              </div>
                            </div>
                          )
                        }
                        <div className='data-item-desktop'>

                          {item.product.length === 0 ? ('') : (
                            <div className='d-flex p-3 list-category-products'>
                              <div className=' list-sidebar mr-10'>
                                <Link to={`/${item.slug}`}>
                                  <h3 className='text-primary'>{item.name}</h3>
                                </Link>
                                <div className='list-subCategory'>
                                  {item.subCategory && item.subCategory.map((ele, index) => (
                                    <Link to={`/${ele.slug}`} className=''>
                                      <div className='compare-header-title-child'>
                                        <p className=' mb-0 small-text text-primary'><i className='fa fa-caret-right mr-5'></i><span>{capitalizeFirstLetter(ele.name)}</span></p>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>

                              <ScrollAnimation
                                offset={1000}
                                animateIn='slideInUp'
                                duration={0.6}
                                delay={-500}
                                animateOut='slideInUp'
                                animateOnce={true}
                              >
                                {item.product && item.product.slice(0, 4).map((ele, index) => (
                                  <ItemProducts ele={ele} index={index} token={token} />
                                ))}

                              </ScrollAnimation>
                            </div>
                          )}
                        </div>
                        <div className='data-item-mobile'>

                          {item.product.length < 2 ? (
                            item.product && item.product.map((ele, index) => (
                              <ItemProducts productLength={item.product.length} ele={ele} index={index} token={token} listProductHome={listProductHome} />
                            ))
                          ) : (
                            <Slider
                              {...settingsHome}
                              slidesToShow={item.data == undefined || item.data.length >= 2 ? 2 : item.data.length}
                              responsive={
                                [

                                  {
                                    breakpoint: 480,
                                    settings: {
                                      slidesToShow: item.data == undefined || item.data.length >= 2 ? 2 : item.data.length,
                                      slidesToScroll: 1,
                                    }
                                  }
                                ]

                              }
                            >
                              {item.product && item.product.map((ele, index) => (
                                <ItemProducts ele={ele} index={index} token={token} listProductHome={listProductHome} />
                              ))}
                            </Slider>
                          )}

                        </div>

                      </div>
                    ) : ('')

                  ))
                )
              }

              <div className='lastest-news-events mt-5'>
                <div className='title'>
                  <h2 className='text-primary'>Tin Tức & Sự kiện</h2>
                  <p className='text-title'>Blog, diễn đàn</p>
                </div>
                <div className='line-middle'></div>

                {
                  (dataTinMoi && dataTinMoi.news) && (
                    <div className='content-slider mt-5'>
                      <Slider
                        {...settingEvents}
                        slidesToShow={dataTinMoi.news.length >= 4 ? 4 : dataTinMoi.news.length}
                      >
                        {dataTinMoi.news && dataTinMoi.news.map((ele, index) => (
                          <ItemListEvents ele={ele} index={index} />
                        ))}
                      </Slider>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default HomePage

const ItemProducts = (props) => {

  const { productLength, ele, index, token } = props


  return (
    <div className={productLength < 2 ? 'compare-list-detail-one_product flex-4' : 'compare-list-detail flex-4'}>
      <div key={index} className='compare-list-item' >
        {
          (ele.price == 0 || 100 - ((parseInt(ele.price) / parseInt(ele.original_price)) * 100).toFixed(0) == 0 ? ('') : (
            <div className='percent-reduction ribbon-top-right d-inline-block'>
              <span>-  {100 - ((parseInt(ele.price) / parseInt(ele.original_price)) * 100).toFixed(0)}%</span>
            </div>
          ))
        }
        <div className='compare-list-item-image'>
          <Link key={index} to={`/${ele.categorySlug}/${ele.slug}`}>
            {ele.thumb === null ? (
              <img
                src={NoImage}
                alt={ele.name}
                className='w-100 h-100'
                width={450}
                height={450}
              />
            ) : (
              <img
                src={checkImage(ele.thumb)}
                alt={ele.name}
                className='w-100 h-100'
                width={450}
                height={450}
              />
            )}
          </Link>


        </div>
        <div className='compare-list-item-info mt-3 '>
          <p className='text-title mb-2'>{ele.brand}</p>
          <h3 >  <Link to={`/${ele.categorySlug}/${ele.slug}`} className='text-primary'>{ele.name}</Link></h3>
          {ele.price == ele.original_price ? (
            <h4>
              {(token && (token.type === 'erp' || token.type === 'vip')) ? (
                <span className='text-red'>
                  <b style={{ fontWeight: 500 }}>
                    {
                      ele.vesion_detail[0] && (
                        (!ele.vesion_detail[0].erp_price || ele.vesion_detail[0].erp_price == 0) ? 'Giá liên hệ' : checkNumber(ele.vesion_detail[0].erp_price)
                      )
                    }
                  </b>
                </span>
              ) : (
                <span className='text-red'> <b style={{ fontWeight: 500 }}>{(ele.price) == 0 ? 'Giá liên hệ' : checkNumber(ele.price)}</b></span>
              )}

            </h4>
          ) : (
            (token && (token.type === 'erp' || token.type === 'vip')) ? (
              ele.vesion_detail.length > 0 && (
                <h4><span className='text-red'><b style={{ fontWeight: 500 }}>{(ele.vesion_detail[0].erp_price) <= 0 && ele.vesion_detail[0].stock <= 0 ? 'Giá liên hệ' : (ele.vesion_detail[0].erp_price != undefined) ? checkNumber(parseInt(ele.vesion_detail[0].erp_price)) : checkNumber(parseInt(ele.price))} </b>
                </span><span className='text-decoration-line-through text-title'>{checkNumber(ele.original_price)} </span>
                </h4>
              )
            ) : (
              <h4><span className='text-red'><b style={{ fontWeight: 500 }}>{(ele.price) == 0 ? 'Giá liên hệ' : checkNumber(ele.price)} </b>
              </span><span className='text-decoration-line-through text-title'>{checkNumber(ele.original_price)} </span>
              </h4>
            )
          )
          }
          <div className='specifications'>
            {
              ReactHtmlParser(ele.thong_so_ky_thuat)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const ItemListEvents = (props) => {

  const { ele, index } = props

  return (
    <div className='item-events'>
      <div className='item-events-data-image'>
        <Link className='item-events-data' to={`/tin-tuc/${ele.categorySlug}/${ele.slug}`}>
          <img
            src={checkImageNews(ele.thumb)}
            alt={ele.slug}
            className='w-100 h-100'
            width={300}
            height={300}
          />
        </Link>

      </div>
      <div className='item-events-data-info mt-3 text-left'>
        <p className='text-primary'><i className='fa fa-circle mr-5'></i>{ele.categoryName}</p>
        <h4 className='mt-2 d-inline-block text-primary w-100'>
          <Link className='' to={`/tin-tuc/${ele.categorySlug}/${ele.slug}`}>{ele.name}</Link>
        </h4>
        <div className='mt-3 d-flex align-items-center'>
          <span className='text-title mr-5'><i className='fa fa-clock'></i></span>
          <span className='text-title '>{moment(ele.createdAt).fromNow()}</span>
        </div>
      </div>
    </div>
  )
}