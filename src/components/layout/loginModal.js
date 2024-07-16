import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form"
import { useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { Modal, ModalHeader, ModalBody, Button, Label } from 'reactstrap'
import { _login, _register, _forgotPassword } from '../../api/auth'
import useToken from '../../utilities/useToken'
import { toast } from "react-toastify"
import { getCity, getDistrict } from '../../redux/profile/action'
import ScrollAnimation from "react-animate-on-scroll"
import IconFacebook from "../../assets/imgs/login-facebook.png"
import LogoGiga from "../../assets/images/Giga-logo.png"
import SignUp from "../../assets/imgs/tc-01.png"
import Loading from '../notification/loading'
import { findIndex } from 'lodash'

const LoginModal = (props) => {

  const { modal, setModal } = props
  const { setToken } = useToken()

  const toggleModal = () => setModal(!modal)

  const [view, setView] = useState('Đăng nhập')
  const [show, setShow] = useState(false)

  const onSubmitLogin = (data) => {
    Object.assign(data, { type: 'local' })
    _login(data).then(res => {
      if (res.status === 200) {
        setToken(res.data)
        window.location.href = '/'
      } else {
        toast.info("Sai tài khoản hoặc mật khẩu!")
      }
    })
      .catch(() => {
        toast.info("Sai tài khoản hoặc mật khẩu!")
      })
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggleModal} size='lg' className={view === 'Đăng ký' ? 'modal-register' : 'modal-login-register'} >
        <ModalHeader toggle={toggleModal}>
          <label className='fw-bold'>{view}</label>
        </ModalHeader>
        <ModalBody style={{ padding: '30px' }}>
          {
            view === 'Đăng nhập' && (
              <ViewLogin onSubmit={onSubmitLogin} setView={setView} toggleModal={toggleModal} />
            )
          }
          {
            view === 'Đăng ký' && (
              <ViewRegister setView={setView} onSubmitLogin={onSubmitLogin} />
            )
          }
          {
            view === 'Quên mật khẩu' && (
              <ViewForgotPass setView={setView} toggleModal={toggleModal} setShow={setShow} show={show} />
            )
          }
        </ModalBody>
      </Modal>
    </div>
  )
}

export default LoginModal

