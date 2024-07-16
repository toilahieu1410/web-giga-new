import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

const ModalTraGop = (props) => {

  const {visitedModal, setVisitedModal, decoded} = props
  const toggle = () => setVisitedModal(!visitedModal)

  return (
    <Modal isOpen={visitedModal} toggle={toggle} size='lg'>
      {
        decoded && decoded.type == 'erp' ? (
          <TraGopNhanVien toggle={toggle}/>
        ) : (
          <TraGop toggle={toggle}/>
        )
      }
    </Modal>
  )
}

export default ModalTraGop

const TraGop = (props) => {
  const { toggle } = props
  return (
    <div>
      <ModalHeader toggle={toggle}>
        <label className='fw-bold'>Điều kiện trả góp</label>
      </ModalHeader>
      <ModalBody style={{ padding: '30px' }}>
        <div className='fw-bold text-primary'>QUY ĐỊNH CHUNG</div>
          <ul>
            <li>
              Thời gian trả góp: 3-6-12 tháng		
            </li>
            <li>
              Không giới hạn số lần mua trả góp (số lần trả góp tuỳ thuộc vào hạn mức của thẻ tín dụng).			
            </li>
            <li>
              Giá trị thanh toán thẻ từ 3.000.000 VNĐ trở lên		
            </li>
            <li>
              Chủ thẻ không được huỷ giao dịch sau khi giao dịch đã chuyển sang trả góp/ hoặc giao dịch đã lên sao kê		
            </li>
          </ul>	
          <div className='fw-bold text-primary'>
            CHỦ THẺ CẦN LƯU Ý TRƯỚC KHI THỰC HIỆN TRẢ GÓP		
          </div>
          <ul>
            <li>
              Hiệu lực còn lại của thẻ phải lớn hơn thời gian trả góp.
            </li>
            <li>
              Số dư của thẻ phải lớn hơn hoặc bằng tổng giá trị trả góp	
            </li>
          </ul>
      </ModalBody>
    </div>
  )
}

const TraGopNhanVien = (props) => {
  const { toggle } = props
  return (
    <div>
      <ModalHeader toggle={toggle}>
        <label className='fw-bold'>Điều kiện trả góp dành cho nhân viên</label>
      </ModalHeader>
      <ModalBody style={{ padding: '30px' }}>
        <div className='fw-bold text-primary'>QUY ĐỊNH CHUNG</div>
          <ul>
            <li>
              Thời gian trả góp tối đa 6 tháng.	
            </li>
            <li>
              Nhân viên cần thanh toán trước 30% giá trị hàng. Phần tiền còn lại được trừ vào lương hàng tháng
            </li>
            <li>
              Mỗi nhân viên sẽ được mua tối đa giá trị trả góp bằng 3 lần lương nhận hàng tháng.
            </li>
            <li>
              Mỗi nhân viên sẽ chỉ được mua sản phẩm trả góp tiếp theo khi thanh toán xong các sản phẩm trước đó.
            </li>
          </ul>	
      </ModalBody>
    </div>
  )
}