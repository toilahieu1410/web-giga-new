import React from "react"
import ReactHtmlParser from 'react-html-parser'

const listQuestion = [
  {
    id:1, 
    question: 'Ưu điểm của YIKO 2.0 so với các trợ lý giọng nói khác là gì?',
    answer:'Deebot X2 Omni kết hợp trợ lý giọng nói nâng cao YIKO 2.0 tiên tiến cho phép thực hiện: điều khiển từ xa, điều chỉnh tác vụ, lên lịch làm sạch,... giúp robot đóng vai trò như một quản gia thông minh. '
  },
  {
    id:2, 
    question: 'Công nghệ AIVI™ 3D 2.0 có điểm gì đặc biệt?',
    answer:' AIVI™ 3D 2.0 giúp tăng khả năng nhận diện không gian tốt hơn, trang bị cảm biến RGBD được nâng cấp có khả năng xác định và thích ứng với một môi trường cụ thể hơn. So với phiên bản DEEBOT X1, DEEBOT X2 OMNI có thể xác định đồ nội thất và mặt đất, quạt, tủ, máy giặt,... nâng cao kỹ năng tránh vật thể, tăng tỉ lệ nhận dạng thành công đồ đạc theo chỉ định. '
  },
  {
    id:3, 
    question: 'Deebot X2 Omni có thể làm sạch những loại bề mặt nào?',
    answer:'Deebot X2 Omni được thiết kế để làm sạch nhiều loại bề mặt bao gồm sàn gỗ cứng, thảm và sàn gạch. Hình dạng vuông của robot cho phép làm sạch các cạnh và góc hiệu quả, sử dụng thuật toán điều khiển chuyển động di động tốt ngay cả những không gian khó tiếp cận. Với thiết kế nhỏ gọn với các cảm biến tiên tiến cho phép di chuyển nhẹ nhàng qua các chân ghế hẹp và đồ nội thất gầm thấp, thông minh và hiệu quả.'
  },
  {
    id:4, 
    question: 'Các tính năng nâng cấp của X2 Omni mới đối với người dùng?',
    answer:`<p className="fw-500">Năm chức năng đã được cải tiến chính của Deebot X2 Omni sẽ mang tới một diện mạo sạch sẽ cho ngôi nhà của các gia đình</p>

    <p>1.Thiết kế vuông mới, tích hợp cảm biến phát hiện cạnh và khả năng làm sạch cạnh, đạt tỷ lệ bao phủ cạnh lên tới 99,77%.</p>
    
    <p>2. Sở hữu công nghệ sóng âm, công nghệ lau rung OZMO Turbo 2.0, tính năng nâng tự động thông minh 15mm mạnh mẽ và khả năng vượt vật thể 22 mm, thích ứng với mọi không gian khác nhau.</p>
    
    <p>3. Đem tới trải nghiệm rảnh tay cho những ngôi nhà bận rộn với trạm OMNI tất cả chức năng trong 1, hoạt động độc lập với hiệu suất cao, cung cấp giải pháp toàn diện bao gồm làm sạch, đổ rác, sấy khô bằng khí nóng và tự động đổ đầy nước.</p>
    
    <p>4. Tích hợp công nghệ AI, chẳng hạn như TrueMapping 3.0 hàng đầu trong ngành, tích hợp cảm biến LiDAR và chế độ xem 210°, AIVI™ 3D 2.0, với các thuật toán máy học để nâng cao hiệu quả làm sạch.</p>
    
    <p>5. Một tính năng bổ sung khác, Deebot X2 Omni mang đến trải nghiệm rảnh tay với bản đồ 3D được nâng cấp và trợ lý giọng nói YKO 2.0, cho phép người dùng tận hưởng trải nghiệm dọn dẹp thuận tiện và tương tác đồng thời có thêm thời gian cho các hoạt động cần thiết khác.</p>`
  }
]

const FooterX2Omni = () => {
  return (
    <div className="footer-x2-omni FQA w-100">
      <div className="container">
      {listQuestion && listQuestion.map(item => (
          <div className="list-question mt-4">
            <h6 className="mb-2 text-white">{item.question}</h6>
            <p className="text-gray">{ReactHtmlParser(item.answer)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FooterX2Omni