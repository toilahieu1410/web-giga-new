import React, { useEffect } from "react"
import { useParams } from 'react-router-dom'

const ChinhSach = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  })

  const { chinhSach } = useParams()

  return (
    <div className="row">
      {
        chinhSach == 'chinh-sach-bao-mat' && (
          <ChinhSachBaoMat />
        )
      }
      {
        chinhSach == 'chinh-sach-bao-hanh' && (
          <ChinhSachBaoHanh />
        )
      }
      {
        chinhSach == 'chinh-sach-huy-doi-tra' && (
          <ChinhSachDoiTra />
        )
      }
      {
        chinhSach == 'chinh-sach-hoan-tien' && (
          <ChinhSachHoanTien />
        )
      }
    {
        chinhSach == 'chinh-sach-van-chuyen' && (
          <ChinhSachVanChuyen />
        )
      }
    </div>
  )
}

export default ChinhSach

const ChinhSachBaoMat = () => {
  return (
    <div className="chinh-sach-bao-mat list-chinhsach">
      <h4 className="text-center text-uppercase">Chính sách bảo mật</h4>
      <blockquote className="mb-3"><p>1. Mục đích và phạm vi thu nhập</p></blockquote>
      <p className="mb-2">Chúng tôi sẽ thu thập nhiều thông tin khác nhau của quý khách khi bạn muốn đặt hàng trên web. Quý khách có thể sẽ được yêu cầu đăng ký thông tin cá nhân (Email, Họ tên, Sđt liên lạc, địa chỉ giao hàng, địa chỉ email). Mọi thông tin khai báo phải đảm bảo tính chính xác và hợp pháp. Giga Digital không chịu mọi trách nhiệm liên quan đến pháp luật của thông tin khai báo. </p>
      <p className="mb-2">Chúng tôi có thể chuyển tên và địa chỉ cho bên thứ ba để họ giao hàng cho bạn (ví dụ cho bên chuyển phát nhanh hoặc nhà cung cấp).</p>
      <p>Chi tiết đơn đặt hàng của bạn được chúng tôi lưu giữ nhưng vì lí do bảo mật nên chúng tôi không công khai trực tiếp được. Tuy nhiên, quý khách có thể tiếp cận thông tin bằng cách đăng nhập tài khoản trên web. Tại đây, bạn sẽ thấy chi tiết đơn đặt hàng của mình, những sản phẩm đã nhận và những sản phẩm đã gửi và chi tiết email, ngân hàng và bản tin mà bạn đặt theo dõi dài hạn. Quý khách cam kết bảo mật dữ liệu cá nhân và không được phép tiết lộ cho bên thứ ba. Chúng tôi không chịu bất kỳ trách nhiệm nào cho việc dùng sai mật khẩu nếu đây không phải lỗi của chúng tôi.</p>
      <br />

      <blockquote className="mb-3"><p>2. Phạm vi sử dụng thông tin</p></blockquote>
      <p>Giga Digital thu thập và sử dụng thông tin cá nhân của khách hàng với mục đích phù hợp và hoàn toàn tuân thủ nội dung của “Chính sách bảo mật” này, cụ thể như sau: </p>
      <p className="mb-3"></p>
      <p>Khi cần thiết, chúng tôi có thể sử dụng những thông tin này vào các mục đích:</p><br />
      <ul className="list-unstyled">
        <li>- Xử lý đơn hàng: gọi điện, gửi email hoặc tin nhắn xác nhận việc đặt hàng, thông báo về trạng thái đơn hàng & thời gian giao hàng, xác nhận việc huỷ đơn hàng (nếu có).</li>
        <li>- Gửi thư ngỏ/thư cảm ơn, giới thiệu sản phẩm mới, dịch vụ mới hoặc các chương trình khuyến mãi của Giga Digital.</li>
        <li>- Gửi thông tin về bảo hành sản phẩm</li>
        <li>- Giải quyết khiếu nại của khách hàng</li>
        <li>- Thông tin trao thưởng (của Giga Digital hoặc của hãng)</li>
        <li>- Các khảo sát để chăm sóc khách hàng tốt hơn</li>
        <li>- Xác nhận các thông tin về kỹ thuật & bảo mật thông tin khách hàng</li>
        <li>- Các trường hợp có sự yêu cầu của cơ quan nhà nước có thẩm quyền, theo đúng quy định của pháp luật</li>

      </ul>
      <br />

      <blockquote className="mb-3"><p>3. Thời gian lưu trữ thông tin</p></blockquote>
      <p> Dữ liệu cá nhân của khách hàng sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự quý khách đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ của Giga Digital.</p>
      <br />

      <blockquote className="mb-3"><p>4. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân</p></blockquote>
      <p className="mb-2">Tên tổ chức: <strong className="text-uppercase"> CÔNG TY TNHH GIGA DISTRIBUTION</strong></p>
      <p className="mb-2">Trụ sở chính: <span> Số 55 Thái Hà - Đống Đa - Hà Nội</span></p>
      <p className="mb-2">Điện thoại: </p>
      <ul className="list-unstyled">
        <li>Hà Nội: <span>0966.061.170</span></li>
        <li>TP.HCM: <span>0965.499.920</span></li>
      </ul>
      <br />

      <blockquote className="mb-3"><p>5. Sử dụng Cookie</p></blockquote>
      <p>Cookie là tập tin văn bản nhỏ có thể nhận dạng tên truy cập duy nhất từ máy tính của bạn đến máy chủ của chúng tôi khi bạn truy cập vào các trang nhất định trên website và sẽ được lưu bởi trình duyệt internet lên ổ cứng máy tính của bạn. Cookie được dùng để nhận dạng địa chỉ IP, lưu lại thời gian. Chúng tôi dùng cookie để tiện cho quý khách vào web (ví dụ: ghi nhớ tên truy cập khi bạn muốn vào thay đổi lại giỏ mua hàng mà không cần phải nhập lại địa chỉ email của mình) và không đòi hỏi bất kỳ thông tin nào về bạn (ví dụ: mục tiêu quảng cáo). Trình duyệt của bạn có thể được thiết lập không sử dụng cookie nhưng điều này sẽ hạn chế quyền sử dụng của bạn trên web. Xin vui lòng chấp nhận cam kết của chúng tôi là cookie không bao gồm bất cứ chi tiết cá nhân riêng tư nào và an toàn với virus. Muốn biết thêm về cookie, vui lòng truy cập web <a href="http://www.allaboutcookies.org" className="text-primary">http://www.allaboutcookies.org</a>  hoặc để tìm hiểu cách loại bỏ cookie khỏi trình duyệt, vui lòng vào <a href="http://www.allaboutcookies.org/manage-cookies/index.html." className="text-primary">http://www.allaboutcookies.org/manage-cookies/index.html.</a> </p><br />

      <br />

      <blockquote className="mb-3"><p>6. Bảo mật</p></blockquote>
      <p className="mb-2">Giga Digital có biện pháp thích hợp về kỹ thuật và an ninh để ngăn chặn truy cập trái phép hoặc trái pháp luật hoặc mất mát hoặc tiêu hủy hoặc thiệt hại cho thông tin của bạn. Khi thu thập dữ liệu trên web, chúng tôi thu thập chi tiết cá nhân của bạn trên máy chủ an toàn. Chúng tôi duy trì các biện pháp bảo vệ vật lý và điện tử trong mối liên kết với thu thập, lưu trữ và tiết lộ thông tin của bạn. Các thủ tục an toàn của chúng tôi nghĩa là chúng tôi có thể đôi khi yêu cầu giấy tờ chứng minh trước khi tiết lộ thông tin cá nhân cho bạn.</p>
      <p className="mb-2">Chúng tôi khuyên quý khách rằng quý khách không nên đưa thông tin chi tiết về việc thanh toán với bất kỳ ai bằng e-mail, chúng tôi không chịu trách nhiệm về những mất mát quý khách có thể gánh chịu trong việc trao đổi thông tin của quý khách qua internet hoặc email.</p>
      <p className="mb-2">Quý khách tuyệt đối không sử dụng bất kỳ chương trình, công cụ hay hình thức nào khác để can thiệp vào hệ thống hay làm thay đổi cấu trúc dữ liệu. Nghiêm cấm việc phát tán, truyền bá hay cổ vũ cho bất kỳ hoạt động nào nhằm can thiệp, phá hoại hay xâm nhập vào dữ liệu của hệ thống website. Mọi vi phạm sẽ bị tước bỏ mọi quyền lợi cũng như sẽ bị truy tố trước pháp luật nếu cần thiết.</p>
      <p className="mb-2">Mọi thông tin giao dịch sẽ được bảo mật nhưng trong trường hợp cơ quan pháp luật yêu cầu, chúng tôi sẽ buộc phải cung cấp những thông tin này cho các cơ quan pháp luật.</p>
      <p className="mb-2">Các điều kiện, điều khoản và nội dung của trang web này được điều chỉnh bởi luật pháp Việt Nam và tòa án Việt Nam có thẩm quyền xem xét.</p>
      <br />

      <blockquote className="mb-3"><p>7. Quyền lợi khách hàng</p></blockquote>
      <p className="">Quý khách có quyền yêu cầu truy cập vào dữ liệu cá nhân của mình, có quyền yêu cầu Giga Digital sửa lại những sai sót trong dữ liệu của bạn mà không mất phí. Bất cứ lúc nào bạn cũng có quyền yêu cầu chúng tôi ngưng sử dụng dữ liệu cá nhân của bạn cho mục đích tiếp thị.</p>
    </div>
  )
}

