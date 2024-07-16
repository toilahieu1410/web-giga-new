import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom"
import { Range } from 'react-range'
import ReactHtmlParser from 'react-html-parser'
import { getCategoryByDetail, getCategoryBySlug, getListProduct } from "../../redux/product/action"
import Paginations from "../layout/pagination"
import NoImage from '../../assets/imgs/no-image.png'
import { checkImage, checkNumber } from "../../utilities/checkNumber"
import { postCart } from "../../redux/order/action"
import { addCartNotUserFunc } from "../../utilities/orderNotUser"
import IconNoProduct from '../../assets/images/no-product-found.jpg'
import { isEqual } from "lodash"
import { Label } from "reactstrap"
import Loading from "../notification/loading"
import Error404 from "../layout/error404"
import EmptyCart from '../../assets/images/no-product-found.jpg'

const Brand = (props) => {

  const { token } = props

  const dispatch = useDispatch()

  const { slug } = useParams()

  const listProduct = useSelector((store) => store.product.listProduct)
  const listCategorySlug = useSelector((store) => store.product.listCategorySlug)

  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [sort, setSort] = useState({ sort_order: 1 })
  const [listFilter, setListFilter] = useState([])
  const [showGrid, setShowGrid] = useState(false)
  const [priceRange, setPriceRange] = useState([0, null])
  const [countProduct, setCountProduct] = useState(listProduct.count)

  useEffect(() => {
    dispatch(getCategoryBySlug(slug))
  }, [slug])

  useEffect(() => {
    if (listCategorySlug && listCategorySlug._id) {
      dispatch(getCategoryByDetail(listCategorySlug._id))
    }
  }, [listCategorySlug])


  useEffect(() => {
    setIsLoading(true)
    const debouncedFilter = setTimeout(() => {
      const params = {
        type: "brand",
        slug: slug,
        perPage: perPage,
        sort: sort,
      };
      const newFilterList = Object.values(listFilter)
      dispatch(getListProduct(params, newFilterList))
    }, 300)

    return () => {
      clearTimeout(debouncedFilter);
      setIsLoading(false)
    }
  }, [slug, page, perPage, sort, listFilter])


  useEffect(() => {
    const filteredList = listProduct && listProduct.data && listProduct.data.filter((item) => {
      const itemPrice = parseInt(item.price)
      return itemPrice >= priceRange[0] && itemPrice <= priceRange[1]
    })
    setListFilter(filteredList)
  }, [priceRange])


  // const allProductsOnCurrentPage = listProduct && listProduct.data
  //   ? listProduct.data
  //     .sort((a, b) => (parseFloat(a.sort_order) || Infinity) - (parseFloat(b.sort_order) || Infinity))
  //     .slice((page - 1) * perPage, page * perPage)
  //   : [];

  useEffect(() => {
    setListFilter([])
    setSort({ sort_order: 1 })
    setPage(1)
  }, [slug])


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
  // if (listProduct || listProduct.data == undefined) {
  //   return <Error404 />
  // }
  useEffect(() => {
    if (listProduct) {
      setIsLoading(false) // Ẩn hiệu ứng loading khi sản phẩm đã tải xong
    }
  }, [listProduct])

  return (
    <div className="brand">
      <div className="row">
        <div className="col-md-3">
          <div className="sidebar-products-filter">
            <SearchPrice listFilter={listFilter} setListFilter={setListFilter} setPage={setPage} />
          </div>
          <div className="sidebar-products-filter-sort">
            <SearchSort listFilter={listFilter} setSort={setSort} setPage={setPage} />

          </div>
          {console.log(listProduct.brand,'')}
        </div>
        <div className="col-md-9">
          {
            listProduct.length <= 0 || listProduct.data.length <= 0 ? (
              <div className="empty-cart text-center">
                <img src={EmptyCart} width={300} />
                <h5 className="mt-3 text-primary">Không có sản phẩm tương ứng </h5>
              </div>
            ) : (
              isLoading ? (
                <Loading />
              ) : (
                <>
                  <div className="list-searchProducts">
                    <h5 className="fw-bold d-inline-block mb-0">Lọc theo hãng: {listProduct.brand}</h5>
                    <span className="text-title ms-3">{listProduct && listProduct.count <= 0 ? '' : `(${listProduct.count} sản phẩm)`} </span>
                  </div>

                  <div className={listProduct || listProduct.data == undefined || listProduct.data.length == 0 ? "list-empty" : "box_listProductsInBrand"}>
                    <div className={(listProduct || listProduct.data == undefined || listProduct.data.length < 5) && showGrid ? 'fewProducts row' : !showGrid ? 'listDataProduct row ' : 'listDataProduct row d-block'}>
                      {
                        listProduct && listProduct?.data.map((item, index) => (
                          !showGrid ? (
                            <GridItemProducts token={token} item={item} key={index} addCart={addCart} addCartNotUser={addCartNotUser} />
                          ) : (
                            <ListItemProducts token={token} item={item} key={index} />
                          )
                        ))
                      }
                    </div>
                  </div>
                  <div className="mt-3">
                    <Paginations page={page} setPage={setPage} perPage={perPage} totalItem={listProduct.count} />
                  </div>
                </>
              )
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Brand

const SearchPrice = (props) => {

  const { listFilter, setListFilter, setPage } = props

  const listPrice = [
    { name: 'Dưới 1 triệu', value: { price: { '$lte': 1000000 } } },
    { name: '1.000.000đ - 2.000.000đ', value: { price: { "$gte": 1000000, '$lte': 2000000 } } },
    { name: '2.000.000đ - 5.000.000đ', value: { price: { "$gte": 2000000, '$lte': 5000000 } } },
    { name: '5.000.000đ - 10.000.000đ', value: { price: { "$gte": 5000000, '$lte': 10000000 } } },
    { name: 'Trên 10.000.000đ', value: { price: { "$gte": 10000000 } } },
    { name: 'Xem tất cả', value: { price: { "$gte": 0 } } }
  ]


  const onChangeCheckbox = (item) => {
    const checkExists = listFilter.some((element) => isEqual(element, item.value))
    const newFilter = checkExists === true ? [] : [item.value]
    setListFilter(newFilter)
    setPage(1)

  }


  return (
    <>
      <div className="sidebar-head mb-3">
        <h6 className="fw-500 mb-0 text-primary"> Tìm kiếm theo giá</h6>
      </div>
      <div className="sidebar-content">
        {/* <div className="range-slider">
                  {maxPrice > 0 && (
                    <Range
                      step={10000}
                      min={0}
                      max={maxPrice}
                      values={priceRange}
                      onChange={(values) => setPriceRange(values)}
                      renderTrack={({ props, children }) => (
                        <div {...props}
                          style={{
                            ...props.style,
                            height: "6px",
                            width: '100%',
                            backgroundColor: '#ccc'
                          }}
                        >
                          {children}
                        </div>
                      )}
                      renderThumb={({ props }) => (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: "20px",
                            width: "20px",
                            backgroundColor: "#425A8B",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                    />
                  )}

                  <div className="d-flex justify-content-left mt-3">
                    <span className="me-2 h6">Khoảng giá từ:</span>
                    <p className="left-price text-primary fw-bold"> {checkNumber(priceRange[0])}</p>
                    {priceRange[1] !== null && (
                      <>
                        &nbsp;-&nbsp;
                        <p className="right-price text-primary fw-bold">{checkNumber(priceRange[1])}</p>
                      </>
                    )}
                  </div>
                </div> */}
        <div className="checkbox-filter">
          {
            listPrice && listPrice.map((item, index) => (
              <ul key={index} className="list-unstyled d-list-product mb-0">
                <li>
                  <div className="d-flex align-item-center checkbox-data">
                    <input
                      type="checkbox"
                      id={`checkbox-${index}`}
                      defaultChecked
                      checked={listFilter.some((checkedItem) => isEqual(checkedItem, item.value))}
                      onChange={() => onChangeCheckbox(item)}
                    />
                    <Label for={`checkbox-${index}`} className="sub-child bg-transparent border-0">
                      {item.name}
                    </Label>
                  </div>
                </li>
              </ul>
            ))
          }
        </div>
      </div>
    </>
  )
}

const SearchSort = (props) => {
  const { setSort, setPage } = props

  const listSort = [
    { name: 'Giá thấp đến cao', value: { "price": 1 } },
    { name: 'Giá cao đến thấp', value: { "price": -1 } },
    { name: 'Mới cập nhật', value: { "createdAt": -1 } },
    { name: 'Sản phẩm cũ', value: { "createdAt": 1 } }
  ]

  const [checkedItems, setCheckedItems] = useState({});

  const onChangeCheckbox = (item) => {
    setSort(item.value)
    setPage(1)

    setCheckedItems(item.name === checkedItems ? null : item.name);
  }



  return (
    <>
      <div className="sidebar-head mb-3">
        <h6 className="fw-500 mb-0 text-primary">Sắp xếp</h6>
      </div>
      <div className="sidebar-content">

        <div className="checkbox-filter">
          {
            listSort && listSort.map((item, index) => (
              <ul key={index} className="list-unstyled d-list-product mb-0">
                <li>
                  <div className="d-flex align-item-center checkbox-data">
                    <input
                      type="checkbox"
                      id={`checkbox-${index}`}
                      defaultChecked
                      checked={item.name === checkedItems}
                      onChange={() => onChangeCheckbox(item)}
                    />

                    <Label for={`checkbox-${index}`} className="sub-child bg-transparent border-0">
                      {item.name}
                    </Label>
                  </div>
                </li>
              </ul>
            ))
          }
        </div>
      </div>
    </>
  )
}
const GridItemProducts = (props) => {

  const { token, item, index, addCart, addCartNotUser } = props


  return (
    <div className="grid_itemProducts mt-4">
      <div className="product-information position-relative">
        {
          item.price === 0 ? ('') : (<div className="percent  d-inline-block">
            <span>- {100 - ((parseInt(item.price) / parseInt(item.original_price)) * 100).toFixed(0)}%</span>
          </div>)
        }
        {
          item.thumb === null ? (
            <Link to={`/${item.categorySlug}/${item.slug}`} className="product-image d-inline-block">
              <img className="w-100 h-100" src={NoImage} alt={item.name} width={500} height={500} />
            </Link>
          ) : (
            <Link to={`/${item.categorySlug}/${item.slug}`} className="product-image d-inline-block">
              <img className="w-100 h-100" src={checkImage(item.thumb)} alt={item.name} width={500} height={500} />
            </Link>
          )
        }
        <div className="product-info mt-3">
          {/* <p className="text-title title-brand">{item.brand}</p> */}

          <h3 className=" mt-2">
            <Link to={`/${item.categorySlug}/${item.slug}`} className="text-primary">
              {item.name}
            </Link>
          </h3>

          {item.price === item.original_price ? (
            (token && (token.type === 'erp' || token.type === 'vip')) ? (
              <h4>
                <span className="text-red ">{item.vesion_detail[0] ? (
                  (!item.vesion_detail[0].erp_price || item.vesion_detail[0].erp_price == 0) ? 'Giá liên hệ' : checkNumber(item.vesion_detail[0].erp_price)
                ) : item.price == 0 && 'Giá liên hệ'}
                </span>
              </h4>
            ) : (
              <div className="text-price-brand">
                <h4 className="me-2 d-inline-block text-red">{item.price === 0 ? <span className="text-red">Giá liên hệ</span> : checkNumber(item.price)}</h4>
                <span className="text-title text-decoration-line-through">{item.original_price === 0 ? "" : checkNumber(item.original_price)}</span>
              </div>
            )
          ) : (
            (token && (token.type === 'erp' || token.type === 'vip')) ? (
              item.vesion_detail.length > 0 && (
                <div className="text-price-brand">
                  <h4 className="me-2 d-inline-block text-red">{(item.vesion_detail[0].erp_price <= 0 && item.vesion_detail[0].stock <= 0) ? 'Giá liên hệ' : (item.vesion_detail[0].erp_price != undefined) ? checkNumber(parseInt(item.vesion_detail[0].erp_price)) : (item.price == 0 ? 'Giá liên hệ' : checkNumber(item.price))}</h4>
                  <span className="text-title text-decoration-line-through">{item.original_price === 0 ? "" : checkNumber(item.original_price)}</span>
                </div>
              )
            ) : (
              <div className="text-price-brand">
                <h4 className="me-2 d-inline-block text-red">{item.price === 0 ? <span className="text-red">Giá liên hệ</span> : checkNumber(item.price)}</h4>
                <span className="text-title text-decoration-line-through">{item.original_price === 0 ? "" : checkNumber(item.original_price)}</span>
              </div>
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
          <div className="technical-specifications">
            {
              ReactHtmlParser(item.thong_so_ky_thuat)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const ListItemProducts = (props) => {
  return (
    <div className="list_itemProducts">

    </div>
  )
}