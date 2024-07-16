import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { Label } from 'reactstrap'
import { sumBy } from 'lodash'
import { toast } from 'react-toastify'
import ItemOrder from './itemOrder'
import FormInputOrder from './formInputOrder'
import useToken from '../../utilities/useToken'
import { checkNumber } from '../../utilities/checkNumber'
import { getCity, getDistrict, getProfile } from '../../redux/profile/action'
import { _createOrderErp } from '../../api/order'
import { _checkVoucher } from '../../api/home'

const defaultCart = process.env.REACT_APP_DEFAULT_CART

const BuyNowErp = () => {

  const state = useLocation()

  const dispatch = useDispatch()
  const history = useHistory()

  const {token} = useToken()

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
  const [totalQty, setTotalQty] = useState(0)
  const [shipMethod, setShipMethod] = useState('go_deliver')
  const [paymentMethod, setPaymentMethod] = useState('bank')
  const [soThangTraGop, setSoThangTraGop] = useState('6_month')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(getCity())
  },[])
  
  useEffect(() => {
    if(cityId != null) {
      dispatch(getDistrict(cityId))
    }
  },[cityId])
  
  useEffect(() => {
    dispatch(getProfile())
  },[])

  useEffect(() => {
    if(listCartNew && listCartNew.length > 0) {
      setTotalPrice(
        sumBy(listCartNew, function(item) {
          if(item.version_detail.erp_price) {
            return item.version_detail.erp_price * item.qty
          } else {
            return item.version_detail.price * item.qty
          }
        })
      )
    }
  }, [listCartNew])

  useEffect(() => {
    if(listCartNew && listCartNew.length > 0) {
      setTotalQty(
        sumBy(listCartNew, function(item) {
          return item.qty
        })
      )
    }
  }, [listCartNew])

  useEffect(() => {
    if(totalPrice < 3000000){
      setPaymentMethod('bank')
    }
  },[totalPrice])

  const onSubmit = (data) => {
    setLoading(true)
    const body = {
      shipping_method: shipMethod ,
      shipping_name : data.name,
      shipping_phone: data.phone,
      shipping_email: data.email,
      shipping_city: city,
      shipping_district: district,
      shipping_address: shipMethod == 'store' ? 'Số 33, ngõ 41, Thái Hà, Trung Liệt' : data.address,
      shipping_note: data.content,
      productId: listCartNew,
      total_price: totalPrice,
      total_qty: totalQty,
      payment_method: paymentMethod,
      from: 'erp',
      installment_type: soThangTraGop,
      voucher: 0
    }
    if(data.content == '') {
      delete body.shipping_note
    }
    if(body.payment_method != 'tra_gop') {
      delete body.installment_type
    }
    if (token) {
      _createOrderErp(body).then((res) => {
        if(res.status == 200) {
          toast.success('Tạo đơn hàng thành công!')
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

  return (
    <div className='cart-order '>
      <div className='col-md-12 list-product'>
        <div className='row mt-3'>
          <div className='col-md-6'>
            <div className='list-cart-order'>
            {
                listCartNew.length == 0 && (
                  <p>Chưa có sản phẩm trong giỏ hàng</p>
                )
              }
              {
                listCartNew && listCartNew.length > 0 && listCartNew.map((item, index) => (
                  <ItemOrder 
                    key={index} 
                    index={index} 
                    item={item} 
                    listCartNew={listCartNew} 
                    setListCartNew={setListCartNew}
                    buyNow='true'
                    token={token}
                  />
                ))
              }
            </div>
            {
              listCartNew && listCartNew.length > 0 && (
                <div className='content-price mt-3'>
                  <div className='list-price text-end'>
                    <Label className='col-form-label w-100'>
                      <b>Tổng tiền sản phẩm:&nbsp; {checkNumber(totalPrice)} </b>
                    </Label>
                    {
                      paymentMethod == 'tra_gop' &&
                      <Label className='col-form-label w-100'>
                        <b>Phí trả góp:&nbsp; {checkNumber(totalTraGop)} </b>
                      </Label>
                    }
                  </div>
                </div>
              )
            }
          </div>
            <div className='col-md-6'>
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
                token={token}
                loading={loading}
              />
            </div>
        </div>
      </div>
    </div>
  )
}

export default BuyNowErp