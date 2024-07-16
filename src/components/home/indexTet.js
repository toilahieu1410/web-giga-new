// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import Carousel from './carousel'
// import { Link, useLocation } from 'react-router-dom'
// import { getCarousel, getProductHome } from '../../redux/home/action'
// import { getCategory } from '../../redux/product/action'
// import { checkNumber, checkImage } from '../../utilities/checkNumber'
// import ScrollAnimation from "react-animate-on-scroll"
// import LoadingHome from '../notification/loadingHome'
// import Loading from '../notification/loading'
// import Slider from 'react-slick'
// import { settingsHome } from '../../utilities/settingSlide'
// import { Helmet } from 'react-helmet'
// import IconTet1 from '../../assets/images/icon-tet/sticky-right-1.png'
// import IconTet2 from '../../assets/images/icon-tet/sticky-right-2.png'

// const HomeTet = (props) => {

//   const dispatch = useDispatch()

//   const { token } = props
//   const state = useLocation()
//   const listCarousel = useSelector((store) => store.home.listCarousel)
//   const listProductHome = useSelector(store => store.home.listProductHome)
//   const listCategory = useSelector((store) => store.product.listCategory)

//   useEffect(() => {
//     dispatch(getCarousel())
//     dispatch(getProductHome())
//   }, [])

//   useEffect(() => {
//     dispatch(getCategory())
//   }, [])

//   listCategory.sort((a, b) => a.sort_order - b.sort_order)

//   const iconTet = 'https://fptshop.com.vn/Content/v5d/sale-special/images/new-year-2022/sticky-right.png?v=5'

//   const ldJson = {
//     "@context": "https://schema.org",
//     "@type": "https://gigadigital.vn",
//     "itemListElement": [
//       {
//         "@type": "ListItem",
//         "position": 1,
//         "name": "Giga Digital",
//         "item": "https://gigadigital.vn"
//       }
//     ],
//     "url": "https://gigadigital.vn",
//     "logo": "https://gigadigital.vn/static/media/Giga-logo.79229c15b9dd11358d9b.png",
//     "hasMap": "https://www.google.com/maps/place/Giga+Digital/@21.0116597,105.8190738,17z/data=!3m1!4b1!4m5!3m4!1s0x3135ab70ef9c0da9:0x3115ff2b1e823b92!8m2!3d21.0116547!4d105.8212625?hl=vi-VN",
//     "address": {
//       "@type": "PostalAddress",
//       "addressLocality": "Đống Đa",
//       "addressRegion": "Hà Nội",
//       "postalCode": "100000",
//       "streetAddress": "55 Thái Hà"
//     },

//     "sameAs": ["https://www.facebook.com/gigadigital.vn"]
//   }

//   return (
//     <>
//       <Helmet>
//         <script type="application/ld+json">
//           {JSON.stringify(ldJson)}
//         </script>
        
//         <script type='text/javascript'>
//           {
//             `
//             var canvas = document.getElementById("canvas"),
//             ctx = canvas.getContext("2d"),
//             things = [],
//             thingsCount = 25,
//             mouse = {
//               x: -100,
//               y: -100
//             },
//             minDist = 25;
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
        
//         // object image
//         var image = new Image();
//         //image.src = 'https://i.pinimg.com/originals/90/2c/2b/902c2bbccb72ca76cf3bbe95741174e9.png';
//          //image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Love_heart_uidaodjsdsew.gif/1200px-Love_heart_uidaodjsdsew.gif';
//          image.src = 'https://fptshop.com.vn/Content/v5d/sale-special/images/new-year-2022/dao.png';
        
//         for (var i = 0; i < thingsCount; i++) {
//           let opacity = Math.random() + 0.4;
//           let thingWidth = (Math.floor(8 * 2) - 28.5) * (opacity + 0.4);
//           let thingHeight = image.naturalHeight / image.naturalWidth * thingWidth;
//           let speed = Math.random() * 1 + 0.5;
//           things.push({
//             width: thingWidth,
//             height: thingHeight,
//             x: Math.random() * canvas.width,
//             y: Math.random() * canvas.height - thingHeight,
//             speed: speed,
//             vY: speed,
//             vX: 0,
//             d: Math.random() * 1.2 - 0.6, // wind or something like that
//             stepSize: (Math.random()) / 20,
//             step: 0,
//             angle: Math.random() * 180 - 90,
//             rad: Math.random(),
//             opacity: opacity,
//             _ratate: Math.random() // ratate 正負
//           });
//         }
        
