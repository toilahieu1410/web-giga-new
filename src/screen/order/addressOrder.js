import React, { useEffect, useState } from 'react'
import { findIndex } from 'lodash'

const AddressOrder = (props) => {

  const { 
    register, 
    listCity, 
    listDistrict, 
    city, 
    setCity, 
    setCityId, 
    setDistrict,
    district,
    setDistrictIdApi
      } = props

    const handleChangeCity = (e) => {
      setCity(e.target.value)
      
    }
    const handleChangeDistrict = (e) => {
      setDistrict(e.target.value)
    }

    useEffect(() => {
      findIndex(listCity, (item) => {
        if(item.ProvinceName == city) {
          setCityId(item.ProvinceID)
          setDistrict('')
        }
      }) 
    }, [city])

    useEffect(() => {
      findIndex(listDistrict, (item) => {
        if(item.DistrictName == district) {
          setDistrictIdApi(item.DistrictID)
        }
      })
    }, [district])

  return(
    <div className='row'>
      <div className='col-md-6 form-group'>
        <select className='form-control' onChange={(e) => handleChangeCity(e)}>
          <option selected disabled>Tỉnh/Thành phố</option>
          {
            listCity && listCity.map((item, index) => (
              <option key={index} value={item.ProvinceName}>{item.ProvinceName}</option>
            ))
          }
        </select>
      </div>
      <div className='col-md-6 form-group'>
        <select className='form-control' value={district} onChange={(e) => handleChangeDistrict(e)}>
          <option value={''} selected disabled>Quận/Huyện</option>
          {
            listDistrict && listDistrict.map((item, index) => (
              <option key={index} value={item.DistrictName}>{item.DistrictName}</option>
            ))
          }
        </select>
      </div>
      <div className='col-md-12 form-group'>
        <input type='text'
          className='form-control'
          placeholder='Địa chỉ nhận hàng (*)'
          {...register("address", { required: 'Không được để trống' })} />
      </div>

      <div className='col-md-12 form-group'>
        <textarea
          className='form-control'
          rows={4}
          placeholder='Ghi chú'
          {...register("content")} />
      </div>
    </div>
  )
}
export default AddressOrder