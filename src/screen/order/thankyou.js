import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Col, Label, Row, Button, Table } from 'reactstrap'
import { checkImage, checkNumber } from '../../utilities/checkNumber'

const Thankyou = () => {

  const state = useLocation()

  return (
    <div className='thankyou'>
      <Row className="bg-white thank-you-body my-4 p-4">
        <div className="border-bottom text-center p-3">
          <h4 className="text-primary fw-bold text-center">Thank you</h4>
        </div>
        <Col sm="12" md={{ size: 12 }} className="text-center">
          <div className="text-center d-flex justify-content-center mt-3">
            <div className="d-flex justify-content-center align-items-center border p-3 rounded-circle">
              <i
                className="fa fa-check text-primary"
                style={{ fontSize: 48 }}
              ></i>
            </div>
          </div>
          <div className="mt-3">
            <Label className="text-primary thank-you-status fw-bold">
              Đặt hàng thành công!
            </Label>
          </div>
          <div className="mt-3">
            <Label className="text-primary thank-you-status fw-bold">
              Mã vận đơn: {state.state && state.state.mavandon}
            </Label>
          </div>
          <div className="mt-4">
            {state.state &&
              state.state.payment_method == 'bank' &&
              <div className='w-100'>
                Vui lòng xác nhận bạn đã thanh toán qua số tài khoản của chúng tôi
                <div className='my-2'>
                  <div className='row'>
                    <div className='col-md-5 text-end'>
                      <label >Tài khoản: </label>
                    </div>
                    <div className='col-md-7 text-start'>
                      <span className='text-primary fw-bold'>{process.env.REACT_APP_BANK_NUMBER}</span>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-5 text-end'>
                      <label>Chủ tài khoản: </label>
                    </div>
                    <div className='col-md-7 text-start'>
                      <span className='text-primary fw-bold'>{process.env.REACT_APP_BANK_ACCOUNT}</span>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-5 text-end'>
                      <label>Ngân hàng: </label>
                    </div>
                    <div className='col-md-7 text-start'>
                      <span className='text-primary fw-bold'>{process.env.REACT_APP_BANK_NAME}</span>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-5 text-end'>
                      <label>Chi nhánh: </label>
                    </div>
                    <div className='col-md-7 text-start'>
                      <span className='text-primary fw-bold'>{process.env.REACT_APP_BANK_BRANCH}</span>
                    </div>
                  </div>
                </div>
              </div>
            }
            {
              state.state && (
                <div className='check-out'>
                  <div className="orderer-info bg-white my-2 p-3 rounded shadow-lg text-left">
                    <label className="fw-bold">1. Thông tin người đặt hàng</label>
                    <div className="row mt-2">
                      <div className="col-md-4">
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
                            {state.state.payment_method == 'bank' && 'Chuyển khoản'}
                            {state.state.payment_method == 'ship_cod' && 'Tiền mặt'}
                            {state.state.payment_method == 'momo' && 'Ví Momo'}
                            {state.state.payment_method == 'vnpay' && 'Ví VNpay'}
                            {state.state.payment_method == 'thanh_toan_tin_dung' && 'Thanh toán qua thẻ tín dụng'}
                            {state.state.payment_method == 'tra_gop_tin_dung' && 'Trả góp qua thẻ tín dụng'}
                            {state.state.payment_method == 'tra_gop_to_chuc' && 'Trả góp qua tổ chức'}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
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
                      <div className="col-md-4">
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
                        <label>Ghi chú đặt hàng: </label>
                        <label className="mx-2 text-danger"> {state.state.shipping_note}</label>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white mt-4 p-3 rounded shadow-lg text-left">
                    <label className="fw-bold">2. Danh sách sản phẩm đặt hàng</label>
                    <div className="mt-2">
                      <Table style={{ borderCollapse: 'inherit' }}>
                        <thead className="bg-giga">
                          <tr>
                            <th style={{ width: 50 }} className='bg-giga text-white text-center'>#</th>
                            <th style={{ width: 350 }} className='bg-giga text-white text-center'>Tên sản phẩm</th>
                            <th className='bg-giga text-white text-center'>Version</th>
                            <th style={{ width: 100 }} className='bg-giga text-white text-center'>Sl</th>
                            <th className='bg-giga text-white text-center'>Giá tiền</th>
                            <th className='bg-giga text-white text-center'>Tổng tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            state.state.productId && state.state.productId.length > 0 && state.state.productId.map((item, index) => (
                              <tr key={index}>
                                <th scope="row">1</th>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <img src={checkImage(item.thumb)} style={{ width: 70, height: 80, objectFit: 'contain' }} />
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
                                  {
                                    item.flashSale_status ? (
                                      item.version_detail && item.version_detail.price && checkNumber(item.version_detail.price_flashsale)
                                    ) : (
                                      item.version_detail && item.version_detail.price && checkNumber(item.version_detail.price)
                                    )
                                  }
                                </td>
                                <td className="text-center align-middle">
                                  {
                                    item.flashSale_status ? (
                                      item.version_detail && item.version_detail.price_flashsale && item.qty && checkNumber(parseInt(item.version_detail.price_flashsale) * item.qty)
                                    ) : (
                                      item.version_detail && item.version_detail.price && item.qty && checkNumber(parseInt(item.version_detail.price) * item.qty)
                                    )
                                  }
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
                              {state.state.total_price && checkNumber(state.state.total_price)}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 text-end">
                              <label>Phí ship</label>
                            </div>
                            <div className="col-md-6">
                              {state.state.shipping_fee && checkNumber(state.state.shipping_fee)}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 text-end">
                              <label>Mã giảm giá</label>
                            </div>
                            <div className="col-md-6">
                              {state.state.voucher && checkNumber(state.state.voucher)} vnđ
                            </div>
                          </div>
                          <div className="row  border-top mt-2 pt-2">
                            <div className="col-md-6 text-end">
                              <label>Tổng tiền thanh toán</label>
                            </div>
                            <div className="col-md-6 text-primary fw-bold">
                              {state.state.total_payment && checkNumber(state.state.total_payment)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
          <div className="d-flex justify-content-center mt-4">
            <Link to={{ pathname: '/' }}>
              <Button className="hoplongtech-btn-gray p-2 px-3">
                Quay lại trang chủ
              </Button>
            </Link>
            <Link to={{ pathname: '/don-hang/tra-cuu-don-hang' }}>
              <Button
                className="hoplongtech-btn-primary p-2 px-3"
                style={{ marginLeft: 15 }}>
                Quản lý đơn hàng
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default Thankyou