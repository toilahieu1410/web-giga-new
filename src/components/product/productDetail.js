import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from "react-helmet"
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useHistory, useLocation } from 'react-router-dom'
import { scroller, Link as LinkTo, Element } from 'react-scroll'
import ReactHtmlParser from 'react-html-parser'
import Slider from "react-slick"
import { settingsCompare } from '../../utilities/settingSlide'
import { getProductDetail, getListProduct } from '../../redux/product/action'
import { postCart } from '../../redux/order/action'
import { checkNumber, checkImage } from '../../utilities/checkNumber'
import { addressStore } from '../../assets/constant/constant'
import { addCartNotUserFunc } from '../../utilities/orderNotUser'
import { faAddressCard, faStoreAlt, faShieldAlt, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonGroup, Button, Input, Modal, ModalBody, Nav, NavItem, NavLink, TabContent, TabPane, ModalHeader } from 'reactstrap'
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
import Loading from '../notification/loading'
import { dataImageRight } from '../../utilities/footerData'
import logoCart from '../../assets/imgs/icon-header/cart.svg'
import logo from '../../assets/imgs/logo-gigavn.png'

const page = 1
const perPage = 20
const sort = {}

const Productdetail = (props) => {

  const dispatch = useDispatch()

  const { categorySlug, slug } = useParams()
  const history = useHistory()
  const dataHref = useLocation()
  const listDetailsRef = useRef(null)

  const { token } = props

  const productDetail = useSelector((store) => store.product.productDetail)
  const listProduct = useSelector((store) => store.product.listProduct)
  const countComment = useSelector((store) => store.comment.countComment)

  const [nav1, setNav1] = useState()
  const [nav2, setNav2] = useState()

  const [filter, setFilter] = useState(null)
  const [modalAddress, setModalAddress] = useState(false)
  const [modalSlider, setModalSlider] = useState(false)
  const [showLess, setShowLess] = useState(true)
  const [store, setStore] = useState('Hà Nội')
  const [storeAddress, setStoreAddress] = useState(null)
  const [newItem, setNewItem] = useState('')
  const [qty, setQty] = useState(1)
  const [width, setWidth] = useState(window.innerWidth)
  const [BasicLineTab, setBasicLineTab] = useState(1)
  const [showFeature, setShowFeature] = useState(true)
  const [stickySlider, setStickySlider] = useState('relative')
  const [isFixedHeader, setIsFixedHeader] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const toggleModalAddress = () => setModalAddress(!modalAddress)
  const toggleModalSlider = () => setModalSlider(!modalSlider)

  // scroll Slider sticky
  const handleScroll = () => {
    if (window.scrollY > 200 && window.scrollY <= 600) {
      setStickySlider('fixed')
    } else if (window.scrollY > 600 && window.scrollY <= 1500) {
      setStickySlider('absolute')
    } else {
      setStickySlider('relative')
    }
  }

  //scroll listDetails

  const scrollToLeft = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1)
      scrollToTab(activeTab - 1)
    }
  }

  const scrollToRight = () => {
    if (activeTab < listDetailsRef.current?.children.length - 1) {
      setActiveTab(activeTab + 1)
      scrollToTab(activeTab + 1)
    }
  }

  const scrollToTab = (index) => {
    scroller.scrollTo(`section${index + 1}`, {
      duration: 500,
      smooth: true
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (listDetailsRef.current) {
        const { top } = listDetailsRef.current.getBoundingClientRect()
        if (top <= 0) {
          setIsFixedHeader(true)
        } else {
          setIsFixedHeader(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  const useViewPort = () => {
    useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth)
      window.addEventListener("resize", handleWindowResize)
    }, [])
    return { width }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
      slug: slug,
      
    }
    dispatch(getProductDetail(params))
    // return () => {
    //   dispatch({ type: "CLEAR_DATA" })
    // }
  }, [ slug])


  useEffect(() => {
    const address = addressStore.find(item => item.city == store)
    setStoreAddress(address)
  }, [store])



  const moreButton = {
    display: "-webkit-box",
    WebkitLineClamp: 8,
    textOverflow: "ellipsis",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    maxHeight: 595,
  }

  const viewPort = useViewPort()
  const isMobile = viewPort.width <= 992


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
    return null
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

  const filterImages = productDetail.images.sort((a, b) => {
    const indexA = productDetail.vesion_detail.findIndex(element => element.image === a)
    const indexB = productDetail.vesion_detail.findIndex(element => element.image === b)

    if (indexA === -1 && indexB === -1) {
      return 0 // Nếu cả hai đều không tìm thấy, giữ nguyên thứ tự
    }

    if (indexA === -1) {
      return 1 // Nếu chỉ a không tìm thấy, đặt a sau
    }

    if (indexB === -1) {
      return -1 // Nếu chỉ b không tìm thấy, đặt b sau
    }

    return indexA - indexB
  })


  // const imagesToDisplay = filterImages.length > 1 ? filterImages : productDetail.images

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
      <div>

      </div>
      {
        productDetail == undefined ? <LoadingHome /> : (
          <div className='product mt-4'>
            <section className='row mt-3 section-1'>
              <div className='col-md-8 position-relative'>
                <div className={stickySlider === 'relative' ? 'product-slider w-100' : stickySlider === 'fixed' ? 'product-sticky-slider' : 'product-absolute-slider'} style={{ position: stickySlider }}>
                  <div className='slider-container '>
                    <Slider
                      draggable={false}
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
                        filterImages && filterImages.map((item, index) => (
                          <div key={index}
                            className='list-items-slider position-relative big-img-slider'
                            onClick={() => toggleModalSlider()}
                          >
                            <div className="item">
                              <img alt='image' src={checkImage(item)} className='w-100' />
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
                  <div className='slider-child d-flex mt-3 flex-column'>
                    <Slider
                      asNavFor={nav1}
                      autoplay={false}
                      infinite={true}
                      ref={slider2 => (setNav2(slider2))}
                      slidesToShow={filterImages == undefined || filterImages.length >= 6 ? 6 : filterImages.length}
                      swipeToSlide={true}
                      focusOnSelect={true}
                      slidesToScroll={1}
                      className="small-slick"
                      responsive={
                        [
                          {
                            breakpoint: 1199,
                            settings: {
                              slidesToShow: filterImages == undefined || filterImages.length >= 5 ? 5 : filterImages.length,
                            }
                          },
                          {
                            breakpoint: 991,
                            settings: {
                              slidesToShow: filterImages == undefined || filterImages.length >= 2 ? 2 : filterImages.length,
                            }
                          },
                          {
                            breakpoint: 767,
                            settings: {
                              slidesToShow: filterImages == undefined || filterImages.length >= 4 ? 4 : filterImages.length,
                            }
                          },
                          {
                            breakpoint: 480,
                            settings: {
                              slidesToShow: filterImages == undefined || filterImages.length >= 3 ? 3 : filterImages.length,
                              infinite: true,

                            }
                          },
                          {
                            breakpoint: 400,
                            settings: {
                              slidesToShow: filterImages == undefined || filterImages.length >= 2 ? 2 : filterImages.length,
                            }
                          },
                        ]
                      }
                    >

                      {
                        filterImages.map((element, index) => (
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
              </div>

              <ModalSlider productDetail={productDetail} filterImages={filterImages} modalSlider={modalSlider} toggleModalSlider={toggleModalSlider} NextArrow={NextArrow} PrevArrow={PrevArrow} />
              <div className='col-md-4'>
                <div className='row'>
                  <div className='col-md-12  pb-2 align-items-center'>
                    <h1 className='fw-bold text-primary flex-1 mb-3'>{productDetail.name}</h1>
                    <div className='d-flex align-items-center justify-content-between'>

                      <div className='rating'>
                        <img src={LogoStar} width={20} />
                        <img src={LogoStar} width={20} />
                        <img src={LogoStar} width={20} />
                        <img src={LogoStar} width={20} />
                        <img src={LogoStar} width={20} />
                        &nbsp;&nbsp;<span className='fw-normal font-medium text-title'>({countComment} reviews)</span>
                      </div>

                      <LikeShareFacebook
                        dataHref={dataHref.pathname}
                        name={productDetail.name}
                        description={productDetail.description}
                        thumb={productDetail.thumb}
                      />
                    </div>
                    <div className='product-detail'>

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

                        {/* <div className='col-md-5'>
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
  </div> */}

                      </div>
                    </div>
                    <div className='main-feature mt-4 position-relative'>
                      <div className='d-flex align-items-center justify-content-between'>
                        <h6 className=''>Các tính năng chính</h6>
                        <button type='button' className={!showFeature ? 'more-btn border-0 bg-transparent' : 'more-btn border-0 bg-transparent show'} onClick={() => setShowFeature(!showFeature)}>
                          mở rộng
                        </button>
                      </div>
                      <div className={showFeature ? 'feature-content show' : 'feature-content'}>
                        <div className='feature-list'>
                          {
                            ReactHtmlParser(productDetail && productDetail.thong_so_ky_thuat)
                          }
                        </div>
                      </div>
                      <div className={showFeature === true ? 'list-supports my-4' : 'list-supports mb-4'} >
                        <ul className='list-unstyled mb-0'>
                          {
                            dataImageRight.map(item => (
                              <li className=''>
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

                      <div className='list-address-available mb-4'>
                        {productDetail.thong_tin_bao_hanh != null && (
                          <div className='warranty-title mb-3 pl-10'>
                            <div className='warranty-content d-flex align-items-start'>
                              <FontAwesomeIcon icon={faShieldAlt} className='float-left text-primary mr-10' style={{ fontSize: 18 }} />
                              <p className='d-flex' ><span className='text-primary fw-normal'>{productDetail.thong_tin_bao_hanh}</span></p>
                            </div>
                          </div>
                        )}
                        <div className='info-store'>
                          <a className='d-flex align-items-center cursor-pointer' onClick={toggleModalAddress}>
                            <FontAwesomeIcon icon={faStoreAlt} className='text-primary mr-10' style={{ fontSize: 16 }} />
                            <span className='text-primary fw-normal' >Xem địa chỉ có hàng</span>
                          </a>
                          <ModalAddress setStore={setStore} productDetail={productDetail} storeAddress={storeAddress} modalAddress={modalAddress} setModalAddress={setModalAddress} toggleModalAddress={toggleModalAddress} />
                        </div>
                      </div>
                      <div className='main-box-price'>
                        <ul className='list-unstyled my-3'>
                          <li>
                            <Price token={token} filter={filter} productDetail={productDetail} />
                          </li>
                        </ul>

                      </div>
                      <div className={`mt-3 buy`}>
                        <div className='d-flex align-items-center justify-content-between'>
                          <h5>Tổng cộng</h5>
                          <p className='text-price fw-500 text-red'><span className="fw-bold"> {filter && filter.price ? ((filter.price === 0 || productDetail.price === 0) ? 'Giá liên hệ' : checkNumber(filter.price)) : checkNumber(productDetail.price)}</span></p>
                        </div>

                      </div>
                      <div className=' d-none d-lg-block'>
                        <div className='mt-4'>
                          {
                            token ? (
                              <button type='button' disabled={(!filter || productDetail.in_stock <= 0 || productDetail.price <= 0) ? true : false} onClick={() => addCart()} className='btn hoplongtech-btn-danger  rounded w-100'>
                                {/* <img src={logoCart} width={25} className='mr-5' alt='logo-cart' /> */}
                                <span className='text-white fw-500'>Thêm giỏ hàng</span>
                              </button>
                            ) : (
                              !filter || productDetail.in_stock <= 0 || productDetail.price <= 0 ? (
                                ''
                              ) : (
                                <button type='button' disabled={(!filter || productDetail.in_stock <= 0 || productDetail.price <= 0) ? true : false} onClick={() => addCartNotUser()} className='btn hoplongtech-btn-danger  rounded w-100'>
                                  {/* <img src={logoCart} width={25} className='mr-5' alt='logo-cart' /> */}
                                  <span className='text-white fw-500'>Thêm giỏ hàng</span>
                                </button>
                              )
                            )
                          }
                        </div>
                        <div className='product-action mt-3  '>

                          {
                            (productDetail.in_stock <= 0 || productDetail.price <= 0) ? (
                              <button type='button' className='btn click-buy-now ' disabled>
                                <span className='mb-0 fw-500 '>Liên hệ</span>
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

                        {
                          token ? (
                            <button type='button' disabled={(!filter || productDetail.in_stock <= 0 || productDetail.price <= 0) ? true : false} onClick={() => addCart()} className='btn hoplongtech-btn-danger me-3  rounded w-100'>
                              {/* <img src={logoCart} width={25} className='mr-5' alt='logo-cart' /> */}
                              <span className='text-white fw-500'>Thêm giỏ hàng</span>
                            </button>
                          ) : (
                            !filter || productDetail.in_stock <= 0 || productDetail.price <= 0 ? (
                              ''
                            ) : (
                              <button type='button' disabled={(!filter || productDetail.in_stock <= 0 || productDetail.price <= 0) ? true : false} onClick={() => addCartNotUser()} className='btn hoplongtech-btn-danger me-3 rounded w-100'>
                                {/* <img src={logoCart} width={25} className='mr-5' alt='logo-cart' /> */}
                                <span className='text-white fw-500'>Thêm giỏ hàng</span>
                              </button>
                            )
                          )
                        }
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
              <div className='d-block mt-3 list-details' ref={listDetailsRef}>
                <Nav className={`border-tab ${isFixedHeader ? 'fixed' : ''} hidden-sm`}>
                  <div className='container'>
                    <div className='sticky-tab__show'>
                      <div className='middle d-table-cell'>
                        <p>{productDetail.gioi_thieu}</p>
                        {(productDetail?.price === 0 || filter?.price === 0) ? (<span className='text-red fw-500'>Giá liên hệ</span>) : (
                          <p>
                            <span className="fw-bold" style={{ fontSize: 16 }}>
                              {filter && filter.price ? (filter.price == 0 ? 'Giá liên hệ' : (checkNumber(filter.price))) : checkNumber(productDetail.price)}</span>
                            &nbsp;&nbsp;
                            <span className='text-gray text-decoration-line-through'>{filter && filter.original_price ? (filter.original_price == 0 ? '' : (checkNumber((filter.original_price)) == checkNumber((filter.price))) ? '' : checkNumber((filter.original_price))) : checkNumber(productDetail.original_price)}</span>
                            &nbsp;&nbsp;
                            <span className='text-red text-right'>
                              {filter && filter.price && filter.original_price && filter.price !== 0
                                ? `Khuyến mại ${100 - ((parseInt(filter.price) / parseInt(filter.original_price)) * 100).toFixed(0)}%`
                                : filter == undefined && (`Khuyến mại ${100 - ((parseInt(productDetail.price) / parseInt(productDetail.original_price)) * 100).toFixed(0)}%`)}</span>
                          </p>
                        )
                        }
                      </div>
                    </div>

                    <div className='list-tabs'>
                      <NavItem className='cursor-pointer'>
                        <LinkTo to="section1" spy={true} smooth={true} duration={500} className='nav-link'>
                          Nội dung
                        </LinkTo>
                      </NavItem>
                      <NavItem className='cursor-pointer'>
                        <LinkTo to="section2" spy={true} smooth={true} duration={500} className='nav-link'>
                          Thông số kỹ thuật
                        </LinkTo>
                      </NavItem>
                      <NavItem className='cursor-pointer'>
                        <LinkTo to="section3" spy={true} smooth={true} duration={500} className='nav-link'>
                          Nhận xét
                        </LinkTo>
                      </NavItem>

                      {productDetail.questions?.length > 0 && (
                        <NavItem className='cursor-pointer'>
                          <LinkTo to="section4" spy={true} smooth={true} duration={500} className='nav-link'>
                            Câu hỏi thường gặp
                          </LinkTo>
                        </NavItem>
                      )}
                      <NavItem className='cursor-pointer show-cart lh-base'>
                        {
                          token ? (
                            <button type='button' disabled={(!filter || productDetail.in_stock <= 0 || productDetail.price <= 0) ? true : false} onClick={() => addCart()} className='btn hoplongtech-btn-danger h-100 border-0   w-100'>
                              {/* <img src={logoCart} width={25} className='mr-5' alt='logo-cart' /> */}
                              <span className='text-white text-uppercase fw-500'>Thêm vào giỏ hàng</span>
                            </button>
                          ) : (
                            !filter || productDetail.in_stock <= 0 || productDetail.price <= 0 ? (
                              ''
                            ) : (
                              <button type='button' disabled={(!filter || productDetail.in_stock <= 0 || productDetail.price <= 0) ? true : false} onClick={() => addCartNotUser()} className='btn hoplongtech-btn-danger  h-100 border-0 w-100'>
                                {/* <img src={logoCart} width={25} className='mr-5' alt='logo-cart' /> */}
                                <span className='text-white text-uppercase fw-500'>Thêm vào giỏ hàng</span>
                              </button>
                            )
                          )
                        }
                      </NavItem>
                    </div>
                  </div>

                  <div className="tab-scroll-controller">
                    <button type="button" className="scroll-left btn border-0 bg-transparent" onClick={scrollToLeft}>
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button type="button" className="scroll-right btn border-0 bg-transparent" onClick={scrollToRight}>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                </Nav>
                <Element name="section1" className='section1'>
                  <Description productDetail={productDetail} moreButton={moreButton} showLess={showLess} setShowLess={setShowLess} />
                </Element>
                <Element name="section2" className='section2'>
                  <Specification item={productDetail} />
                </Element>
                <Element name="section3" className='section3'>
                  <Comment productId={productDetail._id} countComment={countComment} productSlug={productDetail.slug} />
                </Element>
                <Element name="section4" className='section4'>
                  {
                    productDetail.questions && (
                      <Cauhoi questions={productDetail.questions} />
                    )
                  }
                </Element>
              </div>

              {/* {!isMobile && (
                <div className='w-40 data-item-desktop'>
                  <ListDetail productDetail={productDetail} modal={modal} setModal={setModal} toggleModal={toggleModal} />
                </div>
              )} */}


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
                            slidesToScroll={1}
                            initialSlide={0}
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
                                    slidesToShow: 3,
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
                                    slidesToShow: 2,
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
                                  <div className='compare-list-item-info'>
                                    <p className="text-title text-brand fw-normal">{item.brand}</p>
                                    <Link to={`/${item.categorySlug}/${item.slug}`}>
                                      <h6 className='text-primary'>{item.name}</h6>
                                    </Link>

                                    <p className='text-price'><span className='text-red me-2'>{item.price == 0 || item.price == item.original_price ? 'Giá liên hệ' : checkNumber(item.price)} </span><span className='text-decoration-line-through text-title'>{item.price == item.original_price ? '' : checkNumber(item.original_price)} </span></p>
                                    {
                                      token ? (
                                        item.in_stock === 0 ? (
                                          <button disabled className='btn hoplongtech-btn-transparent rounded w-100 my-3'>
                                            <span className='text-primary fw-500'>Liên hệ</span>
                                          </button>
                                        ) : (

                                          <button onClick={() => addCart(item._id, item.vesion_detail)} className='btn hoplongtech-btn-transparent rounded w-100 my-3'>
                                            <span className='text-primary fw-500'>Thêm giỏ hàng</span>
                                          </button>
                                        )

                                      ) : (

                                        item.in_stock === 0 || item.price === 0 ? (
                                          <button disabled className='btn hoplongtech-btn-transparent rounded w-100 my-3'>
                                            <span className='text-primary fw-500'>Liên hệ </span>
                                          </button>
                                        ) : (
                                          <button onClick={() => addCartNotUser(item._id, item.vesion_detail)} className='btn hoplongtech-btn-transparent rounded w-100 my-3'>
                                            <span className='text-primary fw-500'>Thêm giỏ hàng</span>
                                          </button>
                                        )
                                      )
                                    }

                                    {/* <div className="button-add-cart my-3">
                                      <Link to={'/don-hang/gio-hang'} className='btn add-cart text-primary'>Thêm giỏ hàng</Link>
                                    </div> */}
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
  const [height, setHeight] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    setHeight(ref.current.clientHeight)
  })

  const data = [
    {
      id: 1,
      title: 'Giao hàng miễn phí',
      content: 'Vận chuyển an toàn và miễn phí khi mua hàng tại website <a href="https://giga.vn" class="text-primary" >giga.vn</a>. Chúng tôi luôn tối ưu việc vận chuyển các đơn hàng của bạn.',
      icon: 'ti ti-truck'
    },
    {
      id: 2,
      title: '15 ngày đổi trả',
      content: 'Chính sách đổi trả 15 ngày được áp dụng miễn phí cho các sản phẩm được mua trên <a href="https://giga.vn" class="text-primary" >giga.vn</a> (Điều khoản và điều kiện áp dụng, vui lòng tham khảo chính sách mua hàng đổi trả của Giga)',
      icon: 'ti ti-reload'
    },
    {
      id: 3,
      title: '12 tháng bảo hành',
      content: 'Chính sách bảo hành được áp dụng cho các sản phẩm được mua trên <a href="https://giga.vn" class="text-primary" >giga.vn</a> và hệ thống Showroom (Điều khoản và điều kiện áp dụng, vui lòng tham khảo chính sách mua hàng đổi trả của Giga)',
      icon: 'ti-credit-card'
    },
    {
      id: 4,
      title: 'Ưu đãi hấp dẫn',
      content: 'Nhận ngay những khuyến mại đặc quyền từ giga.vn. Đăng ký nhận thông tin trên <a href="https://giga.vn" class="text-primary" >giga.vn</a> để được cập nhật những ưu đãi mới nhất.',
      icon: 'ti-plug'
    },
  ]

  return (
    <div className={`w-100 ${className}`}>
      <div className='list-product-left'>
        {
          productDetail.post ?
            <div className='product-content' >
              <div
                ref={ref}
                className={showLess ? 'detail-content' : 'detail-content-collapse'}
                style={showLess ? moreButton : null} >
                {
                  ReactHtmlParser(productDetail.post)
                }
                <div className='list-promotion'>
                  <div className='promotion-header text-center'>
                    <h3 className='title mb-3'>Mua sắm trực tuyến, không còn nỗi lo!</h3>
                    <p className='mb-3'>Tìm hiểu thêm về các dịch vụ đặc biệt độc quyền khi mua sắm tại <a className='text-primary' href='https://giga.vn/'>Giga.vn</a></p>
                  </div>
                  <div className='promotion-content my-4'>
                    {data && data.map(item => (
                      <div className='box-content text-center'>
                        <span className={`fa-3x ${item.icon}`}></span> <br />
                        <h4 className='title my-3'>{item.title}</h4>
                        <p className='content text-gray '>{ReactHtmlParser(item.content)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
                <div className={showLess ? 'text-center button-action' : 'text-center button-action-collapse '} style={{position: !showLess === true ? 'relative' : 'sticky'}}>
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

const ModalSlider = (props) => {

  const { productDetail, filterImages, modalSlider, toggleModalSlider, NextArrow, PrevArrow } = props

  const [nav3, setNav3] = useState()
  const [nav4, setNav4] = useState()

  const [currentSlide, setCurrentSlide] = useState(0)

  const handleAfterChange = (index) => {
    setCurrentSlide(index)
  }



  // if (nav3 === null || nav4 === null) {
  //   return null;
  // }


  return (
    <Modal isOpen={modalSlider} toggle={toggleModalSlider} className='modal-slider'>
      <ModalHeader toggle={toggleModalSlider}>
        <label className='fw-bold'></label>
      </ModalHeader>
      <ModalBody style={{ padding: 30 }}>
        <div className='product-slider w-100' >
          <div className='slider-container'>
            <Slider
              asNavFor={nav4}
              autoplay={false}
              autoplaySpeed={3000}
              infinite={true}
              slidesToScroll={1}
              slidesToShow={1}
              variableWidth={false}
              arrows={true}
              ref={slider3 => (setNav3(slider3))}
              nextArrow={<NextArrow />}
              afterChange={handleAfterChange}
              prevArrow={<PrevArrow />}
            >
              {
                filterImages && filterImages.map((item, index) => (
                  <div key={index}
                    className='list-items-slider position-relative big-img-slider'
                  >
                    <div className="item">
                      <InnerImageZoom
                        src={`${checkImage(item)}`}
                        zoomSrc={`${checkImage(item)}`}
                        zoomType="click"
                        zoomScale={1.2}
                        zoomPreload={true}
                      />
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

          <div className="slider-info">
            {filterImages.length > 0 && (
              <h6 className='text-center text-gray my-3'>{`${currentSlide + 1}/${filterImages.length}`}</h6>
            )}
          </div>
          <div className='slider-child d-flex mt-3 flex-column'>
            <Slider
              asNavFor={nav3}
              autoplay={false}
              ref={slider4 => (setNav4(slider4))}
              slidesToShow={filterImages == undefined || filterImages.length >= 12 ? 12 : filterImages.length}
              swipeToSlide={true}
              focusOnSelect={true}
              slidesToScroll={1}
              className="small-slick"
              responsive={
                [
                  {
                    breakpoint: 1199,
                    settings: {
                      slidesToShow: filterImages == undefined || filterImages.length >= 10 ? 10 : filterImages.length,
                    }
                  },
                  {
                    breakpoint: 991,
                    settings: {
                      slidesToShow: filterImages == undefined || filterImages.length >= 5 ? 5 : filterImages.length,
                    }
                  },
                  {
                    breakpoint: 767,
                    settings: {
                      slidesToShow: filterImages == undefined || filterImages.length >= 4 ? 4 : filterImages.length,
                    }
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: filterImages == undefined || filterImages.length >= 3 ? 3 : filterImages.length,
                    }
                  },
                ]
              }
            >

              {
                filterImages.map((element, index) => (
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
      </ModalBody>
    </Modal>
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