//         function drawThings() {
//           things.map((thing) => {
//             ctx.beginPath();
//             thing.rad = (thing.angle * Math.PI) / 180;
//             ctx.save();
//             var cx = thing.x + thing.width / 2;
//             var cy = thing.y + thing.height / 2;
//             ctx.globalAlpha = thing.opacity;
//             ctx.setTransform(
//               Math.cos(thing.rad),
//               Math.sin(thing.rad),
//               -Math.sin(thing.rad),
//               Math.cos(thing.rad),
//               cx - cx * Math.cos(thing.rad) + cy * Math.sin(thing.rad),
//               cy - cx * Math.sin(thing.rad) - cy * Math.cos(thing.rad)
//             );
//             ctx.drawImage(image, thing.x, thing.y, thing.width, thing.height);
//             ctx.restore();
//           });
//         }
        
//         function draw() {
//           ctx.clearRect(0, 0, canvas.width, canvas.height);
        
//           drawThings();
//         }
        
//         function update() {
//           things.map((thing) => {
//             var dist = Math.sqrt((thing.x - mouse.x) ** 2 + (thing.y - mouse.y) ** 2);
            
//             if (dist < minDist) {
//               var force = minDist / (dist * dist),
//                   xcomp = (mouse.x - thing.x) / dist,
//                   ycomp = (mouse.y - thing.y) / dist,
//                   deltaV = force * 2; // deplay when hover mouse
        
//               thing.vX -= deltaV * xcomp;
//               thing.vY -= deltaV * ycomp;
              
//               if (thing.d * xcomp > 0) {
//                 thing.d = 0 - thing.d;
//               }
//             } else {
//               thing.vX *= .98;
        
//               if (thing.vY < thing.speed) {
//                 thing.vY = thing.speed
//               }
        
//               thing.vX += Math.cos(thing.step += (Math.random() * 0.5)) * thing.stepSize;
//             }
            
//             thing.y += thing.vY;
//             thing.x += thing.vX + thing.d;
            
//             var _angle = Math.random() + 0.2;
//             // stuff.angle += _angle;
//             if (thing._ratate == 0) {
//               thing.angle += _angle;
//             } else {
//               thing.angle -= _angle;
//             }
            
//             if (thing.y > canvas.height) {
//               reset(thing);
//             }
        
//             if (thing.x > canvas.width || thing.x < (0 - thing.width)) {
//               reset(thing);
//             }
//           });
//         }
        
//         function reset(thing) {
//           thing.opacity = Math.random() + 0.4;
//           thing.width = (Math.floor(8 * 2) - 10) * (thing.opacity + 0.4);
//           thing.height = image.naturalHeight / image.naturalWidth * thing.width;
//           thing.x = Math.floor(Math.random() * canvas.width);
//           thing.y = 0 - thing.height;
//           thing.speed = Math.random() * 1 + 0.05
//           thing.vY = thing.speed;
//           thing.vX = 0;
//           // thing.angle = 0;
//           // thing.size = 0;
//           thing._ratate = Math.random();
//         }
        
//         canvas.addEventListener('mousemove', function(e){
//           mouse.x = e.clientX;
//           mouse.y = e.clientY;
//         });
        
//         function tick() {
//           draw();
//           update();
//           requestAnimationFrame(tick);
//         }
        
//         tick();
//             `
//           }
//         </script>
//       </Helmet>
  
//        <div class="wave-animate">    <canvas id="canvas"></canvas></div> 
//       <div  className={state.pathname === '/' ? 'row homepageTet' :'row homepage'}   >
//         <div className='homepageColor'></div>
//         {listCarousel == null ? (
//           <LoadingHome />
//         ) : (
//           <div className='list-banner'>
//             <div className='event-sticker-cat'>
//               <Link to='' className='item stick-left'>
//                 <img src={IconTet2} className='img-fluid'/>
//               </Link>
//               <Link to='' className='item stick-right'>
//                 <img src={IconTet1} className='img-fluid' />
//               </Link>
//             </div>
//             <Carousel listCarousel={listCarousel} />
//             <div className='featured-category mt-4'>
//               <h1 className='text-uppercase mb-0'><b>Danh mục nổi bật </b></h1>
//               <div className='list-category'>
//                 <aside className='list-category-mobile'>
//                   {
//                     listCategory.map(item => (
//                       <p className='d-inline-block text-center mb-3'>
//                         <Link to={`/${item.slug}`}>
//                           {
//                             item.icon == null ? (
//                               <i className={`fa-2x text-primary fa fa-check`} ></i>

//                             ) : (<img src={`data:image/svg+xml;utf8,${encodeURIComponent(item.icon)}`} />)
//                           }
//                           <p>{item.name}</p>
//                         </Link>
//                       </p>
//                     ))
//                   }
//                 </aside>
//               </div>
//             </div>
//             <div className='compare-list-products p-0 position-relative'>
//               {
//                 listProductHome == null ? (
//                   <Loading />
//                 ) : (
//                   listProductHome.map((item, index) => (
//                     <div key={index}>
//                       {
//                         item.product.length > 0 && (
//                           <div className='compare-title'>
//                             <div className='mt-4'>
//                               {
//                                 item.link_image ? (
//                                   <a href={`/${item.link_image}`}>
//                                     <img
//                                       width={1296}
//                                       height={220}
//                                       src={checkImage(item.images)}
//                                       alt={item.name}
//                                       className='w-100 h-100'
//                                     />
//                                   </a>
//                                 ) : (
//                                   <img
//                                     width={1296}
//                                     height={220}
//                                     src={checkImage(item.images)}
//                                     alt={item.name}
//                                     className='w-100 h-100'
//                                   />
//                                 )
//                               }

