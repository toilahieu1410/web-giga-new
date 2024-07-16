import React from "react"
import { checkNumber, checkNumberHide, checkImage } from "../../utilities/checkNumber"
import Countdown from "react-countdown"
import { Link } from "react-router-dom"
import IconLightning from '../../assets/images/lightning.png'
import IconClock from '../../assets/images/icon-clock.png'
import { settingsFlashSale } from '../../utilities/settingSlide'
import Slider from 'react-slick'
import moment from "moment"

const today = (new Date()).getTime()

const FlashSaleHome = (props) => {

  const flashSale = props.flashSale

  const renderer = (props) => {
    const { days, hours, minutes, seconds, completed } = props
    return (
      <div className=" countdown">
        <strong>05</strong><span>:</span><strong>06</strong><span>:</span><strong>30</strong><span>:</span><strong>55</strong>
      </div>
    )
    // if (completed) {
    //   window.location.reload(false)
    // } else {
    //   return (
    //     <>


    //       <div className="d-flex align-items-center countdown">
    //       {days > 0 && <><strong>{days < 10 ? "0" + days : days}</strong><span>:</span></>}<strong>{hours < 10 ? "0" + hours : hours}</strong><span>:</span><strong>{minutes < 10 ? "0" + minutes : minutes}</strong><span>:</span><strong>{seconds < 10 ? "0" + seconds : seconds}</strong>
    //     </div>
    //     </>

    //   )
    // }
  }

  const dataFlashSale = [
    {
      id: 1,
      name: 'Apple Watch series 8',
      brand: 'Apple',
      thumb: '1666241556844-apple-watch-series-7-41mm-vien-nhom-lte.jpg',
      price: 8500000,
      original_price: 9700000,
      vesion_detail: [
        {
          price_flashsale: 8500000
        }
      ]
    },
    {
      id: 2,
      name: 'Robot hút bụi ecovac',
      brand: 'Xiaomi',
      thumb: '1688615586910-ecovacs-t10-plus.jpg',
      price: 12500000,
      original_price: 13500000,
      vesion_detail: [
        {
          price_flashsale: 12500000
        }
      ]
    },
    {
      id: 3,
      name: 'Máy lọc không khí Xiaomi Smart Air Purifier 4 Compact',
      brand: 'Xiaomi',
      thumb: '1660795096662-may-loc-xiaomi-smart-air-purifier-4-compact-1.jpg',
      price: 2500000,
      original_price: 4500000,
      vesion_detail: [
        {
          price_flashsale: 2500000
        }
      ]
    },
    {
      id: 4,
      name: 'Smart Tivi Xiaomi P1 55 inch',
      brand: 'Xiaomi',
      thumb: '1666342822096-smart-tivi-p1-55-inch.jpg',
      price: 7500000,
      original_price: 9500000,
      vesion_detail: [
        {
          price_flashsale: 7500000
        }
      ]
    },
    {
      id: 5,
      name: 'Điện thoại iPhone 14 Pro Max',
      brand: 'Apple',
      thumb: '1662618749327-iphone-14-pro-max.jpg',
      price: 26500000,
      original_price: 28500000,
      vesion_detail: [
        {
          price_flashsale: 26500000
        }
      ]
    }
  ]

  return (
    <>
      <div className="flash-sale-homepage flash-sale mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="title-flashSale">
            <img src={IconLightning} width={70} className='float-left' />
            <div className="title-name text-primary d-inline-block ml-10">
              <h3 className="text-uppercase">Ưu đãi lớn</h3>
              <h6 className="">The opportunity will quickly pass. Take it!</h6>
            </div>
          </div>
          <div className="countdown-flashSale d-flex align-items-center">
            <img src={IconClock} width={60} className='float-left mr-10' />
            <div className="title-name text-primary d-inline-block">
              <h6 className="mb-1">Giờ vàng!</h6>
              <p className="text-title">Kết thúc sau:</p>
            </div>
            <div className="countdownEnd ml-15">
              <Countdown date={moment(new Date).format('DD/MM/YYYY')} renderer={renderer} />
            </div>
          </div>
        </div>
        <div className="line-middle"></div>
        <div className='products-flashsale'>
          <Slider
            {...settingsFlashSale}
            slidesToShow={5}
          >
            {
              dataFlashSale && dataFlashSale.map((item, index) => (
                <>
                  <Link to={`/${item.categorySlug}/${item.slug}`} className='compare-list-item' key={index}>
                    {
                      (item.price == 0 || 100 - ((parseInt(item.price) / parseInt(item.original_price)) * 100).toFixed(0) == 0 ? ('') : (
                        <div className='percent-reduction ribbon-top-right d-inline-block'>
                          <span>-  {100 - ((parseInt(item.price) / parseInt(item.original_price)) * 100).toFixed(0)}%</span>
                        </div>
                      ))
                    }
                    <div className='compare-list-item-image'>
                      <img className='w-100 h-100' src={checkImage(item.thumb)} alt={item.name} />
                    </div>
                    <div className='compare-list-item-info pt-2'>
                      <p className='text-title mb-2'>{item.brand}</p>
                      <h6 className="text-primary">{item.name}</h6>
                      {
                        (Math.min(...item.vesion_detail.map(o => o.price_flashsale)) == Math.max(...item.vesion_detail.map(o => o.price_flashsale))) ? (
                          <div>
                            <h4><span className='text-primary'>{checkNumber(Math.min(...item.vesion_detail.map(o => o.price_flashsale)))}</span></h4>
                          </div>
                        ) : (
                          <div>
                            <h6><span className='text-primary'>{checkNumber(Math.min(...item.vesion_detail.map(o => o.price_flashsale)))} - {checkNumberHide(Math.max(...item.vesion_detail.map(o => o.price_flashsale)))}</span></h6>
                          </div>
                        )
                      }
                    </div>
                  </Link>
                </>
              ))
            }
          </Slider>
        </div>
      </div>
    </>

  )
}

export default FlashSaleHome