import React, { useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import AnhMuaHang1 from '../../assets/images/A1.png'
import AnhMuaHang2 from '../../assets/images/A2.png'
import AnhMuaHang3 from '../../assets/images/A3.png'
import AnhMuaHang4 from '../../assets/images/A4.png'
const HoTroKhachHang = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  const { hotro } = useParams()

  return (
    <div className="row">
      {
        hotro == 'mua-hang-truc-tuyen' && (
          <MuaHangTrucTuyen />
        )
      }
      {
        hotro == 'huong-dan-thanh-toan' && (
          <HuongDanThanhToan />
        )
      }
      {
        hotro == 'mua-hang-tra-gop' && (
          <MuaHangTraGop />
        )
      }
      {
        hotro == 'lien-he' && (
          <LienHe />
        )
      }
    </div>
  )
}

export default HoTroKhachHang

const MuaHangTrucTuyen = () => {
  return (
    <div className="mua-hang-truc-tuyen list-chinhsach">
      <h4 className="text-center text-uppercase">Hướng dẫn mua hàng trực tuyến</h4>
      <p className="mb-3"><span>Quy trình mua và nhận hàng trực tuyến tại Giga Digital:</span></p>
      <h6><strong>1. Đặt hàng trực tuyến</strong></h6>
      <p className="mb-2"><strong>a. Cách 1: </strong><span>Gọi điện thoại trực tiếp đến tổng đài 0966.061.170 (HN) hoặc 0965.499.920 (HCM) để được tư vấn và hỗ trợ nhanh nhất.
      </span>
        <p>Thời gian tiếp nhận từ 8h00 - 22h00 tất cả các ngày trong tuần.</p></p>
      <p className="mb-2"><strong>b. Cách 2: </strong><span>Mua hàng trực tuyến trên Website <a href='https://giga.vn' target={'_blank'} className='text-primary'>giga.vn</a></span>
        <div className="d-block">
          <p className="mb-2">Bước 1: Tìm sản phẩm cần mua trên Website <a href='https://giga.vn' target={'_blank'} className='text-primary'>giga.vn</a></p>
          <img src={AnhMuaHang1} className='w-100 mb-2' />
        </div>
        <div className="d-block">
          <p className="mb-2">Bước 2: Đặt mua sản phẩm: </p>
          <p className="mb-2">- Chọn sản phẩm và bấm nút MUA NGAY </p>
          <img src={AnhMuaHang2} className='w-100 mb-2' />
        </div>
        <div className="d-block">
          <p className="mb-2">- Điền đầy đủ thông tin đặt hàng (họ tên, số điện thoại, email) và chọn hình thức thanh toán. Lựa chọn nhận hàng tại cửa hàng hoặc nhận hàng tại nhà. </p>
          <p className="mb-2">Click vào nút xác nhận đơn hàng</p>
          <img src={AnhMuaHang3} className='w-100 mb-2' />
        </div>
      </p>
      <p className="mb-2"><strong>c. Cách 3: </strong><span>Chat trực tuyến trên Fanpage Giga Digital qua link: <a href='https://www.messenger.com/t/111056221462543/?messaging_source=source%3Apages%3Amessage_shortlink&source_id=1441792&recurring_notification=0' target={'_blank'} className='text-primary'>m.me/gigadigital.vn</a>  </span></p>
      <br />
      <h6><strong>2. Giga Digital gọi điện và xác nhận đơn hàng của quý khách</strong></h6>
      <ul className="list-unstyled">
        <li className="mb-2">- Đơn hàng của quý khách được tính là thành công chỉ khi có nhân viên bộ phận tư vấn gọi điện xác nhận (Hoặc xác nhận qua tin nhắn đối với đơn hàng ở Fanpage)</li>
        <li className="mb-2">- Đối với các đơn đặt hàng từ trước 17h sẽ được gọi điện xác nhận đơn hàng trong ngày.</li>
        <li className="mb-2">- Đối với các đơn đặt từ 17h trở đi sẽ được xác nhận vào ngày hôm sau.</li>
      </ul>
      <h6><strong>Lưu ý</strong></h6>
      <ul className="list-unstyled">
        <li className="mb-2">- Toàn bộ đơn hàng online đều được miễn phí giao hàng trên toàn quốc.</li>
        <li className="mb-2">- Địa chỉ giao hàng của quý khách có thể thay đổi sau khi yêu cầu đặt hàng của Giga Digital tiếp nhận. Để thay đổi thông tin, quý khách cần liên hệ sớm với Giga Digital để thông tin được cập nhật chính xác.</li>
      </ul>
    </div>
  )
}