const ChinhSachBaoHanh = () => {
  return (
    <div className="chinh-sach-bao-hanh list-chinhsach">
      <h4 className="text-center text-uppercase">Chính sách bảo hành</h4>
      <p className="mb-3"><span>Xin chân thành cảm ơn Quý khách hàng đã sử dụng sản phẩm phân phối bởi Giga Digital, dưới đây là chi tiết chính sách bảo hành của Giga Digital áp dụng đối với tất cả các sản phẩm. Giga Digital luôn cố gắng phấn đấu và nỗ lực mang đến chất lượng dịch vụ tốt nhất cho Quý khách hàng.</span></p>
      <p className="mb-3"><span>Giga Digital cam kết tất cả các sản phẩm bán ra tại Giga Digital đều là sản phẩm chính hãng và nhận được các chế độ bảo hành hãng, bảo hành nhà cung cấp. Quý khách có thể tới trực tiếp các Trung tâm bảo hành chính hãng/ Trung tâm bảo hành Giga Digital (Tùy theo từng sản phẩm) để được tiếp nhận bảo hành.</span></p>
      <p className="mb-3"><span>Thời gian áp dụng bảo hành: 3 - 36 tháng (Tùy theo sản phẩm)</span></p>

      <br />

      <blockquote className="mb-3"><p>1. Nguyên tắc bảo hành</p></blockquote>
      <ul className="list-unstyled">
        <li>- Sản phẩm được bảo hành bằng hình thức sửa chữa – thay thế – đổi máy tương đương theo đúng trình tự.</li>
        <li>- Khi đổi sản phẩm, thời hạn bảo hành còn lại của sản phẩm cũ được chuyển sang sản phẩm tương đương + gia hạn thêm thời hạn gửi tại trung tâm bảo hành.</li>
        <li>- Chính sách bảo hành của Giga Digital chỉ áp dụng cho các sản phẩm do Giga Digital phân phối.</li>
      </ul>

      <br />

      <blockquote className="mb-3"><p>2. Điều kiện bảo hành</p></blockquote>
      {/* <p className="mb-2">Tất cả các sản phẩm do Giga Digital bán ra đều tuân thủ điều kiện bảo hành của Hãng sản xuất, Nhà cung cấp. Các trường hợp sau đây bị coi là vi phạm điều kiện bảo hành và không được bảo hành:</p> */}
      <ul style={{ listStyle: 'auto' }}>
        <li>CHỈ BẢO HÀNH KHI LỖI CỦA NHÀ SẢN XUẤT</li>
        <li>Là những sản phẩm công ty bán ra và vẫn còn thời hạn bảo hành.</li>
        <li>Hàng còn vỏ sản phẩm cùng phụ kiện đi kèm (vd: điều khiển, dây sạc, củ sạc, thẻ, chân đế, ốc vít, phụ kiện lắp đặt…)</li>
        <li>Số Seri của sản phẩm phải rõ nét.</li>
        <li>Máy không có dấu vết bị cạy mở, bị tác động của ngoại lực ( vào nước, va đập…), bị sử dụng sai mục đích ( nguồn điện, kết nối sai “hướng dẫn sử dụng”…)
          <p>Lưu ý:</p>
          <p>- Đổi trả hàng bảo hành có thể không đúng với sản phẩm ban đầu. Lúc đó cần liên hệ để có sự đồng ý của khách hàng.</p>
          <p>- Từ chối bảo hành nếu không phải lỗi của sản phẩm.</p>
          <p>- Các vết trầy xước, cấn móp, tróc sơn không thuộc phạm vi bảo hành.</p>
        </li>
        <li>Không bảo hành với các sản phẩm hư hỏng do chuột, bọ hoặc côn trùng xâm nhập. Sản phẩm bị tháo dỡ, sửa chữa bởi các cá nhân hoặc kỹ thuật viên không được sự ủy quyền của Giga Digital.</li>
      </ul>
      <br />

      <blockquote className="mb-3"><p>Thời gian tiếp nhận bảo hành</p></blockquote>
      <ul className="list-unstyled">
        <li>Tại các cửa hàng của Giga Digital: Từ 8:30 – 18:00 (áp dụng từ thứ 2 - thứ 7), từ 9h00 - 17h00 ( áp dụng ngày chủ nhật)</li>
      </ul>
      <br />

      <blockquote className="mb-3"><p>Thời gian bảo hành</p></blockquote>
      <p>Dưới 14 ngày (không tính ngày nghỉ, ngày lễ), có thể sớm hoặc lâu hơn tùy tình trạng tiếp nhận.</p>
      <br />

      <blockquote className="mb-3"><p>Quý khách lưu ý</p></blockquote>
      <p>- Việc bảo hành, đổi sản phẩm tương đương không được Giga Digital áp dụng khi tên tài khoản và password của quý khách đăng nhập không hợp lệ, áp dụng cả trường hợp máy bật không lên.</p>
      <p>- Các trường hợp tự ý up ROM và chạy phần mềm khác ở ngoài Giga Digital, Root máy, can thiệp phần mềm ngoài Hệ thống Giga Digital sẽ không được bảo hành. Khách hàng khi đi bảo hành yêu cầu mang theo phiếu bảo hành.</p>
    </div>
  )
}

