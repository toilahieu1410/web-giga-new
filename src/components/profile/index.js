import React, { useState } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import CompanyInfo from './companyInfo'
import MenuRight from './menuRight'
import ProfileInfo from './profileInfo'
import { _postImageProduct } from '../../api/profile'

const Profile = () => {

  const [BasicLineTab, setBasicLineTab] = useState('1')

  return (
    <div className='row profile mt-3'>
      <div className='col-md-3 px-0 '>
        <MenuRight label='taikhoan'/>
      </div>
      <div className='col-md-9' style={{paddingLeft: '10px', paddingBottom: 0, paddingRight: 0, paddingTop: 0}}>
        <div className='bg-white shadow-sm px-3 py-2 rounded'>
          <div>
            <Nav className="border-tab" tabs>
              <NavItem>
                <NavLink className={BasicLineTab === '1' ? 'active' : ''} onClick={() => setBasicLineTab('1')}>
                  Thông tin tài khoản
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={BasicLineTab === '2' ? 'active' : ''} onClick={() => setBasicLineTab('2')}>
                  Thông tin doanh nghiệp
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={BasicLineTab} className='mt-3'>
              <TabPane  className="fade show" tabId="1">
                <ProfileInfo />
              </TabPane>
              <TabPane tabId="2">
                <CompanyInfo />
              </TabPane>
            </TabContent> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile