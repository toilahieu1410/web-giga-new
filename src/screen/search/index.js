import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, Link } from 'react-router-dom'
import { getSearchProduct } from '../../redux/product/action'
import { Col } from 'reactstrap'
import { checkImage, checkNumber } from "../../utilities/checkNumber"
import Paginations from "../../components/layout/pagination"

const perPage = 20

const SearchProduct = (props) => {

  const { token } = props

  const dispatch = useDispatch()
  const { search } = useParams()

  const searchProduct = useSelector(store => store.product.searchProduct)

  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const params = {
      search: search,
      page: page,
      perPage: perPage
    }
    dispatch(getSearchProduct(params))
  }, [search, page])


  return (
    <div className='compare-list-products p-0'>
      {
        searchProduct && (
          <div>
            <Col xs="6" className='header-col-set w-60 search-header mt-2' >
              {
                <p className="mt-2">Tìm được {searchProduct.count} kết quả tương ứng với từ khóa "{searchProduct.keyword}"</p>
              }
            </Col>

            <div className='compare-list-detail detail-search mt-3'>
              {searchProduct.result.map((item, index) => (
                <Link key={index} className='compare-list-item text-center' to={`/${item.categorySlug}/${item.slug}`}>
                  <div className='compare-list-item-image'>
                    <img className='w-100 p-1' src={checkImage(item.thumb)} alt={item.name} />
                  </div>
                  <div className='compare-list-item-info mt-3 '>
                    <h6>{item.name}</h6>
                    {(token && (token.type === 'erp' || token.type === 'vip')) ? (
                      <h6>
                        <span className='text-red'>
                          <span className='fw-bold'>
                            {((item.vesion_detail.length == 0 || item.vesion_detail[0].price == 0 || item.vesion_detail[0].erp_price == 0) && item.vesion_detail[0].stock <= 0) ? 'Giá liên hệ' : (item.vesion_detail[0].erp_price != undefined) ? checkNumber(parseInt(item.vesion_detail[0].erp_price)) : (item.price == 0 ? 'Giá liên hệ' : checkNumber(item.price))}</span>
                        </span>&nbsp;&nbsp;<span className='text-decoration-line-through' style={{ fontSize: 14 }}>{item.original_price == 0 ? '' : checkNumber(item.original_price)} </span>
                      </h6>
                    ) : (
                      item.vesion_detail.length == 0 || item.vesion_detail[0].price == 0 || item.vesion_detail[0].erp_price == 0 ? (
                        <h6><span className='text-red'>
                          <b>Giá liên hệ</b>
                        </span>
                        </h6>
                      ) : (
                        <h6><span className='text-red'>
                          <b>{checkNumber(item.price)}</b>
                        </span>&nbsp;&nbsp;<span className='text-decoration-line-through' style={{ fontSize: 14 }}>{checkNumber(item.original_price)} </span>
                        </h6>
                      )
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <Paginations page={page} setPage={setPage} perPage={perPage} totalItem={searchProduct.count} />
          </div>
        )
      }
    </div>
  )
}

export default SearchProduct