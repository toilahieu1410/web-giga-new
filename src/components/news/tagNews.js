import moment from "moment"
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getNewByTag } from "../../redux/news/action"
import { checkImageNews } from "../../utilities/checkNumber"

const perPage = 20

const TagNew = () => {

  const dispatch = useDispatch()

  const { tag } = useParams()

  const listNewsTag = useSelector(store => store.news.listNewsTag)

  const [page, setPage] = useState(1)

  useEffect(() => {
    const query = {
      page: page,
      perPage: perPage,
      tag: tag
    }
    dispatch(getNewByTag(query))
  }, [page])

  return (
    <div className="tagCategory mt-3">
      <h5>Tag: {tag}</h5>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              {
                listNewsTag && (
                  listNewsTag.data.map(item => (
                  <div className="col-md-4">  
                    <Link className="tagCategory-listContent" to={`/tin-tuc/${item.categorySlug}/${item.slug}`}>
                      <div className="tagCategory-thumb mb-3 position-relative">
                          <img className='w-100' src={checkImageNews(item.thumb)} style={{height:218}}/>
                          <p className="category text-white">{item.categoryName}</p>
                      </div>
                      <div className="tagCategory-detail">
                        <h5>{item.name}</h5>
                        <p className="mb-2 createAt">
                          <i className='fa fa-calendar-o text-primary'></i>
                          <span className="ml-5">{moment(item.createdAt).fromNow()}</span>
                        </p>
                      </div>
                    </Link>
                  </div>
                  )) 
                )  
              }
            </div>
          </div>
        </div>
      </div>
  )
}

export default TagNew