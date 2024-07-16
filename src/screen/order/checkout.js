import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useHistory, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import { Table } from 'reactstrap'
import { _confirmOrder } from "../../api/order"
import { checkNumber, checkImage } from '../../utilities/checkNumber'
import Loading from "../../components/notification/loading"
import useToken from '../../utilities/useToken'
import jwt_decode from "jwt-decode"

const Checkout = () => {

  const state = useLocation()
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const {token} = useToken()

  let decoded
  if (token) { decoded = jwt_decode(token) }

  const onHandleConfirm = () => {
    setLoading(true)
    if( state.state.payment_method == 'tra_gop_tin_dung' || state.state.payment_method == 'tra_gop_to_chuc' || state.state.payment_method == 'thanh_toan_tin_dung' ) {
      window.location.assign(state.state.data.payment_url)
    }
    if( state.state.payment_method == 'vnpay' ) {
      window.location.assign(state.state.createPaymentUrl)
    }
    if( state.state.payment_method == 'momo' ) {
      
    }
    if(state.state.payment_method == 'bank' || state.state.payment_method == 'ship_cod') {
      setLoading(true)
      _confirmOrder(state.state._id)
        .then((res) => {
          if(res.status == 200) {
            toast.success('Đã xác nhận tạo đơn hàng!')
            setLoading(false)
            history.push({pathname: `/don-hang/thankyou`, state: res.data})
          }
        })
        .catch((error) => {
          toast.success('Lỗi! vui lòng liên hệ admin để được hỗ trợ')
        })
    }
  }

  return (
    <div className="list-products-item">
      <h5 className="text-primary fw-bold my-4 text-center">Vui lòng kiểm tra và xác nhận đơn hàng</h5>
      <div className="orderer-info bg-white my-2 p-3 rounded shadow-lg">
        <label className="fw-bold">1. Thông tin người đặt hàng</label>
        <div className="row mt-2">
          <div className="col-md-4 ordering-infomation">
            <div className="row">
              <div className="col-md-4">
                Họ tên
              </div>
              <div className="col-md-8 text-primary fw-bold">{state.state.shipping_name}</div>
            </div>
            <div className="row">
              <div className="col-md-4">
                Phương thức thanh toán
              </div>
              <div className="col-md-8">
                { state.state.payment_method == 'bank' && 'Chuyển khoản' }
                { state.state.payment_method == 'ship_cod' && 'Tiền mặt' }
                { state.state.payment_method == 'momo' && 'Ví Momo' }
                { state.state.payment_method == 'vnpay' && 'Ví VNpay' }
                { state.state.payment_method == 'thanh_toan_tin_dung' && 'Thanh toán qua thẻ tín dụng' }
                { state.state.payment_method == 'tra_gop_tin_dung' && 'Trả góp qua thẻ tín dụng' }
                { state.state.payment_method == 'tra_gop_to_chuc' && 'Trả góp qua tổ chức' }

                {/* {
                   state.state.payment_method == 'tra_gop' && 
                   <label className="mx-2">
                     {
                      state.state.installment_type == '3_month' ? '- 3 Tháng' :
                      state.state.installment_type == '6_month' ? '- 6 Tháng' :
                      state.state.installment_type == '9_month' ? '- 9 Tháng' : '- 12 Tháng' 
                     }
                   </label>
                } */}
              </div>
            </div>
           
          </div>
          <div className="col-md-4 ordering-infomation">
            <div className="row">
              <div className="col-md-4">
                Điện thoại 
              </div>
              <div className="col-md-8 text-primary fw-bold">{state.state.shipping_phone}</div>
            </div>
            <div className="row">
              <div className="col-md-4">
                Phương thức nhận hàng 
              </div>
              <div className="col-md-8">{state.state.shipping_method == 'go_deliver' ? 'Đi giao hàng' : 'Đến cửa hàng'}</div>
            </div>
          </div>
          <div className="col-md-4 ordering-infomation">
            <div className="row">
              <div className="col-md-4">
                Email 
              </div>
              <div className="col-md-8">{state.state.shipping_email}</div>
            </div>
            <div className="row">
              <div className="col-md-4">
                Địa chỉ 
              </div>
              <div className="col-md-8">{state.state.shipping_address}, {state.state.shipping_district}, {state.state.shipping_city}</div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12">
            <label>Mã đơn hàng: </label>
            <label className="mx-2 text-primary fw-bold"> {state.state.mavandon}</label>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12">
            <label>Ghi chú đặt hàng: </label>
            <label className="mx-2 text-danger"> {state.state.shipping_note}</label>
          </div>
        </div>
      </div>
      <div className="bg-white mt-4 p-3 rounded shadow-lg">
        <label className="fw-bold">2. Danh sách sản phẩm đặt hàng</label>
        <div className="mt-2">
          <div className="table-responsive">
          <Table>
            <thead className="bg-giga">
              <tr>
                <th style={{minWidth: 40}} className='bg-giga text-white text-center'>#</th>
                <th style={{minWidth: 300}} className='bg-giga text-white text-center'>Tên sản phẩm</th>
                <th style={{minWidth: 100}} className='bg-giga text-white text-center'>Version</th>
                <th style={{minWidth: 50}} className='bg-giga text-white text-center'>Sl</th>
                <th style={{minWidth: 100}} className='bg-giga text-white text-center'>Giá tiền</th>
                <th style={{minWidth: 100}} className='bg-giga text-white text-center'>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {
                state.state.productId && state.state.productId.length > 0 && state.state.productId.map((item, index) => (
                  <tr key={index}>
                    <th scope="row" className="text-center">1</th>
                    <td >
                      <div className="d-flex align-items-center">
                        <img src={checkImage(item.thumb)} style={{width: 70, height: 80, objectFit: 'contain'}} />
                        <div>
                          <div className="text-primary fw-bold">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center align-middle">
                      {item.version_detail && item.version_detail.name && item.version_detail.name}
                    </td>
                    <td className="text-center align-middle">
                      {item.qty && item.qty}
                    </td>
                    <td className="text-center align-middle">
                      {
                        (token && (decoded.type == 'erp' || decoded.type == 'vip')) ? (
                          checkNumber(item.version_detail.erp_price ? item.version_detail.erp_price: item.version_detail.price)
                        ) : (
                          <div>
                            {
                              item.flashSale_status ? (
                                item.version_detail.price && checkNumber(item.version_detail.price_flashsale)
                              ) : (
                                item.version_detail.price && checkNumber(item.version_detail.price)
                              )
                            }
                          </div>
                        )
                      }
                    </td>
                    <td className="text-center align-middle">
                      {
                        (token && (decoded.type == 'erp' || decoded.type == 'vip')) ? (
                          item.version_detail.price && item.qty && checkNumber(parseInt(item.version_detail.erp_price) * item.qty)
                        ) : (
                          <div>
                            {
                              item.flashSale_status ? (
                                item.version_detail.price && item.qty && checkNumber(parseInt(item.version_detail.price_flashsale) * item.qty)
                              ) : (
                                item.version_detail.price && item.qty && checkNumber(parseInt(item.version_detail.price) * item.qty)
                              )
                            }
                          </div>
                        )
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
          </div>
 
        </div>
        <div className="total-money">
          <div className="row">
            <div className="col-md-8 col-sm-6"></div>
            <div className="col-md-4 col-sm-6">
          
              <div className="row mt-2">
                <div className="col-md-6 text-end">
                  <label>Tổng tiền sản phẩm:</label>
                </div>
                <div className="col-md-6">
                  {checkNumber(state.state.total_price)} 
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 text-end">
                  <label>Phí ship:</label>
                </div>
                <div className="col-md-6">
                  {checkNumber(state.state.shipping_fee)} 
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 text-end">
                  <label>Mã giảm:</label>
                </div>
                <div className="col-md-6">
                  -{checkNumber(state.state.voucher)} 
                </div>
              </div>
              {
                state.state.payment_method == 'tra_gop' &&
                <div>
                  <div className="row">
                    <div className="col-md-6 text-end">
                      <label>Chênh lệch so với mua thẳng:</label>
                    </div>
                    <div className="col-md-6 text-primary fw-bold">
                      {checkNumber(state.state.installment.toFixed(0))} 
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 text-end">
                      <label>Tiền trả góp hàng tháng:</label>
                    </div>
                    <div className="col-md-6 text-primary fw-bold">
                      {checkNumber(state.state.installment_month.toFixed(0))} 
                    </div>
                  </div>
                  
                </div>
              }
              <div className="row  border-top mt-2 pt-2">
                <div className="col-md-6 text-end">
                  <label>Tổng tiền thanh toán:</label>
                </div>
                <div className="col-md-6 text-primary fw-bold">
                  {checkNumber(state.state.total_payment)}   
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <button disabled={loading} className="btn btn-primary bg-giga" onClick={onHandleConfirm}>
            Xác nhận đặt hàng
          </button>
          {
            loading && <Loading/>
          }
        </div>
      </div>
    </div>
  )
}

export default Checkout