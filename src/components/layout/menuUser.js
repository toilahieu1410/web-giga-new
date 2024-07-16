import React, { Fragment } from "react"
import { Link } from "react-router-dom"

const MenuUser = () => {
  
  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <Fragment>
      <div className='menu-user'>
        <ul className='list-unstyled mb-0'>
          <Link to={{pathname:`/tai-khoan/thong-tin`}}><li>Thông tin tài khoản</li></Link>
          <Link to={{pathname:`/tai-khoan/don-hang`}}><li>Đơn hàng của bạn</li></Link>
          <Link to={{pathname:`/tai-khoan/bang-dieu-khien`}}><li className="list-unstyled text-default">Bảng điều khiển</li></Link>
          <Link to={{pathname:`/tai-khoan/san-pham-yeu-thich`}}><li>Sản phẩm yêu thích</li></Link>
          <li>
            <button className="btn btn-default p-0" onClick={() => logout()}><span className="text-primary">Đăng xuất</span></button>
          </li>
        </ul>
      </div>
    </Fragment>
  )
}

export default MenuUser