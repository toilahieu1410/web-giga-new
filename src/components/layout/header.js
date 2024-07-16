import React, { Fragment, useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useParams, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import Category from '../home/category'
import LoginModal from './loginModal'
import MenuUser from './menuUser'
import { countCart } from '../../redux/order/action'
import { getCategory, getCategoryByDetail, getFavouriteProduct, getProductDetail, getSearchProduct, getSubCategory } from '../../redux/product/action'
import { countCartNotUserFunc } from '../../utilities/orderNotUser'

import { checkImage, checkNumber } from '../../utilities/checkNumber'
import BreadcrumbPage from './breadcrumb'
import { routes } from '../../route'

import logo from '../../assets/imgs/logo-gigavn.png'
import logoFlagVN from '../../assets/images/flag-VN.png'
import logoFlagEN from '../../assets/images/flag-EN.png'
import logoUser from '../../assets/imgs/icon-header/account.svg'
import logoGuarantee from '../../assets/imgs/icon-header/wishlist.svg'
import logoSearch from '../../assets/imgs/icon-header/search.svg'
import logoCart from '../../assets/imgs/icon-header/cart.svg'
import logoListSideBar from '../../assets/imgs/icon-header/list-sidebar.svg'
import logoDiscount from '../../assets/imgs/icon-header/discount.svg'

const page = 1
const perPage = 15

const dataHeader = [
  {
    id: 1,
    name: 'Robot hút bụi',
    slug: 'robot-hut-bui'
  },
  {
    id: 2,
    name: 'Máy lọc không khí',
    slug: 'may-loc-khong-khi'
  },
  {
    id: 3,
    name: 'Nồi cơm điện',
    slug: 'noi-com-dien'
  },
  {
    id: 4,
    name: 'Máy hút bụi',
    slug: 'may-hut-bui'
  },
  {
    id: 5,
    name: 'Máy giặt & Máy sấy ',
    slug: 'may-giat-may-say'
  },
  {
    id: 6,
    name: 'Quạt',
    slug: 'quat'
  },
  {
    id: 7,
    name: 'Tủ lạnh',
    slug: 'tu-lanh'
  },
  {
    id: 8,
    name: 'Máy trộn & máy xay',
    slug: 'may-tron-may-xay'
  },
]
const Header = (props) => {

  const dispatch = useDispatch()
  const { slug } = useParams()
  const state = useLocation()
  const history = useHistory()
  const listCategorySlug = useSelector((store) => store.product.listCategorySlug)
  const listSubCategory = useSelector((store) => store.product.listSubCategory)
  const productDetail = useSelector((store) => store.product.productDetail)
  const listCategory = useSelector((store) => store.product.listCategory)

  const wrapperRef = useRef(null)

  const { token } = props

  const count = useSelector(store => store.order.count)

  const searchProduct = useSelector(store => store.product.searchProduct)

  const [modal, setModal] = useState(false)
  const [countCartNotUser, setCountCartNotUser] = useState(0)
  const [search, setSearch] = useState(null)
  const [showSearch, setShowSearch] = useState(false)
  const [showSearchMobile, setShowSearchMobile] = useState(false)
  const [indexItem, setIndexItem] = useState(null)
  const [click, setClick] = useState(false)
  const [categoryId, setCategoryId] = useState('')
  const [categorySlug, setCategorySlug] = useState(listCategory[0])
  const [selectedItem, setSelectedItem] = useState(null)

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownLanguages, setDropdownLanguages] = useState(false)
  const [showGridSearch, setShowGridSearch] = useState(false)

  const categoryType = listCategory.filter(item => JSON.parse(item.title_type) == true)

  const toggle = () => {
    setDropdownOpen((prevState) => !prevState)
  }

  const toggleLanguage = () => {
    setDropdownLanguages(!dropdownLanguages)
  }

  const toggleModal = () => setModal(!modal)
  const handleClick = () => setClick(!click)

  useEffect(() => {
    if (categoryId && categoryId != '') {
      dispatch(getSubCategory(categoryId))
    }

  }, [categoryId])


  useEffect(() => {
    if (listCategorySlug && listCategorySlug._id) {
      dispatch(getCategoryByDetail(listCategorySlug._id))
    }
  }, [listCategorySlug])


  useEffect(() => {
    if (listCategory.length > 0 && listCategory[0]) {
      setCategorySlug(listCategory[0])
    }
  }, [listCategory])

  // useEffect(() => {
  //   if (categorySlug && categorySlug._id !== undefined) {
  //     dispatch(getSubCategory(categorySlug._id))
  //   }
  // }, [categorySlug])


  useEffect(() => {
    dispatch(getCategory())
  }, [])

  useEffect(() => {
    if (token) {
      dispatch(countCart())
    }
  }, [token])

  useEffect(() => {
    const params = {
      slug: slug
    }
    dispatch(getProductDetail(params))

  }, [slug])

  const newProduct = routes.find(item => item.name != null)
  const newProduct1 = routes.filter(item => item.path.split('/')[1] == state.pathname.split('/')[1])


  useEffect(() => {
    let timeoutId
    const handleSearch = () => {
      const params = {
        search: search && search.trim(),
        page: page,
        perPage: perPage
      }
      if (search != null && search != '') {
        setShowSearch(true)
        dispatch(getSearchProduct(params))
      }
    }

    if (search != null && search != '') {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(handleSearch, 1000)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }

  }, [perPage, search])

  useEffect(() => {
    const result = countCartNotUserFunc()
    setCountCartNotUser(result)
  }, [])

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false)
    return () => {
      document.removeEventListener("click", handleClickOutside, false)
    }
  }, [])

  const handleClickOutside = event => {
    event.preventDefault()
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowSearch(false)
    }
  }

  const onMouseEnter = (id, index) => {
    setCategoryId(id)
    setIndexItem(index)
  }

  const onMouseLeave = (item, index) => {
    setClick(true)
    setIndexItem(index)
    setCategoryId(item._id)
    history.push({
      pathname: `/${item.slug}`
    })
  }

  const handleEnterKey = () => {
    const trimmedSearch = search.trim()
    if (trimmedSearch) {
      history.push(`/tim-kiem/${encodeURIComponent(trimmedSearch)}`)
    }
  }
  const pushTinTuc = () => {
    history.push({
      pathname: '/tin-tuc'
    })
  }


  return (
    <Fragment>
      <div id='top' style={{ marginTop: 40 }}>
        <div className="search-page">
          <Container fluid={true} className='container'>
            <Row className='align-items-center py-3 justify-content-between'>
              <Row className='data-item-mobile col-6 d-block d-lg-none m-0'>
                <Col xs='12'>
                  <Link to={'/'}><img src={logo} className='position-relative w-80 h-100' alt='logo' /></Link>
                </Col>
              </Row>
              <Col xs="7" className='header-col-set  position-relative col-left d-none d-lg-block'>
                <div className='d-flex align-items-center flex-1'>
                  <Row className='data-item-desktop flex-1 mr-15'>
                    <Col xs='12'>
                      <Link to={'/'} onClick={() => setIndexItem(null)}><img src={logo} className='position-relative  h-100' width={200} alt='logo' /></Link>
                    </Col>
                  </Row>
                  <form className='form-search d-flex align-items-center flex-2 position-relative'>
                    <div className='box-listCategory'>
                    </div>
                    <div className='box-search w-90'>
                      <div className='d-block'>
                        <input
                          className='header-set-input-search w-100 form-control'
                          placeholder='Tìm kiếm...'
                          onChange={(e) => setSearch(e.target.value)}
                          value={search}
                          style={{ fontSize: 14 }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleEnterKey()
                            }
                          }}
                        />

                        {showSearch ? (
                          <>
                            <div className={!showGridSearch ? 'listDataSearch' : 'listDataSearchGrid'} ref={wrapperRef}>
                              <div className='search-title d-flex justify-content-between align-items-center'>
                                <h6 className='mb-0'>Kết quả cho từ khóa "{searchProduct?.keyword}"</h6>
                                <div className="d-flex align-items-center list-button">
                                  <button
                                    className={!showGridSearch ? 'btn btn-active ' : 'btn btn-default'}
                                    onClick={() => setShowGridSearch(false)}
                                  >
                                    <i className='fa fa-th-large text-primary'></i>
                                  </button>
                                  &nbsp;&nbsp;
                                  <button
                                    className={showGridSearch ? 'btn btn-active' : 'btn btn-default '}
                                    onClick={() => setShowGridSearch(true)}
                                  >
                                    <i className='fa fa-bars text-primary'></i>
                                  </button>
                                </div>
                              </div>
                              <div className='list-data-search'>
                                {searchProduct && searchProduct.result && searchProduct.result.map((item, index) => (
                                  item.publish == true ? (
                                    !showGridSearch ? (
                                      <Link className='d-flex align-items-center list-item' key={index} to={`/${item.categorySlug}/${item.slug}`}>
                                        <img src={checkImage(item.thumb)} alt={item.thumb} />
                                        <div className='d-block pl-15 '>
                                          <h6 className='fw-bold mb-0 text-primary' >{item.name}</h6>
                                          {(token && (token.type === 'erp' || token.type === 'vip')) ? (
                                            item.vesion_detail.length > 0 && (
                                              <p className='fw-bold text-red'>
                                                {(item.vesion_detail[0].erp_price <= 0 && item.vesion_detail[0].stock <= 0) ? 'Giá liên hệ' : (item.vesion_detail[0].erp_price != undefined) ? checkNumber(parseInt(item.vesion_detail[0].erp_price)) : (item.price == 0 ? 'Giá liên hệ' : checkNumber(item.price))}</p>
                                            )

                                          ) : (
                                            <p className='fw-bold text-red'>{item.price <= 0 ? 'Giá liên hệ' : checkNumber((item.price))}</p>
                                          )}
                                        </div>
                                      </Link>
                                    ) : (
                                      <div className='list-search-grid'>
                                        <Link key={index} to={`/${item.categorySlug}/${item.slug}`}>
                                          <div className='image-product-grid'>
                                            <img src={checkImage(item.thumb)} alt={item.thumb} />
                                          </div>
                                          <div className='detail-product-grid'>
                                            <h6 className='fw-bold mb-0 text-primary' >{item.name}</h6>
                                            {(token && (token.type === 'erp' || token.type === 'vip')) ? (
                                              item.vesion_detail.length > 0 && (
                                                <p className='fw-bold'>
                                                  {(item.vesion_detail[0].erp_price <= 0 && item.vesion_detail[0].stock <= 0) ? 'Giá liên hệ' : (item.vesion_detail[0].erp_price != undefined) ? checkNumber(parseInt(item.vesion_detail[0].erp_price)) : (item.price == 0 ? 'Giá liên hệ' : checkNumber(item.price))}</p>
                                              )

                                            ) : (
                                              <p className='fw-bold text-red'>{item.price <= 0 ? 'Giá liên hệ' : checkNumber((item.price))}</p>
                                            )}
                                          </div>
                                        </Link>
                                      </div>
                                    )

                                  ) : ('')
                                )).slice(0, 6)}
                              </div>

                            </div>
                          </>

                        ) : null}


                      </div>
                    </div>
                    <div className='  position-absolute top-0 right-0'>
                      <button type='button' className='btn bg-transparent' onClick={handleEnterKey}>
                        <FontAwesomeIcon icon={faSearch} className='text-gray' />
                      </button>
                    </div>
                  </form>
                  <div className='text-title-header d-flex align-items-center ms-2'>
                    <p onClick={pushTinTuc} className='cursor-pointer text-primary me-2 fw-500'>Tin tức</p>
                    <Link to={`/flash-sale`} className='cursor-pointer text-primary fw-500'>Flash sale</Link>

                  </div>
                </div>
              </Col>
              <Col xs="4" className='header-col-set  position-relative col-right'>
                <Col xs='12' md='12' className='header-col-set'>
                  <div className='nav-links' >
                    <div className='d-flex justify-content-end nav-header p-2 align-items-center'>
                      <div className='header-tien-ich data-item-desktop'>
                        <div className='user-action'>
                          {
                            token ? (
                              <Col md='12' sm='12' xs='12' className='username'>
                                <h6 className='login-success text-primary text-center mb-0'><img src={logoUser} width={25} className='mr-5' alt='logo-username' />{token.username}</h6>
                                <div className='list-action bg-white'>
                                  <MenuUser />
                                </div>
                              </Col>
                            ) : (
                              <Col md='12' sm='12' xs='12' className='username'>
                                <button onClick={toggleModal} className='d-flex bg-transparent align-items-center text-primary border-0'>
                                  <img src={logoUser} width={25} className='mr-5' /> <span>Đăng nhập</span>
                                </button>
                              </Col>
                            )
                          }
                        </div>
                      </div>
                      <div className='header-tien-ich mr-15'>
                        <div className='d-flex justify-content-center align-items-center'>
                          <p className='list-inline ml-10'>
                            <Link className="text-primary" to={`/trung-tam-bao-hanh`}><img src={logoGuarantee} width={25} className='mr-5' alt='logo' /><span>Bảo hành</span></Link>
                          </p>
                        </div>
                      </div>

                      <div className='header-tien-ich user-action mr-15'>
                        <div className='shopping-cart text-center'>
                          {
                            !token && (
                              <Link to={'/don-hang/gio-hang'} className='header-set-text-primary position-relative text-primary'>
                                <img src={logoCart} width={25} className='mr-5' alt='logo-cart' />
                                <span className="text-header header-card-text">Giỏ hàng</span>
                                {
                                  countCartNotUser >= 1 && (
                                    <div className='position-absolute count-cart'>
                                      <span className='text-white'>{countCartNotUser}</span>
                                    </div>
                                  )
                                }
                              </Link>
                            )
                          }
                          {
                            (token && token.type != 'erp' && token.type != 'vip') && (
                              <Link to={'/don-hang/gio-hang'} className='header-set-text-primary position-relative text-primary'>
                                <img src={logoCart} width={25} className='mr-5' alt='logo-cart' />
                                <span className="text-header header-card-text">Giỏ hàng</span>
                                {
                                  count && count.count > 0 && (
                                    <div className='position-absolute count-cart'>
                                      <span className='text-white'>{count.count}</span>
                                    </div>
                                  )
                                }
                              </Link>
                            )
                          }
                          {
                            (token && (token.type == 'erp' || token.type == 'vip')) && (
                              <Link to={'/don-hang/gio-hang-erp'} className='header-set-text-primary position-relative text-primary'>
                                <FontAwesomeIcon icon={faShoppingCart} className="icon-header icon-cart" style={{ fontSize: 24 }} />
                                <span className="text-header header-card-text"></span>
                                {
                                  count && count.count > 0 && (
                                    <div className='position-absolute count-cart'>
                                      <span className='text-white'>{count.count}</span>
                                    </div>
                                  )
                                }
                              </Link>
                            )
                          }
                        </div>

                      </div>
                      <div className='header-tien-ich isMobile'>
                        <div className='d-flex justify-content-center align-items-center'>
                          <p className='list-inline'>
                            <button onClick={() => setShowSearchMobile(!showSearchMobile)} className='border-0 bg-transparent'>
                              <img src={logoSearch} width={22} className='mr-5' alt='logo-search' />
                            </button>
                          </p>
                        </div>
                        {showSearchMobile && (
                          <form className='form-search-mobile d-flex align-items-center flex-2 position-absolute'>
                            <div className='box-search w-90'>
                              <div className='d-block'>
                                <input
                                  className='header-set-input-search w-100 form-control'
                                  placeholder='Tìm kiếm...'
                                  onChange={(e) => setSearch(e.target.value)}
                                  value={search || ''}
                                  style={{ fontSize: 14 }}
                                  onKeyDown={(e) => {
                                    if (e.keyCode === 13 || e.which === 13) {
                                      handleEnterKey()
                                    }
                                  }}
                                />

                                {showSearch ? (
                                  <div className='listDataSearch' ref={wrapperRef}>
                                    {searchProduct && searchProduct.result && searchProduct.result.map((item, index) => (
                                      item.publish == true ? (
                                        <Link className='d-flex align-items-center list-item' key={index} to={`/${item.categorySlug}/${item.slug}`}>
                                          <img src={checkImage(item.thumb)} alt={item.thumb} />
                                          <div className='d-block pl-15 '>
                                            <h6 className='fw-bold mb-0' >{item.name}</h6>
                                            {(token && (token.type === 'erp' || token.type === 'vip')) ? (
                                              item.vesion_detail.length > 0 && (
                                                <p className='fw-bold'>
                                                  {(item.vesion_detail[0].erp_price <= 0 && item.vesion_detail[0].stock <= 0) ? 'Giá liên hệ' : (item.vesion_detail[0].erp_price != undefined) ? checkNumber(parseInt(item.vesion_detail[0].erp_price)) : (item.price == 0 ? 'Giá liên hệ' : checkNumber(item.price))}</p>
                                              )

                                            ) : (
                                              <p className='fw-bold text-red'>{item.price <= 0 ? 'Giá liên hệ' : checkNumber((item.price))}</p>
                                            )}
                                          </div>
                                        </Link>
                                      ) : ('')
                                    )).slice(0, 6)}
                                  </div>
                                ) : null}
                                <FontAwesomeIcon name={faSearch} className='text-red position-absolute top-0' />
                              </div>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
              </Col>
            </Row>
          </Container>
          <Col xs='12'>
            <div className='line-middle'></div>
          </Col>
          <Container fluid={true} className='container'>
            <Row className='align-items-center my-2 position-relative'>
              <Col xs="3">
                <Dropdown isOpen={dropdownOpen} toggle={toggle} className='w-100 dropdown-categories'>
                  <DropdownToggle caret className='text-left w-100 text-white'><img src={logoListSideBar} width={24} className='mr-10' alt='logo-sidebar' />Danh Mục <span className='d-none-480'>Sản Phẩm</span> </DropdownToggle>
                  <DropdownMenu className='w-100'>
                    {
                      listCategory.map((item, index) => (
                        item.total_product > 0 && (
                          <DropdownItem
                            className={selectedItem === item.slug ? 'selected-item' : ''}
                            onClick={() => { setSelectedItem(item.slug); onMouseLeave(item, index) }}
                            onMouseEnter={() => onMouseEnter(item._id, index)}
                          >

                            <label className={indexItem == index ? 'category-label active-category' : 'category-label'}>{item.name} {item.title_type === false ? ('') : (<i className='fa fa-chevron-right ml-5' style={{ fontSize: 10, opacity: 0.5 }}></i>)} </label>
                          </DropdownItem>
                        )
                      ))
                    }
                  </DropdownMenu>
                </Dropdown>
                {dropdownOpen == true && categoryId !== '' && (
                  <MegaCategory listCategory={listCategory} listSubCategory={listSubCategory} setIndexItem={setIndexItem} click={click} setClick={setClick} />
                )}

              </Col>
              <Col xs="7">
                <div className={click ? 'nav-menu active' : 'nav-menu'} >
                  <Category click={click} setClick={setClick} token={token} toggleModal={toggleModal} indexItem={indexItem} setIndexItem={setIndexItem} />
                </div>
              </Col>
              <Col xs="2">
                <div className='d-flex align-items-center justify-content-end'>
                  <p><img src={logoDiscount} width={40} className='mr-10' alt='logo' /></p>
                  <h6 className='text-uppercase text-primary mb-0'>Special Offer</h6>
                </div>
              </Col>
            </Row>
          </Container>

          {state.pathname === '/' && (
            <Col xs='12' >
              <div className=' list-nav-homepage '>
                <div className='container'>
                  {
                    dataHeader && dataHeader.map(item => (
                      <Link to={`/${item.slug}`}>
                        <label className='col-form-label'>{item.name}</label>
                      </Link>
                    ))
                  }

                </div>
              </div>
            </Col>
          )}

          <div className='bg-giga text-white position-absolute right-0 left-0 top-0'>
            <div className='container p-0'>
              <Col xs='12' md='12' className='header-col-set'>
                <div className='nav-links' >
                  <div className='d-flex justify-content-end nav-header p-2 align-items-center'>
                    <div className='title-ship flex-1 text-left'>
                      <p>Miễn phí ship với đơn hàng từ &nbsp;<span className='text-green fw-bold'>2 triệu</span></p>
                    </div>
                    <div className='d-flex align-items-center'>
                      <div className='header-tien-ich mr-15'>
                        <div className='d-flex justify-content-center align-items-center'>
                          <p className='list-inline ml-10'>
                            Hotline: 0358.071.170
                          </p>
                        </div>
                      </div>
                      <div className='header-tien-ich mr-15 header-language'>
                        <div className='d-flex justify-content-center align-items-center'>
                          <Dropdown isOpen={dropdownLanguages} toggle={toggleLanguage} className='w-100 bg-transparent'>
                            <DropdownToggle className='text-left w-100 text-white bg-transparent border-0'><img src={logoFlagVN} width={20} className='mr-5' />Việt Nam</DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem><img src={logoFlagEN} width={20} className='mr-5' /> English</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </Col>
            </div>
        
          </div>
          {state.pathname !== '/' && (
            <div className='list-nav'>
              <Container className='container'>

                <BreadcrumbPage
                  parent={productDetail.categorySlug == undefined ? newProduct.path : productDetail.categorySlug} 
                  nameParent={listCategorySlug && listCategorySlug.name ? listCategorySlug.name :
                  (productDetail && typeof productDetail === 'object' && productDetail.categoryTitle) ? productDetail.categoryTitle :
                  (listCategorySlug && listCategorySlug.name) ? listCategorySlug.name :
                  (productDetail && productDetail.categoryTitle) ? productDetail.categoryTitle :
                  '' 
                    }
                  child={productDetail.slug == undefined ? newProduct.path : productDetail.slug} 
                  nameChild={productDetail.name}
                   newProduct1={newProduct1}
                />
              </Container>
            </div>
          )}

        </div>
      </div>
      <LoginModal modal={modal} setModal={setModal} toggleModal={toggleModal} />
    </Fragment>
  )
}

