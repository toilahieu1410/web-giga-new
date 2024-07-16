import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from "react-helmet"
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useHistory, useLocation } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import Slider from "react-slick"
import { settingsCompare } from '../../utilities/settingSlide'
import { getProductDetail, getListProduct } from '../../redux/product/action'
import { postCart } from '../../redux/order/action'
import { checkNumber, checkImage } from '../../utilities/checkNumber'
import { addressStore } from '../../assets/constant/constant'
import { addCartNotUserFunc } from '../../utilities/orderNotUser'
import { faAddressCard, faStoreAlt, faShieldAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonGroup, Button, Input, Modal, ModalBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import Comment from './comment'
import KhuyenMai from './khuyenMai'
import Price from './price'
import Cauhoi from './cauhoi'
import Error404 from '../layout/error404'
import LoadingHome from '../notification/loadingHome'
import LikeShareFacebook from '../layout/likeShareFacebook'
import NoImage from '../../assets/imgs/no-image.png'
import LogoStar from '../../assets/imgs/icon-header/star.svg'
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import LoadingComment from '../notification/loadingComment'
import Loading from '../notification/loading'
import { dataImageRight } from '../../utilities/footerData'
import logoCart from '../../assets/imgs/icon-header/cart.svg'

const page = 1
const perPage = 20
const sort = {}

const Productdetail = (props) => {

  const dispatch = useDispatch()

  const { categorySlug, slug } = useParams()
  const history = useHistory()
  const dataHref = useLocation()

  const { token } = props

  const productDetail = useSelector((store) => store.product.productDetail)
  const listProduct = useSelector((store) => store.product.listProduct)
  const countComment = useSelector((store) => store.comment.countComment)

  const [nav1, setNav1] = useState()
  const [nav2, setNav2] = useState()

  const [filter, setFilter] = useState()
  const [modalAddress, setModalAddress] = useState(false)
  const [showLess, setShowLess] = useState(true)
  const [store, setStore] = useState('Hà Nội')
  const [storeAddress, setStoreAddress] = useState(null)
  const [newItem, setNewItem] = useState('')
  const [qty, setQty] = useState(1)
  const [width, setWidth] = useState(window.innerWidth)
  const [BasicLineTab, setBasicLineTab] = useState(1)

  const toggleModalAddress = () => setModalAddress(!modalAddress)

  const useViewPort = () => {
    useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth)
      window.addEventListener("resize", handleWindowResize)
    }, [])
    return { width }
  }

  useEffect(() => {
    const dataProduct = productDetail.vesion_detail && productDetail.vesion_detail.filter(item => item.stock != 0)
    if (dataProduct == undefined || dataProduct.length >= 0) {
      setFilter(productDetail.vesion_detail && productDetail.vesion_detail[0])
      setNewItem(dataProduct)
    }
    else {
      setNewItem(null)
      setFilter('')
    }
  }, [productDetail])

  useEffect(() => {
    if (newItem) {
      setFilter(newItem[0])
    }
  }, [newItem])

  useEffect(() => {
    const params = {
      page: page,
      perPage: perPage,
      sort: sort
    }
    if (productDetail.categorySlug && productDetail.subCategorySlug && productDetail.chidrenCategorySlug) {
      const data = { type: 'chidrenCategorySlug', slug: productDetail.chidrenCategorySlug }
      Object.assign(params, data)
      dispatch(getListProduct(params))
    }
    if (productDetail.categorySlug && productDetail.subCategorySlug && !productDetail.chidrenCategorySlug) {
      const data = { type: 'subCategorySlug', slug: productDetail.subCategorySlug }
      Object.assign(params, data)
      dispatch(getListProduct(params))
    }
    if (productDetail.categorySlug && !productDetail.subCategorySlug && !productDetail.chidrenCategorySlug) {
      const data = { type: 'categorySlug', slug: productDetail.categorySlug }
      Object.assign(params, data)
      dispatch(getListProduct(params))
    }
  }, [productDetail, page, perPage, sort])

  useEffect(() => {
    window.scrollTo(0, 0)
    const params = {
      slug: slug
    }
    dispatch(getProductDetail(params))
    // return () => {
    //   dispatch({ type: "CLEAR_DATA" })
    // }
  }, [slug])

  useEffect(() => {
    const address = addressStore.find(item => item.city == store)
    setStoreAddress(address)
  }, [store])

  const BannerRight = 'https://wp.alithemes.com/html/ecom/demo/assets/imgs/page/homepage1/bg-topsell.png'

  const moreButton = {
    display: "-webkit-box",
    WebkitLineClamp: 8,
    textOverflow: "ellipsis",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    maxHeight: 595,
  }

  const viewPort = useViewPort();
  const isMobile = viewPort.width <= 992

  const subQty = () => {
    if (qty > 1) setQty(qty - 1)
  }

  const addQty = () => {
    setQty(qty + 1)
  }

  const NextArrow = (props) => {
    const { className, onClick } = props
    return (
      <div className={className} onClick={onClick}>
      </div>
    )
  }

  const PrevArrow = (props) => {
    const { className, onClick } = props
    return (
      <div className={className} onClick={onClick}>
      </div>
    )
  }

  const handleShowImage = (imageName) => {
    const imageIndex = productDetail.images.indexOf(imageName)
    nav1.slickGoTo(imageIndex)
  }


  if (productDetail && productDetail.post < 200) {
    return (
      <div>
        {
          ReactHtmlParser(productDetail && productDetail.post)
        }
      </div>
    )
  }

  const onClickButton = (item) => {
    setFilter(item)
  }

  const addCart = () => {
    const body = {
      productId: productDetail._id,
      versionDetail: filter != null ? filter : productDetail.vesion_detail[0]
    }
    dispatch(postCart(body))
  }

  const addCartNotUser = () => {
    const body = {
      productId: productDetail._id,
      qty: 1,
      versionDetail: filter != null ? filter : productDetail.vesion_detail[0]
    }
    addCartNotUserFunc(body)
  }

  const onBuyNow = () => {
    const state = {
      id: productDetail._id,
      thumb: productDetail.thumb,
      qty: 1,
      name: productDetail.name,
      slug: productDetail.slug,
      bao_hanh: productDetail.bao_hanh,
      thong_tin_bao_hanh: productDetail.thong_tin_bao_hanh,
      voucher: productDetail.voucher,
      flashSale_status: productDetail.flashSale_status,
      flashSale_title: productDetail.flashSale_title,
      flashSale_end_date: productDetail.flashSale_end_date
    }
    if (token && (token.type === 'erp' || token.type === 'vip')) {
      if (filter == null) {
        history.push({
          pathname: `/mua-ngay-erp/${productDetail.slug}`, state: { ...state, version_detail: productDetail.vesion_detail[0] }
        })
      } else {
        history.push({
          pathname: `/mua-ngay-erp/${productDetail.slug}`, state: { ...state, version_detail: filter }
        })
      }
    } else {
      if (filter == null) {
        history.push({
          pathname: `/mua-ngay/${productDetail.slug}`, state: { ...state, version_detail: productDetail.vesion_detail[0] }
        })
      } else {
        history.push({
          pathname: `/mua-ngay/${productDetail.slug}`, state: { ...state, version_detail: filter }
        })
      }
    }
  }

  if (nav1 === null || nav2 === null) {
    return null;
  }

  if (productDetail.name == undefined) {
    return <LoadingHome />
  }

  if (productDetail.categorySlug && (productDetail.categorySlug != categorySlug)) {
    return <Error404 />
  }

  if (productDetail._id && listProduct.data) {
    listProduct.data = listProduct.data.filter(item => item._id != productDetail._id)
  }

  const imageSrcSet = productDetail && productDetail.images.map((image, index) => ({

    src: checkImage(image),
    setting: `${3}00w`
  }))
    .map(item => `${item.src} ${item.setting}`).join(', ')

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "Website",
    "item": {
      "@id": productDetail && productDetail._id,
      "name": productDetail && productDetail.name,
      "image": productDetail && productDetail.image,
    },
    "description": productDetail && productDetail.description,
    "sku": productDetail && productDetail.sku,
    "price": productDetail && productDetail.price,
    "offers": {
      "@type": "Offer",
      "price": productDetail && productDetail.price,
    }
  }

  return (
    <div>
      <Helmet>
        <title>{productDetail.gioi_thieu}</title>
        <meta property="description" name="description" content={productDetail.description} />
        <script type="application/ld+json">
          {JSON.stringify(ldJson)}
        </script>
      </Helmet>
      {
        productDetail == null ? <LoadingHome /> : (
          <div className='product mt-4'>
            <div className='row'>
              <div className='col-md-12 d-flex pb-2 align-items-center'>
                <h1 className='fw-bold text-primary flex-1 mb-0'>{productDetail.name} <span className='d-inline-block' style={{ width: 50 }}></span></h1>
                <LikeShareFacebook dataHref={dataHref.pathname} />
              </div>
              <div className='col-md-12'>
                <div className='d-flex align-items-center justify-content-between'>
                  <div className='left-detail d-flex align-items-center'>
                    <span className='text-title'>by: {productDetail.brand}</span>
                    <div className='rating ms-3'>
                      <img src={LogoStar} />
                      <img src={LogoStar} />
                      <img src={LogoStar} />
                      <img src={LogoStar} />
                      <img src={LogoStar} />
                      &nbsp;<span className='fw-normal font-medium text-title'>({countComment} reviews)</span>
                    </div>
                    <div className='dashboard ms-4'>
                      <p className='text-primary'>Danh mục: <span className='text-title'>{productDetail.categoryTitle}</span></p>
                    </div>
                  </div>

                  <div className='float-right text-right'>
                    {
                      token ? (
                        <button type='button' disabled={(!filter || productDetail.in_stock <= 0 || productDetail.price <= 0) ? true : false} onClick={() => addCart()} className='btn bg-transparent rounded w-100'>
                          <img src={logoCart} width={25} className='mr-5' alt='logo-cart' />
                          <span className='text-primary fw-500'>Thêm giỏ hàng</span>
                        </button>
                      ) : (
                        !filter || productDetail.in_stock <= 0 || productDetail.price <= 0 ? (
                          ''
                        ) : (
                          <button type='button' disabled={(!filter || productDetail.in_stock <= 0 || productDetail.price <= 0) ? true : false} onClick={() => addCartNotUser()} className='btn bg-transparent rounded w-100'>
                            <img src={logoCart} width={25} className='mr-5' alt='logo-cart' />
                            <span className='text-primary fw-500'>Thêm giỏ hàng</span>
                          </button>
                        )
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className='line-middle border-top mt-3 mb-4'></div>
            <section className='row mt-3 section-1'>
              <div className='w-45'>
                <div className='product-slider w-100 position-relative'>
                  <div className='slider-child'>
                    <Slider
                      asNavFor={nav1}
                      autoplay={false}
                      ref={slider2 => (setNav2(slider2))}
                      slidesToShow={productDetail.images == undefined || productDetail.images.length >= 5 ? 5 : productDetail.images.length}
                      swipeToSlide={true}
                      focusOnSelect={true}
                      vertical={true}
                      arrows={false}
                      className="small-slick"
                      responsive={
                        [

                          {
                            breakpoint: 991,
                            settings: {
                              slidesToShow: productDetail.images == undefined || productDetail.images.length >= 4 ? 4 : productDetail.images.length,
                            }
                          },
                          {
                            breakpoint: 767,
                            settings: {
                              slidesToShow: productDetail.images == undefined || productDetail.images.length >= 3 ? 3 : productDetail.images.length,
                            }
                          },
                          {
                            breakpoint: 480,
                            settings: {
                              slidesToShow: productDetail.images == undefined || productDetail.images.length >= 3 ? 3 : productDetail.images.length,
                            }
                          },
                        ]
                      }
                    >
                      {
                        productDetail.images.map((element, index) => (
                          <div className='list-items-slider position-relative'>
                            <div className="item" key={index}>
                              <img alt='image' src={checkImage(element)} className='w-100' />
                            </div>
                          </div>
                        ))
                      }
                    </Slider>
                  </div>
                  <div className='slider-container'>
                    <Slider
                      asNavFor={nav2}
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
                        productDetail.images && productDetail.images.map((item, index) => (
                          <div key={index}
                            className='list-items-slider position-relative big-img-slider' >
                            <div className="item">
                              <InnerImageZoom
                                src={`${checkImage(item)}`}
                                zoomSrc={`${checkImage(item)}`}
                                zoomType="hover"
                                zoomScale={1.2}
                                zoomPreload={true}
                              />
                              {/* <img alt='image' src={checkImage(item)} className='w-100' /> */}
                            </div>
                          </div>
                        ))
                      }
                    </Slider>
                    {productDetail.in_stock <= 0 && (
                      <div className='image-hethang position-absolute '>
                        <p className='text-white fa-2x text-center'>Hàng đang về</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='w-55'>
                <div className='col-md-12'>
                  <div className='row'>
                    <div className='col-md-7'>
                      <div className='product-detail'>
                        <Price token={token} filter={filter} productDetail={productDetail} />
                        {/* <div className='w-100 d-flex align-items-center justify-content-center bg-giga p-2 mt-2 rounded'>
                    <FontAwesomeIcon icon={faShippingFast} className='text-white' />
                    <div className='mx-2 text-white text-uppercase'>
                      <p>Miễn phí vận chuyển đơn hàng {`>`} 2.000.000đ</p>
                    </div>
                  </div> */}
                        <div className='my-4 detailed-configuration'>
                          {
                            ReactHtmlParser(productDetail && productDetail.thong_so_ky_thuat)
                          }
                        </div>
                        <div>
                          {
                            (productDetail.in_stock > 0) && (
                              productDetail.vesion_detail.length > 1 && (
                                <label className='fw-normal my-2 text-primary'>Lựa chọn phiên bản: <span className='orange fw-500'>{filter && filter.name}</span> </label>
                              )
                            )
                          }
                        </div>
                        <div className='d-block'>
                          {
                            (productDetail.vesion_detail && productDetail.vesion_detail.length) > 1 && (
                              productDetail.vesion_detail.map((item, index) => (
                                <SetVersion item={item} filter={filter} newItem={newItem} onClickButton={onClickButton} index={index} handleShowImage={handleShowImage} />
                              ))
                            )
                          }
                        </div>
                        <div className='promotion-price'>
                          {
                            productDetail.chi_tiet_khuyen_mai && productDetail.voucher && (
                              <KhuyenMai chi_tiet_khuyen_mai={productDetail.chi_tiet_khuyen_mai} voucher={productDetail.voucher} brand={productDetail.brand} />
                            )
                          }
                          {productDetail.thong_tin_bao_hanh != null && (
                            <div className='warranty-title mb-2 mt-3'>
                              <div className='warranty-content d-flex align-items-start'>
                                <FontAwesomeIcon icon={faShieldAlt} className='float-left text-primary mr-10' style={{ fontSize: 18 }} />
                                <p className='d-flex' ><span className='text-primary fw-normal'>{productDetail.thong_tin_bao_hanh}</span></p>
                              </div>
                            </div>
                          )}

                          <div className='info-store mt-3'>
                            <a className='d-flex align-items-center cursor-pointer' onClick={toggleModalAddress}>
                              <FontAwesomeIcon icon={faStoreAlt} className='text-primary mr-10' style={{ fontSize: 16 }} />
                              <span className='text-primary fw-normal' >Xem địa chỉ có hàng</span>
                            </a>
                            <ModalAddress setStore={setStore} productDetail={productDetail} storeAddress={storeAddress} modalAddress={modalAddress} setModalAddress={setModalAddress} toggleModalAddress={toggleModalAddress} />
                          </div>
                          <div className=' d-none d-lg-block'>
                            <div className='product-action mt-4 d-flex '>
                              <div className='input-quantity d-flex align-items-center'>
                                <button className='btn btn-minus' onClick={(subQty)}><span>-</span></button>
                                <Input type='number' className='text-center' min={1} value={qty} onChange={() => setQty(qty)} />
                                <button className='btn btn-plus' onClick={addQty}><span>+</span></button>
                              </div>
                              {
                                (productDetail.in_stock <= 0 || productDetail.price <= 0) ? (
                                  <button type='button' className='btn  click-buy-now hoplongtech-btn-primary' disabled>
                                    <span className='mb-0 fw-500 text-white'>Liên hệ</span>
                                  </button>
                                ) : (
                                  <button type='button' className='btn click-buy-now' onClick={onBuyNow}>
                                    <span className='mb-0 fw-500'>Mua ngay</span>
                                  </button>
                                )
                              }
                            </div>
                          </div>

                          <div className='product-action-mobile d-flex mt-4 d-block d-lg-none'>
                            <div className='input-quantity d-flex align-items-center'>
                              <button className='btn btn-minus' onClick={(subQty)}><span>-</span></button>
                              <Input type='number' className='text-center' min={1} value={qty} onChange={() => setQty(qty)} />
                              <button className='btn btn-plus' onClick={addQty}><span>+</span></button>
                            </div>
                            {
                              (productDetail.in_stock <= 0 || productDetail.price <= 0) ? (
                                <button type='button' className='btn  click-buy-now hoplongtech-btn-primary rounded' disabled>
                                  <span className='mb-0 fw-500 text-white'>Liên hệ</span>
                                </button>
                              ) : (
                                <button type='button' className='btn click-buy-now rounded' onClick={onBuyNow}>
                                  <span className='mb-0 fw-500'>Mua ngay</span>
                                </button>
                              )
                            }
                          </div>

                          {/* <div className='text-content mt-4 d-flex justify-content-between align-items-end'>
                      <div className='d-block'>
                        <p className='text-primary mb-1'>Hãng:  <span className='text-title'>{productDetail.brand}</span></p>
                        <p className='text-primary mb-1'>Danh mục:  <span className='text-title'>{productDetail.categoryTitle}</span></p>
                        <p className='text-primary mb-1'>Tags:  <span className='text-title'></span></p>
                      </div>
                      <div className='d-block'>
                        <p className='text-primary mb-1'>Miễn phí vận chuyển</p>
                        <p className='text-primary mb-1'>với đơn hàng trên 2 triệu.</p>
                      </div>
                
                       <p>Gọi đặt mua <span className='text-primary'>0966.061.170</span> (7:30 - 22:00)</p> 
                    </div> */}
                        </div>
                      </div>
                    </div>
                    <div className='col-md-5'>
                      <div className='box-featured-product'>
                        <ul className='list-unstyled mb-0'>
                          {
                            dataImageRight.map(item => (
                              <li className='mb-4'>
                                <div key={item.id} className='d-flex align-items-center item-list'>
                                  <img src={item.image} style={{ width: 40 }} />
                                  <p className='ml-10'>
                                    <span className='d-block text-primary fw-bold'>{item.top}</span>
                                    <span className='d-block text-title '>{item.bottom}</span>
                                  </p>
                                </div>
                              </li>
                            ))
                          }

                        </ul>
                      </div>
                      <div className='box-sidebar-product position-relative'>
                        <img src={BannerRight} className="rounded" />
                        <div className='banner-content position-absolute top-0 w-100 text-center mt-4'>
                          <span className='text-no text-white'>No.9</span>
                          <h6 className='text-primary mt-3'>Sensitive Touch <br /> without fingerprint</h6>
                          <p className='mt-1 text-primary'>Smooth handle and accurate click</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </section>

            <section className='row mt-4 section-2'>
              {/* {isMobile &&
                (<div className='w-40 data-item-mobile'>
                  <ListDetail productDetail={productDetail} modal={modal} setModal={setModal} toggleModal={toggleModal} />
                </div>)} */}
              <div className='d-block mt-3'>
                <Nav className='border-tab border-bottom-0' tabs>
                  <NavItem className='cursor-pointer'>
                    <NavLink className={BasicLineTab === 1 ? 'active' : ''} onClick={() => setBasicLineTab(1)}>
                      Nội dung
                    </NavLink>
                  </NavItem>
                  <NavItem className='cursor-pointer'>
                    <NavLink className={BasicLineTab === 2 ? 'active' : ''} onClick={() => setBasicLineTab(2)}>
                      Cấu hình chi tiết
                    </NavLink>
                  </NavItem>
                  <NavItem className='cursor-pointer'>
                    <NavLink className={BasicLineTab === 3 ? 'active' : ''} onClick={() => setBasicLineTab(3)}>
                      Comment ({countComment})
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={BasicLineTab} className='mt-3'>
                  <TabPane tabId={1} className={BasicLineTab === 1 ? 'fade-in' : 'fade-out'} >
                    <Description productDetail={productDetail} moreButton={moreButton} showLess={showLess} setShowLess={setShowLess} />
                  </TabPane>
                  <TabPane tabId={2} className={BasicLineTab === 2 ? 'fade-in' : 'fade-out'}>
                    <Specification item={productDetail} />
                  </TabPane>
                  <TabPane tabId={3} className={BasicLineTab === 3 ? 'fade-in' : 'fade-out'}>
                    <Comment productId={productDetail._id} countComment={countComment} productSlug={productDetail.slug} />
                  </TabPane>
                </TabContent>
              </div>

              {/* {!isMobile && (
                <div className='w-40 data-item-desktop'>
                  <ListDetail productDetail={productDetail} modal={modal} setModal={setModal} toggleModal={toggleModal} />
                </div>
              )} */}

              {
                productDetail.questions && (
                  <Cauhoi questions={productDetail.questions} />
                )
              }
            </section>

            {
              (listProduct.data && listProduct.data.length > 0) ? (
                <section className='row mt-4 section-3'>
                  <div className='list-products'>
                    <div className='w-100 compare-products d-inline-block'>
                      <div className='compare-product-similar'>
                        <div className='compare-product-header'>
                          <h4 className='my-3 text-primary'>Sản phẩm tương tự</h4>
                        </div>

                        <div className='compare-list-products w-100 mt-3'>
                          <Slider
                            {...settingsCompare}
                            slidesToShow={listProduct.data == undefined || listProduct.data.length >= 5 ? 5 : listProduct.data.length}
                            responsive={
                              [
                                {
                                  breakpoint: 1199,
                                  settings: {
                                    slidesToShow: listProduct.data == undefined || listProduct.data.length >= 4 ? 4 : listProduct.data.length,
                                    slidesToScroll: 1,
                                    infinite: true,
                                  }
                                },
                                {
                                  breakpoint: 1024,
                                  settings: {
                                    slidesToShow: listProduct.data == undefined || listProduct.data.length >= 3 ? 3 : listProduct.data.length,
                                    slidesToScroll: 1,
                                    infinite: true,
                                  }
                                },
                                {
                                  breakpoint: 992,
                                  settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 1,
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
                                }
                              ]

                            }
                          >
                            {listProduct.data && listProduct.data.sort((a, b) => parseFloat(a.sort_order) - parseFloat(b.sort_order)).map((item, index) => (
                              <div className='compare-data position-relative ' key={item._id}>
                                {
                                  (item.price == 0 ? ('') : (<div className='percent-reduction ribbon-top-right d-inline-block'><span> - {100 - ((parseInt(item.price) / parseInt(item.original_price)) * 100).toFixed(0)}%</span></div>))
                                }
                                <div className='compare-list-item' key={index}>
                                  <Link className='compare-list-item-image' to={`/${item.categorySlug}/${item.slug}`}>
                                    {item.thumb === null ? (
                                      <img className='w-100 h-100' src={NoImage} alt={item.name} />
                                    ) : (
                                      <img className='w-100 h-100' src={checkImage(item.thumb)} alt={item.name} />
                                    )}

                                  </Link>
                                  <div className='compare-list-item-info mt-1'>
                                    <p className="text-title text-brand fw-normal">{item.brand}</p>
                                    <Link to={`/${item.categorySlug}/${item.slug}`}>
                                      <h6 className='text-primary'>{item.name}</h6>
                                    </Link>

                                    <p><span className='text-primary'>{item.price == 0 || item.price == item.original_price ? 'Giá liên hệ' : checkNumber(item.price)} </span>&nbsp;&nbsp;<span className='text-decoration-line-through text-title'>{item.price == item.original_price ? '' : checkNumber(item.original_price)} </span></p>
                                    <div className="button-add-cart my-3">
                                      <Link to={'/don-hang/gio-hang'} className='btn add-cart text-primary'>Thêm giỏ hàng</Link>
                                    </div>
                                    <div className='specifications'>
                                      {
                                        ReactHtmlParser(item.thong_so_ky_thuat)
                                      }
                                    </div>
                                  </div>
                                </div>

                              </div>
                            ))}
                          </Slider>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ) : (
                <Loading />
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default Productdetail

const SliderChild = (props) => {
  const { images } = props

  const [state, setState] = useState({ nav3: null, nav4: null })

  const slider3 = useRef()
  const slider4 = useRef()

  const { nav3, nav4 } = state

  useEffect(() => {
    setState({
      nav3: slider3.current,
      nav4: slider4.current
    })
  }, [])

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{ style, display: "block", }}
        onClick={onClick}
      />
    )
  }

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{ style, display: "block" }}
        onClick={onClick}
      />
    )
  }

  return (
    <>
      <div className='slider-container' style={{ margin: '0 auto' }}>
        <Slider
          asNavFor={nav4}
          autoplay={false}
          autoplaySpeed={3000}
          arrows={true}
          infinite={true}
          slidesToShow={1}
          slidesToScroll={1}
          variableWidth={false}
          ref={slider => (slider3.current = slider)}
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
        >
          {
            images.map((item, index) => (
              <div key={index} className='list-items-slider position-relative ' >
                <div className="item-child">
                  <img alt='image' src={checkImage(item)} className='w-100' />
                </div>
              </div>
            ))
          }
        </Slider>
      </div>

      <div className='slider-child-modal d-flex mt-3'>
        <div className='slider-child' style={{ margin: '0 auto' }}>
          <Slider
            asNavFor={nav3}
            autoplay={false}
            ref={slider => (slider4.current = slider)}
            slidesToShow={images == undefined || images.length >= 6 ? 6 : images.length}
            slidesToScroll={1}
            swipeToSlide={true}
            focusOnSelect={true}
            className="small-slick"
            responsive={
              [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: images == undefined || images.length >= 8 ? 8 : images.length,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: images == undefined || images.length >= 5 ? 5 : images.length,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: images == undefined || images.length >= 4 ? 4 : images.length,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: images == undefined || images.length >= 3 ? 3 : images.length,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 360,
                  settings: {
                    slidesToShow: images == undefined || images.length >= 2 ? 2 : images.length,
                    slidesToScroll: 1
                  }
                },
              ]
            }
          >
            {
              images.map((element, index) => (
                <div className='list-items-slider position-relative'>
                  <div className="item" key={index}>
                    <img alt='image' src={checkImage(element)} className='w-100' />
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

const SetVersion = (props) => {

  const { item, filter, onClickButton, newItem, index, handleShowImage } = props

  return (
    <div className=' d-inline-block my-1'>
      <div className='w-100 list-products-price'>
        <ButtonGroup className='w-100 '>
          {
            filter != null && (
              item.stock == 0 ? (
                <div>
                  <Button type='button' className='radio-version-giga mr-5 p-0 ' title='Hết hàng'>
                    <div className='choose-radio-button ' id='tooltipStock'>
                      <div className='radio'>
                        <label className='choose-product disabled'>
                          <div className='choose-product-item d-flex'>
                            {/* <Input type='radio' name='radio' className='m-0' defaultChecked={false} /> */}
                            <h6 className='choose-color mb-0'>{item.name}</h6>
                          </div>
                        </label>
                      </div>
                    </div>
                  </Button>
                </div>
              ) : (
                <Button type='button'
                  onClick={() => {
                    onClickButton(item)
                    if (item.image && item.image != '') {
                      handleShowImage(item.image)
                    }
                  }}
                  className={((item.name == filter.name)) ? 'radio-version-giga active  mr-5 p-0' : 'radio-version-giga mr-5 p-0'}>
                  <div className='choose-radio-button'>
                    <div className='radio'>
                      <label className='choose-product'>
                        <div className='choose-product-item d-flex'>
                          {/* <Input type='radio' name='radio' className='m-0' defaultChecked={((item.stock == 0 || newItem == null ? undefined : item.name) == (newItem && newItem[0].name) || index == 0) ? true : false} /> */}
                          <h6 className='choose-color mb-0 '>{item.name}</h6>
                        </div>
                      </label>
                    </div>
                  </div>
                </Button>
              )
            )
          }
        </ButtonGroup>
      </div>
    </div>
  )
}

const Description = (props) => {

  const { productDetail, moreButton, showLess, setShowLess, className } = props

  return (
    <div className={`w-100 ${className}`}>
      <div className='list-product-left'>
        {
          productDetail.post ?
            <div className='product-content' >
              <div
                className={showLess ? 'detail-content' : 'detail-content-collapse'}
                style={showLess ? moreButton : null}>
                {
                  ReactHtmlParser(productDetail.post)
                }
              </div>
              <div className={showLess ? 'text-center button-action' : 'text-center button-action-collapse'}>
                <div className="bg-article"></div>
                <Button type='button' onClick={() => setShowLess(!showLess)} className='button-read hoplongtech-btn-transparent'>
                  <span>{showLess ? "Xem thêm" : "Thu gọn"}</span>
                </Button>
              </div>
            </div>
            :
            <div>
              <label>Nội dung đang được cập nhật</label>
            </div>
        }
      </div>

    </div>
  )
}

const Specification = (props) => {

  const { item, className } = props

  return (
    <div className={`specification ${className}`}>
      {
        ReactHtmlParser(item && item.cau_hinh_chi_tiet)
      }
    </div>
  )
}

const ModalAddress = (props) => {
  const { modalAddress, toggleModalAddress, storeAddress, setStore } = props
  return (
    <Modal isOpen={modalAddress} toggle={toggleModalAddress} size='xs' className='modal-detailed-configuration-map'>
      <ModalBody className='text-center'>
        <div className='warranty-information promotion-price'>
          <div className='warranty-detail'>
            <h6 className='text-uppercase text-center fw-900'><b>Xem địa chỉ cửa hàng</b></h6>
            <div className='position-relative'>
              <select
                className='form-control text-center'
                onChange={e => setStore(e.target.value)}>
                <option selected disabled > Tỉnh/Thành phố</option>
                {
                  addressStore.map((item, index) => (
                    <option key={index} defaultValue={item.city}><FontAwesomeIcon icon={faAddressCard} className=' mr-10 text-primary' />{item.city}</option>
                  ))
                }
              </select>
            </div>
            <div className='warranty-maps my-3 border-1'>
              <ul className='list-unstyled'>
                {
                  storeAddress && (
                    storeAddress.store.map((item, index) => (
                      <li className='d-block' key={index}>
                        <p>{item.address}</p>
                        <Link to={item.link} className='fw-bold'>Bản đồ đường đi</Link>
                      </li>
                    ))
                  )
                }
              </ul>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

const SliderVideo = (props) => {

  const { videoYoutube } = props
  const [state, setState] = useState({ nav3: null, nav4: null })

  const slider3 = useRef()
  const slider4 = useRef()

  const { nav3, nav4 } = state

  useEffect(() => {
    setState({
      nav3: slider3.current,
      nav4: slider4.current
    })
  }, [])

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{ style, display: "block", }}
        onClick={onClick}
      />
    )
  }

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{ style, display: "block" }}
        onClick={onClick}
      />
    )
  }

  return (
    <>
      <Slider
        asNavFor={nav4}
        autoplay={false}
        arrows={true}
        slidesToScroll={1}
        ref={slider => (slider3.current = slider)}
        nextArrow={<SampleNextArrow />}
        prevArrow={<SamplePrevArrow />}
      >
        {
          videoYoutube.split(";").map((item) => (
            <iframe allow="fullscreen;" width="100%" height='500' frameborder="0" src={`https://www.youtube.com/embed/${item}?autoplay=0&mute=0`}>
            </iframe>
          ))
        }
      </Slider>
    </>
  )
}