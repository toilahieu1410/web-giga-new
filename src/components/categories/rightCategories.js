import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { checkImage, checkNumber } from "../../utilities/checkNumber"
import Paginations from '../../components/layout/pagination'
import ReactHtmlParser from 'react-html-parser'
import { postCart } from '../../redux/order/action'
import { addCartNotUserFunc } from '../../utilities/orderNotUser'
import NoImage from '../../assets/imgs/no-image.png'

const RightCategories = (props) => {

  const { token } = props
  const { listProduct,

    filter,
    setFilter,
    priceName,
    setPriceName,
    setSort,
    sortName,
    setSortName,
    brandName,
    setBrandName,
    page,
    setPage,
    perPage,
    setPerPage } = props

  const dispatch = useDispatch()

  const [showGrid, setShowGrid] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }


  const addCart = (id, vesionDetail) => {
    const body = {
      productId: id,
      versionDetail: vesionDetail.length > 0 ? vesionDetail[0] : {}
    }
    dispatch(postCart(body))
  }

  const addCartNotUser = (id, vesionDetail) => {
    const body = {
      productId: id,
      versionDetail: vesionDetail.length > 0 ? vesionDetail[0] : {},
      qty: 1
    }
    addCartNotUserFunc(body)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])


  return (
    <div className='flex-4'>
      <div className="list-search d-flex align-items-center ">
        <h5 className="d-inline-block mb-0 flex-1"><b className="text-primary">Lọc danh sách:</b></h5>
        {
          listProduct && (
            <FilterProduct
              brand={listProduct.brand}
              filter={filter}
              setFilter={setFilter}
              setSort={setSort}
              priceName={priceName}
              setPriceName={setPriceName}
              sortName={sortName}
              setSortName={setSortName}
              brandName={brandName}
              setBrandName={setBrandName}
              showGrid={showGrid}
              setShowGrid={setShowGrid}
              perPage={perPage}
              setPerPage={setPerPage}
              countProductPage = {listProduct.data?.length}
              countProduct={listProduct.count}
            />
          )
        }
      </div>
      <div className={listProduct && listProduct.data == undefined || listProduct.data == 0 ? 'compare-list-empty' : 'compare-list-detail '}>
        <div className={(listProduct && listProduct.data == undefined || listProduct.data.length < 5) &&  showGrid ? 'fewProducts row' : !showGrid ? 'listDataProduct row ' : 'listDataProduct row d-block'}>
          {listProduct && listProduct.data && listProduct.data.map((item, index) => (
            !showGrid ? (
              <GridItemCategories item={item} token={token} index={index} key={index} addCart={addCart} addCartNotUser={addCartNotUser} />
            ) : (
              <ListItemCategories item={item} token={token} index={index} key={index} addCart={addCart} addCartNotUser={addCartNotUser} />
            )
          ))}
        </div>
      </div>
      <div className="mt-3">
        <Paginations page={page} setPage={setPage} perPage={perPage} totalItem={listProduct.count} />
      </div>
    </div>
  )
}

export default RightCategories

