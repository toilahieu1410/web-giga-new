import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory, Link } from 'react-router-dom'
import { Label } from 'reactstrap'
import { sumBy } from 'lodash'
import { toast } from 'react-toastify'
import ItemOrder from './itemOrder'
import FormInputOrder from './formInputOrder'
import useToken from '../../utilities/useToken'
import { checkNumber } from '../../utilities/checkNumber'
import { getCity, getDistrict, getProfile } from '../../redux/profile/action'
import { _createOrder, _createOrderNotUser } from '../../api/order'
import { _checkVoucher } from '../../api/home'
import { _getShippingFee } from '../../api/profile'
import Loading from '../../components/notification/loading'
import EmptyCart from '../../assets/imgs/icon-header/shopping.svg'

const defaultCart = process.env.REACT_APP_DEFAULT_CART

const today = new Date().getTime()

const BuyNow = () => {

  const state = useLocation()

  const dispatch = useDispatch()
  const history = useHistory()

  const { token } = useToken()

  const listCity = useSelector((store) => store.profile.listCity)
  const listDistrict = useSelector((store) => store.profile.listDistrict)
  const profileInfo = useSelector((store) => store.profile.profileInfo)

  const [checked, setChecked] = useState(false)
  const [checked1, setChecked1] = useState(false)
  const [city, setCity] = useState(null)
  const [district, setDistrict] = useState(null)
  const [cityId, setCityId] = useState(null)
  const [districtIdApi, setDistrictIdApi] = useState(null)
  const [address, setAddress] = useState(null)
  const [listCartNew, setListCartNew] = useState([state.state])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalTraGop, setTotalTraGop] = useState(0)
  const [shippingFee, setShippingFee] = useState(0)
  const [totalQty, setTotalQty] = useState(0)
  const [shipMethod, setShipMethod] = useState('go_deliver')
  const [paymentMethod, setPaymentMethod] = useState('bank')
  const [soThangTraGop, setSoThangTraGop] = useState('3_month')
  const [voucher, setVoucher] = useState('')
  const [messageVoucher, setMessageVoucher] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingVoucher, setLoadingVoucher] = useState(false)

  useEffect(() => {
    dispatch(getCity())
  }, [])

  useEffect(() => {
    if (cityId != null) {
      dispatch(getDistrict(cityId))
    }
  }, [cityId])

  useEffect(() => {
    dispatch(getProfile())
  }, [])

  useEffect(() => {
    if (listCartNew && listCartNew.length > 0) {
      if (state.state.flashSale_status && today < state.state.flashSale_end_date) {
        setTotalPrice(
          sumBy(listCartNew, function (item) {
            if (item.qty > item.version_detail.stock_flashsale) {
              return item.version_detail.price * item.qty
            } else {
              return item.version_detail.price_flashsale * item.qty
            }
          })
        )
      } else {
        setTotalPrice(
          sumBy(listCartNew, function (item) {
            return item.version_detail.price * item.qty
          })
        )
      }
    }
  }, [listCartNew])

  useEffect(() => {
    if (listCartNew && listCartNew.length > 0) {
      setTotalQty(
        sumBy(listCartNew, function (item) {
          return item.qty
        })
      )
    }
  }, [listCartNew])

  useEffect(() => {
    if (totalPrice > 2000000) {
      setShippingFee(0)
    } else {
      const fetchData = async () => {
        const result = await _getShippingFee(districtIdApi)
        return result
      }
      if (districtIdApi) {
        fetchData()
          .then(res => {
            setShippingFee(res.total)
          })
      }
    }
  }, [totalPrice, cityId, districtIdApi])

  useEffect(() => {
    if (shipMethod === 'store') {
      setShippingFee(0)
    }
  }, [shipMethod])

  useEffect(() => {
    if (totalPrice < 3000000) {
      setPaymentMethod('bank')
    }
  }, [totalPrice])

  useEffect(() => {
    if (paymentMethod == 'tra_gop') {
      if (soThangTraGop == '3_month') {
        setTotalTraGop((totalPrice * 0.038).toFixed())
      }
      else if (soThangTraGop == '6_month') {
        setTotalTraGop((totalPrice * 0.057).toFixed())
      }
      else if (soThangTraGop == '9_month') {
        setTotalTraGop((totalPrice * 0.067).toFixed())
      }
      else if (soThangTraGop == '12_month') {
        setTotalTraGop((totalPrice * 0.077).toFixed())
      }
    }
    else {
      setSoThangTraGop('3_month')
    }
  }, [totalPrice, soThangTraGop, paymentMethod])

  const onSubmit = (data) => {
    setLoading(true)
    const body = {
      shipping_method: shipMethod,
      shipping_name: data.name,
      shipping_phone: data.phone,
      shipping_email: data.email,
      shipping_city: city,
      shipping_district: district,
      shipping_address: shipMethod == 'store' ? 'Số 33, ngõ 41, Thái Hà, Trung Liệt' : data.address,
      shipping_note: data.content,
      shipping_fee: shippingFee,
      productId: listCartNew,
      total_price: totalPrice,
      total_qty: totalQty,
      payment_method: paymentMethod,
      from: token ? 'cart' : 'guest',
      installment_type: soThangTraGop,
      flashsale_status: state.state.flashSale_status
    }
    if (messageVoucher) {
      Object.assign(body, { voucher_name: voucher, voucher: messageVoucher.value })
    } else {
      Object.assign(body, { voucher: 0 })
    }
    if (data.content == '') {
      delete body.shipping_note
    }
    if (body.payment_method != 'tra_gop') {
      delete body.installment_type
    }
    if (token) {
      _createOrder(body).then((res) => {
        if (res.status == 200) {
          setLoading(false)
          toast.success('Tạo đơn hàng thành công!')
          history.push({
            pathname: `/don-hang/dat-hang`,
            state: res.data
          })
        }
      })
    }
    if (token == null) {
      _createOrderNotUser(body).then((res) => {
        if (res.status == 200) {
          toast.success('Tạo đơn hàng thành công!')
          localStorage.removeItem(defaultCart)
          history.push({
            pathname: `/don-hang/dat-hang`,
            state: res.data
          })
        }
      })
    }
  }

  const onChangeShipMethod = (method) => {
    setChecked(!checked)
    setShipMethod(method)
  }

  const onChangeShipMethod1 = (method) => {
    setChecked(!checked)
    setShipMethod(method)
    // setCity(profileInfo.systemCity)
    // setDistrict(profileInfo.systemDistrict)
  }

  const onChangePaymentMethod = (method) => {
    setChecked1(!checked1)
    setPaymentMethod(method)
  }

  const onChangeTraGop = (e) => {
    setSoThangTraGop(e.target.value)
  }

  const checkVoucher = () => {
    setLoadingVoucher(true)
    const listProductId = listCartNew.map(item => { return item.id })
    _checkVoucher(voucher, listProductId, totalPrice)
      .then(res => {
        setMessageVoucher(res)
      })
      .catch(() => {
        setMessageVoucher('Lỗi! Bạn vui lòng liên hệ bộ phận chăm sóc khách hàng để được hỗ trợ')
      })
      .finally(() => {
        setLoadingVoucher(false)
      })
  }

  return (
    <div className='cart-order '>
      <div className='col-md-12 list-product'>
        <div className='row mt-3'>
          <div className={listCartNew.length === 0 ? "w-100" : "w-70"}>
            <div className='list-cart-order'>
              {
                listCartNew.length == 0 && (
                  <div className="empty-cart text-center">
                    <img src={EmptyCart} width={300} />
                    <h5 className="mt-3 text-primary">Chưa có sản phẩm trong giỏ hàng </h5>
                  </div>
                )
              }
              {
                listCartNew && listCartNew.length > 0 && (
                  <div className='list-cart-data'>
                    <div className='head-items-grid-buyNow d-grid'>
                      <div className='flex-5'>
                        <input type={'checkbox'} />
                        &nbsp;&nbsp;
                        <span className='text-primary'>Sản phẩm</span>
                      </div>
                      <div className='flex-2 price text-center'>
                        <span className='text-primary'>Giá</span>
                      </div>
                      <div className='flex-2 content-product text-center'>
                        <span className='text-primary'>Số lượng</span>
                      </div>
                      <div className='flex-1 text-center'>
                        <span className='text-primary'>Phiên bản</span>
                      </div>
                      <div className='flex-1 text-center'>
                        <span className='text-primary'>Tổng tiền</span>
                      </div>
                    </div>
                    {
                      listCartNew.map((item, index) => (
                        <ItemOrder
                          key={index}
                          index={index}
                          item={item}
                          listCartNew={listCartNew}
                          setListCartNew={setListCartNew}
                          buyNow='true'
                        />
                      ))
                    }
                  </div>
                )
              }

            </div>
          </div>
          <div className='w-30'>
            {
              listCartNew && listCartNew.length > 0 && (
                <div className='content-price'>
                  <div className="ex2">

                    {
                      (state.state.flashSale_status && today < state.state.flashSale_end_date) ? (
                        <div></div>
                      ) : (
                        // Ma giam gia
                        <div>
                          <div className='d-flex align-items-top '>

                            <div className="voucher-price">
                              <ul className="list-unstyled mb-0 discount-code">
                                {
                                  state.state.voucher.map(ele => (
                                    <li className="mr-10 cursor-pointer mb-2" onClick={() => (setVoucher(ele.voucher))}>
                                      <div className="list-voucher text-white pl-10 pr-10">
                                        <p>{ele.voucher}</p>
                                        <p>{ele.title}</p>
                                      </div>
                                    </li>
                                  ))
                                }
                              </ul>
                            </div>
                          </div>
                          <div className='list-price '>
                            <div className='col-md-12 d-flex form-group'>
                              <input type='text'
                                className='form-control w-75'
                                placeholder='Mã giảm giá (Nếu có)'
                                value={voucher}
                                onChange={e => setVoucher(e.target.value)}
                              />
                              <div className='button-success text-center'>
                                <button className='btn hoplongtech-btn-primary' onClick={() => checkVoucher()}>
                                  <span className='text-white'>Áp dụng</span>
                                </button>
                              </div>
                              <div className='bottom-0 loading-voucher'>
                                {loadingVoucher && <Loading />}
                              </div>
                            </div>
                            <i>{messageVoucher && messageVoucher.message}</i>
                          </div>
                        </div>
                      )
                    }
                    <div className='sum-products'>
                      <div className='mb-3 border-bottom'>
                        <div className='row'>
                          <div className='col-md-6'>
                            <span className='text-title'>Tổng tiền sản phẩm</span>
                          </div>
                          <div className='col-md-6 text-end'>
                            <span className='text-primary'>{checkNumber(totalPrice)}</span>
                          </div>
                        </div>
                      </div>
                      <div className='mb-3 border-bottom'>
                        <div className='row'>
                          <div className='col-md-6'>
                            <span className='text-title'>Phí giao hàng</span>
                          </div>
                          <div className='col-md-6 text-end'>
                            <span className='text-primary'>{checkNumber(shippingFee)}</span>
                          </div>
                        </div>
                      </div>
                      <i className='fw-normal '>(miễn phí vận chuyển đơn hàng trên 2.000.000đ)</i>
                      <div className='mt-3 border-bottom'>
                        <div className='row'>
                          <div className='col-md-6'>
                            <span className='text-title'>Giảm giá</span>
                          </div>
                          <div className='col-md-6 text-end'>
                            <span className='text-primary'>
                              {
                                messageVoucher ? (
                                  checkNumber(messageVoucher.value)
                                ) : (
                                  '0đ'
                                )
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='mt-3 button-next-payment'>
                        <Link to={'/don-hang/thanh-toan'} className='btn text-white'>Thanh toán</Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>

        </div>
        {
          listCartNew.length === 0 ? ('') : (
            <div className='d-block'>
              <FormInputOrder
                listCity={listCity}
                listDistrict={listDistrict}
                city={city}
                setCity={setCity}
                setDistrict={setDistrict}
                setCityId={setCityId}
                district={district}
                setDistrictIdApi={setDistrictIdApi}
                profileInfo={profileInfo}
                onSubmit={onSubmit}
                onChangeShipMethod={onChangeShipMethod}
                onChangeShipMethod1={onChangeShipMethod1}
                onChangePaymentMethod={onChangePaymentMethod}
                checked={checked}
                paymentMethod={paymentMethod}
                totalPrice={totalPrice}
                onChangeTraGop={onChangeTraGop}
                shipMethod={shipMethod}
                setAddress={setAddress}
                loading={loading}
              />
            </div>
          )
        }

      </div>
    </div>
  )
}

export default BuyNow