const ChinhSachDoiTra = () => {
  return (
    <div className="chinh-sach-doi-tra list-chinhsach">
      <h4 className="text-center text-uppercase">Chính sách hủy, đổi trả</h4>
      <blockquote className="mb-3"><p>1. Chính sách hủy đơn hàng</p></blockquote>
      <strong>Giga Digital chấp nhận cho Quý khách thực hiện hủy đơn hàng trong vòng 24h kể từ thời điểm Quý khách thanh toán thành công. Quý khách vui lòng liên hệ với Chúng tôi theo số điện thoại 0966.061.170 hoặc địa chỉ email info@giga.vn để được hỗ trợ hủy đơn hàng.</strong>
      <ul className="list-unstyled mb-3">
        <li>- Nếu quý khách hủy đơn hàng trước khi hàng được vận chuyển, thông thường là trong vòng 1 giờ kể từ lúc nhân viên bán hàng liên hệ xác nhận đặt hàng, Chúng tôi sẽ hoàn trả 100% tiền cho những quý khách đã thanh toán.</li>
        <li>- Nếu quý khách hủy đơn hàng sau khi hàng đã được vận chuyển, Chúng tôi sẽ giải quyết hoàn tiền cho quý khách sau khi đã trừ các chi phí phát sinh của đơn hàng như: phí vận chuyển, phí thanh toán, phí đóng gói,….</li>
        <li>- Để biết tình trạng hiện tại của đơn hàng, quý khách vui lòng xem trong mục Tra cứu đơn hàng trên website gigadigital.vn hoặc liên hệ theo số điện thoại 0966.061.170 hoặc địa chỉ email info@giga.vn</li>
        <li>- Quá thời gian qui định trên, mọi yêu cầu hủy đơn hàng của Quý khách sẽ không được chấp nhận.</li>
      </ul>
      <ul className="list-unstyled">
        <li>Mọi thắc mắc về thủ tục đổi hàng, hủy đơn hàng xin vui lòng liên hệ theo thông tin sau: </li>
        <li>Hotline 0966.061.170</li>
        <li>Email: info@giga.vn</li>
      </ul>
      <br />

      <blockquote className="mb-3"><p>2. Chính sách đổi trả</p></blockquote>
      <strong >a. Sản phẩm lỗi do nhà sản xuất</strong>

      <p className="mb-2">
        Giga Digital đổi trả sản phẩm lỗi do nhà sản xuất áp dụng đối với các sản phẩm điện thoại di động, loa, tai nghe, máy tính bảng, laptop, đồng hồ thông minh, đồ gia dụng.
      </p>
      <ul className="list-unstyled">
        <li>- Miễn phí đổi trả trong 15 ngày đầu sử dụng sản phẩm tương đương: cùng model, cùng dung lượng, cùng thời gian bảo hành…</li>
        <li>- Từ ngày 16 Giga Digital gửi máy đi bảo hành theo chính sách của hãng hoặc bảo hành của Giga Digital.</li>
        <li>- Giga Digital hỗ trợ khách hàng chi phí vận chuyển với tất cả các trường hợp sản phẩm phát sinh lỗi trong 15 ngày, gửi máy bảo hành, đổi trả (lưu ý khi gửi về cho Giga Digital vui lòng không khai giá trị sản phẩm, không chuyển hỏa tốc) ngoài ra khi máy gửi về thì phải thoát hết tài khoản (nếu có).</li>
        <li>- Thời gian đổi mới tính từ ngày khách hàng nhận máy và theo chính sách bảo hành của Giga Digital.</li>
        <li>- Khách hàng gửi máy đổi mới vui lòng gọi tổng đài 0966.061.170 để được hướng dẫn chi tiết.</li>
        <li>- Nhận được sản phẩm Giga Digital sẽ có bộ phận tiếp nhận và sẽ liên hệ trực tiếp với quý khách hàng trong thời gian sớm nhất.</li>
      </ul>

      <strong>Lưu ý:</strong>
      <br />
      <ul className="list-unstyled">
        <li>- Chúng tôi chỉ chấp nhận những đơn đặt hàng khi cung cấp đủ thông tin chính xác về địa chỉ, số điện thoại. Sau khi quý khách đặt hàng, chúng tôi sẽ liên lạc lại để kiểm tra thông tin và thỏa thuận thêm những điều có liên quan.</li>
        <li>- Một số trường hợp nhạy cảm: giá trị đơn hàng quá lớn & thời gian giao hàng vào buổi tối địa chỉ giao hàng trong ngõ hoặc có thể dẫn đến nguy hiểm. Chúng tôi sẽ chủ động liên lạc với quý khách để thống nhất lại thời gian giao hàng cụ thể.</li>
        <li>- Trong trường hợp giao hàng chậm trễ mà không báo trước, quý khách có thể không nhận hàng và chúng tôi sẽ hoàn trả toàn bộ số tiền mà quý khách trả trước (nếu có) trong vòng 7 ngày.</li>
        <li>- Giga Digital cam kết tất cả hàng hóa gửi đến Quý khách đều là đúng như thông tin đăng tải trên website (có đầy đủ hóa đơn, được bảo hành chính thức). Những rủi ro phát sinh trong quá trình vận chuyển (va đập, ẩm ướt, tai nạn..) có thể ảnh hưởng đến hàng hóa, vì thế xin Quý Khách vui lòng kiểm tra hàng hóa thật kỹ trước khi ký nhận và quay lại video trong quá trình mở hộp sản phẩm. Giga Digital sẽ không chịu trách nhiệm với những sai lệch hình thức của hàng hoá sau khi Quý khách đã ký nhận hàng và không có video mở hộp làm bằng chứng.</li>
      </ul><br />
      <strong>b. Đổi trả sản phẩm không có lỗi</strong>
      <ul className="list-unstyled">
        <li>- Chỉ áp dụng đối với các sản phẩm điện thoại di động, loa, tai nghe, máy tính bảng, laptop, đồng hồ thông minh mua tại Giga Digital.</li>
        <li>- Sản phẩm không lỗi (đổi trả theo nhu cầu của khách hàng)</li>
        <li>- Khách hàng muốn đổi sang sản phẩm khác hoặc trả sản phẩm: Giga Digital sẽ kiểm tra tình trạng máy và thông báo đến Khách hàng về giá trị thu lại sản phẩm ngay tại cửa hàng.</li>
      </ul>

      <strong>c. Sản phẩm lỗi do người sử dụng</strong>

      <p className="mb-2">Không áp dụng đổi trả đối với sản phẩm:</p>
      <ul className="list-unstyled mb-2">
        <li>- Không còn giữ nguyên 100% hình dạng ban đầu, bao gồm: có dấu hiệu va chạm mạnh, móp, bị vào nước…</li>
        <li>- Không đủ điều kiện bảo hành theo chính sách của hãng.</li>
      </ul>
      <p className="mb-3">Trong trường hợp này, Giga Digital hỗ trợ chuyển sản phẩm đến Trung tâm bảo hành của hãng hoặc trung tâm bảo hành của Giga Digital và khách hàng chịu phí sửa chữa.</p>
      <p>Phí đổi trả khác nếu có: Giga Digital sẽ kiểm tra tình trạng máy và thông báo đến khách hàng về mức phí phải thu ngay tại cửa hàng.</p>
    </div>
  )
}

