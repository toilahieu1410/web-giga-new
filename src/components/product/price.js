
import React from "react"
import { checkNumber } from "../../utilities/checkNumber"
import ImgVip from "../../assets/imgs/ICON-VIP.png"
import BannerFlashSale from "../../assets/images/banner-flash.jpg"
import IconFlashSale from "../../assets/images/logo-flashSale.png"
import Countdown from "react-countdown"
import ImgSale from "../../assets/imgs/icon-sale.png"

const Price = (props) => {

  const { token, filter, productDetail } = props

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
    <div className='product-header-price d-flex align-items-baseline'>
      {
        (token && (token.type == 'erp' || token.type == 'vip')) ? (
          <div className="list-price-vip flex-1">
            <div className="d-flex align-items-center  price-vip">
              <p className="fw-bold text-white mb-0 mr-10 flex-1" style={{ maxWidth: "50px" }}><img src={ImgVip} className='w-100' /></p>
              <div className="d-block border-left-1">
                <div className="price-vip-erp">
                  {(token && (token.type == 'erp' || token.type == 'vip')) && (
                    <div className='product-main-price'>
                      {

                        (filter && filter.erp_price) ? (<p className="text-white text-info">{checkNumber(filter.erp_price)}
                          <span className="hover-detail " data-tooltip="Giá bán chỉ áp dụng cho khách hàng thân thiết của GIGA"><i className="fa fa-info-circle"></i></span>
                        </p>) : ('')
                      }
                    </div>
                  )}
                </div>
                <div className="d-flex align-items-baseline mt-2">
                  <div>
                    {filter != null ? (
                      <div className={!filter.erp_price ? 'product-main-price' : 'product-old-price1 '}>
                        <i className="text-white">
                          <span className="text-decoration-none">Giá bán lẻ: </span>
                          {filter.price ? (filter.price == 0 ? 'Giá liên hệ' : (checkNumber(filter.price))) : checkNumber(productDetail.price)}
                        </i>
                      </div>
                    ) : (
                      <div className='product-old-price1 mx-2'>
                        <i className="text-white">
                          {productDetail && productDetail.vesion_detail && productDetail.vesion_detail.length > 0 ? productDetail.vesion_detail[0].stock <= 0 ? <p className="fw-bold " style={{ fontSize: 22 }}>{productDetail.vesion_detail[0].price == 0 ? 'Giá liên hệ' : checkNumber(productDetail.vesion_detail[0].price)}</p> : checkNumber(parseInt(productDetail.vesion_detail[0].erp_price)) : (<span className="text-decoration-none">Giá liên hệ</span>)}
                        </i>
                      </div>
                    )}
                  </div>
                  <div>
                    {
                      filter != null ? (
                        <p className='product-old-price mx-2'>
                          <i className="text-white text-decoration-line-through">
                            {filter.original_price ? (filter.original_price == 0 ? '' : (checkNumber((filter.original_price)) == checkNumber((filter.price))) ? '' : checkNumber((filter.original_price))) : checkNumber(productDetail.original_price)}
                          </i>
                        </p>
                      ) : (
                        <p className='product-old-price mx-2'>
                          <i className="text-white text-decoration-line-through ">
                            {productDetail.original_price ? (productDetail.original_price == productDetail.price ? '' : checkNumber(productDetail.original_price)) : ''}
                          </i>
                        </p>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="note-details">
              <ul className="pl-20 mb-0">
                <li><p>Mỗi khách hàng được mua 3 sản phẩm.</p></li>
                <li><p>Không áp dụng chung với khuyến mại khác</p></li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="d-flex align-items-baseline justify-content-between w-100">
            {filter != null ? (
              <>
                {
                  productDetail.flashSale_status ? (

                    <div >
                      <div className="d-flex flex-row">
                        <div className='product-main-price mx-2'>
                          {filter.price_flashsale ? (filter.price_flashsale == 0 ? 'Giá liên hệ' : (checkNumber(filter.price_flashsale))) : checkNumber(productDetail.price_flashsale)}
                        </div>
                        <p className='product-old-price mx-2'>
                          <i>
                            {filter.original_price ? (filter.original_price == 0 ? '' : (checkNumber((filter.original_price)) <= checkNumber((filter.price))) ? '' : checkNumber((filter.original_price))) : checkNumber(productDetail.original_price)}
                          </i>
                        </p>
                      </div>
                      <div className="flash-sale-banner position-relative mt-3">
                        <img className="img-fluid w-100 resize-img" src={BannerFlashSale} />
                        <div className="d-flex list-detail position-absolute">
                          <img className="img-fluid w-25  icon-img" src={IconFlashSale} />
                          <div className="d-flex align-items-center">
                            <i className="fa fa-clock mr-5 text-white"></i>
                            <span className="text-uppercase text-white mr-10">Kết thúc trong</span>
                            <Countdown date={productDetail.flashSale_end_date} renderer={renderer} />
                          </div>
                        </div>
                      </div>
                      <div className="note-details">
                        <ul className="pl-20 mb-0">
                          <li><p>Mỗi khách hàng được mua {filter.stock_flashsale == null ? 1 : filter.stock_flashsale} sản phẩm.</p></li>
                          <li><p>Không áp dụng chung với khuyến mại khác</p></li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h6 className="mb-0">Giá sản phẩm:</h6>
                      <div className="d-block">
                        <p><span className="fw-bold" style={{ fontSize: 16 }}>                          {filter.price ? (filter.price == 0 ? 'Giá liên hệ' : (checkNumber(filter.price))) : checkNumber(productDetail.price)}</span>&nbsp;&nbsp;<span className='text-gray text-decoration-line-through'>{filter.original_price ? (filter.original_price == 0 ? '' : (checkNumber((filter.original_price)) == checkNumber((filter.price))) ? '' : checkNumber((filter.original_price))) : checkNumber(productDetail.original_price)}</span></p>
                        {filter.price == 0 ? ('') : (
                          <p className='text-red text-right'>Khuyến mại  {100 - ((parseInt(filter.price) / parseInt(filter.original_price)) * 100).toFixed(0)}%</p>
                        )}
                      </div>
                    </>
                  )
                }
              </>
            ) : (
              <>
                {
                  productDetail.flashSale_status ? (
                    <div>
                      <div className="d-flex flex-row">
                        <div className='product-main-price mx-2'>
                          {productDetail.vesion_detail && (productDetail.vesion_detail.length >= 1 ? (productDetail.vesion_detail[0].price_flashsale == 0 ? 'Giá liên hệ' : (checkNumber(productDetail.vesion_detail[0].price_flashsale))) : ('Giá liên hệ'))}
                        </div>
                        <p className='product-old-price mx-2'>
                          <i>
                            {productDetail.original_price && productDetail.original_price > 0 ? checkNumber(productDetail.original_price) : ''}
                          </i>
                        </p>
                      </div>
                      <div className="flash-sale-banner position-relative mt-3">
                        <img className="img-fluid w-100 resize-img" src={BannerFlashSale} />
                        <div className="d-flex list-detail position-absolute">
                          <img className="img-fluid w-25  icon-img" src={IconFlashSale} />
                          <div className="d-flex align-items-center">
                            <i className="fa fa-clock mr-5 text-white"></i>
                            <span className="text-uppercase text-white mr-10">Kết thúc trong</span>
                            <Countdown date={productDetail.flashSale_end_date} renderer={renderer} />
                          </div>
                        </div>
                      </div>
                      <div className="note-details">
                        <ul className="pl-20 mb-0">
                          <li><p>Mỗi khách hàng được mua {productDetail.vesion_detail[0].stock_flashsale} sản phẩm.</p></li>
                          <li><p>Không áp dụng chung với khuyến mại khác</p></li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h6 className="mb-0">Giá sản phẩm </h6>
                      <div className="d-block">
                        <p><span className="fw-bold" style={{ fontSize: 16 }}>{productDetail.vesion_detail && (productDetail.vesion_detail.length >= 1 ? (productDetail.vesion_detail[0].price == 0 ? 'Giá liên hệ' : (checkNumber(productDetail.vesion_detail[0].price))) : ('Giá liên hệ'))}</span>&nbsp;&nbsp;<span className="text-gray text-decoration-line-through">{productDetail.original_price && productDetail.original_price > 0 && productDetail.vesion_detail.length > 0 ? checkNumber(productDetail.original_price) : ''}</span></p>
                        {productDetail.price == 0 ? ('') : (
                          <p className='text-red text-right'>Khuyến mại  {100 - ((parseInt(productDetail.price) / parseInt(productDetail.original_price)) * 100).toFixed(0)}%</p>
                        )}
                      </div>
                    </>
                
                  )
                }
              
              </>
            )}
            {/* <div className={productDetail.vesion_detail[0].price != 0 ? 'd-flex align-items-center price-user' : 'd-flex align-items-center price-lienhe'}>
            {productDetail.vesion_detail[0].price != 0 && (<div> <p className="fw-bold text-white mb-0 mr-10 flex-1" style={{maxWidth:"80px"}}><img src={ImgSale} className='w-80'/></p>              <div className="vertical-line-middle"></div></div>)}
              <div className="right-price-sale d-flex align-items-center ml-5">
              {filter != null ? (
                <div className='product-main-price mx-2 text-white'>
                  {filter.price ? (filter.price == 0 ? 'Giá liên hệ' : (checkNumber(filter.price))) : checkNumber(productDetail.price)}
                </div>
              ) : (
                <div className='product-main-price mx-2 text-white'>
                  {productDetail && productDetail.vesion_detail && (productDetail.vesion_detail.length >= 1 ? (productDetail.vesion_detail[0].price == 0 ? 'Giá liên hệ' : (checkNumber(productDetail.vesion_detail[0].price))) : ('Giá liên hệ'))}
                </div>
              )}

              {
                filter != null ? (
                  <sub className='product-old-price mx-2 text-white'>
                    <i>
                      {filter.original_price ? (filter.original_price == 0 ? '' : (checkNumber((filter.original_price)) == checkNumber((filter.price))) ? '' : checkNumber((filter.original_price))) : checkNumber(productDetail.original_price)}
                    </i>
                  </sub>
                ) : (
                  <sub className='product-old-price mx-2 text-white'>
                    <i>
                      {productDetail && productDetail.original_price && productDetail.original_price > 0 ? checkNumber(productDetail.original_price) : ''}
                    </i>
                  </sub>
                )
              }
              </div> */}
          </div>
        )
      }
    </div>
  )
}

export default Price
