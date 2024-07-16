import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Input, InputGroup, InputGroupAddon, Row, Table } from 'reactstrap'
import { getCheckOrder } from '../../redux/order/action'
import { checkImage, checkNumber } from '../../utilities/checkNumber'

const CheckOrderNotUser = () => {
  const dispatch = useDispatch()

  const checkOrder = useSelector((store) => store.order.checkOrder)

  const [tukhoa, setTukhoa] = useState('')
  
  const onSearchBaoHanh = () => {
    const params = {
      mavandon: tukhoa
    }
    if(tukhoa != '') {
      dispatch(getCheckOrder(params))
    }
  }

  return(
    <Row className='mt-4'>
      <Col xs='12' className='p-0  rounded'>
        <div className='border-bottom text-center p-3'>
          <h5 className='text-primary fw-bold'>
            Thông tin đơn hàng
          </h5>
        </div>
        <div className='container'>
          
          <div className=' text-center d-flex justify-content-center '>
            <InputGroup className='justify-content-center rounded-0  w-75 mt-3'>
              <Input 
                className='hoplongtech-input rounded-0'
                placeholder="Nhập vào mã vận đơn"
                value={tukhoa}
                onChange={(e) => setTukhoa(e.target.value)} 
                />
              <InputGroupAddon addonType="append">
                <button 
                  className="btn bg-giga text-white rounded-0"
                  onClick={() => onSearchBaoHanh()}
                >Tìm kiếm</button>
              </InputGroupAddon>
            </InputGroup> 
          </div>
        </div>
        {
          checkOrder &&
          <div className='check-out'>
            <div className="orderer-info bg-white my-2 p-3 rounded shadow-lg">
              <label className="fw-bold">1. Thông tin người đặt hàng</label>
              <div className="row mt-2">
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-4">
                      Họ tên
                    </div>
                    <div className="col-md-8 text-primary fw-bold">{checkOrder && checkOrder.shipping_name}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      Phương thức thanh toán
                    </div>
                    {
                      checkOrder && (
                        <div className="col-md-8">
                          { checkOrder.payment_method == 'bank' && 'Chuyển khoản' }
                          { checkOrder.payment_method == 'ship_cod' && 'Tiền mặt' }
                          { checkOrder.payment_method == 'momo' && 'Ví Momo' }
                          { checkOrder.payment_method == 'vnpay' && 'Ví VNpay' }
                          { checkOrder.payment_method == 'thanh_toan_tin_dung' && 'Thanh toán qua thẻ tín dụng' }
                          { checkOrder.payment_method == 'tra_gop_tin_dung' && 'Trả góp qua thẻ tín dụng' }
                          { checkOrder.payment_method == 'tra_gop_to_chuc' && 'Trả góp qua tổ chức' }
                          {
                            checkOrder.payment_method == 'tra_gop' && 
                            <label className="mx-2">
                              {
                              checkOrder.installment_type == '3_month' ? '- 3 Tháng' :
                              checkOrder.installment_type == '6_month' ? '- 6 Tháng' :
                              checkOrder.installment_type == '9_month' ? '- 9 Tháng' : '- 12 Tháng' 
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
                    <div className="col-md-8 text-primary fw-bold">{checkOrder && checkOrder.shipping_phone}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      Phương thức nhận hàng 
                    </div>
                    <div className="col-md-8">{checkOrder && checkOrder.shipping_method == 'go_deliver' ? 'Đi giao hàng' : 'Đến cửa hàng'}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-4">
                      Email 
                    </div>
                    <div className="col-md-8">{checkOrder && checkOrder.shipping_email}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      Địa chỉ 
                    </div>
                    <div className="col-md-8">{checkOrder.shipping_address}, {checkOrder.shipping_district}, {checkOrder.shipping_city}</div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <label>Ghi chú đặt hàng: </label>
                  <label className="mx-2 text-danger"> {checkOrder && checkOrder.shipping_note}</label>
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
                    {checkOrder && 
                      checkOrder.productId && checkOrder.productId.length > 0 && checkOrder.productId.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">1</th>
                          <td>
                            <div className="d-flex align-items-center">
                              <img src={checkImage(item.thumb)} style={{width: 70, height: 80, objectFit: 'contain'}} />
                              {/* <Link key={index} className='compare-list-item text-center' to={`/${item.slug}`}> */}
                                <div className="text-primary fw-bold">{item.name}</div>
                              {/* </Link> */}
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
               
                    <div className="row mt-2">
                      <div className="col-md-6 text-end">
                        <label>Tổng tiền sản phẩm</label>
                      </div>
                      <div className="col-md-6">
                        { checkOrder && checkOrder.total_price &&checkNumber(checkOrder.total_price)} 
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 text-end">
                        <label>Phí ship</label>
                      </div>
                      <div className="col-md-6">
                        {checkOrder && checkOrder.shipping_fee && checkNumber(checkOrder.shipping_fee)} 
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 text-end">
                        <label>Mã giảm giá</label>
                      </div>
                      <div className="col-md-6">
                        {checkOrder && checkOrder.voucher && checkNumber(checkOrder.voucher)} vnđ
                      </div>
                    </div>
                    {
                      checkOrder.payment_method == 'tra_gop' &&
                      <div>
                        <div className="row">
                          <div className="col-md-6 text-end">
                            <label>Chênh lệch so với mua thẳng</label>
                          </div>
                          <div className="col-md-6 text-primary fw-bold">
                            {checkOrder && checkNumber(checkOrder.installment.toFixed(0))}   
                          </div>
                        </div>
                      </div>
                    }
                    <div className="row  border-top mt-2 pt-2">
                      <div className="col-md-6 text-end">
                        <label>Tổng tiền thanh toán</label>
                      </div>
                      <div className="col-md-6 text-primary fw-bold">
                        { checkOrder && checkOrder.total_payment && checkNumber(checkOrder.total_payment)}   
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </Col>
    </Row>
  )
}

export default CheckOrderNotUser