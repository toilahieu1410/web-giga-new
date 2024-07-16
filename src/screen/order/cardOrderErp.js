import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Label } from 'reactstrap'
import { getCity, getDistrict, getProfile } from '../../redux/profile/action'
import { countCart, getCart, deleteCart } from '../../redux/order/action'
import { _checkVoucher } from '../../api/home'
import ItemOrder from './itemOrder'
import { forEach, findIndex, sumBy } from 'lodash'
import { checkNumber } from '../../utilities/checkNumber'
import { useHistory } from 'react-router-dom'
import { _createOrderErp } from '../../api/order'
import { toast } from 'react-toastify'
import FormInputOrder from './formInputOrder'
import useToken from '../../utilities/useToken'

const CartOrderErp = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const {token} = useToken()

  const listCity = useSelector((store) => store.profile.listCity)
  const listDistrict = useSelector((store) => store.profile.listDistrict)
  const profileInfo = useSelector((store) => store.profile.profileInfo)
  const listCart = useSelector((store) => store.order.listCart)

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
  const [totalQty, setTotalQty] = useState(0)
  const [shipMethod, setShipMethod] = useState('go_deliver')
  const [paymentMethod, setPaymentMethod] = useState('bank')
  const [soThangTraGop, setSoThangTraGop] = useState('6_month')
  const [voucher, setVoucher] = useState('')
  const [messageVoucher, setMessageVoucher] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(getCart())
  },[])

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
    let listItem = []
    if(listCart) {
      forEach( listCart.findUser && listCart.findUser.product && listCart.findUser.product, function(value) {
        forEach(listCart.findByArray && listCart.findByArray, function(item) {
          if(value.productId == item._id){
            findIndex(item.vesion_detail && item.vesion_detail, function(index) {
              if(value.versionDetail && value.versionDetail.name == index.name){
                listItem.push({
                  slug: item.slug,
                  id: item._id,
                  name: item.name,
                  qty: item.qty,
                  thumb: item.thumb,
                  version_detail: index,
                  bao_hanh: item.bao_hanh,
                  thong_tin_bao_hanh: item.thong_tin_bao_hanh
                })
              }
            })
          }
        })
      })
    }
    setListCartNew(listItem)
  }, [listCart])

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
      shipping_address: shipMethod == 'store' ? address : data.address,
      shipping_note: data.content,
      productId: listCartNew,
      total_price: totalPrice,
      total_qty: totalQty,
      payment_method: paymentMethod,
      from: 'erp',
      installment_type: soThangTraGop,
    }
    if(messageVoucher) {
      Object.assign(body, { voucher_name: voucher, voucher: messageVoucher.value })
    } else {
      Object.assign(body, { voucher: 0 })
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
    setCity(profileInfo.systemCity)
    setDistrict(profileInfo.systemDistrict)
  }

  const onChangePaymentMethod = (method) => {
    setChecked1(!checked1)
    setPaymentMethod(method)
  }

  const onChangeTraGop = (e) => {
    setSoThangTraGop(e.target.value)
  }

  const checkVoucher = () => {
    const listProductId = listCartNew.map(item => { return item.id })
    _checkVoucher(voucher, listProductId, totalPrice)
      .then(res => {
        setMessageVoucher(res)
      })
      .catch(() => {
        setMessageVoucher('Lỗi! Bạn vui lòng liên hệ bộ phận chăm sóc khách hàng để được hỗ trợ')
      })
  }

  const onHandleDelete = (id) => {
    if(window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')){
      dispatch(deleteCart(id))
    }
  }
  
  return (
    <div className='cart-order row'>
      <div className='col-md-12'>
        <div className='row mt-3'>
          <div className='col-md-5'>
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
                    onHandleDelete={onHandleDelete} 
                    token={token}/>
                ))
              }
            </div>
            {
              listCartNew && listCartNew.length > 0 && (
                <div className='content-price mt-3'>
                  <div className='list-price text-end'>
                  <div className='col-md-12 d-flex justify-content-center form-group'>
                    <input type='text'
                      className='form-control w-50'
                      placeholder='Mã giảm giá (Nếu có)'
                      value={voucher}
                      onChange={e => setVoucher(e.target.value)}
                    />
                    <div className='button-success text-center'>
                      <button className='btn hoplongtech-btn-primary' onClick={() => checkVoucher()}>
                        <span className='text-white'>Áp dụng</span>
                      </button>
                    </div>
                  </div>
                  <div>
                  <i>{ messageVoucher && messageVoucher.message }</i>
                  </div>
                    <Label className='col-form-label w-100'>
                      <b>Tổng tiền sản phẩm:&nbsp; {checkNumber(totalPrice)} </b>
                    </Label>
                    <Label className='col-form-label w-100'>
                      {
                        messageVoucher ? (
                          <b>Giảm giá:&nbsp; {checkNumber(messageVoucher.value)} </b>
                          ) : (
                          <b>Giảm giá:&nbsp; 0 đ</b>
                        )
                      }
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
          <div className='col-md-7'>
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
        </div>
      </div>
    </div>
  )
}

export default CartOrderErp