const ChinhSachHoanTien = () => {
  return (
    <div className="chinh-sach-hoan-tien list-chinhsach">
      <h4 className="text-center text-uppercase">Chính sách thanh toán, hoàn tiền</h4>
      <blockquote className="mb-3"><p>1. Hình thức thanh toán</p></blockquote>
      <strong>a. Thanh toán chuyển khoản</strong>
      <p className="mb-2"></p>
      <p>Nếu bạn đã từng mua hàng tại website giga.vn và tin tưởng vào dịch vụ của chúng tôi thì bạn có thể lựa chọn phương án thanh toán bằng chuyển khoản để đạt hiệu quả cao nhất về chi phí và thời gian trong thanh toán. Thông tin tài khoản sẽ được hướng dẫn cụ thể khi bạn hoàn thành hóa đơn.</p><br />
      <strong>Thông tin chuyển khoản:</strong>

      <ul className="list-unstyled">
        <li>Ngân hàng: {process.env.REACT_APP_BANK_NAME}</li>
        <li>Chủ tài khoản: {process.env.REACT_APP_BANK_ACCOUNT}</li>
        <li>STK: {process.env.REACT_APP_BANK_NUMBER}</li>
        <li>Chi nhánh: {process.env.REACT_APP_BANK_BRANCH}</li>
      </ul>
      <br />
      <strong>b. Nhận hàng trả tiền</strong>
      <ul className="list-unstyled">
        <li>- Bạn có thể lựa chọn phương án thanh toán này đối với một số trường hợp hạn chế do Giga Digital quyết định. Với một số trường hợp khác, chúng tôi sẽ từ chối chấp nhận phương thức thanh toán này.</li>
        <li>- Khách hàng sử dụng gói dịch vụ vận chuyển COD sẽ áp dụng thanh toán ngay khi nhận hàng bằng tiền mặt.</li>
        <li>- Trong trường hợp sản phẩm được chấp thuận, bạn có thể vẫn phải thanh toán trước 30% giá trị đơn hàng, số tiền còn lại sẽ được thanh toán khi nhân viên giao hàng đến giao hàng cho bạn. </li>
        <li>Chú ý: Trong thời gian 7 ngày kể từ ngày lập hóa đơn nếu bạn không thực hiện việc thanh toán/ đặt cọc thì chúng tôi sẽ hủy hóa đơn mà không cần báo trước.</li>
      </ul>
      <br />
      <blockquote className="mb-3"><p>2. Hoàn tiền</p></blockquote>
      <p className="mb-2"></p>
      <ul className="list-unstyled">
        <li>- Thời hạn hoàn trả: Giga Digital sẽ chỉ hoàn tiền cho Khách hàng khi Giga Digital xác nhận đã nhận được Hàng trả lại và không có nhu cầu đổi hàng với giá trị tương đương.</li>
        <li>- Cách thức lấy lại tiền: Tùy từng trường hợp, tiền hoàn trả sẽ được chuyển vào thẻ tín dụng/tài khoản ngân hàng được chỉ định của Người mua hoặc bằng phương thức do thỏa thuận của 02 bên.</li>
        <li>- Chi phí cho việc hoàn trả: Nếu sản phẩm được xác thực không thuộc lỗi của Giga Digital thì người mua phải chịu vận chuyển đối với hàng trả lại.</li>
        <li>Để biết thêm thông tin chi tiết, quý khách vui lòng liên hệ Bộ phận chăm sóc khách hàng Giga Digital để được trợ giúp. Xin cảm ơn!</li>
      </ul>

    </div>
  )
}

