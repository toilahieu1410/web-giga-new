import React from "react"
import { Link } from 'react-router-dom'
import ERROR404 from "../../assets/images/404.png"

const Error404 = () => {
  return (
    <div className="error text-center">
      <img src={ERROR404} className='text-center d-block w-20 mt-4' style={{ margin: '0 auto' }} />
      <h4 className="text-center text-primary mt-4">Không tìm thấy đường dẫn này</h4>
      <p className="text-primary">Có vẻ như, trang không tồn tại</p>
      <div className="button-back mt-3">
        <Link to={'/'} className='btn d-inline-block'><i className="fa fa-arrow-left mr-10"></i>Quay lại trang chủ</Link>
      </div>
    </div>
  )
}

export default Error404