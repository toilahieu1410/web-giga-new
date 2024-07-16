import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TypeWriterEffect from 'typewriter-effect'
import { useLocation, Link } from 'react-router-dom'
import { getNewHome, getCategoryBySlug, getNewByCreatedAt } from '../../../redux/news/action'
import { checkImageNews } from '../../../utilities/checkNumber'
import Item1 from '../../../components/news/homeNews/item1'
import Item2 from '../../../components/news/homeNews/item2'
import Item3 from '../../../components/news/homeNews/item3'
import Item4 from '../../../components/news/homeNews/item4'
import Item5 from '../../../components/news/homeNews/item5'

let data = []

const HomeNew = () => {

  const dispatch = useDispatch()

  const location = useLocation()
  const slug = location.pathname.replace(/^\/+/g, '')

  const listNewsHome = useSelector(store => store.news.listNewsHome)
  const newsList = listNewsHome && listNewsHome.map(item => item.news).flat()

  const data1 = newsList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(1, 4)

  const data2 = newsList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(4, 9)

  useEffect(() => {
    dispatch(getNewHome())
  }, [])

  useEffect(() => {
    dispatch(getCategoryBySlug(slug))
  }, [slug])

  useEffect(() => {
    const params = {
      page: 1,
      perPage: 5
    }
    dispatch(getNewByCreatedAt(params))
  }, [])

  if(listNewsHome) {
    const result = listNewsHome.find(item => item.name == 'Tin mới')
    if(result) {
      const result1 = result.news.slice(0,4).map(item => item.name)
      data = result1
    }
  }

  return (
    <div className='detail-news'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 py-4'>
            <div className='trending-now my-4'>
              <strong>Xu hướng</strong>
              <TypeWriterEffect
                options={{
                  strings: data,
                  autoStart: true,
                  loop: true,
                  delay: 75,
                }}

              />
            </div>
            <div className='list-posts'>
              <div className='col-md-12'>
                <div className='row'>
                  <div className='col-md-8'>
                    {
                      newsList[0] && (
                        <div className='banner-slider position-relative mb-4' >
                          <img className='w-100' src={checkImageNews(newsList[0].thumb)} alt={newsList[0].name} />
                          <div className='position-absolute title-dashboard'>
                            <p className='my-3' style={{ backgroundColor: '#e55f5f' }}>
                              {newsList[0].categoryName}
                            </p>
                            <h2 className='banner-title-first' >
                              <Link className='banner-caption' to={`/tin-tuc/${newsList[0].categorySlug}/${newsList[0].slug}`}>
                                <span>{newsList[0].name}</span>
                              </Link>
                            </h2>
                          </div>
                        </div>
                      )
                    }
                    <div className='list-3-items row'>
                      {data1.map((item, index) => (
                        <div className='banner-slider-small col-md-4' key={index}>
                          <div className='banner-news position-relative d-block'>
                            <img className='w-100' src={checkImageNews(item.thumb)} alt={item.name} />

                            <div className='title-dashboard'>
                              <p className='my-2' style={{
                                backgroundColor: item.categorySlug === 'tin-moi' && '#47c757' ||
                                  item.categorySlug === 'meo-hay' && '#f58b37' ||
                                  item.categorySlug === 'nau-an' && '#aaa' ||
                                  item.categorySlug === 'video-hot' && '#425A8B' ||
                                  item.categorySlug === 'danh-gia-tu-van' && '#7b5ebe'
                              }}>
                                {item.categoryName}
                              </p>
                              <h2 className='banner-title' >
                                <Link className='banner-caption' to={`/tin-tuc/${item.categorySlug}/${item.slug}`}>
                                  <span>{item.name}</span>
                                </Link>
                              </h2>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='list-3-items row'>
                      {data2.map((item, index) => (
                        <div className='banner-slider-small position-relative col-md-12 d-flex' key={index}>
                        <div className='banner-news position-relative d-flex'>
                        <img className='' src={checkImageNews(item.thumb)} alt={item.name} />
                          <div className=' title-dashboard'>
                            <p className='mb-2' style={{
                              backgroundColor: item.categorySlug === 'tin-moi' && '#47c757' ||
                                item.categorySlug === 'meo-hay' && '#f58b37' ||
                                item.categorySlug === 'nau-an' && '#aaa' ||
                                item.categorySlug === 'video-hot' && '#425A8B' ||
                                item.categorySlug === 'danh-gia-tu-van' && '#7b5ebe'
                            }}>
                              {item.categoryName}
                            </p>
                            <h2 className='banner-title' >
                              <Link className='banner-caption' to={`/tin-tuc/${item.categorySlug}/${item.slug}`}>
                                <span>{item.name}</span>
                              </Link>
                            </h2>
                          </div>
                        </div>
                       
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-12 py-4 '>
            {(listNewsHome && listNewsHome.length > 0) && (
              <div className='list-content-news'>
                <div className='details'>
                  <div className='row mb-4 row-padding'>
                    <div className='title-content mb-3'>
                      <h6 className=' mb-0'>Tin cập nhật mới nhất</h6>
                    </div>
                    <Item1 listItem={listNewsHome[0].news} />
                  </div>
                  <div className='row row-padding-1'>
                    <Item2 listItem={listNewsHome} />
                  </div>
                  <div className='row row-padding-1'>
                    <Item3 listItem={listNewsHome} />
                  </div>
                  <div className='row row-padding-1'>
                    <Item5 listItem={listNewsHome} />
                  </div>
                  <div className='row row-padding-1'>
                    <Item4 listItem={listNewsHome} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeNew
