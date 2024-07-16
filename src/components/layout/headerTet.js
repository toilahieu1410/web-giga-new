// import React, { Fragment, useEffect, useState, useRef } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { Link, useLocation, useParams } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { Container, Row, Col, InputGroup, InputGroupAddon, Button } from 'reactstrap'
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
// import Category from '../home/category'
// import LoginModal from './loginModal'
// import MenuUser from './menuUser'
// import { countCart } from '../../redux/order/action'
// import { getCategory, getCategoryByDetail, getProductDetail, getSearchProduct, getSubCategory } from '../../redux/product/action'
// import { countCartNotUserFunc } from '../../utilities/orderNotUser'
// import logo from '../../assets/images/Giga-logo.png'
// import logoWhite from '../../assets/imgs/logoGiga-white.png'
// import logoTet from '../../assets/images/icon-tet/icon-tet.gif'
// import { checkImage, checkNumber } from '../../utilities/checkNumber'
// import { dataSearch } from '../../assets/constant/constant'
// import BreadcrumbProduct from './breadcrumb'
// import { routes } from '../../route'
// import AnhKhuyenMai from '../../assets/images/icon-tet/BG-02.png'
// const page = 1
// const perPage = 6

// const Header = (props) => {

//   const dispatch = useDispatch()
//   const { slug } = useParams()
//   const state = useLocation()

//   const productDetail = useSelector((store) => store.product.productDetail)
//   const listCategorySlug = useSelector((store) => store.product.listCategorySlug)

//   const wrapperRef = useRef(null)

//   const { token } = props

//   const count = useSelector(store => store.order.count)

//   const searchProduct = useSelector(store => store.product.searchProduct)

//   const [modal, setModal] = useState(false)
//   const [countCartNotUser, setCountCartNotUser] = useState(0)
//   const [search, setSearch] = useState(null)
//   const [showSearch, setShowSearch] = useState(false)
//   const [indexItem, setIndexItem] = useState(null)
//   const [click, setClick] = useState(false)
//   const [categoryId, setCategoryId] = useState('')

//   const toggleModal = () => setModal(!modal)
//   const handleClick = () => setClick(!click)

//   useEffect(() => {
//     if (listCategorySlug && listCategorySlug._id) {
//       dispatch(getCategoryByDetail(listCategorySlug._id))
//     }
//   }, [listCategorySlug])

//   useEffect(() => {
//     dispatch(getSubCategory(categoryId))
//   }, [categoryId])

//   useEffect(() => {
//     dispatch(getCategory())
//   }, [])

//   useEffect(() => {
//     if (token) {
//       dispatch(countCart())
//     }
//   }, [token])
//   useEffect(() => {
//     const params = {
//       slug: slug
//     }
//     dispatch(getProductDetail(params))

//   }, [slug])
//   const newProduct = routes.find(item => item.name != null)
//   const newProduct1 = routes.filter(item => item.path.split('/')[1] == state.pathname.split('/')[1])

//   useEffect(() => {
//     const params = {
//       search: search,
//       page: page,
//       perPage: perPage
//     }
//     if (search != null && search != '') {
//       setShowSearch(true)
//       dispatch(getSearchProduct(params))
//     }
//   }, [search])

//   useEffect(() => {
//     const result = countCartNotUserFunc()
//     setCountCartNotUser(result)
//   }, [])

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside, false);
//     return () => {
//       document.removeEventListener("click", handleClickOutside, false);
//     }
//   }, [])

//   const handleClickOutside = event => {
//     if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//       setShowSearch(false)
//     }
//   }

//   return (
//     <Fragment>
//       <div id='top' style={{ marginTop: 30 }}>
//         {state.pathname === '/' ? (
//           <div className='background-khuyenmai'>
//             <img src={AnhKhuyenMai} />
//           </div>
//         ) : ('')}

