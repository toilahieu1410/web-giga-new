import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import Slider from 'react-slick'
import { getCity, getDistrict, getProfile } from '../../redux/profile/action'
import { countCart, getCart, deleteCart } from '../../redux/order/action'
import { _checkVoucher } from '../../api/home'
import { _getShippingFee } from '../../api/profile'
import { _createOrder } from '../../api/order'
import ItemOrder from './itemOrder'
import { forEach, findIndex, sumBy } from 'lodash'
import { checkImage, checkNumber } from '../../utilities/checkNumber'
import { toast } from 'react-toastify'
import FormInputOrder from './formInputOrder'
import Loading from '../../components/notification/loading'
import { settingsFavourite } from '../../utilities/settingSlide'
import EmptyCart from '../../assets/imgs/icon-header/shopping.svg'

const CartOrder = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const listCity = useSelector((store) => store.profile.listCity)
  const listDistrict = useSelector((store) => store.profile.listDistrict)
  const profileInfo = useSelector((store) => store.profile.profileInfo)
  const listCart = useSelector((store) => store.order.listCart)
  const listProduct = useSelector((store) => store.product.listProduct)

  const [checked, setChecked] = useState(false)
  const [checked1, setChecked1] = useState(false)

  const [city, setCity] = useState(null)
  const [district, setDistrict] = useState(null)
  const [address, setAddress] = useState(null)
  const [cityId, setCityId] = useState(null)
  const [districtIdApi, setDistrictIdApi] = useState(null)
  const [listCartNew, setListCartNew] = useState([])
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
    dispatch(getCart())
  }, [])

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
    let listItem = []
    if (listCart) {
      forEach(listCart.findUser && listCart.findUser.product && listCart.findUser.product, function (value) {
        forEach(listCart.findByArray && listCart.findByArray, function (item) {
          if (value.productId == item._id) {
            findIndex(item.vesion_detail && item.vesion_detail, function (index) {
              if (value.versionDetail && value.versionDetail.name == index.name) {
                listItem.push({
                  slug: item.slug,
                  id: item._id,
                  name: item.name,
                  qty: item.qty,
                  thumb: item.thumb,
                  version_detail: index,
                  bao_hanh: item.bao_hanh,
                  thong_tin_bao_hanh: item.thong_tin_bao_hanh,
                  flashSale_status: item.flashSale_status,
                  flashSale_end_date: item.flashSale_end_date,
                  flashSale_title: item.flashSale_title
                })
              }
            })
          }
        })
      })
    }
    listItem.forEach(item => {
      if (item.flashSale_status) {
        item.version_detail.price = item.version_detail.price_flashsale
      }
    })
    setListCartNew(listItem)
  }, [listCart])

  useEffect(() => {
    if (listCartNew && listCartNew.length > 0) {
      setTotalPrice(
        sumBy(listCartNew, function (item) {
          return item.version_detail.price * item.qty
        })
      )
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
      shipping_address: shipMethod == 'store' ? address : data.address,
      shipping_note: data.content,
      shipping_fee: shippingFee,
      productId: listCartNew,
      total_price: totalPrice,
      total_qty: totalQty,
      payment_method: paymentMethod,
      from: 'cart',
      installment_type: soThangTraGop,
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
    _createOrder(body).then((res) => {
      if (res.status == 200) {
        dispatch(countCart())
        toast.success('Tạo đơn hàng thành công!')
        history.push({
          pathname: `/don-hang/dat-hang`,
          state: res.data
        })
      }
    })
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

  const onHandleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      dispatch(deleteCart(id))
    }
  }

  return (
    <div className='cart-order row'>
      <div className='col-md-12'>
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
                    <div className='head-items-grid d-grid '>
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
                      <div className='flex-1 text-center'>
                        <span className='text-primary'>Xóa</span>
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
                          onHandleDelete={onHandleDelete} />
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
                  <div className='list-price'>
                    <div className='col-md-12 d-flex  form-group'>
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
                    <div>
                      <i>{messageVoucher && messageVoucher.message}</i>
                    </div>
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

                    {/* {
                      paymentMethod == 'tra_gop' &&
                      <Label className='col-form-label w-100'>
                        <b>Phí trả góp:&nbsp; {checkNumber(totalTraGop)} </b>
                      </Label>
                    } */}
                  </div>
                </div>
              )
            }
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


          <div className='favourite-products mt-4'>
            <h4 className='text-primary'>Bạn cũng có thể thích</h4>
            <div className='compare-list-favourite-products w-100 mt-3'>
              <Slider
                {...settingsFavourite}
                slidesToShow={listProduct.data == undefined || listProduct.data.length >= 5 ? 5 : listProduct.data.length}
              >
                {listProduct.data && listProduct.data.sort((a, b) => parseFloat(a.sort_order) - parseFloat(b.sort_order)).map((item, index) => (
                  <div className='data-favourite-products position-relative'>
                    {item.price == 0 ? ('') : (<div className='percent-redution ribbon-top-right d-inline-block'><span> - {100 - ((parseInt(item.price) / parseInt(item.original_price)) * 100).toFixed(0)}%</span></div>)}
                    <div className="list-products" key={index}>
                      <Link className='list-products-image' to={`/${item.categorySlug}/${item.slug}`}>
                        <img src={checkImage(item.thumb)} alt={item.name} className="w-100 h-100" />
                      </Link>
                      <div className='list-products-info'>
                        <p className='text-title text-brand fw-normal'>{item.band}</p>
                        <Link to={`/${item.categorySlug}/${item.slug}`}>
                          <h6 className='text-primary'>{item.name}</h6>
                        </Link>
                        <p>
                          <span className='text-red'>{item.price == 0 || item.price == item.original_price ? 'Giá liên hệ' : checkNumber(item.price)}</span>&nbsp;&nbsp;<span className='text-decoration-line-through text-title'>{item.price == item.original_price ? '' : checkNumber(item.original_price)}</span>
                        </p>
                        {/* <div className='button-add-cart my-3'>
                          <Link to={'/don-hang/gio-hang'} className="btn add-cart text-primary">Thêm giỏ hàng</Link>
                        </div> */}
                        <div className='specifications mt-3'>
                          {
                            ReactHtmlParser(item.thong_so_ky_thuat)
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CartOrder