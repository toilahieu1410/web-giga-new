// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getCategory, getSubCategory } from '../../redux/product/action'
// import { category } from '../../assets/constant/constant'
// import { Col } from 'reactstrap'
// import MenuUser from '../layout/menuUser'
// import { useHistory, useLocation } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons'

// const CategoryTet = (props) => {

//   const dispatch = useDispatch()
//   const history = useHistory()
//   const state = useLocation()
//   const { click, setClick, token, toggleModal, indexItem, setIndexItem } = props

//   const listCategory = useSelector((store) => store.product.listCategory)
//   const listSubCategory = useSelector((store) => store.product.listSubCategory)

//   const [categoryId, setCategoryId] = useState('')

//   useEffect(() => {
//     dispatch(getSubCategory(categoryId))
//   }, [categoryId])

  
//   useEffect(() => {
//     dispatch(getCategory())
//   }, [])

//   const onMouseEnter = (id, index) => {
//     setCategoryId(id)
//     setIndexItem(index)
//   }

//   const onMouseLeave = (item, index) => {
//     setClick(true)
//     setIndexItem(index)
//     setCategoryId(item._id)
//     history.push({
//       pathname: `/${item.slug}`
//     })
//   }

//   const CategoryMain = listCategory.filter(item => JSON.parse(item.title_type) == true)

//   CategoryMain.sort((a, b) => a.sort_order - b.sort_order)

//   const categoryData = [...CategoryMain, ...category]

//   return (
//     <>
//         <div className='row rounded category category-listbanner11 '>
   
//         <div className='list-category-sidebar'>
//           <div className='icon-close text-right data-item-mobile'>
//             <FontAwesomeIcon icon={faTimes} className='mx-2 text-white fa-2x' onClick={() => setClick(!click)} />
//           </div>
//           <div className='info-login data-item-mobile'>
//             <div className='user-action'>
//               {
//                 token ? (
//                   <Col md='12' sm='12' xs='12' className='username'>
//                     <h6 className='login-success text-white text-center mb-0'>
//                       <FontAwesomeIcon icon={faUserCircle} className='mr-5' style={{ fontSize: 18 }} />
//                       {token.username}</h6>
//                     <div className='list-action bg-white'>
//                       <MenuUser />
//                     </div>
//                   </Col>
//                 ) : (
//                   <Col md='12' sm='12' xs='12' className='username'>
//                     <button onClick={toggleModal} className='d-flex bg-transparent align-items-center text-primary border-0 ml-10'>
//                       <h6 className="text-white header-card-text">Đăng nhập</h6>
//                     </button>
//                   </Col>
//                 )
//               }
//             </div>
//           </div>
//           {
//             categoryData && categoryData.map((item, index) => (
//               <div key={index} className='list-category w-auto'>
//                 <div className='text-center text-white item-category p-1 '
//                   onClick={() => onMouseLeave(item, index)}
//                   onMouseEnter={() => onMouseEnter(item._id, index)}
//                 >
//                   <label className={indexItem == index ? 'category-label active-category' : 'category-label'}>{item.name}</label>
//                 </div>
//                 <MegaCategory listSubCategory={listSubCategory} setIndexItem={setIndexItem} click={click} setClick={setClick} />
//               </div>
//             ))
//           }
//         </div>
//       </div>


//     </>

//   )
// }
// export default CategoryTet

// const MegaCategory = (props) => {

//   const { listSubCategory, setClick, setIndexItem } = props
//   const history = useHistory()

//   const onClickSub = (item) => {
//     setClick(false)
//     history.push({
//       pathname: `/${item.slug}`
//     })
//   }
//   const onClickChild = (item) => {
//     setClick(false)
//     history.push({
//       pathname: `/${item.slug}`
//     })
//   }

//   return (
//     <>
//       {
//         listSubCategory.length <= 0 ? ('') : (
//           <div className='w-100  mega-category p-3 rounded' onMouseLeave={setIndexItem}>
//             <div className='row'>
//               {
//                 listSubCategory && listSubCategory.map((item, index) => (
//                   <div key={index} className='col-md-4 '>
//                     <div className='col-md-12 li' onClick={() => onClickSub(item)}>
//                       <div className='sub-label fw-bold cursor-pointer' >{item.name}</div>
//                     </div>
//                     <div className='row' key={index}>
//                       {
//                         item.chidrenCategories && item.chidrenCategories.length > 0 && item.chidrenCategories.map((i, e) => (
//                           <div className='sub-child-label cursor-pointer' onClick={() => onClickChild(i)} key={e}>{i.name}</div>
//                         ))
//                       }
//                     </div>
//                   </div>
//                 ))
//               }
//             </div>
//           </div>
//         )
//       }
//     </>
//   )
// }
