import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getSalesOffPublic } from '../../redux/comment/action'
import { checkNumber } from "../../utilities/checkNumber"

const KhuyenMai = (props) => {

  const dispatch = useDispatch()

  const { chi_tiet_khuyen_mai, voucher } = props

  const listSaleOff = useSelector(store => store.comment.listSaleOff)

  useEffect(() => {
    dispatch(getSalesOffPublic())
  }, [])

  const data = [...chi_tiet_khuyen_mai, ...listSaleOff]

  voucher.sort((a, b) => a.money - b.money)

  return (
    <div className="promotion-update">
      <div className="promotion-price-list">
        {
          voucher.length > 0 && <h6 className='text-uppercase my-2'><b>Khuyến mãi</b></h6>
        }
        <ul className="list-unstyled">
          {
            voucher.map((item, index) => (
              <li key={index}
              >
                <div className="list-voucher d-flex">
                  <span className='text-promotion'>KM {index + 1}</span>
                  <div className="ml-10">
                  <p>Nhập mã: <b className="text-red">{item.voucher}</b>, <span>{item.title}</span></p>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="endow">
        {data.length > 0 && (<h6 className="text-uppercase my-2"><b>Ưu đãi thêm</b></h6>)}
        <ul className='list-unstyled'>
          {
            data && data.map((item, index) => (
              <li key={index} className='d-flex align-items-top'>
                <span  className="icon text-white text-center flex-1"><FontAwesomeIcon icon={faCheck} /></span>
                <p style={{flex:8}}>{item.content}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default KhuyenMai