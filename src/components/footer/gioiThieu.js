import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const GioiThieu = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  })

  const { gioiThieu } = useParams()

  return (
    gioiThieu == 'gioi-thieu' && (
      <div className='row'>
        <div className="gioi-thieu list-chinhsach">
          {/* <p className="mb-2">Tên công ty: <span>CÔNG TY TNHH GIGA DISTRIBUTION</span></p>
          <p className="mb-2">Tên giao dịch quốc tế: <span>GIGA DISTRIBUTION COMPANY LIMITED</span></p>
          <p className="mb-2">Mã số thuế: <span>0109962502</span></p>
          <p className="mb-2">Đăng ký ngày: <span>12/04/2022</span></p>
          <p className="mb-2">Địa chỉ: <span>Số 55 Thái Hà - Đống Đa - Hà Nội</span></p>
          <p className="mb-2">Giấy CNĐKKD và mã số doanh nghiệp số: <span>0109962502 do sở Kế hoạch & Đầu tư thành phố Hà Nội cấp</span></p>
          <p className="mb-2">Đại diện theo pháp luật của doanh nghiệp: <span>Ông Nguyễn Minh Tân - Giám đốc</span></p>
        
          <br /> */}
          <h6><strong>Giới thiệu chung</strong></h6>
          <p className='mb-2'></p>
          <p className='mb-2'>Chúng ta đang sống ở thế giới mà con người kỳ vọng nhiều về sức khỏe, sự an toàn và quỹ thời gian quý giá và một cuộc sống thông minh, một ngôi nhà tiện nghi là điều không thể thiếu. Đó sẽ là nơi tuyệt vời để bạn trở về sau một ngày làm việc vất vả, một nơi để giải trí, một nơi để hỗ trợ bạn làm mọi việc một cách dễ dàng hơn và là một nơi thoải mái nhất dành cho bạn và gia đình.</p>
          <p className='mb-2'>Chính vì vậy, chúng tôi thành lập Giga Digital - chuỗi cửa hàng phân phối điện thoại và đồ gia dụng thông minh chính hãng các thương hiệu nằm trong hệ sinh thái Xiaomi, Ecovacs, Apple và Daikin với các sản phẩm nổi bật:</p>

          <ul className='list-unstyled'>
            <li>- Điện thoại, máy lọc không khí, đồ gia dụng thông minh Xiaomi</li>
            <li>- Robot hút bụi, máy hút bụi Dreame</li>
            <li>- Máy chạy bộ KingSmith</li>
            <li>- Máy chiếu mini Wanbo</li>
            <li>- Xe đạp trợ lực điện HIMO</li>
            <li>- Gia dụng thông minh Deerma</li>
            <li>- Đồng hồ Kieslect</li>
            <li>- Đồng hồ, camera an ninh Imilab</li>
            <li>- Thiết bị sức khỏe Yunmai</li>
            <li>- Thiết bị sức khỏe – chăm sóc sắc đẹp Mijia</li>
            <li>- Robot hút bụi lau nhà Ecovacs</li>
            <li>- Máy lọc không khí Daikin, …</li>
          </ul>
          <br />
          <p className='mb-2'>Ra mắt đầu năm 2022, thương hiệu Giga Digital với sự chuyên nghiệp trong dịch vụ và chất lượng sản phẩm không ngừng nỗ lực xây dựng và hoàn thiện hệ thống phân phối hàng hóa online và offline đáp ứng nhu cầu các sản phẩm gia dụng thông minh khắp cả nước:</p>

          <ul className='list-unstyled'>
            <li>- Showroom Hà Nội: 55 Thái Hà, Đống Đa</li>
            <li>- Showroom Hồ Chí Minh: Minh Phụng, Tân Thới Nhất, Q12 (Cạnh chung cư Prosper Plaza)</li>
            <li>- Showroom Nam Định: 81 Lê Hồng Phong, P. Phan Đình Phùng, TP Nam Định</li>
            <li>- Showroom Đà Nẵng: 35 Chu Mạnh Trinh, Q. Cẩm Lệ, TP. Đà Nẵng</li>
            <li>- Showroom Hải Phòng: 23 –BS1 Khu Đô thị PG, xã An Đồng, Huyện An Dương, TP. Hải Phòng</li>
          </ul>

          <br />
          <p className='mb-2'>Đến với Giga Digital, bạn sẽ được cam kết tuyệt đối về:</p>

          <ul className='list-unstyled mb-0'>
            <li>- Sản phẩm chính hãng, có sẵn số lượng lớn</li>
            <li>- Bao đổi trả trong 15 ngày</li>
            <li>- Miễn phí ship toàn quốc</li>
            <li>- Giao nhanh siêu tốc 1h nội thành Hà Nội</li>
          </ul>

        </div>
      </div>
    )
  )
}

export default GioiThieu