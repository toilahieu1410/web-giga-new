import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Label } from 'reactstrap'
import AddressOrder from './addressOrder'
import ModalTraGop from './modalTraGop'
import { listStore } from '../../utilities/listStore'
import { findIndex } from 'lodash'
import { Tooltip } from 'reactstrap'
import jwt_decode from "jwt-decode"
import Loading from '../../components/notification/loading'

const FormInputOrder = (props) => {
  const { 
    listCity, 
    listDistrict, 
    city, 
    setCity, 
    setCityId, 
    setDistrict,
    setDistrictIdApi,
    district,
    profileInfo,
    onSubmit, 
    onChangeShipMethod,
    onChangeShipMethod1,
    onChangePaymentMethod,
    checked,
    paymentMethod,
    totalPrice,
    onChangeTraGop,
    shipMethod,
    setAddress,
    token,
    loading
  } = props

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: profileInfo
  })

  const [visitedModal, setVisitedModal] = useState(false)
  const [newListDistrict, setListDistrict] = useState([])
  const [districtId, setDistrictId] = useState([])
  const [tooltipVnPay, setTooltipVnPay] = useState(false)
  const [tooltipMomo, setTooltipMomo] = useState(false)

  useEffect(() => {
    reset(profileInfo)
    // setCity(profileInfo.systemCity)
    // setDistrict(profileInfo.systemDistrict)
  },[profileInfo])

  useEffect(() => {
    if(shipMethod == 'store') {
      findIndex(listStore, function(item) {
        if(item.city == city) {
          setListDistrict(item.district)
          setDistrict('')
          setAddress('')
        }
      })
    }
  }, [shipMethod, city])

  useEffect(() => {
    if(shipMethod == 'store') {
      findIndex(newListDistrict, function(item) {
        if(item.id == districtId) {
          setAddress(item.address)
          setDistrict(item.name)
        }
      })
    }
  }, [shipMethod, districtId, newListDistrict])

  useEffect(() => {
    if(shipMethod == 'store') {
      setCity('')
      setDistrict('')
    }
    // if(shipMethod == 'go_deliver') {
    //   setCity(profileInfo.systemCity)
    //   setDistrict(profileInfo.systemDistrict)
    // }
  }, [checked])

  const onHandleCity = (e) => {
    setCity(e)
  }

  const onHandleAddress = (e) => {
    setDistrictId(e)
  }

  let decoded
  if (token) { decoded = jwt_decode(token) }

  return(
    <div className='order-information pt-3'>
      <ModalTraGop visitedModal={visitedModal} setVisitedModal={setVisitedModal} decoded={decoded}/>
      <h6 className='mb-2 text-center'><b>Thông tin đặt hàng</b></h6>
      <p className='text-gray text-center mb-2'><i>Bạn cần nhập đầy đủ các trường thông tin có dấu *</i></p>

      <div className='form-order-information'>
        <form className='form-horizonal' onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <div className='col-md-12 form-group'>
              <input type='text'
                className='form-control'
                placeholder='Họ tên (*)'
                {...register("name", { required: 'Không được để trống' })} />
            </div>
            <div className='col-md-12 form-group'>
              <input type='text'
                className='form-control'
                placeholder='Số điện thoại (*)'
                {...register("phone", { required: 'Không được để trống' })} />
            </div>
            <div className='col-md-12 form-group'>
              <input type='text'
                className='form-control'
                placeholder='Email'
                {...register("email", { required: 'Không được để trống' })} />
            </div>
            <div className='col-md-12 form-group'>
              <div className='row my-2'>
                <div className='col-md-12 d-grid' style={{'gridTemplateColumns': '1fr 1fr'}}>
                  {/* <div className='payment-opt d-flex radio radio-primary bg-white mr-10 mb-15' >
                    <Input 
                      id='radioTraGopTinDung' 
                      type='radio' 
                      name='radioPayment' 
                      disabled={ totalPrice < 3000000 ? true : false }
                      onChange={() => onChangePaymentMethod('tra_gop_tin_dung')} />
                    &nbsp; 
                    <Label className='text-gray ml-5' for="radioTraGopTinDung" style={{lineHeight:1.3}}>Trả góp qua thẻ tín dụng <br /> (Visa, Mastercard,...)</Label>
                  </div> */}
                  {/* <div className='payment-opt d-flex radio radio-primary bg-white' >
                    <Input 
                      id='radioTraGopToChuc' 
                      type='radio' 
                      name='radioPayment' 
                      disabled={ totalPrice < 3000000 ? true : false }
                      onChange={() => onChangePaymentMethod('tra_gop_to_chuc')} />
                    &nbsp; 
                    <Label className='text-gray ml-5' for="radioTraGopToChuc">Trả góp qua tổ chức tín dụng</Label>
                  </div> */}
                  {/* <div className='payment-opt d-flex radio radio-primary bg-white mr-10' >
                    <Input 
                      id='radioThanhToanTinDung' 
                      type='radio' 
                      name='radioPayment' 
                      onChange={() => onChangePaymentMethod('thanh_toan_tin_dung')} />
                    &nbsp; 
                    <Label className='text-gray ml-5' for="radioThanhToanTinDung">Thanh toán qua thẻ tín dụng</Label>
                  </div> */}
                </div>
                {/* {
                  paymentMethod == 'tra_gop' && 
                  <div className='col-md-6'>
                    {
                      token && decoded.type == 'erp' ? (
                        <select className='form-control' onChange={(e) => onChangeTraGop(e)}>
                          <option value={'6_month'}>6 Tháng</option>
                        </select>
                      ) : (
                        <select className='form-control' onChange={(e) => onChangeTraGop(e)}>
                          <option value={'3_month'}>3 Tháng</option>
                          <option value={'6_month'}>6 Tháng</option>
                          <option value={'9_month'}>9 Tháng</option>
                          <option value={'12_month'}>12 Tháng</option>
                        </select>
                      )
                    }
                  </div>
                } */}
              </div>
              {/* { 
                totalPrice < 3000000 && 
                <Label className='text-danger w-75 fst-italic' >Điều kiện trả góp: tổng đơn hàng trên 3.000.000 vnđ</Label>
              } */}
              {/* <label className='text-primary w-25 cursor-pointer' onClick={() => setVisitedModal(!visitedModal)}>Điều kiện trả góp</label> */}
              <div className='row my-2'>
                <div className='col-md-3'>
                  <div className='payment-opt d-flex radio radio-primary bg-white' >
                    <input 
                       style={{ width: 20 }}
                      id='radioBank' 
                      type='radio' 
                      name='radioPayment' 
                      defaultChecked 
                      onChange={() => onChangePaymentMethod('bank')} />
                    &nbsp; 
                    <Label className='text-gray ms-2 col-form-label w-100' for="radioBank">Chuyển khoản</Label>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='payment-opt d-flex radio radio-primary bg-white'>
                    <input 
                       style={{ width: 20 }}
                      id='radioShip' 
                      type='radio' 
                      name='radioPayment' 
                      onChange={() => onChangePaymentMethod('ship_cod')} />
                    &nbsp; 
                    <Label className='text-gray ml-5 w-100' for="radioShip">Tiền mặt</Label>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='payment-opt d-flex radio radio-primary bg-white' >
                    <input 
                      id='radioMomo' 
                      type='radio' 
                      disabled
                      name='radioPayment' 
                      onChange={() => onChangePaymentMethod('momo')} />
                    &nbsp; 
                    <Label className='text-gray ml-5' for="radioMomo" id='tooltipMomo'>Ví momo</Label>
                    <Tooltip
                      flip
                      isOpen={tooltipMomo}
                      target="tooltipMomo"
                      
                      toggle={() => setTooltipMomo(!tooltipMomo) }
                    >
                      Chức năng đang được cập nhật!
                    </Tooltip>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='payment-opt d-flex radio radio-primary bg-white payment-hover' >
                    <input 
                      id='radioVnpay' 
                      type='radio' 
                      disabled
                      name='radioPayment'  
                      onChange={() => onChangePaymentMethod('vnpay')} />
                    &nbsp; 
                    <Label className='text-gray ml-5' for="radioVnpay" id='tooltipVnPay'>Ví VNpay</Label>
                    <Tooltip
                      flip
                      isOpen={tooltipVnPay}
                      target="tooltipVnPay"
                      toggle={() => setTooltipVnPay(!tooltipVnPay) }
                    >
                      Chức năng đang được cập nhật!
                    </Tooltip>
                  </div>
                </div>
              </div>
              {
                paymentMethod == 'bank' && 
                <div className='my-2'>
                  <div className='row my-2'>
                    <div className='col-md-4 text-end'>
                      <label className='d-block'>Tài khoản:</label>
                    </div>
                    <div className='col-md-8'>
                      <label className='text-primary fw-bold'>{process.env.REACT_APP_BANK_NUMBER}</label>
                    </div>
                  </div>
                  <div className='row my-2'>
                    <div className='col-md-4 text-end'>
                      <label className='d-block'>Chủ tài khoản:</label>
                    </div>
                    <div className='col-md-8'>
                      <label className='text-primary fw-bold'>{process.env.REACT_APP_BANK_ACCOUNT}</label>
                    </div>
                  </div>
                  <div className='row my-2'>
                    <div className='col-md-4 text-end'>
                      <label className='d-block'>Ngân hàng:</label>
                    </div>
                    <div className='col-md-8'>
                      <label className='text-primary fw-bold'>{process.env.REACT_APP_BANK_NAME}</label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-4 text-end'>
                      <label className='d-block'>Chi nhánh:</label>  
                    </div>
                    <div className='col-md-8'>
                      <label className='text-primary fw-bold'>{process.env.REACT_APP_BANK_BRANCH}</label>  
                    </div>
                  </div>
                </div>
              }
              <div className='row'>
                <div className='col-md-6'>
                  <div className='payment-opt d-flex radio radio-primary bg-white' >
                    <Input 
                      id='radioHome' 
                      type='radio' 
                      name='radio' 
                      defaultChecked 
                      onChange={() => onChangeShipMethod('go_deliver')} />
                    &nbsp; 
                    <Label className='text-gray ml-5' for="radioHome">Nhận hàng tại nhà</Label>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='payment-opt d-flex radio radio-primary bg-white'>
                    <Input 
                      id='radioShop' 
                      type='radio' 
                      name='radio' 
                      onChange={() => onChangeShipMethod1('store')} />
                    &nbsp; 
                    <Label className='text-gray ml-5' for="radioShop">Nhận tại cửa hàng</Label>
                  </div>
                </div>
              </div>
            </div>
            
            {checked ? (
              <div className='form-order-shop'>
                <div className='row'>
                  <div className='col-md-6 form-group'>
                    <select className='form-control' onChange={(e) => onHandleCity(e.target.value)}>
                      <option value={''}>Chọn tỉnh/ thành phố</option>
                      {
                        listStore && listStore.map((item, index) => (
                          <option value={item.city} key={index}>{item.city}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className='col-md-6 form-group'>
                    <select className='form-control' onChange={(e) => onHandleAddress(e.target.value)}>
                      <option value={''}>Chọn cửa hàng</option>
                      {
                        newListDistrict && newListDistrict.map((item, index) => (
                          <option value={item.id} key={index}>{item.address}, {item.name}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className='col-md-12 form-group'>
                    <textarea
                      className='form-control'
                      rows={4}
                      placeholder='Ghi chú'
                      {...register("content")} />
                  </div>
                </div>
              </div>
            ) : (
              <div className='form-order-home'>
                <AddressOrder 
                  register={register} 
                  listCity={listCity} 
                  listDistrict={listDistrict}
                  city={city}
                  setCity={setCity}
                  setDistrict={setDistrict}
                  setCityId={setCityId}
                  district={district}
                  setDistrictIdApi={setDistrictIdApi}
                />
              </div>
            )}

            {
              !city || !district ? (
                <div className='button-success text-center position-relative' >
                  <button disabled={true} className='btn hoplongtech-btn-primary'>
                    <span className='text-white'>Xác nhận đơn hàng</span>
                  </button>
                </div>
              ) : (
                <div className='button-success text-center position-relative' >
                  <button disabled={loading} className='btn hoplongtech-btn-primary'>
                    <span className='text-white'>Xác nhận đơn hàng</span>
                  </button>
                  {
                    loading && <Loading/>
                  }
                </div>
              )
            }
          </div>
        </form>
      </div>

    </div>
  )
}

export default FormInputOrder