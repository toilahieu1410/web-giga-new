import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"
import { _login, _loginErp, _getUserErp } from "../../api/auth"
import { toast } from "react-toastify"
import useToken from "../../utilities/useToken"

const LoginErp = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const { setToken, token } = useToken()
  const history = useHistory()

  const onSubmit = (data) => {
    _loginErp(data.username, data.password)
      .then((res) => {
        if (res.notification.indexOf("thành công") != -1) {
          _getUserErp(data.username).then((result) => {
            const body = {
              type: "erp",
              username: result.USERNAME.toLowerCase(),
              phone: result.SDT,
              email: result.EMAIL,
              name: result.HO_VA_TEN,
              password: data.password,
              confirmPassword: data.password,
            };
            const dataLogin = {
              username: data.username,
              password: data.password,
            };
            _login(dataLogin)
              .then((res) => {
                if (res.status == 200) {
                  setToken(res.data);
                  window.location.href = "/"
                }
              })
              .catch((err) => {
                if (err.response.status == 400) {
                  history.push({
                    pathname: `/tai-khoan/tao-tai-khoan`,
                    state: body,
                  })
                }
              })
          });
        } else {
          toast.info(res.notification);
        }
      })
      .catch((err) => {
        toast.warning(err)
      })
  }

  if (token) {
    window.location.href = "/"
  }

  return (
    <div>
      <div className="modal-login">
        <div className="sign-in-app d-flex align-items-center justify-content-center">
          <div className="col-md-5 bg-white box-shadow mt-20">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="logo-giga text-center mb-4">
                <h5 className="mb-0">Đăng nhập tài khoản Erp</h5>
              </div>
              <div className="row mb-4">
                <div className="col-md-3">
                  <label className="col-form-label">Tài khoản</label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tài khoản"
                    {...register("username", {
                      required: "Không được để trống",
                    })}
                  />
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-3">
                  <label className="col-form-label">Mật khẩu</label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mật khẩu"
                    {...register("password", {
                      required: "Không được để trống",
                    })}
                  />
                </div>
              </div>

              <div className="mt-3 d-flex justify-content-center">
                <button className="btn bg-blue text-white w-50">
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginErp;