const ViewLogin = (props) => {

  const history = useHistory()
  const { register, handleSubmit, formState: { errors } } = useForm({})
  const { setToken } = useToken()
  const { onSubmit, setView, toggleModal } = props

  const responseGoogle = (res) => {
    const body = {
      username: res.profileObj.email,
      type: 'google',
      avatar: res.profileObj.imageUrl,
      name: res.profileObj.name,
      email: res.profileObj.email,
      password: res.profileObj.googleId,
      confirmPassword: res.profileObj.googleId
    }
    const dataLogin = {
      username: res.profileObj.email,
      password: res.profileObj.googleId,
    }
    _login(dataLogin)
      .then(res => {
        if (res.status == 200) {
          setToken(res.data)
          window.location.href = '/'
        }
      })
      .catch(err => {
        if (err.response.status == 400) {
          toggleModal()
          history.push({
            pathname: `/tai-khoan/tao-tai-khoan`,
            state: body
          })
        }
      })
  }

  return (

    <div className='modal-login'>
      <div className='sign-in-app d-flex align-items-center justify-content-between'>
        <div className='row'>
          <div className='col-md-5'>
            <div className='d-flex align-items-center justify-content-center h-100'>
              <ScrollAnimation
                animateIn="flipInY"
                animateOut='flipOutY'
                duration={1.2}
                delay={0}
                animateOnce={true}
              >
                <img src={LogoGiga} className='w-100' alt='logo-giga'/>
              </ScrollAnimation>

            </div>
          </div>
          <div className='col-md-7'>
            <div className='d-flex justify-content-between'>
              <Button className='sign-in-facebook'>
                <img src={IconFacebook} alt='facebook'/>
                <span className='ml-5'>Tiếp tục với facebook</span>
              </Button>
              <GoogleLogin
                className='sign-in-google'
                clientId={process.env.REACT_APP_GOOGLE_ID}
                buttonText="Tiếp tục với Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </div>
            <div className='border-line'>
              <p className='text-gray'>Hoặc</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row mb-3'>
                <div className='col-md-3'>
                  <label className='col-form-label'>Tài khoản</label>
                </div>
                <div className='col-md-9'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Tài khoản'
                    {...register("username", { required: 'Không được để trống' })} />
                </div>
              </div>

              <div className='row mb-3'>
                <div className='col-md-3'>
                  <label className='col-form-label'>Mật khẩu</label>
                </div>
                <div className='col-md-9'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Mật khẩu'
                    {...register("password", { required: 'Không được để trống' })} />
                </div>
              </div>
              <div className='mt-3 d-flex justify-content-center'>
                <button className='btn bg-blue text-white w-100 mr-15'>Đăng nhập</button>
                <button
                  onClick={() => setView('Đăng ký')}
                  className='btn bg-light-blue text-white w-100 '>
                  <span className='text-primary'>Đăng ký</span>
                </button>
              </div>
            </form>
            <div onClick={() => setView('Quên mật khẩu')} className='mt-3 text-right cursor-pointer'>
              <b>Quên mật khẩu ?</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ViewRegister = (props) => {

  const dispatch = useDispatch()
  const { setView, onSubmitLogin } = props

  const { register, handleSubmit, formState: { errors } } = useForm({})

  const listCity = useSelector(store => store.profile.listCity)
  const listDistrict = useSelector(store => store.profile.listDistrict)

  const [city, setCity] = useState(null)
  const [cityId, setCityId] = useState(null)

  // useEffect(() => {
  //   if (city) {
  //     const cityId = listCity.LtsItem.find(item => item.Title == city)
  //     dispatch(getDistrict(cityId.ID))
  //   }
  // }, [city])

  useEffect(() => {
    findIndex(listCity, (item) => {
      if(item.ProvinceName == city) {
        setCityId(item.ProvinceID)
        setCity(item.ProvinceName)
      }
    }) 
  }, [city])

  useEffect(() => {
    dispatch(getCity())
  }, [])

  useEffect(() => {
    if (cityId != null) {
      dispatch(getDistrict(cityId))
    }
  }, [cityId])

  const onSubmitRegister = (data) => {
    Object.assign(data, { systemCity: city, type: 'local' })
    if (data.sex) {
      data.sex = JSON.parse(data.sex)
    }
    if (data.userBirthDate == '') {
      delete data.userBirthDate
    }
    _register(data)
      .then(res => {
        if (res.status == 200) {
          toast.info('Tạo tài khoản thành công!')
          const result = { username: data.username, password: data.password }
          onSubmitLogin(result)
        }
      })
      .catch(err => {
        toast.info(err.response.data.message)
      })
  }

  return (
    <div className='form-register'>
      <div className='row'>
        <div className='col-md-5'>
          <div className='position-relative h-100'>
            <img src={SignUp} className='w-100' alt='sign-up'/>
          </div>
        </div>
        <div className='col-md-7'>
          <form onSubmit={handleSubmit(onSubmitRegister)} className='form-horizonal' >
            <div className='col-md-12'>
              <div className='row form-group'>
                <Label className='col-form-label col-md-4'>Tài khoản:</Label>
                <div className='col-md-8'>
                  <input
                    className='form-control'
                    placeholder='Tài khoản người dùng *'
                    {...register("username", { required: 'Không được để trống' })} />
                </div>
              </div>
              <div className='row form-group'>
                <Label className='col-form-label col-md-4'>Họ tên:</Label>
                <div className='col-md-8'>
                  <input
                    className='form-control'
                    placeholder='Họ và tên *'
                    {...register("name", { required: 'Không được để trống' })} />
                </div>
              </div>
              <div className='row form-group'>
                <Label className='col-form-label col-md-4'>Mật khẩu:</Label>
                <div className='col-md-8'>
                  <input
                    className='form-control'
                    placeholder='Mật khẩu *'
                    {...register("password", { required: 'Không được để trống' })} />
                </div>
              </div>
              <div className='row form-group'>
                <Label className='col-form-label col-md-4'>Nhập lại mật khẩu:</Label>
                <div className='col-md-8'>
                  <input
                    className='form-control'
                    placeholder='Nhập lại mật khẩu *'
                    {...register("confirmPassword", { required: 'Không được để trống' })} />
                </div>
              </div>
              <div className='row form-group'>
                <Label className='col-form-label col-md-4'>Email:</Label>
                <div className='col-md-8'>
                  <input
                    className='form-control'
                    placeholder='Email *'
                    {...register("email", { required: 'Không được để trống' })} />
                </div>
              </div>
              <div className='row form-group'>
                <Label className='col-form-label col-md-4'>Giới tính:</Label>
                <div className='col-md-8'>
                  <select
                    className='form-control' {...register("sex")}>
                    <option value={true}>Nam</option>
                    <option value={false}>Nữ</option>
                  </select>
                </div>
              </div>
              {/* <div className='row form-group'>
                <Label className='col-form-label col-md-4'>Ngày sinh:</Label>
                <div className='col-md-8'>
                  <input
                    className='form-control'
                    placeholder='Ngày tháng năm sinh'
                    {...register("userBirthDate")} />
                </div>
              </div> */}
              <div className='row form-group'>
                <Label className='col-form-label col-md-4'>Điện thoại:</Label>
                <div className='col-md-8'>
                  <input
                    className='form-control'
                    placeholder='Điện thoại *'
                    {...register("phone", { required: 'Không được để trống' })} />
                </div>
              </div>
              <div className='row form-group'>
                <Label className='col-form-label col-md-4'>Địa chỉ:</Label>
                <div className='col-md-8'>
                  <input
                    className='form-control'
                    placeholder='Địa chỉ *'
                    {...register("address", { required: 'Không được để trống' })} />
                </div>
              </div>
              <div className='row form-group'>
                <Label className='col-form-label col-md-4'>Tỉnh/Thành phố:</Label>
                <div className='col-md-8'>
                  <select
                    className='form-control'
                    onChange={(e) => setCity(e.target.value)}>
                      <option selected disabled>Tỉnh/Thành phố</option>
                    {
                      listCity && listCity.map((item, index) => (
                        <option key={index} value={item.ProvinceName}>{item.ProvinceName}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className='row form-group'>
                <Label className='col-form-label col-md-4'>Quận/Huyện:</Label>
                <div className='col-md-8'>
                  <select className='form-control' {...register("systemDistrict", { required: 'Không được để trống' })}>
                    <option value={''} selected disabled>Quận/Huyện</option>
                    {
                      listDistrict && listDistrict.map((item, index) => (
                        <option key={index} value={item.DistrictName}>{item.DistrictName}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </div>
            <div className='mt-3 d-flex justify-content-center'>
              <button className='btn bg-blue text-white w-100 mr-20'>Đăng ký</button>
              <button
                onClick={() => setView('Đăng nhập')}
                className='btn bg-light-blue text-white w-100 '>
                <span className='text-primary'>Đã có tài khoản</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const ViewForgotPass = (props) => {

  const { setView, toggleModal, setShow, show } = props

  const [email, setEmail] = useState('')

  const onClick = () => {
    setShow(true)
    _forgotPassword(email)
      .then((res) => {
        toast.info(res.data.message)
        setShow(false)
        toggleModal()
      })
      .catch((error) => {
        setShow(false)
        toast.info(error.response.data.message)
    })
  }

  return (
    <div className='forgot-password'>
      <div className=' d-flex align-items-center'>
        <Label className='col-form-label' style={{ minWidth: '200px' }}>Nhập địa chỉ email:</Label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='form-control'
          placeholder='Nhập địa chỉ Email*'
        />
      </div>
      {
        show && <Loading/>
      }
      <div className='d-flex justify-content-between'>
        <button
          onClick={() => setView('Đăng nhập')}
          className='btn btn-default text-right mt-3'>
          <i className='fa fa-long-arrow-left text-primary mr-5'></i>
          <span className='text-primary'>Quay lại đăng nhập</span>
        </button>
        
        <button
          className='btn hoplongtech-btn-primary text-right mt-3'
          onClick={onClick}>
          <span className='text-white'>Xác nhận</span>
        </button>
      </div>
    </div>
  )
}