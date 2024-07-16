import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Range } from 'react-range'
import Slider from "react-slick"
import { checkImage, checkNumber } from "../../utilities/checkNumber"
import { settingBestSeller } from "../../utilities/settingSlide"
import { getProductBestSeller } from "../../redux/product/action"
import { getBrand } from "../../redux/home/action"
import { shuffle } from "lodash"

const dataTags = [
  {
    id: 1,
    name: 'Games',
    slug: '#'
  },
  {
    id: 2,
    name: 'Electronics',
    slug: '#'
  },
  {
    id: 3,
    name: 'Video',
    slug: '#'
  },
  {
    id: 4,
    name: 'VGA Card',
    slug: '#'
  },
  {
    id: 5,
    name: 'Camera',
    slug: '#'
  },
  {
    id: 6,
    name: 'Window',
    slug: '#'
  }
]

const LeftCategories = (props) => {

  const dispatch = useDispatch()

  const { listCategorySlug, listSubCategory } = props

  const [priceRange, setPriceRange] = useState([0, 10000])

  const listProductBestSeller = useSelector(store => store.product.listProductBestSeller)
  const listBrand = useSelector((store) => store.home.listBrand)

  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [randomBrand, setRandomBrand] = useState([])

  
  useEffect(() => {
    if (listCategorySlug && listCategorySlug.slug) {
      dispatch(getProductBestSeller(listCategorySlug.slug))
    }
  }, [listCategorySlug])

  useEffect(() => {
    const params = {
      page: page,
      perPage: 10
    }
    dispatch(getBrand(params))
  }, [page, perPage])

  useEffect(() => {
    if(listBrand) {
      const initialRandomBrand = shuffle(listBrand)
      setRandomBrand(initialRandomBrand)
    }
  },[listBrand])


  return (
    <div className="compare-list-products">

      {
        listSubCategory.length > 0 && (
          <div className="compare-dashboard">
            <h1 className="text-capitalize text-primary">{listCategorySlug?.name}</h1>
            <ul className={listSubCategory.length <= 0 ? 'd-none' : 'list-parent list-unstyled'}>
              {listSubCategory.map((item, index) => (
                <li key={index} className="position-relative">
                  <Link to={{ pathname: `/${item.slug}` }} className='text-primary d-flex align-items-center'>
                    <i className="fa fa-caret-right mr-5"></i>
                    <h2 className="mb-0 flex-1">{item.name}</h2>
                    <span className="text-primary number">{item.total_product}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      }

      {
        listProductBestSeller.length > 0 && (
          <div className="best-seller mt-4">
            <div className="header-title w-100 d-inline-block position-relative">
              <h1 className="text-capitalize text-primary mb-0">Best seller</h1>
            </div>
            <div className="content-slider">
              <Slider
                {...settingBestSeller}
              >
                {listProductBestSeller.map((item, index) => (
                  <Link to={`/${item.categorySlug}/${item.slug}`} className='compare-list-item text-left mb-3' key={index}>
                    <div className='compare-list-item-image'>
                      <img className='img-fluid' src={checkImage(item.thumb)} alt={item.name} />
                    </div>
                    <div className='compare-list-item-info mt-1'>
                      <h6 className="text-primary">{item.name}</h6>
                      <p><span className='text-primary'>{item.price == 0 || item.price == item.original_price ? 'Giá liên hệ' : checkNumber(item.price)} </span>&nbsp;&nbsp;<span className='text-decoration-line-through text-title'>{item.price == item.original_price ? '' : checkNumber(item.original_price)} </span></p>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </div>
        )
      }

      <div className="product-tags mt-3">
        <div className="header-title w-100 d-inline-block position-relative">
          <h1 className="text-capitalize text-primary mb-0">Product Tags</h1>
        </div>
        <div className="product-tags-content">
          {randomBrand && randomBrand.map((item, index) => (
            <Link key={index} to={`/hang/${item.title}`} className='mr-5 mb-3'>
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="banner-left-sidebar mt-4 ">
        <img src="https://wp.alithemes.com/html/ecom/demo/assets/imgs/page/homepage1/bg-topsell.png" className="img-fluid rounded" />
      </div>
      {/* <div className="range-slider">
        <Range
          step={1000}
          min={0}
          max={10000}
          values={priceRange}
          onChange={(values) => setPriceRange(values)} 
          renderTrack={({props, children}) => (
            <div {...props}
              style={{
                ...props.style,
                height: "6px",
                width: '100%',
                backgroundColor:'#ccc'
              }}
            >
            {children}
            </div>
          )}  
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "20px",
                width: "20px",
                backgroundColor: "#999",
                borderRadius: "50%",
              }}
            />
          )}      
        />
      </div> */}
    </div>
  )
}
export default LeftCategories