const GridItemCategories = (props) => {

  const { item, token, index, addCart, addCartNotUser } = props

  return (
    <Link key={index} className='compare-list-item  ' to={`/${item.categorySlug}/${item.slug}`}>
      <div className="compare-data position-relative mt-4">
        {
          (item.price == 0 ? ('') : (<div className='percent-reduction ribbon-top-right d-inline-block'><span> - {100 - ((parseInt(item.price) / parseInt(item.original_price)) * 100).toFixed(0)}%</span></div>))
        }
        {item.thumb === null ? (
          <div className='compare-list-item-image'>
            <img className='w-100 h-100' src={NoImage} alt={item.name} width={1000} height={1000} />
          </div>
        ) : (
          <div className='compare-list-item-image'>
            <img className='w-100 h-100' src={checkImage(item.thumb)} alt={item.name} width={1000} height={1000} />
          </div>
        )}

        <div className='compare-list-item-info mt-3'>
          <p className="text-title text-brand">{item.brand}</p>
          <h3 className="text-primary mt-2">{item.name}</h3>
          {item.price == item.original_price ? (
            (token && (token.type === 'erp' || token.type === 'vip')) ? (
              <h4>
                <span className='text-red'>

                  {
                    item.vesion_detail[0] && (
                      (!item.vesion_detail[0].erp_price || item.vesion_detail[0].erp_price == 0) ? 'Giá liên hệ' : checkNumber(item.vesion_detail[0].erp_price)
                    )
                  }

                </span>
              </h4>
            ) : (
              <h4>
                <span className='text-red'>{item.price == 0 ? <span className="text-red">Giá liên hệ</span> : checkNumber(item.price)}</span>
                &nbsp;&nbsp;<span className='text-title text-decoration-line-through' style={{ fontSize: 14 }}>{item.original_price == 0 ? '' : checkNumber(item.original_price)}  </span>
              </h4>
            )

          ) : (
            (token && (token.type === 'erp' || token.type === 'vip')) ? (
              item.vesion_detail.length > 0 && (
                <h4><span className='text-primary'>{item.vesion_detail[0].erp_price == 0 && item.vesion_detail[0].stock <= 0 ? 'Giá liên hệ' : (item.vesion_detail[0].erp_price != undefined) ? checkNumber(parseInt(item.vesion_detail[0].erp_price)) : checkNumber(item.price)}
                </span>&nbsp;&nbsp;<span className='text-title text-decoration-line-through'>{checkNumber(item.original_price)}</span>
                </h4>
              )

            ) : (
              <h4>
                <span className='text-red me-2'>{item.price == 0 ? 'Giá liên hệ' : checkNumber(item.price)}</span>
                
                <span className='text-title text-decoration-line-through'>{checkNumber(item.original_price)}</span>
              </h4>
            )
          )}

          {
            token ? (
              item.in_stock === 0 ? (
                <button disabled className='btn hoplongtech-btn-primary rounded w-100'>
                  <span className='text-white fw-500'>Liên hệ</span>
                </button>
              ) : (

                <button onClick={() => addCart(item._id, item.vesion_detail)} className='btn hoplongtech-btn-primary rounded w-100'>
                  <span className='text-white fw-500'>Thêm giỏ hàng</span>
                </button>
              )

            ) : (

              item.in_stock === 0 || item.price === 0 ? (
                <button disabled className='btn hoplongtech-btn-primary rounded w-100'>
                  <span className='text-white fw-500'>Liên hệ </span>
                </button>
              ) : (
                <button onClick={() => addCartNotUser(item._id, item.vesion_detail)} className='btn hoplongtech-btn-primary rounded w-100'>
                  <span className='text-white fw-500'>Thêm giỏ hàng</span>
                </button>
              )
            )
          }

          <div className='specifications'>
            {
              ReactHtmlParser(item.thong_so_ky_thuat)
            }
          </div>
        </div>
      </div>
    </Link>
  )
}

