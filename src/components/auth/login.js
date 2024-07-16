import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import { _login, _register } from '../../api/auth'
import { getCity, getDistrict } from '../../redux/profile/action'
import { Label } from 'reactstrap'
import { toast } from "react-toastify"
import useToken from '../../utilities/useToken'

const Login = () => {

  const state = useLocation()
  const dispatch = useDispatch()
  const { setToken } = useToken()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: state.state
  })

  const listCity = useSelector(store => store.profile.listCity)
  const listDistrict = useSelector(store => store.profile.listDistrict)

  const [city, setCity] = useState(null)

  useEffect(() => {
    if (city) {
      const cityId = listCity.LtsItem.find(item => item.Title == city)
      dispatch(getDistrict(cityId.ID))
    }
  }, [city])

  useEffect(() => {
    dispatch(getCity())
  }, [])

  const onSubmitRegister = (data) => {
    Object.assign(data, { systemCity: city })
    if (data.sex) {
      data.sex = JSON.parse(data.sex)
    }
    // if (data.userBirthDate == '') {
    //   delete data.userBirthDate
    // }
    _register(data)
      .then(res => {
        if (res.status == 200) {
          toast.info('Hoàn tất tài khoản!')
          const result = { username: data.username, password: data.password }
          _login(result)
            .then(res => {
              if (res.status === 200) {
                setToken(res.data)
                window.location.href = '/'
              } else {
                toast.info("Sai tài khoản hoặc mật khẩu!")
              }
            })
        }
      })
      .catch(err => {
        toast.info(err.response.message)
      })
  }

  return (
    <div className='row form-create-account mt-3'>
      <div className='row'>

        <div className='col-md-5'>
          <div className='left-part'>
            <i className='fas fa-envelope fa-6x text-white'></i>
            <i className='fas fa-at fa-6x text-white'></i>
            <i className='fas fa-phone fa-6x text-white'></i>
          </div>
        </div>
        <div className='col-md-7'>
          <h5 className='mb-0 pt-3 text-center text-primary'>Tạo tài khoản</h5>
          <form onSubmit={handleSubmit(onSubmitRegister)} className='form-horizonal my-4' >
            <div className='col-md-12'>
              <div className='row form-group'>
                <Label className='col-form-label col-md-3'>Tài khoản:</Label>
                <div className='col-md-9'>
                  <input
                    className='form-control'
                    placeholder='Tài khoản người dùng *'
                    {...register("username", { required: 'Không được để trống' })} />
                </div>
              </div>

              <div className='row form-group'>
                <Label className='col-form-label col-md-3'>Họ tên:</Label>
                <div className='col-md-9'>
                  <input
                    className='form-control'
                    placeholder='Họ và tên *'
                    {...register("name", { required: 'Không được để trống' })} />
                </div>
              </div>

              <div className='row form-group'>
                <Label className='col-form-label col-md-3'>Email:</Label>
                <div className='col-md-9'>
                  <input
                    className='form-control'
                    placeholder='Email *'
                    {...register("email", { required: 'Không được để trống' })} />
                </div>
              </div>

              <div className='row form-group'>
                <Label className='col-form-label col-md-3'>Giới tính:</Label>
                <div className='col-md-9'>
                  <select
                    className='form-control' {...register("sex")}>
                    <option value={true}>Nam</option>
                    <option value={false}>Nữ</option>
                  </select>
                </div>
              </div>

              {/* <div className='row form-group'>
                <Label className='col-form-label col-md-3'>Ngày tháng năm sinh:</Label>
                <div className='col-md-9'>
                  <input
                    className='form-control'
                    placeholder='Ngày tháng năm sinh'
                    {...register("userBirthDate")} />
                </div>
              </div> */}

              <div className='row form-group'>
                <Label className='col-form-label col-md-3'>Điện thoại:</Label>
                <div className='col-md-9'>
                  <input
                    className='form-control'
                    placeholder='Điện thoại *'
                    {...register("phone", { required: 'Không được để trống' })} />
                </div>
              </div>

              <div className='row form-group'>
                <Label className='col-form-label col-md-3'>Địa chỉ:</Label>
                <div className='col-md-9'>
                  <input
                    className='form-control'
                    placeholder='Địa chỉ *'
                    {...register("address", { required: 'Không được để trống' })} />
                </div>
              </div>

              <div className='row form-group'>
                <Label className='col-form-label col-md-3'>Tỉnh/Thành phố:</Label>
                <div className='col-md-9'>
                  <select
                    className='form-control'
                    onChange={(e) => setCity(e.target.value)}>
                      <option selected disabled>Tỉnh/Thành phố</option>
                    {
                      listCity && listCity.LtsItem.map((item, index) => (
                        item.Title !== 'Chưa rõ' &&
                        <option key={index} value={item.Title}>{item.Title}</option>
                      ))
                    }
                  </select>
                </div>
              </div>

              <div className='row form-group'>
                <Label className='col-form-label col-md-3'>Quận/Huyện:</Label>
                <div className='col-md-9'>
                  <select
                    className='form-control'
                    {...register("systemDistrict", { required: 'Không được để trống' })}
                  >
                    <option selected disabled>Quận/Huyện</option>
                    {
                      city && (
                        listDistrict && listDistrict.map((item, index) => (
                          <option>{item.Title}</option>
                        ))
                      )
                    }
                  </select>
                </div>
              </div>

              <div className='mt-3 d-flex justify-content-center'>
                <button className='btn bg-blue text-white '>Hoàn tất đăng ký</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login