import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Input, InputGroup, InputGroupAddon, Label, PopoverBody, PopoverHeader, Row, Table, Popover } from 'reactstrap'
import moment from 'moment'
import { getBaoHanh } from '../../redux/order/action'
import { checkImage, checkNumber } from '../../utilities/checkNumber'
import { Link } from 'react-router-dom'

const BaoHanh = () => {

  const dispatch = useDispatch()

  const dataBaoHanh = useSelector((store) => store.order.dataBaoHanh)

  const [tukhoa, setTukhoa] = useState('')
  const [type, setType] = useState('mavandon')
  
  const onChangeType = (e) => {
    setType(e.target.value)
  }

  const onSearchBaoHanh = () => {
    const params = {
      type: type,
      search: tukhoa
    }
    if(tukhoa != '') {
      dispatch(getBaoHanh(params))
    }
  }

  return (
    <Row className='mt-4'>
      <Col xs='12' className='p-0  rounded'>
        <div className='border-bottom text-center p-3'>
          <h5 className='text-primary fw-bold'>
            Thông tin bảo hành sản phẩm
          </h5>
        </div>
        <div className='container'>
          <div className='row mt-4'>
            <div className='col-md-4'>
              <div className='row'>
                <div className='col-md-5 '>
                  <label className='col-form-label'>Tìm kiếm theo:</label>
                </div>
                <div className='col-md-7'>
                  <select className='form-control' onChange={(e) => onChangeType(e)}>
                    <option value='series' >Số series sản phẩm</option>
                    <option value='mavandon' >Mã vận đơn</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='col-md-8'>
              <div className=' text-center d-flex justify-content-center '>
                <InputGroup className='justify-content-center rounded-0'>
                  <Input 
                    className='hoplongtech-input rounded-0'
                    placeholder="Nhập từ khóa tìm kiếm"
                    value={tukhoa}
                    onChange={(e) => setTukhoa(e.target.value)} 
                    />
                  <InputGroupAddon addonType="append">
                    <button 
                      className="btn bg-giga text-white rounded-0"
                      onClick={() => onSearchBaoHanh()}
                    >Tìm kiếm</button>
                  </InputGroupAddon>
                </InputGroup> 
              </div>
            </div>
          </div>
        </div>
        <div className='p-3'>
          {
            dataBaoHanh && dataBaoHanh.map((item, index) => (
              <div className='bg-white p-3 rounded shadow-sm my-4' key={index}>
                <label className='my-2 mx-3'>Đơn hàng: <span className='text-primary fw-bold'>{item.mavandon} - {item.shipping_name}</span></label>
                <Table className='p-3 py-0 text-center' style={{borderCollapse: 'inherit'}}>
                    <thead className='bg-giga'>
                      <tr>
                        <th scope="col" className='bg-giga text-white'>Thông tin sản phẩm</th>
                        <th scope="col" className='bg-giga text-white' style={{width: 180}}>Thời gian bảo hành</th>
                        <th scope="col" className='bg-giga text-white' style={{width: 180}}>Ngày mua hàng</th>
                        <th scope="col" className='bg-giga text-white' style={{width: 180}}>Ngày bảo hành</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        item.productId && item.productId.map((e , i) => (
                          <ItemTabel key={i} item={e} father={item} />
                        ))
                      }
                    </tbody>
                  </Table>
              </div>
            ))
          }
        </div>
      </Col>
    </Row>
  )
}
export default BaoHanh

const ItemTabel = (props) => {
  const {item, father} = props
  const [ttBaoHanh, setTTBaoHanh] = useState(false)

  return(
    <tr>
      <td className='align-middle'>
        <div className='row align-items-center'>
          <div className='col-md-4'>
            <img src={checkImage(item.thumb)} style={{width: 100, height: 100}} />
          </div>
          <div className='col-md-8'>
            <Link to={`/${item.slug}/${item.slug}`}>
              <Label className='text-center fw-bolder ml-10 d-block cursor-pointer'>{item.name}</Label>
            </Link>
            <div className='row mt-2'>
              <div className='col-md-6 text-end'>Series</div>
              <div className='col-md-6 text-start text-primary'>{item.version_detail.name}</div>
            </div>
            <div className='row'>
              <div className='col-md-6 text-end'>Giá</div>
              <div className='col-md-6 text-start text-primary'>{checkNumber(parseInt(item.version_detail.price))} </div>
            </div>
          </div>
        </div>
      </td>
      <td className='align-middle text-center'>
        <Label className='d-block'>{item.bao_hanh} tháng</Label>
        <button id={'mypopover' + item.id} className='btn text-primary' style={{fontSize: 14}}>
          Xem điều kiện 
        </button>
        <Popover
          placement="right"
          target={'mypopover' + item.id}
          trigger="legacy"
          isOpen={ttBaoHanh}
          toggle={() => setTTBaoHanh(!ttBaoHanh)}
        >
          <PopoverHeader className='text-primary'>Chính sách bảo hành</PopoverHeader>
          <PopoverBody>{item.thong_tin_bao_hanh}</PopoverBody>
        </Popover>
      </td>
      <td className='align-middle'>
        <Label className=''>{moment(father.createdAt).format('DD/MM/YYYY')}</Label>
      </td>
      <td className='align-middle'>
        <Label>{moment(father.createdAt).add(item.bao_hanh, 'months').format('DD/MM/YYYY')}</Label>
      </td>
    </tr>
  )
}