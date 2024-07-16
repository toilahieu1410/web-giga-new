import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import Slider from "react-slick"
import LogoGiga from '../../../assets/imgs/logo-gigavn.png'
import IconGiga from '../../../assets/imgs/Giga-logo.png'
import { getCategoryNews, getNewHome, getSubCategoryNews } from '../../../redux/news/action'
import { getProductHome } from "../../../redux/home/action"

import { checkImage } from "../../../utilities/checkNumber"

import { settingBannerNews } from "../../../utilities/settingSlide"

const useViewPort = () => {

  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize)
  }, [])
  return { width }
}

const Header = () => {

  const dispatch = useDispatch()

  const history = useHistory()

  const listProductHome = useSelector(store => store.home.listProductHome)
  const listCategoryNews = useSelector(store => store.news.listCategoryNews)
  const listCategoryNewsRef = useRef()

  const [categoryId, setCategoryId] = useState(null)
  const [click, setClick] = useState(false)
  const [active, setActive] = useState(null)
  const [isFixedHeader, setIsFixedHeader] = useState(false)
  const [search, setSearch] = useState('')

  const handleSelect = (i) => {
    setActive(i)
  }

  const viewPort = useViewPort()
  const isDesktop = viewPort.width >= 768

  useEffect(() => {
    dispatch(getProductHome())
  }, [])

  useEffect(() => {
    dispatch(getCategoryNews())
  }, [])

  useEffect(() => {
    dispatch(getNewHome())
  }, [])

  useEffect(() => {
    if (categoryId) {
      dispatch(getSubCategoryNews(categoryId))
    }
  }, [categoryId])

  useEffect(() => {
    const handleScroll = () => {
      if (listCategoryNewsRef.current) {
        const { top } = listCategoryNewsRef.current.getBoundingClientRect()

        if (top <= 0) {
          setIsFixedHeader(true)
        } else {
          setIsFixedHeader(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  listCategoryNews.sort((a, b) => a.sort_order - b.sort_order)

  // hover
  const onMouseEnter = (id) => {
    setCategoryId(id)
  }

  // click
  const onMouseLeave = (slug) => {
    // window.location.href = `/tin-tuc/${slug}`
    history.push({
      pathname: `/tin-tuc/${slug}`
    })
  }

  const handleEnterKey = () => {
    history.push(`/tin-tuc/tim-kiem/${search.trim()}`)
  }
  let dataImageHeader = []
  if (listProductHome) {
    const result = listProductHome.map(item => item.images).slice(0, 4)
    dataImageHeader = result
  }

  return (
    <div className="header-news">
      <div className="header-bottombar">
        <div className="position-relative">
          <div className="container">
            <div className="header-top">
              <div className="navbar-header d-flex align-items-center navbar-expand-md">
                <Link to={'/'} className="text-white logo-desktop" >
                  <img src={LogoGiga} style={{ width: 200 }} alt="logo-giga" />
                </Link>
                <Link to={'/'} className="text-white logo-mobile" >
                  <img src={IconGiga} style={{ width: 40, padding: 5 }} alt="icon-giga" />
                </Link>
                <button className="navbar-toggler" onClick={() => setClick(!click)} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
                  <i className="fas fa-bars"></i>
                </button>
              </div>
              <div className="header-top-banner w-50">
                <Slider
                  {...settingBannerNews}
                >
                  {
                    dataImageHeader && dataImageHeader.map((item, index) => (
                      <img src={checkImage(item)} className='w-100' />
                    ))
                  }
                </Slider>
              </div>
            </div>
          </div>

          {isDesktop && (
            <div className="list-navbar-items align-items-center justify-content-between w-100  navbar-collapse 222" id="navbarSupportedContent">
              <div className="container">
                <div className="d-flex align-items-center justify-content-between" ref={listCategoryNewsRef}>
                  <div className={isFixedHeader ? 'container d-flex mb-0 text-uppercase fixed' : 'list-unstyled d-flex mb-0 text-uppercase'}>
                    <div className="image-logo d-none">
                      <Link to={'/'} className="text-white logo-desktop" >
                        <img src={LogoGiga} style={{ width: 200 }} alt="logo-giga" />
                      </Link>
                      <Link to={'/'} className="text-white logo-mobile" >
                        <img src={IconGiga} style={{ width: 40, padding: 5 }} alt="icon-giga" />
                      </Link>
                    </div>
                    <ul className="list-unstyled d-flex mb-0 text-uppercase">
                      <li className="category-list">
                        <div onClick={() => handleSelect(listCategoryNews.length)} className={listCategoryNews.length === active ? 'navbar__item-active text-white' : 'navbar__item text-white'}>
                          <Link to={`/tin-tuc`} className='text-primary fw-500' >TRANG CHỦ</Link>
                        </div>
                      </li>
                      {
                        listCategoryNews.map((item, index) => (
                          <li key={item._id} className='category-list'>
                            <div
                              className={active === index ? 'navbar__item-active' : 'navbar__item text-white'} key={item._id}
                              onClick={() => [onMouseLeave(item.slug), handleSelect(index), onMouseEnter(item._id)]}
                            >
                              <Link className="text-primary fw-500">{item.name}</Link>
                            </div>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                  <div className="float-right position-relative header-right">
                    <i className="fa fa-search show-input"></i>
                    <div className="search-box">
                      <input
                        className='form-search form-control '
                        placeholder='Tìm kiếm'
                        value={search || ''}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.keyCode === 13 || e.which === 13) {
                            handleEnterKey()
                          }
                        }}
                      />

                    </div>
                  </div>
                
                </div>
              </div>
            </div>
          )}
          {
            click && (
              <div className="list-navbar-items align-items-center justify-content-between w-100  navbar-collapse" id="navbarSupportedContent">
                <ul className="list-unstyled d-flex mb-0 ml-20 text-uppercase">
                  <li className="category-list">
                    <div className="navbar__item text-white">
                      <Link to={`/tin-tuc`} className="text-white w-100">TRANG CHỦ</Link>
                    </div>
                  </li>
                  {
                    listCategoryNews.map((item) => (
                      <li key={item._id} className="category-list">
                        <div
                          className="navbar__item text-white" key={item._id}
                          onClick={() => onMouseLeave(item.slug)}
                        // onMouseEnter={() => onMouseEnter(item._id)}
                        >
                          <Link className="text-white">{item.name}</Link>
                        </div>
                        {/* {
                        listSubCategoryNews.length > 0 && (
                          <CategoryChild listSubCategoryNews={listSubCategoryNews} />
                        )
                      } */}
                      </li>
                    ))
                  }
                </ul>
              </div>
            )
          }

        </div>
      </div>
    </div>
  )
}

export default Header

const CategoryChild = (props) => {

  const { listSubCategoryNews } = props

  return (
    <div className="w-100 category-child">
      <div className="container">
        <div className="row list-category">
          {
            listSubCategoryNews.map((item) => (
              <Link
                key={item._id}
                className='col-md-6 p-3'
                to={{ pathname: `/tin-tuc/${item.slug}` }}
              >
                <p>{item.name}</p>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}