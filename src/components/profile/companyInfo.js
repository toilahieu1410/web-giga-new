import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Label } from 'reactstrap'
import { getProfile } from '../../redux/profile/action'

const CompanyInfo = () => {
  const dispatch = useDispatch()

  const profileInfo = useSelector((store) => store.profile.profileInfo)

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: profileInfo
  })

  useEffect(() => {
    reset(profileInfo)
  },[profileInfo])

  useEffect(() => {
    dispatch(getProfile())
  }, [])

  const onSubmit = (data) => {
    const body = {
      address: data.address,
      email: data.email,
      name: data.name,
      
    }
  }
  return(
    <div>
      <form id='hook-form-profile'>
        <div className='row my-2'>
          <div className='col-md-4 text-end'>
            <label className='col-form-label'>Tên công ty:</label>
          </div>
          <div className='col-md-8'>
            <input
              type='text'
              className='form-control'
              placeholder='Nhập vào họ và tên'
              {...register("company_name", { required: 'Không được để trống' })} />
          </div>
        </div>
        <div className='row my-2'>
          <div className='col-md-4 text-end'>
            <label className='col-form-label'>Địa chỉ công ty:</label>
          </div>
          <div className='col-md-8'>
           <input
            type='text'
            className='form-control'
            placeholder='Nhập vào email'
            {...register("company_address", { required: 'Không được để trống' })} />
          </div>
        </div>
        <div className='row my-2'>
          <div className='col-md-4 text-end'>
            <Label className='col-form-label'>Mã số thuế:</Label>
          </div>
          <div className='col-md-8'>
            <input
              className='form-control'
              placeholder='Ngày sinh'
              {...register("vat_code")} />
          </div>
        </div>
        <div className='text-end my-2'>
          <button 
            className='btn bg-blue text-white' 
            type='submit' 
            form='hook-form-profile' onClick={handleSubmit(onSubmit)}
          >Cập nhật</button>
        </div>
      </form>
    </div>
  )
}

export default CompanyInfo