//         <Container fluid={true} className="search-page container">
//           <Row className='align-items-top py-3 justify-content-between'>
//             <Col xs="3" className='header-col-set w-20 position-relative' style={{zIndex:9}}>
//               <div className='menu-icon' onClick={handleClick}>
//                 <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
//               </div>
//               <Row className='data-item-desktop'>
//                 {state.pathname === '/' ? (
//                   <Col xs='12'>
//                     <Link to={'/'} onClick={() => setIndexItem(null)}><img src={logoTet} style={{ zIndex: 9 }} className='position-relative w-80 h-100' alt='logo' /></Link>
//                   </Col>
//                 ) : (
//                   <Col xs='12'>
//                     <Link to={'/'} onClick={() => setIndexItem(null)}><img src={logo} style={{ zIndex: 9 }} className='position-relative w-80 h-100' alt='logo' /></Link>
//                   </Col>
//                 )}

//               </Row>
//             </Col>
//             <Row className='data-item-mobile col-6'>
//               {state.pathname === '/' ? (
//                 <Col xs='12'>
//                   <Link to={'/'}><img src={logoTet} className='position-relative w-80 h-100' style={{ zIndex: 9 }} alt='logo' /></Link>
//                 </Col>
//               ) : (
//                 <Col xs='12'>
//                   <Link to={'/'}><img src={logo} className='position-relative w-80 h-100' style={{ zIndex: 9 }} alt='logo' /></Link>
//                 </Col>
//               )}

//             </Row>
//             <Col xs="3" className='header-col-set user-action data-item-mobile user-cart-block' >
//               <Row className='col-form-label w-100 p-0 m-0 align-items-center '>

//                 <Col className='shopping-cart text-center'>
//                   {
//                     token ? (
//                       <Link to={'/don-hang/gio-hang'} className='header-set-text-primary position-relative text-primary'>
//                         <FontAwesomeIcon icon={faShoppingCart} className="icon-header icon-cart" style={{ fontSize: 24 }} />
//                         <span className="text-header header-card-text"></span>
//                         {
//                           count && count.count > 0 && (
//                             <div className='position-absolute count-cart'>
//                               <span className='text-white'>{count.count}</span>
//                             </div>
//                           )
//                         }
//                       </Link>
//                     ) : (
//                       <Link to={'/don-hang/gio-hang'} className='header-set-text-primary position-relative text-primary'>
//                         <FontAwesomeIcon icon={faShoppingCart} className="icon-header icon-cart" style={{ fontSize: 24 }} />
//                         <span className="text-header header-card-text"></span>
//                         {
//                           countCartNotUser >= 1 && (
//                             <div className='position-absolute count-cart'>
//                               <span className='text-white'>{countCartNotUser}</span>
//                             </div>
//                           )
//                         }
//                       </Link>
//                     )
//                   }
//                 </Col>
//               </Row>
//             </Col>
//             <Col xs="6" className='header-col-set w-70 search-header position-relative' >
//               <InputGroup className='d-block'>
//                 <input
//                   className='header-set-input-search w-100 form-control'
//                   placeholder='Gõ từ khóa bạn muốn tìm kiếm!'
//                   onChange={(e) => setSearch(e.target.value)}
//                   value={search || ''}
//                   style={{ fontSize: 14 }}
//                 />

//                 {showSearch ? (
//                   <div className='listDataSearch' ref={wrapperRef}>
//                     {searchProduct && searchProduct.result && searchProduct.result.map((item, index) => (
//                       item.publish == true ? (
//                         <a className='d-flex align-items-center list-item' key={index} href={`/${item.categorySlug}/${item.slug}`}>
//                           <img src={checkImage(item.thumb)} />
//                           <div className='d-block pl-15 '>
//                             <h6 className='fw-bold mb-0' >{item.name}</h6>
//                             {(token && (token.type === 'erp' || token.type === 'vip')) ? (
//                               item.vesion_detail.length > 0 && (
//                                 <p className=' fw-bold'>
//                                   {(item.vesion_detail[0].erp_price <= 0 && item.vesion_detail[0].stock <= 0) ? 'Giá liên hệ' : (item.vesion_detail[0].erp_price != undefined) ? checkNumber(parseInt(item.vesion_detail[0].erp_price)) : (item.price == 0 ? 'Giá liên hệ' : checkNumber(item.price))}</p>
//                               )