const ChinhSachVanChuyen = () => {
  return (
    <div className="chinh-sach-van-cuyen list-chinhsach">
    <h4 className="text-center text-uppercase">Chính sách vận chuyển</h4>
    <p className="mb-3"><span>Nhằm hỗ trợ vận chuyển sản phẩm tới tận tay khách hàng đảm bảo nhất, Giga Digital cung cấp chính sách vận chuyển như sau:</span></p>
    <blockquote className="mb-3"><p>1. Hình thức, thời gian vận chuyển</p></blockquote>
 
    <ul className="list-unstyled">
      <li>- Tại khu vực công ty có tuyến giao hàng trực tiếp, Giga Digital sẽ giao hàng cho khách hàng tại địa chỉ khách hàng đã đăng ký</li>
      <li>- Tại những khu vực khác công ty sẽ vận chuyển thông qua các đơn vị dịch vụ vận chuyển</li>
      <li>- Miễn phí giao hàng toàn quốc cho tất cả các đơn hàng</li>
      <li>- Thời gian vận chuyển trung bình: 3-7 ngày</li>
    </ul>
    <br />
    <strong>Lưu ý: </strong>
    <ul className="list-unstyled">
      <li>- Đối với những sản phẩm cần lắp đặt thì thời gian giao hàng sẽ được thỏa thuận với khách hàng</li>
      <li>- Những trường hợp kéo dài thời gian giao hàng do tình huống bất khả kháng như sau:</li>
      <li>+ Không thể liên hệ với khách hàng</li>
      <li>+ Địa chỉ giao hàng không chính xác hoặc khó tìm kiếm</li>
      <li>+ Số lượng đơn hàng tăng đột biến khiến việc xử lý đơn hàng bị chậm, thông thường xảy ra vào đợt mua sắm cao điểm như: ngày sale, Black Friday,...</li>
      <li>+ Trường hợp thiên tai, dịch bệnh, điều kiện thời tiết khắc nghiệt... đơn hàng cũng có thể được giao chậm hơn thông thường</li>
    </ul>
    <br />
    <blockquote className="mb-3"><p>2. Chính sách lắp đặt</p></blockquote>
    
    <ul className="list-unstyled">
      <li>- Giga Digital thực hiện việc lắp đặt/ thi công sản phẩm tận nơi theo yêu cầu của khách hàng</li>
      <li>- Phí lắp đặt có thể miễn phí hoặc tính phí tùy thuộc vào loại sản phẩm</li>
      <li>- Đối với sản phẩm yêu cầu sử dụng kỹ thuật hoặc phần mềm vận hành riêng của Giga Digital, chúng tôi sẽ cung cấp để đảm bảo độ an toàn và chất lượng. Trường hợp khách hàng tự lắp đặt sản phẩm, cài đặt phần mềm thì khách hàng phải chịu trách nhiệm về kỹ thuật cũng như mọi rủi ro liên quan đến sản phẩm và con người.</li>
      <li>- Với những đơn hàng dịch vụ sửa chữa sẽ tùy thuộc vào đặc điểm của yêu cầu, công ty sẽ áp dụng 2 hình thức sửa chữa như sau: sửa chữa tận nơi hoặc chuyển về kho của công ty.</li>
    </ul>
    <br />
    <blockquote className="mb-3"><p>3. Trách nhiệm với hàng hóa vận chuyển</p></blockquote>
    
    <ul className="list-unstyled">
      <li>- Tất cả sản phẩm đều được đóng gói kĩ lượng, dán tem niêm phong đầy đủ</li>
      <li>- Quý khách có trách nhiệm kiểm tra hàng hóa ngay khi nhận hàng. Khi phát hiện hàng hóa bị hư hại, trầy xước, bể vỡ, móp méo, hoặc sai hàng hóa thì báo ngay với nhân viên giao hàng và công ty để giải quyết kịp thời.</li>
    </ul>
  </div>
  )
}

