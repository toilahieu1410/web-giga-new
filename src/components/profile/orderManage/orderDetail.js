import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link ,useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Table } from 'reactstrap'
import { _confirmOrder } from '../../../api/order'
import { deleteOrder } from '../../../redux/order/action'
import { getDetailOrder } from '../../../redux/order/action'
import { checkImage, checkNumber } from '../../../utilities/checkNumber'

const OrderDetail = () => {
  const dispatch = useDispatch()

  const state = useLocation()
  const history = useHistory()

  const detailOrder = useSelector((store) => store.order.detailOrder)

  useEffect(() => {
    dispatch(getDetailOrder(state.state.id))
  },[state])

  const onHandleConfirm = () => {
    _confirmOrder(detailOrder._id).then((res) => {
      if(res.status == 200) {
        toast.success('Đã xác nhận đơn hàng!')
        if( res.data.payment_method == 'bank' || res.data.payment_method == 'ship_cod'){
          history.push({pathname: `/don-hang/thankyou`, state: res.data})
        }
        else {
          history.push({pathname: `/tai-khoan/don-hang`})
        }
      }
    })
  }

  const deleteCheckout = () => {
    if(window.confirm('Bạn có chắc chắn muốn hủy đơn đặt hàng này?')){
      dispatch(deleteOrder(detailOrder._id))
        .then(() => {
          toast.success('Hủy đơn hàng thành công')
          setTimeout(() => {
            history.push({pathname: `/tai-khoan/don-hang`})
          }, 2000)
        })
    }
  }
  
  return (
    <div>
      {/* Checkout */}
      <h5 className="text-primary fw-bold my-4 text-center">Chi tiết đơn hàng</h5>
      <div className="orderer-info bg-white my-2 p-3 rounded shadow-lg">
        <label className="fw-bold">1. Thông tin người đặt hàng</label>
        <div className="row mt-2">
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-4">
                Họ tên
              </div>
              <div className="col-md-8 text-primary fw-bold">{detailOrder && detailOrder.shipping_name}</div>
            </div>
            <div className="row">
              <div className="col-md-4">
                Phương thức thanh toán
              </div>
              {
                detailOrder && (
                <div className="col-md-8">
                  { detailOrder.payment_method == 'bank' && 'Chuyển khoản' }
                  { detailOrder.payment_method == 'ship_cod' && 'Tiền mặt' }
                  { detailOrder.payment_method == 'momo' && 'Ví Momo' }
                  { detailOrder.payment_method == 'vnpay' && 'Ví VNpay' }
                  { detailOrder.payment_method == 'thanh_toan_tin_dung' && 'Thanh toán qua thẻ tín dụng' }
                  { detailOrder.payment_method == 'tra_gop_tin_dung' && 'Trả góp qua thẻ tín dụng' }
                  { detailOrder.payment_method == 'tra_gop_to_chuc' && 'Trả góp qua tổ chức' }
                  {
                    detailOrder.payment_method == 'tra_gop' && 
                    <label className="mx-2">
                      {
                        detailOrder.installment_type == '3_month' ? '- 3 Tháng' :
                        detailOrder.installment_type == '6_month' ? '- 6 Tháng' :
                        detailOrder.installment_type == '9_month' ? '- 9 Tháng' : '- 12 Tháng' 
                      }
                    </label>
                  }
                </div>
                )
              }
              
            </div>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-4">
                Điện thoại 
              </div>
              <div className="col-md-8 text-primary fw-bold">{detailOrder && detailOrder.shipping_phone}</div>
            </div>
            <div className="row">
              <div className="col-md-4">
                Phương thức nhận hàng 
              </div>
              <div className="col-md-8">{detailOrder && detailOrder.shipping_method == 'go_deliver' ? 'Đi giao hàng' : 'Đến cửa hàng'}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-4">
                Email 
              </div>
              <div className="col-md-8">{detailOrder && detailOrder.shipping_email}</div>
            </div>
            <div className="row">
              <div className="col-md-4">
                Địa chỉ 
              </div>
              <div className="col-md-8">{detailOrder.shipping_address}, {detailOrder.shipping_district}, {detailOrder.shipping_city}</div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12">
            <label>Ghi chú đặt hàng: </label>
            <label className="mx-2 text-danger"> {detailOrder && detailOrder.shipping_note}</label>
          </div>
        </div>
      </div>
      <div className="bg-white mt-4 p-3 rounded shadow-lg">
        <label className="fw-bold">2. Danh sách sản phẩm đặt hàng</label>
        <div className="mt-2">
          <Table style={{borderCollapse: 'inherit'}}>
            <thead className="bg-giga">
              <tr>
                <th style={{width: 50}} className='bg-giga text-white text-center'>#</th>
                <th style={{width: 350}} className='bg-giga text-white text-center'>Tên sản phẩm</th>
                <th className='bg-giga text-white text-center'>Version</th>
                <th style={{width: 100}} className='bg-giga text-white text-center'>Sl</th>
                <th className='bg-giga text-white text-center'>Giá tiền</th>
                <th className='bg-giga text-white text-center'>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {detailOrder && 
                detailOrder.productId && detailOrder.productId.length > 0 && detailOrder.productId.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">1</th>
                    <td>
                      <div className="d-flex align-items-center">
                        <img src={checkImage(item.thumb)} style={{width: 70, height: 80, objectFit: 'contain'}} />
                        <Link key={index} className='compare-list-item text-center' to={`/${item.slug}/${item.slug}`}>
                          <div className="text-primary fw-bold">{item.name}</div>
                        </Link>
                      </div>
                    </td>
                    <td className="text-center align-middle">
                      {item.version_detail && item.version_detail.name && item.version_detail.name}
                    </td>
                    <td className="text-center align-middle">
                      {item.qty && item.qty}
                    </td>
                    <td className="text-center align-middle">
                      {item.version_detail && item.version_detail.price && checkNumber(item.version_detail.price)} 
                    </td>
                    <td className="text-center align-middle">
                      {item.version_detail && item.version_detail.price && item.qty && checkNumber(parseInt(item.version_detail.price) * item.qty)} 
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
        <div className="total-money">
          <div className="row">
            <div className="col-md-8 col-sm-6"></div>
            <div className="col-md-4 col-sm-6">
              <div className="row">
              
              </div>
              <div className="row mt-2">
                <div className="col-md-6 text-end">
                  <label>Tổng tiền sản phẩm</label>
                </div>
                <div className="col-md-6">
                  { detailOrder && detailOrder.total_price &&checkNumber(detailOrder.total_price)} 
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 text-end">
                  <label>Phí ship</label>
                </div>
                <div className="col-md-6">
                  {detailOrder && detailOrder.shipping_fee && checkNumber(detailOrder.shipping_fee)} 
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 text-end">
                  <label>Mã giảm giá</label>
                </div>
                <div className="col-md-6">
                  {detailOrder && detailOrder.voucher && `-${checkNumber(detailOrder.voucher)}`} vnđ
                </div>
              </div>
              {
                detailOrder.payment_method == 'tra_gop' &&
                <div>
                  <div className="row">
                    <div className="col-md-6 text-end">
                      <label>Chênh lệch so với mua thẳng</label>
                    </div>
                    <div className="col-md-6 text-primary fw-bold">
                      {detailOrder && checkNumber(detailOrder.installment.toFixed(0))}   
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 text-end">
                      <label>Tiền trả góp hàng tháng</label>
                    </div>
                    <div className="col-md-6 text-primary fw-bold">
                      {detailOrder && checkNumber(detailOrder.installment_month.toFixed(0))}   
                    </div>
                  </div>
                </div>
              }
              <div className="row  border-top mt-2 pt-2">
                <div className="col-md-6 text-end">
                  <label>Tổng tiền thanh toán</label>
                </div>
                <div className="col-md-6 text-primary fw-bold">
                  { detailOrder && detailOrder.total_payment && checkNumber(detailOrder.total_payment)}   
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          {
            detailOrder.shipping_status == 'draft' ? 
            <div>
              <button className="btn btn-danger mx-2" onClick={deleteCheckout} >
                Hủy đơn hàng
              </button>
              <button className="btn bg-giga text-white" onClick={onHandleConfirm}>
                Xác nhận đơn hàng
              </button>
            </div>
            : detailOrder.shipping_status == 'wait_confirm' ?
            <div>
              <button className="btn btn-danger mx-2" onClick={deleteCheckout} >
                Hủy đơn hàng
              </button> 
              <button className="btn bg-giga  text-white" >
                Liên hệ người bán
              </button>
            </div>
            : 
            <div>
              <button className="btn bg-giga text-white" >
                Liên hệ người bán
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default OrderDetail