//                             ) : (
//                               <p className=' fw-bold'>{item.price <= 0 ? 'Giá liên hệ' : checkNumber((item.price))}</p>
//                             )}
//                           </div>
//                         </a>
//                       ) : ('')

//                     ))}
//                   </div>
//                 ) : null}

//                 <InputGroupAddon addonType="append">
//                   {
//                     (search != null && search != '') ? (
//                       <Link to={`/tim-kiem/${search}`} >
//                         <Button className="header-set-btn-search border-0 hoplongtech-btn-primary">
//                           <span className="search-homepage ">Tìm kiếm</span>
//                         </Button>
//                       </Link>
//                     ) : (
//                       <Button className="bg-redTet header-set-btn-search border-0 hoplongtech-btn-primary">
//                         <span className="search-homepage ">Tìm kiếm</span>
//                       </Button>
//                     )
//                   }
//                 </InputGroupAddon>


//               </InputGroup>
//               {state.pathname === '/' ? (
//                 <p className='mt-1 content-search ml-10 text-white'>Tìm kiếm nhiều nhất:&nbsp;&nbsp;
//                   {dataSearch.map((item, index) => (
//                     <span className='cursor-pointer text-white' key={index} onClick={() => setSearch(item.name)}><i>{item.name}</i>&nbsp;&nbsp;&nbsp;</span>
//                   ))}
//                 </p>
//               ) : (
//                 <p className='mt-1 content-search ml-10 '>Tìm kiếm nhiều nhất:&nbsp;&nbsp;
//                   {dataSearch.map((item, index) => (
//                     <span className='cursor-pointer ' key={index} onClick={() => setSearch(item.name)}><i>{item.name}</i>&nbsp;&nbsp;&nbsp;</span>
//                   ))}
//                 </p>
//               )}

//             </Col>
//             <Col xs="3" className='header-col-set w-10 user-action data-item-desktop'>
//               <Row className='col-form-label  p-0 m-0 align-items-center align-cart'>
//                 <Col className='shopping-cart text-center'>
//                   {
//                     !token && (
//                       <Link to={'/don-hang/gio-hang'} className={state.pathname === '/' ? ('header-set-text-primary-Tet position-relative text-white') : 'header-set-text-primary position-relative text-primary'} >
//                         <div className='add-cart d-flex align-items-center'>
//                         <FontAwesomeIcon icon={faShoppingCart} className="icon-header icon-cart icon-cart-add" style={{ fontSize: 24 }} />
//                         <span className="text-header header-card-text add-cart-item">Giỏ hàng</span>
//                         </div>
                        
//                         {
//                           countCartNotUser >= 1 && (
//                             <div className='position-absolute count-cart 222'>
//                               <span className='text-white'>{countCartNotUser}</span>
//                             </div>
//                           )
//                         }
//                       </Link>
//                     )
//                   }
//                   {
//                     (token && token.type != 'erp' && token.type != 'vip') && (
//                       <Link to={'/don-hang/gio-hang'} className={state.pathname === '/' ? ('header-set-text-primary-Tet position-relative text-white') : 'header-set-text-primary position-relative text-primary'}>
//                          <div className='add-cart d-flex align-items-center 11'>
//                          <FontAwesomeIcon icon={faShoppingCart} className="icon-header icon-cart" style={{ fontSize: 24 }} />
//                         <span className="text-header header-card-text"></span>
//                         </div>
                   
