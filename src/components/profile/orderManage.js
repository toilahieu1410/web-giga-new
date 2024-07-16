import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { getListOrder } from '../../redux/order/action'
import { checkNumber, checkImage } from '../../utilities/checkNumber'
import MenuRight from './menuRight'

const OrderManage = () => {

  const [BasicLineTab, setBasicLineTab] = useState('2')
  
  return (
    <div className='row profile mt-3'>
      <div className='col-md-3 px-0 '>
        <MenuRight label='donhang'/>
      </div>
      <div className='col-md-9'  style={{paddingLeft: '10px', paddingBottom: 0, paddingRight: 0, paddingTop: 0}}>
        <div className='bg-white shadow-sm px-3 py-2 rounded'>
          <div>
            <Nav className="border-tab" tabs>
              <NavItem>
                <NavLink 
                  className={BasicLineTab === '1' ? 'active' : ''} 
                  onClick={() => setBasicLineTab('1')}>
                  Đơn nháp
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink 
                  className={BasicLineTab === '2' ? 'active' : ''} 
                  onClick={() => setBasicLineTab('2')}>
                  Chờ xác nhận
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink 
                  className={BasicLineTab === '3' ? 'active' : ''} 
                  onClick={() => setBasicLineTab('3')}>
                  Đang giao hàng
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink 
                  className={BasicLineTab === '4' ? 'active' : ''} 
                  onClick={() => setBasicLineTab('4')}>
                  Đã giao
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink 
                  className={BasicLineTab === '5' ? 'active' : ''} 
                  onClick={() => setBasicLineTab('5')}>
                  Đã hủy
                </NavLink>
              </NavItem>
            </Nav>
            <div className='my-2'>
              <OrderItem BasicLineTab={BasicLineTab}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderManage

const OrderItem = (props) => {

  const dispatch = useDispatch()

  const listOrder = useSelector((store) => store.order.listOrder)

  const {BasicLineTab} = props

  const [orderType, setOrderType] = useState(['draft'])

  useEffect(() => {
    if(BasicLineTab == '1') {
      setOrderType(['draft'])
    }
    else if (BasicLineTab == '2') {
      setOrderType(['wait_confirm'])
    }
    else if (BasicLineTab == '3') {
      setOrderType(['shipping', 'shipping_done'])
    }
    else if (BasicLineTab == '4') {
      setOrderType(['checkout_done'])
    }
    else if (BasicLineTab == '5') {
      setOrderType(['cancel', 'shipping_false'])
    }
  },[BasicLineTab])

  useEffect(() => {
    const params = {
      shipping_status: orderType
    }
    dispatch(getListOrder(params))
  },[orderType])

  return (
    <div>
      {
        listOrder && listOrder.map((item, index) => (
          <div className='py-2 border-bottom' key={index}>
            {
              item.productId && item.productId.length > 0 &&
              <div className='d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center'>
                  <img 
                    src={checkImage(item.productId[0].thumb)} 
                    style={{width: 100, height: 100}}
                  />
                  <div className='mx-2'>
                    <Link key={index} className='compare-list-item text-center' to={`/${item.productId[0].slug}/${item.productId[0].slug}`}>
                      <label className='text-primary fw-bold cursor-pointer'>{item.productId[0].name}</label>
                    </Link>
                    <label className='d-block'>{item.productId[0].version_detail.name}</label>
                    <label className='d-block mt-2'>x{item.total_qty}</label>
                  </div> 
                </div>
                <div>
                  <label >{checkNumber(item.productId[0].version_detail.price)} </label>
                </div>
              </div>
            } 
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <label className='fw-bold'>Mã đơn hàng:</label>
                <label className='text-primary mx-2'>{item.mavandon}</label>
              </div>
              <div className='text-end'>
                <label className='text-primary fw-bold'>Tổng tiền: {checkNumber(item.total_payment)}</label>
                <div className='mt-2'>
                  <Link to={{pathname: '/don-hang/chi-tiet-don-hang', state: {id: item._id}}}>
                    <button className='btn bg-blue text-white'>Xem chi tiết</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      }
      {
        listOrder.length < 1 && 
        <div className='text-center py-4'>
          <label className='text-primary fw-bold'>Chưa có đơn hàng nào</label>
        </div>
      }
    </div>
  )
}