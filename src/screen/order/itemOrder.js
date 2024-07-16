import React, { useEffect, useLayoutEffect, useState } from 'react'
import Countdown from "react-countdown"
import { Input, Label } from 'reactstrap'

import IconFlashSale from "../../assets/images/logo-flashSale_1.png"
import { checkNumber, checkImage } from '../../utilities/checkNumber'
import jwt_decode from "jwt-decode"
import logoTrash from '../../assets/imgs/icon-header/delete.svg'

const today = new Date()

const ItemOrder = (props) => {

  const { index, item, listCartNew, setListCartNew, onHandleDelete, buyNow, token } = props

  const [qty, setQty] = useState(item.qty)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    let newArr = [...listCartNew]
    newArr[index] = {
      name: item.name,
      thumb: item.thumb,
      qty: qty,
      version_detail: item.version_detail,
      id: item.id,
      slug: item.slug,
      bao_hanh: item.bao_hanh,
      thong_tin_bao_hanh: item.thong_tin_bao_hanh,
      flashSale_status: item.flashSale_status,
      flashSale_title: item.flashSale_title,
      flashSale_end_date: item.flashSale_end_date
    }
    setListCartNew(newArr)
  }, [qty])

  useLayoutEffect(() => {
    const isMobileView = window.innerWidth <= 767
    setIsMobile(isMobileView)
  }, [])

  const subQty = () => {
    if (qty > 1) setQty(qty - 1)
  }

  const addQty = () => {
    setQty(qty + 1)
  }

  let decoded
  if (token) { decoded = jwt_decode(token) }

  const renderer = (props) => {
    const { days, hours, minutes, seconds, completed } = props
    if (completed) {
      window.location.reload(false)
    } else {
      return (
        <div className="d-flex align-items-center countdown">
          {days > 0 && <><strong>{days < 10 ? "0" + days : days}</strong><span>:</span></>}<strong>{hours < 10 ? "0" + hours : hours}</strong><span>:</span><strong>{minutes < 10 ? "0" + minutes : minutes}</strong><span>:</span><strong>{seconds < 10 ? "0" + seconds : seconds}</strong>
        </div>
      )
    }
  }

  return (
    isMobile === true ? (
      <div className='item-cart-mobile'>
        <div className='box-item'>
          {buyNow === true ? ('') : (
            <div className='flex-1' style={{ width: 50 }}>
              <div className='text-center'>
                <button className='btn bg-transparent p-0' onClick={() => onHandleDelete(item.id)}>
                  <img src={logoTrash} width={25} />
                </button>
              </div>
            </div>
          )}
          <div className='d-flex'>
            <div className='image-product float-start'>
              <img src={checkImage(item.thumb)} width={100} height={100} style={{ objectFit: 'contain' }} />
            </div>
            <div className='product-content ms-3'>
              <h6 className='text-primary'>{item.name}</h6>
              <label className='version d-inline-flex align-items-center'>
                <span className='text-title'>Phiên bản: {item.version_detail.name}</span>
              </label>
              <div className='d-flex align-items-center justify-content-between mt-3'>
                <span className='text-red fw-bold d-inline-flex align-items-center'>
                {
                (token && (decoded.type == 'erp' || decoded.type == 'vip')) ? (
                  checkNumber(item.version_detail.erp_price ? item.version_detail.erp_price : item.version_detail.price * qty)
                ) : (
                  <>
                    {
                      (item.flashSale_status && (today < item.flashSale_end_date)) ? (
                        qty > parseInt(item.version_detail.stock_flashsale) ? checkNumber(item.version_detail.price * qty) : checkNumber(item.version_detail.price_flashsale * qty)
                      ) : (
                        checkNumber(item.version_detail.price * qty)
                      )
                    }
                  </>
                )
              }
                </span>
                {
                  (item.flashSale_status && (today < item.flashSale_end_date)) && (
                    <div className="flash-sale-banner position-relative ml-10 mt-2">
                      <div className="d-flex list-detail position-absolute">
                        <img className="img-fluid w-30 icon-img" src={IconFlashSale} />
                        <div className="d-flex align-items-center">
                          <i className="fa fa-clock mr-5 text-white"></i>
                          <span className="mr-10">Kết thúc trong</span>
                          <Countdown date={item.flashSale_end_date} renderer={renderer} />
                        </div>
                      </div>
                    </div>
                  )
                }
                <div className='d-flex align-items-center'>
                <button className='btn btn-minus' onClick={subQty}><span>-</span></button>
                <div className='btn input-number'>
                  <input type='number' className='form-control text-center' min={1} value={qty} onChange={() => setQty(qty)}/>
                </div>
                <button className='btn btn-plus' onClick={addQty}><span>+</span></button>
              </div>
              </div>
            
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className='padding-product'>
        <div className='d-grid data-item-mobile' style={{ gridTemplateColumns: buyNow == 'true' ? '5fr 2fr 2fr 2fr 2fr' : '' }}>
          <div className='flex-5 d-flex align-items-center'>
            <input type={'checkbox'} className='mr-15 float-left' />
            <div className='image-product float-left'>
              <img src={checkImage(item.thumb)} style={{ width: 100, height: 100, objectFit: 'contain' }} />
            </div>
            <h6 className='ml-10 text-primary float-left'>{item.name}</h6>
          </div>

          <div className='flex-2 price text-center'>
            <span className='fw-500 text-primary h-100 d-inline-flex align-items-center'>
              {
                (token && (decoded.type == 'erp' || decoded.type == 'vip')) ? (
                  checkNumber(item.version_detail.erp_price ? item.version_detail.erp_price : item.version_detail.price)
                ) : (
                  <>
                    {
                      (item.flashSale_status && (today < item.flashSale_end_date)) ? (
                        qty > parseInt(item.version_detail.stock_flashsale) ? checkNumber(item.version_detail.price) : checkNumber(item.version_detail.price_flashsale)
                      ) : (
                        checkNumber(item.version_detail.price)
                      )
                    }
                  </>
                )
              }
            </span>
            {
              (item.flashSale_status && (today < item.flashSale_end_date)) && (
                <div className="flash-sale-banner position-relative ml-10 mt-2">
                  <div className="d-flex list-detail position-absolute">
                    <img className="img-fluid w-30 icon-img" src={IconFlashSale} />
                    <div className="d-flex align-items-center">
                      <i className="fa fa-clock mr-5 text-white"></i>
                      <span className="mr-10">Kết thúc trong</span>
                      <Countdown date={item.flashSale_end_date} renderer={renderer} />
                    </div>
                  </div>
                </div>
              )
            }
          </div>
          <div className='flex-2 content-product text-center justify-content-center d-flex align-items-center'>
            <div className='d-flex align-items-center border-bottom'>
              <button className='btn btn-minus' onClick={subQty}><span>-</span></button>
              <div className='btn input-number'>
                <Input type='number' className='text-center' min={1} value={qty} onChange={() => setQty(qty)} style={{ width: 50 }} />
              </div>
              <button className='btn btn-plus' onClick={addQty}><span>+</span></button>
            </div>

          </div>
          <div className='flex-1 text-center'>
            <Label className='version d-inline-flex h-100 align-items-center'>
              <span className=' align-items-center text-primary'>{item.version_detail.name}</span>
            </Label>
          </div>
          <div className='flex-1 text-center'>
            <span className='text-primary h-100 d-inline-flex align-items-center'>
              {
                (token && (decoded.type == 'erp' || decoded.type == 'vip')) ? (
                  checkNumber(item.version_detail.erp_price ? item.version_detail.erp_price : item.version_detail.price * qty)
                ) : (
                  <>
                    {
                      (item.flashSale_status && (today < item.flashSale_end_date)) ? (
                        qty > parseInt(item.version_detail.stock_flashsale) ? checkNumber(item.version_detail.price * qty) : checkNumber(item.version_detail.price_flashsale * qty)
                      ) : (
                        checkNumber(item.version_detail.price * qty)
                      )
                    }
                  </>
                )
              }
            </span>
          </div>
          <div className='flex-1' style={{ width: 80 }}>
            {
              buyNow == 'true' ?
                <div></div> :
                <div className='align-middle d-flex justify-content-center h-100'>
                  <button
                    className='btn bg-transparent'
                    onClick={() => onHandleDelete(item.id || item.productId)}
                  >
                    <img src={logoTrash} width={25} />
                  </button>
                </div>
            }
          </div>
        </div>
      </div>
    )

  )
}
export default ItemOrder