//                             </div>
//                             <div className='d-flex align-items-center'>
//                               <a href={`/${item.slug}`}>
//                                 <div className={state.pathname === '/' ? 'compare-header-title-tet' : 'compare-header-title'} >
//                                   <h2 className='text-uppercase mb-0 text-red'><b>{item.name}</b></h2>
//                                 </div>
//                               </a>
//                               <div className='text-right list-subCategory'>
//                                 {item.subCategory && item.subCategory.map((ele, index) => (
//                                   <a href={`/${ele.slug}`} className='d-inline-block mr-5'>
//                                     <div className='compare-header-title-child'>
//                                       <p className=' mb-0 small-text text-white'>{ele.name}</p>
//                                     </div>
//                                   </a>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                         )
//                       }
//                       <div className='data-item-desktop'>
//                         <ScrollAnimation
//                           offset={1000}
//                           animateIn='slideInUp'
//                           duration={0.6}
//                           delay={-500}
//                           animateOut='slideInUp'
//                           animateOnce={true}
//                         >
//                           {item.product && item.product.map((ele, index) => (
//                             <ItemProducts ele={ele} index={index} token={token} />
//                           ))}

//                         </ScrollAnimation>
//                       </div>
//                       <div className='data-item-mobile'>
//                         <Slider
//                           {...settingsHome}
//                           slidesToShow={item.data == undefined || item.data.length >= 2 ? 2 : item.data.length}
//                         >
//                           {item.product && item.product.map((ele, index) => (
//                             <ItemProducts ele={ele} index={index} token={token} />
//                           ))}
//                         </Slider>
//                       </div>
//                     </div>
//                   ))
//                 )
//               }
//             </div>
//           </div>
//         )}
//       </div>
//     </>

//   )
// }

// export default HomeTet

// const ItemProducts = (props) => {

//   const { ele, index, token } = props

//   return (
//     <div className='compare-list-detail'>
//       <a key={index} className='compare-list-item text-center' href={`/${ele.categorySlug}/${ele.slug}`}>
//         {
//           (ele.price == 0 || 100 - ((parseInt(ele.price) / parseInt(ele.original_price)) * 100).toFixed(0) == 0 ? ('') : (
//             <div className='percent-reduction ribbon-top-right d-inline-block'>
//               <span>-  {100 - ((parseInt(ele.price) / parseInt(ele.original_price)) * 100).toFixed(0)}%</span>
//             </div>
//           ))
//         }
//         <div className='compare-list-item-image'>
//           <img
//             src={checkImage(ele.thumb)}
//             alt={ele.name}
//             className='w-100 h-100'
//             width={450}
//             height={450}

//           />
//         </div>
//         <div className='compare-list-item-info mt-3'>
//           <h3>{ele.name}</h3>
//           {ele.price == ele.original_price ? (
//             <h4>
//               {(token && (token.type === 'erp' || token.type === 'vip')) ? (
//                 <span className='text-red'>
//                   <b>
//                     {
//                       ele.vesion_detail[0] && (
//                         (!ele.vesion_detail[0].erp_price || ele.vesion_detail[0].erp_price == 0) ? 'Giá liên hệ' : checkNumber(ele.vesion_detail[0].erp_price)
//                       )
//                     }
//                   </b>
//                 </span>
//               ) : (
//                 <span className='text-red'><b>{(ele.price) == 0 ? 'Giá liên hệ' : checkNumber(ele.price)}</b></span>
//               )}

//             </h4>
//           ) : (
//             (token && (token.type === 'erp' || token.type === 'vip')) ? (
//               ele.vesion_detail.length > 0 && (
//                 <h4><span className='text-red'><b>{(ele.vesion_detail[0].erp_price) <= 0 && ele.vesion_detail[0].stock <= 0 ? 'Giá liên hệ' : (ele.vesion_detail[0].erp_price != undefined) ? checkNumber(parseInt(ele.vesion_detail[0].erp_price)) : checkNumber(parseInt(ele.price))} </b>
//                 </span><span className='text-decoration-line-through '>{checkNumber(ele.original_price)} </span>
//                 </h4>
//               )
//             ) : (
//               <h4><span className='text-red'><b>{(ele.price) == 0 ? 'Giá liên hệ' : checkNumber(ele.price)} </b>
//               </span><span className='text-decoration-line-through '>{checkNumber(ele.original_price)} </span>
//               </h4>
//             )
//           )
//           }
//         </div>
//       </a>
//     </div>
//   )
// }