const ListItemCategories = (props) => {

  const { item, token, addCart, addCartNotUser } = props

  return (
    <div className="data-products ">
      <div className="list-products-horizontal position-relative mt-4">
        {
          (item.price == 0 ? ('') : (<div className='percent-reduction ribbon-top-right d-inline-block'><span> - {100 - ((parseInt(item.price) / parseInt(item.original_price)) * 100).toFixed(0)}%</span></div>))
        }
        <div className="float-left w-25">
          <Link className='compare-list-item-image ' to={`/${item.categorySlug}/${item.slug}`}>
            {item.thumb === null ? (
              <img className="w-100" src={NoImage} alt={item.name} />
            ) : (
              <img width={200} height={180} src={checkImage(item.thumb)} alt={item.name} />
            )}
          </Link>
        </div>

        <div className="compare-list-item-info d-table-cell">
          <p className="text-title text-brand">{item.brand}</p>
          <Link className="header-title-compare" to={`/${item.categorySlug}/${item.slug}`}>
            <h4 className="text-primary">{item.name}</h4>
          </Link>
          <div>
            {item.price == item.original_price ? (
              (token && (token.type === 'erp' || token.type === 'vip')) ? (
                <h4>
                  <span className='text-primary'>
                    <b>
                      {
                        item.vesion_detail[0] && (
                          (!item.vesion_detail[0].erp_price || item.vesion_detail[0].erp_price == 0) ? 'Giá liên hệ' : checkNumber(item.vesion_detail[0].erp_price)
                        )
                      }
                    </b>
                  </span>
                </h4>
              ) : (
                <h4>
                  <span className='text-primary'><b>{item.price == 0 ? 'Giá liên hệ' : checkNumber(item.price)}</b></span>
                  &nbsp;&nbsp;<span className='text-title text-decoration-line-through' style={{ fontSize: 14 }}>{item.original_price == 0 ? '' : checkNumber(item.original_price)}  </span>
                </h4>
              )
            ) : (
              (token && (token.type === 'erp' || token.type === 'vip')) ? (
                item.vesion_detail.length > 0 && (
                  <h4><span className='text-primary'>{item.vesion_detail[0].erp_price == 0 && item.vesion_detail[0].stock <= 0 ? 'Giá liên hệ' : (item.vesion_detail[0].erp_price != undefined) ? checkNumber(parseInt(item.vesion_detail[0].erp_price)) : checkNumber(item.price)}
                  </span>&nbsp;&nbsp;<span className='text-title text-decoration-line-through'>{checkNumber(item.original_price)}</span>
                  </h4>
                )

              ) : (
                <h4>
                  <span className='text-red d-inline-block'>{item.price == 0 ? 'Giá liên hệ' : checkNumber(item.price)}</span>
                  &nbsp;&nbsp;
                  <span className='text-title text-decoration-line-through'>{checkNumber(item.original_price)}</span>
                </h4>
              )
            )}
          </div>

          <div className='specifications mb-3'>
            {
              ReactHtmlParser(item.thong_so_ky_thuat)
            }
          </div>
          {
            token ? (
              item.in_stock === 0 ? (
                <button disabled className='btn hoplongtech-btn-primary rounded button-add-cart'>
                  <span className='text-white fw-500'>Liên hệ</span>
                </button>
              ) : (
                <button onClick={() => addCart(item._id, item.vesion_detail)} className='btn hoplongtech-btn-primary rounded button-add-cart'>
                  <span className='text-white fw-500'>Thêm giỏ hàng</span>
                </button>
              )

            ) : (
              item.in_stock === 0 ? (
                <button disabled className='btn hoplongtech-btn-primary rounded button-add-cart'>
                  <span className='text-white fw-500'>Liên hệ</span>
                </button>
              ) : (
                <button onClick={() => addCartNotUser(item._id, item.vesion_detail)} className='btn hoplongtech-btn-primary rounded button-add-cart'>
                  <span className='text-white fw-500'>Thêm giỏ hàng</span>
                </button>
              )
            )
          }
        </div>
      </div>
    </div>
  )
}

const FilterProduct = (props) => {

  const { brand, filter, setFilter, setSort, priceName, setPriceName, sortName, setSortName, brandName, setBrandName, showGrid, setShowGrid, perPage, setPerPage, countProduct, countProductPage } = props

  return (
    <div className="nowrap d-flex align-items-center">
      <span className="text-primary hidden-mobile">Hiển thị {perPage > countProduct ? countProduct : countProductPage} trên {countProduct} sản phẩm</span>
      <ul className="list-unstyled d-inline-flex mb-0">
        <li className="list-search-category text-primary">Hãng&nbsp;<span>{brandName && `: ${brandName}`}</span>&nbsp;<i className="fa fa-caret-down"></i>
          <Brand data={brand} filter={filter} setFilter={setFilter} setBrandName={setBrandName} />
        </li>
        <li className="list-search-category text-primary">Giá&nbsp;<span>{priceName && `: ${priceName.name}`}</span>&nbsp;<i className="fa fa-caret-down"></i>
          <Price setFilter={setFilter} setPriceName={setPriceName} />
        </li>
        <li className="list-search-category text-primary">Sắp xếp&nbsp;<span>{sortName && `: ${sortName.name}`}</span>&nbsp;<i className="fa fa-caret-down"></i>
          <Sort setSort={setSort} setSortName={setSortName} />
        </li>
        <li className="list-search-category text-primary show">Show&nbsp;{perPage && `: ${perPage}`}<span></span>
          <ShowItems perPage={perPage} setPerPage={setPerPage} />
        </li>
      </ul>
      <div className="d-flex align-items-center justify-content-between">
        <span className="text-primary show-mobile">Hiển thị {perPage > countProduct ? countProduct : perPage} trên {countProduct} sản phẩm</span>
        <div className="d-flex align-items-center list-button">
          <button
            className={!showGrid ? 'btn btn-active ' : 'btn btn-default'}
            onClick={() => setShowGrid(false)}
          >
            <i className={!showGrid ? 'fa fa-th-large orange' : 'fa fa-th-large text-primary'}></i>
          </button>
          &nbsp;&nbsp;
          <button
            className={showGrid ? 'btn btn-active' : 'btn btn-default '}
            onClick={() => setShowGrid(true)}
          >
            <i className={showGrid ? 'fa fa-bars orange' : 'fa fa-bars text-primary'}></i>
          </button>
        </div>
      </div>

    </div>

  )
}

