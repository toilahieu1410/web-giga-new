import React, {useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { checkNumber, checkImage, checkNumberHide } from '../../utilities/checkNumber'
import { getFlashSale } from '../../redux/home/action'
import Countdown from "react-countdown"

const today = (new Date()).getTime()

const FlashSale = () => {

  const dispatch = useDispatch()

  const flashSale = useSelector(store => store.home.flashSale)

  useEffect(() => {
    dispatch(getFlashSale())
  }, [])

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
    <div className="flash-sale">
      {
        flashSale ? (
          <div>
            {
              (today < flashSale.start_date) && (
                <div className="d-flex align-items-start">
                  <div className='compare-header-title list-title compare-list-products w-auto mt-0'>
                    <h1 className='text-uppercase mb-0 text-white'><b>Sắp diễn ra</b></h1>
                  </div>
                  <div className="ml-20">
                    <Countdown date={flashSale.start_date} renderer={renderer} />
                  </div>
                </div>
              )
            }
            {
              (flashSale.start_date < today && today < flashSale.end_date) && (
                <div className="d-flex align-items-start">
                  <div className='compare-header-title list-title compare-list-products w-auto mt-0'>
                    <h1 className='text-uppercase mb-0 text-white'><b>{flashSale.title}</b></h1>
                  </div>
                  <div className="ml-20">
                    <Countdown date={flashSale.end_date} renderer={renderer} />
                  </div>
                </div>
              )
            }
            {
              (flashSale.end_date < today) && (
                <div className="d-flex align-items-start">
                  <div className='compare-header-title list-title compare-list-products w-auto mt-0'>
                    <h1 className='text-uppercase mb-0 text-white'><b>Chưa có chương trình Flash sale</b></h1>
                  </div>
                </div>
              )
            }
          </div>
        ) : (
          <div className="d-flex align-items-center mt-10">
            <h6>Chưa có chương trình Flash sale</h6>
          </div>
        )
      }
      {
        flashSale && (
          <div>
            {
              today < flashSale.start_date && (
                <div className="flash-sale-list">
                  {flashSale.productDetail.map((item, index) => (
                    <div className="flash-sale-item" key={index}>
                      <Link key={index} className='flash-sale-list-item text-center' to={`/${item.categorySlug}/${item.slug}`}>
                        <div className='flash-sale-item-image '>
                          <img className='w-100' src={checkImage(item.thumb)} alt={item.name}/>
                        </div>
                        <div className="reduced-price">
                          <h6 className="mb-0 text-white fw-bold">
                            <i className="fa fa-flash"></i>
                            Giảm {checkNumberHide(item.original_price - Math.min(...item.vesion_detail.map(o => o.price_flashsale)))}
                          </h6>
                        </div>
                        <div className='flash-sale-item-info mt-3'>
                          <h6 className="title"><b>{item.name}</b></h6>
                          {
                            (Math.min(...item.vesion_detail.map(o => o.price_flashsale)) == Math.max(...item.vesion_detail.map(o => o.price_flashsale))) ? (
                              <div>
                                <h6><span className='text-red'><b>{checkNumberHide(Math.min(...item.vesion_detail.map(o => o.price_flashsale)))}</b></span></h6>
                              </div>
                            ) : (
                              <div>
                                <h6><span className='text-red'><b>{checkNumberHide(Math.min(...item.vesion_detail.map(o => o.price_flashsale)))} - {checkNumberHide(Math.max(...item.vesion_detail.map(o => o.price_flashsale)))}</b></span></h6>
                              </div>
                            )
                          }
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
              )
            }
            {
              (flashSale.start_date < today && today < flashSale.end_date) && (
                <div className="flash-sale-list">
                  {flashSale.productDetail.map((item, index) => (
                    <div className="flash-sale-item" key={index}>
                      <Link key={index} className='flash-sale-list-item text-center' to={`/${item.categorySlug}/${item.slug}`}>
                        <div className='flash-sale-item-image '>
                          <img className='w-100' src={checkImage(item.thumb)} alt={item.name}/>
                        </div>
                        <div className="reduced-price">
                          <h6 className="mb-0 text-white fw-bold">
                            <i className="fa fa-flash"></i>
                            Giảm {checkNumber(item.original_price - Math.min(...item.vesion_detail.map(o => o.price_flashsale)))}
                          </h6>
                        </div>
                        <div className='flash-sale-item-info mt-3'>
                          <h6 className="title"><b>{item.name}</b></h6>
                          {
                            (Math.min(...item.vesion_detail.map(o => o.price_flashsale)) == Math.max(...item.vesion_detail.map(o => o.price_flashsale))) ? (
                              <div>
                                <h6><span className='text-red'><b>{checkNumber(Math.min(...item.vesion_detail.map(o => o.price_flashsale)))}</b></span></h6>
                              </div>
                            ) : (
                              <div>
                                <h6><span className='text-red'><b>{checkNumber(Math.min(...item.vesion_detail.map(o => o.price_flashsale)))} - {checkNumber(Math.max(...item.vesion_detail.map(o => o.price_flashsale)))}</b></span></h6>
                              </div>
                            )
                          }
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default FlashSale