//                         {
//                           count && count.count > 0 && (
//                             <div className='position-absolute count-cart 111'>
//                               <span className='text-white'>{count.count}</span>
//                             </div>
//                           )
//                         }
//                       </Link>
//                     )
//                   }
//                   {
//                     (token && (token.type == 'erp' || token.type == 'vip')) && (
//                       <Link to={'/don-hang/gio-hang-erp'} className='header-set-text-primary position-relative text-primary'>
//                             <div className='add-cart d-flex align-items-center'>
//                             <FontAwesomeIcon icon={faShoppingCart} className="icon-header icon-cart" style={{ fontSize: 24 }} />
//                         <span className="text-header header-card-text"></span>
//                         </div>
               
//                         {
//                           count && count.count > 0 && (
//                             <div className='position-absolute count-cart '>
//                               <span className='text-white'>{count.count}</span>
//                             </div>
//                           )
//                         }
//                       </Link>
//                     )
//                   }
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//           <div className={click ? 'nav-menu active' : 'nav-menu'} >
//               <Category click={click} setClick={setClick} token={token} toggleModal={toggleModal} indexItem={indexItem} setIndexItem={setIndexItem} />
//             </div>

//           <div className={'backgroundTet text-white position-absolute right-0 left-0 top-0'} >
//             <div className='container p-0'>
//               <Col xs='12' md='12' className='header-col-set'>
//                 <div className='nav-links' >
//                   <div className='d-flex justify-content-end nav-header p-2 align-items-center'>

//                     <div className='header-tien-ich mr-15'>
//                       <div className='d-flex justify-content-center align-items-center'>
//                         <p className='list-inline ml-10'>
//                           Sản phẩm đã xem
//                         </p>
//                       </div>
//                     </div>

//                     <div className='header-tien-ich mr-15'>
//                       <div className='d-flex justify-content-center align-items-center'>
//                         <p className='list-inline ml-10'>
//                           <Link className="text-white" to={`/trung-tam-bao-hanh`}>Trung tâm bảo hành</Link>
//                         </p>
//                       </div>
//                     </div>
//                     <div className='header-tien-ich mr-15'>
//                       <div className='d-flex justify-content-center align-items-center'>
//                         <p className='list-inline ml-10'>
//                           <Link className="text-white" to={token ? `/tai-khoan/don-hang` : `/don-hang/tra-cuu-don-hang`}>Tra cứu đơn hàng</Link>
//                         </p>
//                       </div>
//                     </div>
//                     <div className='header-tien-ich data-item-desktop'>
//                       <div className='user-action'>
//                         {
//                           token ? (
//                             <Col md='12' sm='12' xs='12' className='username'>
//                               <h6 className='login-success text-white text-center mb-0'>{token.username}</h6>
//                               <div className='list-action bg-white'>
//                                 <MenuUser />
//                               </div>
//                             </Col>
//                           ) : (
//                             <Col md='12' sm='12' xs='12' className='username'>
//                               <button onClick={toggleModal} className='d-flex bg-transparent align-items-center text-primary border-0'>
//                                 <span className="text-white header-card-text">Đăng nhập</span>
//                               </button>
//                             </Col>
//                           )
//                         }
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Col>
//             </div>
//           </div>
//           <BreadcrumbProduct parent={productDetail.categorySlug == undefined ? newProduct.path : productDetail.categorySlug} nameParent={(typeof productDetail == 'object' || productDetail == undefined && (productDetail.categoryTitle != listCategorySlug && listCategorySlug.name)) ? listCategorySlug == null ? productDetail.categoryTitle :  listCategorySlug.name   : productDetail.categoryTitle } child={productDetail.slug == undefined ? newProduct.path : productDetail.slug} nameChild={productDetail.name} newProduct1={newProduct1} />
//         </Container>
//       </div>
//       <LoginModal modal={modal} setModal={setModal} toggleModal={toggleModal} />
//     </Fragment>
//   )
// }

// export default Header