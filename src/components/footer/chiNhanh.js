import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { addressStore } from '../../assets/constant/constant'
import ReactHtmlParser from 'react-html-parser'
import { findIndex } from 'lodash'

const ChiNhanh = () => {

  const { chiNhanh } = useParams()

  const [address, setAddress] = useState(addressStore[0].store[0])

  const [cityBranch, setCityBranch] = useState(addressStore[0])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    findIndex(addressStore, function (item) {
      if (item.slug == chiNhanh) {
        setCityBranch(item)
      }
    })
  }, [chiNhanh])

  useEffect(() => {
    setAddress(cityBranch.store[0])
  }, [cityBranch])

  return (
    <div className="chi-nhanh row">
      <div className="chi-nhanh-title my-2 text-center">
        <h6 className="mt-3 mb-3"><strong>Liên hệ với Giga Digital</strong></h6>
      </div>
      <div className="chi-nhanh-content">
        <div className="chi-nhanh-content-info">
          {
            addressStore.map((item, index) => (
              <div key={index} className='d-block'>
                <div className="item-list-map">
                  <p><strong >Thành phố {item.city}</strong></p>
                    {item.store.map((element, index1) => (
                      <div className='d-flex align-items-center justify-content-between'>
                        <p key={index1} ><i className="fa fa-map-marker-alt mr-10 float-left text-primary"></i><span className="d-flex" dangerouslySetInnerHTML={{__html: element.address.replace(/\n/g, "<br />")}}></span></p>
                        <button type="button" className="border-0 bg-transparent" onClick={() => setAddress(element)}>Xem bản đồ</button>
                      </div>
                    ))}
                </div>
              </div>
            ))
          }
        </div>
        <div className="vertical-line"></div>
        <div className="chi-nhanh-content-map">
          {
            address != '' &&
            <p>
              {
                ReactHtmlParser(address && address.map)
              }
            </p>
          }
        </div>
      </div>
    </div>
  )
}

export default ChiNhanh