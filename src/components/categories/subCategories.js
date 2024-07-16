import React, { useEffect, useState, useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { Helmet } from "react-helmet"
import ReactHtmlParser from 'react-html-parser'
import { getListProduct, getCategoryBySlug, getCategoryByDetail } from "../../redux/product/action"

import Loading from "../notification/loading"
import LeftCategories from "./leftCategories"
import RightCategories from "./rightCategories"
import CategoriesMobile from "./categoriesMobile"
import Preferential from "../home/preferential"

const defaultPerPage = 20

const SubCategories = () => {

  const dispatch = useDispatch()

  const { categorySlugData, childSlug } = useParams()

  const history = useHistory()

  const listProduct = useSelector((store) => store.product.listProduct)
  const listCategorySlug = useSelector((store) => store.product.listCategorySlug)
  const listSubCategory = useSelector((store) => store.product.listCategoryDetail)

  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(defaultPerPage)
  const [filter, setFilter] = useState([])
  const [sort, setSort] = useState({ sort_order: 1, _id: 1 })
  const [priceName, setPriceName] = useState(null)
  const [sortName, setSortName] = useState(null)
  const [brandName, setBrandName] = useState(null)
  const [showLess, setShowLess] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    dispatch(getCategoryBySlug(childSlug))
  }, [childSlug])

  useEffect(() => {
    if (listCategorySlug && listCategorySlug._id) {
      dispatch(getCategoryByDetail(listCategorySlug._id))
    }
  }, [listCategorySlug])

  useEffect(() => {
    window.scrollTo(0, 0)
    const scrollTopNextPage = window.setTimeout(() => {

      const params = {
        type: "chidrenCategorySlug",
        slug: childSlug,
        page: page,
        perPage: perPage,
        sort: sort
      }
      const newFilter = Object.values(filter)

        dispatch(getListProduct(params, newFilter))
      dispatch({ type: 'CLEAR_LIST_PRODUCT' })
    }, 300)

    return () => window.clearTimeout(scrollTopNextPage)

  }, [listCategorySlug, childSlug, page,  filter, sort])


  useEffect(() => {
    setFilter([])
    setSort({ sort_order: 1, _id: 1 })
    setPriceName(null)
    setSortName(null)
    setBrandName(null)
    setPage(1)
    setPerPage(defaultPerPage)
  }, [childSlug])

  const moreButton = {
    textOverflow: "ellipsis",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    maxHeight: 300,
  }
  useLayoutEffect(() => {
    // Kiểm tra kích thước màn hình ở đây 992px 
    const isMobileView = window.innerWidth <= 992

    setIsMobile(isMobileView)

    // Nếu màn hình lớn hơn 767px và URL đang ở `/danh-muc`, chuyển về trang chủ.
    if (!isMobileView && window.location.pathname === '/danh-muc') {
      history.push('/')
    }
  }, [])


  return (
    <div className="categories">
      {
        listCategorySlug && (
          <Helmet >
            <title>{listCategorySlug.title}</title>
            <meta property="description" name="description" content={listCategorySlug.description} />
          </Helmet>
        )
      }
      {  (!listProduct.data || listProduct.data.length == 0) && <Loading />}
      {childSlug === 'danh-muc' ? (
        <CategoriesMobile />
      ) : (
        <>
          {
            (!listProduct.data || listProduct.data.length == 0) && <Loading />
          }
          <div className='compare-list-products mt-4'>
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-3 d-none d-md-block">
                  <LeftCategories listCategorySlug={listCategorySlug} listSubCategory={listSubCategory} />
                </div>
                <div className="col-md-9">
                  <RightCategories
                    listProduct={listProduct}
                    filter={filter}
                    setFilter={setFilter}
                    priceName={priceName}
                    setPriceName={setPriceName}
                    setSort={setSort}
                    sortName={sortName}
                    setSortName={setSortName}
                    brandName={brandName}
                    setBrandName={setBrandName}
                    page={page}
                    setPage={setPage}
                    perPage={perPage}
                    setPerPage={setPerPage}
                  />
                </div>
                <div className="col-md-3 d-block d-md-none">
                  <LeftCategories listCategorySlug={listCategorySlug} listSubCategory={listSubCategory} />
                </div>
              </div>
            </div>
          </div>

          {listCategorySlug && listCategorySlug.description_footer && (
            <div className="description-footer">
              <div className={showLess ? 'detail-description' : 'detail-description-collapse'} style={showLess ? moreButton : null}>
                <p>{ReactHtmlParser(listCategorySlug && listCategorySlug.description_footer)}</p>
              </div>

              <div className={showLess ? 'text-center button-action-more position-relative' : 'text-center button-action-more-collapse position-relative'}>
                <div class="bg-article"></div>
                <button type='button' onClick={() => setShowLess(!showLess)} className='button-read bg-transparent'>
                  <span>{showLess ? "⬇ Xem thêm" : "⬆ Thu gọn"}</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}

    </div>
  )
}

export default SubCategories





