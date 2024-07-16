import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { _changPassWord } from "../../api/auth"
import LoginModal from "../layout/loginModal"

const ForgotPassword = () => {
  const { id } = useParams()

  const [modal, setModal] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  const toggleModal = () => {
    setModal(!modal)
  }
  
  const onHandleChange = () => {
    const body = {
      password: password,
      confirmPassword: confirmPassword
    }
    _changPassWord(id, body).then(() => {
      setModal(true)
      toast.success('Đổi thành công')
      
    }).catch(() => {
      toast.info('Lỗi , mời nhập lại')
  })
  }

  return (
    <div style={{marginTop: 50}}>
      <LoginModal modal={modal} setModal={setModal} toggleModal={toggleModal}/>
      <h4 className="text-center mt-3 text-primary fw-bold">
        Đổi mật khẩu
      </h4>
      <div className="container mt-4" style={{marginBottom: 200}}>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="bg-white p-3 my-4 shadow rounded">
              <div className="text-center">
                <label>
                  (Nhập vào mật khẩu mới muốn đổi và xác nhận lại mật khẩu*)
                </label>
              </div>
              <div className="row mt-2">
                <div className="col-md-4 text-end">
                  <label className="col-form-label">
                    Mật khẩu:
                  </label>
                </div>
                <div className="col-md-8">
                  <input 
                    className="form-control" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
              </div>
              <div className="row my-2">
                <div className="col-md-4 text-end">
                  <label className="col-form-label">
                    Xác nhận mật khẩu
                  </label>
                </div>
                <div className="col-md-8">
                  <input 
                    className="form-control" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12 text-center">
                  <button className="btn bg-giga text-white" onClick={onHandleChange}>
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword