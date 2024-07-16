import React, { useLayoutEffect } from "react"
import { useState } from "react"
import { Link, useHistory } from "react-router-dom"

const data = [
  {
    id: 1,
    title: 'Tháng của nàng - Deal ngập tràn',
    image: 'https://img.gigadigital.vn/new/1697604256368-thang-cua-nang-deal-ngap-tran.jpg',
    slug: 'https://gigadigital.vn/tin-tuc/khuyen-mai/thang-cua-nang-deal-ngap-tran'
  },
  {
    id: 2,
    title: 'Chính thức mở bán phiên bản giới hạn Ecovacs X2 Omni White với hàng loạt ưu đãi hấp dẫn',
    image: 'https://img.gigadigital.vn/new/1696839668225-chinh-thuc-mo-ban-phien-ban-gioi-han-ecovacs-x2-omni-white-voi-hang-loat-uu-dai-hap-dan.jpg',
    slug: 'https://gigadigital.vn/tin-tuc/khuyen-mai/chinh-thuc-mo-ban-phien-ban-gioi-han-ecovacs-x2-omni-white-voi-hang-loat-uu-dai-hap-dan'
  },
  {
    id: 3,
    title: 'Sắm robot hút bụi Ecovacs, nhận ngay bảo dưỡng xịn',
    image: 'https://img.gigadigital.vn/new/1696665460310-sam-robot-hut-bui-ecovacs-nhan-ngay-bao-duong-xin-1.jpg',
    slug: 'https://gigadigital.vn/tin-tuc/khuyen-mai/sam-robot-hut-bui-ecovacs-nhan-ngay-bao-duong-xin'
  },
]
const Preferential = () => {

  const history = useHistory()

  const [isMobile, setIsMobile] = useState(false)

  useLayoutEffect(() => {
    const isMobileView = window.innerWidth <= 992;

    setIsMobile(isMobileView);

    if (!isMobileView && window.location.pathname === '/uu-dai') {
      history.push('/');
    }
  }, []);


  return (
    <div className="preferential mt-3">
      {
        data && data.map(item => (
          <Link to={item.slug} className='no-icon mb-4 d-inline-block'>
            <div className="d-block">
           
              <img src={item.image} className='w-100 rounded' />
              <p className="mb-0 fw-300 text-center mt-1">{item.title}</p>
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default Preferential