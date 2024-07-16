import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from "react-hook-form"
import { getCommentProduct, postCommentProduct, putCommentProduct } from '../../redux/comment/action'
import { checkImage } from '../../utilities/checkNumber'
import moment from 'moment'
import Paginations from '../layout/pagination'
import 'moment/min/locales.min'
import LoadingComment from '../notification/loadingComment'

moment.locale('vi')

const perPage = 10

const Comment = (props) => {

  const dispatch = useDispatch()

  const { productId, productSlug, className } = props

  const listCommentProduct = useSelector((store) => store.comment.listCommentProduct)
  const countComment = useSelector((store) => store.comment.countComment)

  const [page, setPage] = useState(1)

  useEffect(() => {
    const params = {
      slug: productSlug,
      page: page,
      perPage: perPage
    }

    dispatch(getCommentProduct(params))
  }, [productSlug, page])

  const onSubmit = (data, e) => {
    if (data.email == '') {
      delete data.email
    }
    const body = {
      productId: productId,
      productSlug: productSlug,
    }
    Object.assign(body, data)
    dispatch(postCommentProduct(body)).then(() => {
      e.target.reset()
    })
  }

  return (
    <div className={`list-comment w-100 d-inline-block ${className}`}>
      <div className={listCommentProduct.length <= 0 ? 'col-md-12 form-comment position-relative' : 'col-md-12 form-list-comment position-relative'}>
        <div className='list-comment'>
          <h6><b>Bình luận </b></h6>
          <FormComment onSubmit={onSubmit} />
        </div>
        <div className='content-comment mb-3'>
          <div className={countComment > 0 ? 'data-loading' : 'data-loaded'}>
            {
              listCommentProduct && listCommentProduct.map((item, index) => (
                countComment <= 0 ? (<LoadingComment />) : (
                  <ListComment item={item} key={index} />
                )
              ))
            }
          </div>
        </div>
        <Paginations page={page} setPage={setPage} perPage={perPage} totalItem={countComment} />
      </div>
    </div>

  )

}

export default Comment

const ListComment = (props) => {

  const dispatch = useDispatch()

  const { item, token } = props

  const [show, setShow] = useState(false)
  const handleShow = () => setShow(!show)

  const onSubmit = (data, e) => {
    const time = {
      createdAt: Date.now(),
      updatedAt: null,
      _destroy: false
    }
    Object.assign(data, time)
    const body = [...item.reply, data]
    const bodyUpdate = {
      reply: body
    }
    dispatch(putCommentProduct(item._id, bodyUpdate)).then(() => {
      e.target.reset()
      handleShow()
    })
  }

  const Linkify = ({ text, pattern, formatter }) => {
    const __html = text.replace(pattern, formatter);
    return <div dangerouslySetInnerHTML={{ __html }}></div>
  };

  const pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const formatter = str => `<a href="${str}" style="color:#3590de" target="_blank">${str}</a>`;

  return (
    <div className='list-comment-content mt-5'>
      <div className='d-flex flex-comment mb-4'>
        {item.avatar == null ? (
          <div className='d-flex flex-column align-items-center text-center'>
            <img src={'https://img.gigadigital.vn/image/1674870170500-no_avatar.png'} width={60} height={60} />
            <span className='mt-2 fw-500 text-primary'>{item.name}</span>
          </div>

        ) : (
          <div className='d-flex flex-column align-items-center text-center'>
            <img src={checkImage(item.avatar)} width={60} height={60} />
            <span className='mt-2 fw-500 text-primary'>{item.name}</span>
          </div>
        )}
        <div className='content-right ml-15'>
          <p className='text-title fw-normal'>{moment(item.createdAt).fromNow()}</p>
          <p className='content-detail'>{item.content}</p>
          <div className='d-flex align-items-center'>
            <button onClick={handleShow} className='border-0 p-0 my-2'><span className='text-primary'><i>Trả lời</i></span></button>
          </div>
        </div>
      </div>

      {
        item.reply.length >= 0 && (
          <div className={item.reply.length == 0 ? ('list-comment-child-first') : ('list-comment-child')}>
            {
              item.reply.map((element) => (
                <div className='list-comment-child-detail my-3'>
                  <div className='d-flex'>
                    {item.avatar == null ? (
                      <div className='flex-column align-items-center position-relative'>
                        <img src={'https://img.gigadigital.vn/image/1674870170500-no_avatar.png'} width={60} height={60} />
                        <span className='position-absolute'><i className='fa fa-check'></i></span>
                        <p className='text-center fw-500 text-primary mt-2'>{element.name}</p>
                      </div>
                    ) : (
                      <div className='d-flex flex-column align-items-center text-center'>
                        <img src={checkImage(item.avatar)} width={60} height={60} />
                        <span className='mt-2'><b>{item.name}</b></span>
                      </div>
                    )}
                    <div className='content-right ml-15'>
                      <p className='text-title fw-normal'>{moment(element.createdAt).fromNow()}</p>
                      <Linkify text={element.content} pattern={pattern} formatter={formatter} />
                    </div>
                  </div>
                </div>
              ))
            }
            {
              show && (
                <FormComment onSubmit={onSubmit} token={token} />
              )
            }
          </div>
        )
      }
      
    </div>
  )
}

const FormComment = (props) => {

  const { onSubmit } = props

  const { register, handleSubmit, formState: { errors }, reset } = useForm({})

  return (
    <div className='form-reply-comment-child'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>
          <div className='col-md-4'>
            <input
              type='text'
              className='form-control'
              placeholder='Họ tên (*)'
              {...register("name", { required: 'Không được để trống' })} />
          </div>
          <div className='col-md-4'>
            <input
              type='text'
              className='form-control'
              placeholder='Điện thoại (*)'
              {...register("phone", { required: 'Không được để trống' })} />
          </div>
          <div className='col-md-4'>
            <input
              type='text'
              className='form-control'
              placeholder='Email'
              {...register("email")} />
          </div>
        </div>
        <div className='col-md-12 mt-3'>
          <textarea
            className='form-control'
            placeholder='Nội dung (*)'
            {...register("content", { required: 'Không được để trống' })} />
        </div>
        <div className='d-block text-right mt-3 button-send-comment'>
          <button className='btn hoplongtech-btn-primary'><span className='text-white'><i className='fa fa-comment-o mr-5'></i>Gửi bình luận</span></button>
        </div>
      </form>
    </div>
  )
}