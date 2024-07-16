import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Label, Row } from 'reactstrap'
import { getProfile } from '../../redux/profile/action'
import img from '../../assets/images/default-user-image.png'
import { checkImage } from '../../utilities/checkNumber'

const MenuRight = (props) => {

  const {label} = props

	const dispatch = useDispatch()

	const profileInfo = useSelector((store) => store.profile.profileInfo)

	useEffect(() => {
		dispatch(getProfile())
	}, [dispatch])

   return (
		<Fragment>
				<div className='menu-user p-2 shadow-sm bg-white rounded'>
					<div className='border-bottom px-2'>
						{
							profileInfo && (
								<Row className='col-form-label'>
									<Col xs='4' className='p-2 d-flex justify-content-center'>
										{
											!profileInfo.avatar || profileInfo.avatar === '' ? (
												
												<img src={img} alt='' className=' rounded-circle' style={{height: 90, width: 90}} />
											) : (
												<img src={checkImage(profileInfo.avatar)}  style={{height: 90, width: 90, objectFit: 'cover'}} alt='' className='user-image rounded-circle' />
											)
										}
									</Col>
									<Col xs='8' className='col-form-label d-flex align-items-center'>
										<div>
											<Label className="profile-user-name">{profileInfo.username}</Label>
											<Label className="profile-user-phone d-block">{profileInfo.phone}</Label>
										</div>
									</Col>
								</Row>
							)
						}
					</div>
					<ul className='p-0 mb-0 mt-2'>
						<Link to={{pathname:`/tai-khoan/thong-tin`}}><li  className={label === 'taikhoan' ? 'list-unstyled active':'list-unstyled'}>Thông tin tài khoản</li></Link>
						<Link to={{pathname:`/tai-khoan/don-hang`}}><li className={label === 'donhang' ? 'list-unstyled active':'list-unstyled'}>Đơn hàng của bạn</li></Link>
						<Link to={{pathname:`/tai-khoan/bang-dieu-khien`}}><li className={label === '' ? 'list-unstyled active':'list-unstyled'}>Bảng điều khiển</li></Link>
						<Link to={{pathname:`/tai-khoan/san-pham-yeu-thich`}}><li className={label === 'yeuthich' ? 'list-unstyled active':'list-unstyled'}>Sản phẩm yêu thích</li></Link>
					</ul>
				</div>
		</Fragment>
  )
};

export default MenuRight;