const HuongDanThanhToan = () => {
  return (
    <div className="huong-dan-thanh-toan list-chinhsach">
      <h4 className="text-center text-uppercase">Hướng dẫn thanh toán</h4>
      <p className="mb-3"><span>Quý khách hàng có thể lựa chọn 1 trong 2 hình thức thanh toán sau :</span></p>
      <h6><strong>1. Thanh toán tại cửa hàng</strong></h6>
      <p>Quý khách có thể thanh toán trực tiếp tại cửa hàng bằng các hình thức: Trả tiền mặt, chuyển khoản, quẹt thẻ.</p><br />
      <h6><strong>2. Đối với đơn hàng Online</strong></h6>
      <p className="mb-2">Sau khi quý khách đã được nhân viên Giga Digital gọi điện xác nhận đặt hàng thành công, quý khách có thể thanh toán bằng hình thức sau:</p>
      <p className="mb-2"><strong>Cách 1: </strong><span> Nhận hàng tại nhà và thanh toán trực tiếp cho nhân viên giao hàng.</span></p>
      <p className="mb-2"><strong>Cách 2: </strong><span>  Chuyển khoản trước cho Giga Digital. Sau khi chuyển khoản xin gọi điện thông báo qua số 0966.061.170, chúng tôi sẽ kiểm tra và gửi hàng cho Quý khách trong thời gian sớm nhất.</span></p>
      <br />
      <h6><strong>Thông tin chuyển khoản</strong></h6>
      <ul className="list-unstyled mb-0">
        <li>Ngân hàng: {process.env.REACT_APP_BANK_NAME}</li>
        <li>Số tài khoản: {process.env.REACT_APP_BANK_NUMBER}</li>
        <li>Chủ tài khoản: {process.env.REACT_APP_BANK_ACCOUNT}</li>
        <li>Chi nhánh: {process.env.REACT_APP_BANK_BRANCH}</li>
      </ul>

    </div>
  )
}

const MuaHangTraGop = () => {
  return (
    <div className="huong-dan-thanh-toan list-chinhsach">
      <h4 className="text-center text-uppercase">Hướng dẫn mua hàng trả góp</h4>
      <p className="mb-3"><span>Để thuận tiện cho việc mua sắm của quý khách hàng, Giga Digital triển khai hình thức hỗ trợ mua trả góp 0% qua thẻ tín dụng với thủ tục đơn giản, thuận tiện và nhanh chóng. Với hình thức này thì số tiền sẽ được trừ dần theo số tháng và không phải trả bất kỳ lãi suất nào.</span></p>
      <h6><strong>1. Hướng dẫn mua hàng trả góp qua thẻ tín dụng ( thẻ ghi nợ)</strong></h6>
      <p>Quý khách có thể thanh toán trực tiếp tại cửa hàng bằng các hình thức: Trả tiền mặt, chuyển khoản, quẹt thẻ.</p><br />
      <h6><strong>2. Đối với đơn hàng Online</strong></h6>
      <p className="mb-2">Mua hàng trả góp bằng thẻ tín dụng là gì? Là hình thức mua hàng cực kỳ tiện lợi dành cho doanh nhân, cán bộ, nhân viên văn phòng,... những người đang sử dụng thẻ tín dụng có nhu cầu mua trả góp với mức chi phí thấp hơn lãi suất tiết kiệm, thủ tục đơn giản, nhanh gọn, mà không cần thủ tục giấy tờ, chứng minh thu nhập như các hình thức mua trả góp khác.</p>
      <p className="mb-2">Mua hàng trả góp qua thẻ tín dụng (thẻ ghi nợ) áp dụng cho các ngân hàng: Sacombank, VIB, HSBC, Citibank, Techcombank, VPBank, Shinhan Bank, ANZ, Eximbank, Maritime Bank, SeaBank, TPBank, Standard Chartered, SCB, FeCredit, Nam Á, OCB, KienLong, SHB, BIDV, VCB, ACB, MBBank, HomeCredit</p>

      <br />
      <h6><strong>2. Các bước thực hiện mua hàng</strong></h6>
      <ul className="list-unstyled mb-2">
        <li>Bước 1: Quý khách đến Showroom xem hàng hoặc mua hàng online trên toàn quốc</li>
        <li>Bước 2: Quý khách chọn sản phẩm muốn mua, chọn trả góp.</li>
        <li>Bước 3: Quý khách chọn trả góp qua thẻ tin dụng, điền đầy đủ thông tin để chúng tôi giao hàng.</li>
        <li className="mb-2">Bước 4: Quý khách chọn kì hạn trả góp phù hợp, trang web sẽ hiện phí trả góp tham khảo (Sẽ chênh lệch 1% tùy vào phí trả góp của từng ngân hàng áp dụng)
        <img src={AnhMuaHang4} className='w-100 mb-2' />
        </li>
        <li>Bước 5: Bộ phận thẩm định sẽ liên lạc và xác nhận chốt đơn hàng lần cuối.</li>
      </ul>
      <br />
      <h6><strong>3. Lợi ích khi mua trả góp</strong></h6>
      <p className="mb-2">Có thể nói lợi ích khi mua trả góp là cực kỳ lớn. Cụ thể, thay vì phải tiết kiệm đủ tiền để mua một sản phẩm ưa thích. Khi sử dụng chương trình trả góp tại Giga Digital, khách hàng sẽ không phải trả trước toàn bộ số tiền để có thể sở hữu được sản phẩm mình yêu thích. Điều này cho phép khách hàng có thể mua sản phẩm ngay lập tức.</p>
      <p className="mb-2">Ngay cả với những khách hàng có điều kiện hay không có điều kiện về tài chính, mua trả góp cũng là một điểm hấp dẫn khi họ có thể vừa mua hàng vừa tiết kiệm được khoản tiền trong ngắn hạn để đầu tư hoặc sử dụng cho những công việc khác.</p>
    </div>
  )
}

const LienHe = () => {
  return (
    <div>LienHe</div>
  )
}