const Brand = (props) => {

  const { data, filter, setFilter, setBrandName } = props

  const onChange = (item) => {
    setFilter(old => [...old, { brand: item }])
    setBrandName(item)
  }

  const totalBrand = () => {
    const data = filter.filter(item => item == item['brand'])
    setFilter(data)
    setBrandName('Xem tất cả')
  }

  return (
    <div className="sub-list-search position-absolute">
      <div className="d-inline-block sub-list-search-child">
        <ul className="list-unstyled d-inline-block mb-0">
          {
            data && data.map((item, index) => (
              <li key={index} className="">
                <button type="button" onClick={() => onChange(item)} className="sub-child bg-transparent border-0 text-primary">{item}</button>
              </li>
            ))
          }
          <li className="">
            <button onClick={() => totalBrand()} className="sub-child bg-transparent border-0 text-primary">Xem tất cả</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

const Price = (props) => {

  const { setFilter, setPriceName } = props

  const list = [
    { name: 'Dưới 1 triệu', value: { price: { '$lte': 1000000 } } },
    { name: '1-5 triệu', value: { price: { "$gte": 1000000, '$lte': 5000000 } } },
    { name: '5-7 triệu', value: { price: { "$gte": 5000000, '$lte': 7000000 } } },
    { name: '7-10 triệu', value: { price: { "$gte": 7000000, '$lte': 10000000 } } },
    { name: 'Trên 10 triệu', value: { price: { "$gte": 10000000 } } },
    { name: 'Xem tất cả', value: { price: { "$gte": 0 } } }
  ]

  const onChange = (item) => {
    setFilter(old => [...old, item.value])
    setPriceName(item)
  }

  return (
    <div className="sub-list-search position-absolute ">
      <div className="d-inline-block sub-list-search-child">
        {
          list && list.map((item, index) => (
            <ul key={index} className="list-unstyled d-list-product mb-0">
              <li>
                <button onClick={() => onChange(item)} className="sub-child bg-transparent border-0 text-primary">{item.name}</button>
              </li>
            </ul>
          ))
        }
      </div>
    </div>
  )
}

const Sort = (props) => {

  const { setSort, setSortName } = props

  const onChange = (item) => {
    setSort(item.value)
    setSortName(item)
  }

  const list = [
    { name: 'Giá thấp đến cao', value: { "price": 1 } },
    { name: 'Giá cao đến thấp', value: { "price": -1 } },
    { name: 'Mới cập nhật', value: { "createdAt": -1 } },
    { name: 'Sản phẩm cũ', value: { "createdAt": 1 } }
  ]

  return (
    <div className="sub-list-search position-absolute">
      <div className="d-inline-block sub-list-search-child">
        {
          list && list.map((item, index) => (
            <ul key={index} className="list-unstyled d-list-product mb-0">
              <li className="">
                <button onClick={() => onChange(item)} className="sub-child bg-transparent border-0 text-primary">{item.name}</button>
              </li>
            </ul>
          ))
        }
      </div>
    </div>
  )
}

const ShowItems = ({ perPage, setPerPage }) => {

  const list = [20, 28, 36]

  return (
    <div className="sub-list-search position-absolute ">
      <div className="d-inline-block sub-list-search-child-count">
        <ul className="list-unstyled d-list-product mb-0">
          {list.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => setPerPage(item)}
                className={`sub-child bg-transparent border-0 ${item === perPage ? "text-primary fw-bold" : ""
                  }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}