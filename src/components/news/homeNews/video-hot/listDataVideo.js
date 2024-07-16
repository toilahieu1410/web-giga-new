import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import { getNewsByCate } from '../../../../redux/news/action'
import { checkImageNews } from '../../../../utilities/checkNumber'
import { Modal, ModalBody } from 'reactstrap'
import Paginations from '../../../layout/pagination'
import ListNewByCreatedAt from '../listNewByCreateAt'

const perPage = 12

const ListDataVideo = () => {
  
  const dispatch = useDispatch()

  const { slug } = useParams()

  const listNews = useSelector((store) => store.news.listNews)
  const countNew = useSelector((store) => store.news.countNew)

  const [itemEdit, setItemEdit] = useState('')
  const [modalYoutube, setModalYoutube] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    window.scrollTo(0, 0)
    const params = {
      type: "subCategorySlug",
      slug: slug,
      page: page,
      perPage: perPage
    }
    dispatch(getNewsByCate(params))
  }, [slug, page])

  const toggleModalYoutube = (item) => {
    setModalYoutube(!modalYoutube)
    setItemEdit(item)
  }

  return (
    <div className='list-video-details video-hot mt-4'>
      <div className='row mt-10'>
        <div className='col-md-9 position-relative'>
          {
            listNews.length > 0 && (
              <div className='row'>
                <header>
                  <h6 className='mb-0'>{listNews[0].subCategoryName}</h6>
                </header>
                  {listNews.map((item) => (
                    <div className='col-md-4'>
                      <div className=" d-inline-block w-100 mb-4 ">
                        <div className="categoryNews-thumb position-relative float-left">
                          <Link onClick={() => toggleModalYoutube(item)}>
                            <img src={checkImageNews(item.thumb)} className="w-100" />
                          </Link>
                        </div>
                        <div className="categoryNews-content d-inline-block mt-2">
                          <h6>
                            <b>
                              <Link onClick={() => toggleModalYoutube(item)}>{item.name}</Link>
                            </b>
                          </h6>
                          <p className="createAt">
                            <i className='fa fa-clock text-primary' style={{fontWeight:500}}></i>
                            <span className="ml-5">{moment(item.createdAt).format('DD-MM-YYYY')}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            )
          }

          {
            modalYoutube && (
              <Modal isOpen={modalYoutube} toggle={toggleModalYoutube} size='lg' className='modal-video-slider'>
                <ModalBody>
                  <p className='modal-video-youtube'>
                    {
                      (ReactHtmlParser(itemEdit.content))
                    }
                  </p>
                  <div className='detail-content mt-3'>
                    <h5>{itemEdit.name}</h5>
                    <p className='mt-2 text-gray'><span>{itemEdit.view} lượt xem</span> - <span>{moment(itemEdit.createdAt).fromNow()}</span></p>
                  </div>
                </ModalBody>
              </Modal>
            )
          }
          <div className='w-100'>
            <Paginations page={page} setPage={setPage} perPage={perPage} totalItem = {countNew}  />
          </div>
        </div>
        <ListNewByCreatedAt />
      </div>
    </div>
  )
}

export default ListDataVideo 