export default Header

const MegaCategory = (props) => {

  const { listCategory, listSubCategory, setClick, setIndexItem } = props


  const history = useHistory()

  const ListCategoryFilter = listCategory.filter(item => JSON.parse(item.total_product) > 0)

  const onClickChildHeader = (item) => {
    history.push({
      pathname: `/${item.item.slug}/${item.childCategory.slug}`
    })
  }
  return (
    <>
      {
        listSubCategory.length <= 0 ? ('') : (
          <div className='w-100  mega-category p-3 rounded' onMouseLeave={setIndexItem}>
            <div className='row'>
              {
                listSubCategory && listSubCategory.sort(a => a.chidrenCategories.length > 0 ? -1 : 1).map((item, index) => (
                  <div key={index} className={item.chidrenCategories.length > 0 ? 'col-md-6 list' : 'col-md-6 only'}>
                    <Link className='col-md-12 li' to={`/${item.slug}`}>
                      <div className='sub-label cursor-pointer text-primary' >{item.name}</div>
                    </Link>

                    <div className='row' key={index}>
                      {
                        item.chidrenCategories && item.chidrenCategories.length > 0 && item.chidrenCategories.map((i, e) => (
                          <Link className='sub-child-label cursor-pointer' to={`/${i.categorySlug}/${i.slug}`}>
                            {i.name}
                          </Link>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
    </>
  )
}
