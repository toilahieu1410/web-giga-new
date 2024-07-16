import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Label } from 'reactstrap'
import { getProfile, updateProfile, getCity, getDistrict } from '../../redux/profile/action'
import { _postImageProduct } from '../../api/profile'
import { findIndex } from 'lodash'
import { checkImage } from '../../utilities/checkNumber'

const ProfileInfo = () => {
  const dispatch = useDispatch()

  const profileInfo = useSelector((store) => store.profile.profileInfo)
  const listCity = useSelector((store) => store.profile.listCity)
  const listDistrict = useSelector((store) => store.profile.listDistrict)

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: profileInfo
  })

  const [file, setFile] = useState(null)
  const [linkFile, setLinkFile] = useState(null)
  const [city, setCity] = useState(null)
  const [district, setDistrict] = useState(null)
  const [cityId, setCityId] = useState(null)

  useEffect(() => {
    reset(profileInfo)
    setCity(profileInfo.systemCity)
    setDistrict(profileInfo.systemDistrict)
  }, [profileInfo])

  useEffect(() => {
    dispatch(getProfile())
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
    findIndex(listCity && listCity.LtsItem && listCity.LtsItem, function (item) {
      if (item.Title == city) {
        setCityId(item.ID)
      }
    })
  }, [city])
  
  useEffect(() => {
    if((file != null  && linkFile !=null) || file== null ) {
      uploadFile()
    }
  },[file, linkFile])

  const uploadFile = async (e) => {
    const params = {
      type: 'avatar'
    }
    if (file != null) {
      const body = new FormData()
      body.append('upload', file)
      const res = await _postImageProduct(params, body).then((res) => {
        if (res.status == 200) {
          const body = { avatar: res.data.name }
          dispatch(updateProfile(body))
        }
      })
    }
    setFile(e.target.files[0])
    setLinkFile(URL.createObjectURL(e.target.files[0]))
  }
  const handleChangeCity = (e) => {
    setCity(e.target.value)
  }
  const handleChangeDistrict = (e) => {
    setDistrict(e.target.value)
  }

  const onSubmit = (data) => {
    const body = {
      address: data.address,
      email: data.email,
      name: data.name,
      phone: data.phone,
      sex: data.sex,
      systemCity: data.systemCity,
      systemDistrict: data.systemDistrict,
      userBirthDate: data.userBirthDate,
    }
    if (data.sex == '' && data.userBirthDate == null) {
      delete body.sex
      delete body.userBirthDate
      dispatch(updateProfile(body))
    }
    else if (data.sex == '') {
      delete body.sex
      dispatch(updateProfile(body))
    }
    else if (data.userBirthDate == null) {
      delete body.userBirthDate
      dispatch(updateProfile(body))
    }
    else {
      dispatch(updateProfile(body))
    }
  }


  return (
    <div>
      <form id='hook-form-profile'>
        <div className='row align-items-center'>
          <div className='col-md-4 text-end'>
            <label className='col-form-label'>Avatar:</label>
          </div>
          <div className='col-md-8'>
            {
              profileInfo.avatar || profileInfo.avatar == null ?
                <div className='d-flex'>
                  <div className='d-flex align-items-center '>
                    <label htmlFor="file-upload" className="custom-file-upload">
                      <i className="fa fa-cloud-upload text-primary"></i> Chọn tệp
                    </label>
                    <input id='file-upload' type="file" onChange={uploadFile} accept="image/*" className='form-control btn-warning' style={{ width: 90 }} />
                      {linkFile && <img src={linkFile} style={{ width: '100px', height: '70px', objectFit: 'contain' }} />}
                  </div>
                </div>
                :
                <div className='d-flex align-items-center'>
                  <input type="file" onChange={uploadFile} accept="image/*" className='form-control' style={{ width: 90 }} />
                  {/* {linkFile && <img className='mx-2' src={linkFile} style={{ width: '100px', height: '70px', objectFit: 'contain' }} />}
                  <button type='button' onClick={uploadFile} disabled={file ? false : true} className='btn btn-primary mx-2'>Upload</button>
                  {
                    linkFile && <button onClick={deleteItem} className='btn btn-danger text-white mx-2'>Xóa</button>
                  } */}
                </div>
            }
          </div>
        </div>
        <div className='row my-2'>
          <div className='col-md-4 text-end'>
            <label className='col-form-label'>Họ và tên:</label>
          </div>
          <div className='col-md-8'>
            <input
              type='text'
              className='form-control'
              placeholder='Nhập vào họ và tên'
              {...register("name", { required: 'Không được để trống' })} />
          </div>
        </div>
        <div className='row my-2'>
          <div className='col-md-4 text-end'>
            <label className='col-form-label'>Giới tính:</label>
          </div>
          <div className='col-md-8'>
            <select className='form-control' {...register("sex")}>
              <option value={true}>Nam</option>
              <option value={false}>Nữ</option>
            </select>
          </div>
        </div>
        <div className='row my-2'>
          <div className='col-md-4 text-end'>
            <Label className='col-form-label'>Ngày sinh:</Label>
          </div>
          <div className='col-md-8'>
            <input
              className='form-control'
              placeholder='Ngày sinh'
              {...register("userBirthDate")} />
          </div>
        </div>
        <div className='row my-2'>
          <div className='col-md-4 text-end'>
            <label className='col-form-label'>Email:</label>
          </div>
          <div className='col-md-8'>
            <input
              type='text'
              className='form-control'
              placeholder='Nhập vào email'
              {...register("email", { required: 'Không được để trống' })} />
          </div>
        </div>
        <div className='row my-2'>
          <div className='col-md-4 text-end'>
            <label className='col-form-label'>Điện thoại:</label>
          </div>
          <div className='col-md-8'>
            <input
              type='text'
              className='form-control'
              placeholder='Nhập vào số điện thoại'
              {...register("phone", { required: 'Không được để trống' })} />
          </div>
        </div>
        <div className='row my-2'>
          <div className='col-md-4 text-end'>
            <label className='col-form-label'>Tỉnh/ thành phố:</label>
          </div>
          <div className='col-md-8'>
            <select className='form-control' onChange={(e) => handleChangeCity(e)}>
              <option value=''>{city}</option>
              {
                listCity && listCity.LtsItem && listCity.LtsItem.map((item, index) => (
                  item.Title != 'Chưa rõ' &&
                  <option key={index} value={item.Title}>{item.Title}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div className='row my-2'>
          <div className='col-md-4 text-end'>
            <label className='col-form-label'>Quận/ huyện:</label>
          </div>
          <div className='col-md-8'>
            <select className='form-control' onChange={(e) => handleChangeDistrict(e)}>
              <option value="">{district}</option>
              {
                listDistrict && listDistrict.map((item, index) => (
                  item.Title != 'Chưa rõ' &&
                  <option key={index} value={item.Title}>{item.Title}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div className='row my-2'>
          <div className='col-md-4 text-end'>
            <label className='col-form-label'>Địa chỉ:</label>
          </div>
          <div className='col-md-8'>
            <textarea
              type='text'
              className='form-control'
              placeholder='Nhập vào địa chỉ'
              {...register("address", { required: 'Không được để trống' })} />
          </div>
        </div>
        <div className='text-end my-2'>
          <button
            className='btn bg-blue text-white'
            type='submit'
            form='hook-form-profile' onClick={handleSubmit(onSubmit)}
            disabled={city == null || district == null ? true : false}
          >Cập nhật</button>
        </div>
      </form>
    </div>
  )
}

export default ProfileInfo