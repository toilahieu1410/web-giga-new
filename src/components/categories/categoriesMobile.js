import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategory, getSubCategory } from "../../redux/product/action";
import { checkImage } from "../../utilities/checkNumber";

const CategoriesMobile = () => {

  const dispatch = useDispatch()

  const listCategory = useSelector((store) => store.product.listCategory)
  const listSubCategory = useSelector((store) => store.product.listSubCategory)

  const [categoryId, setCategoryId] = useState('')
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (tabNumber) => {
    setSelectedTab(tabNumber)
  }

  useEffect(() => {
    if (categoryId && categoryId != '') {
      dispatch(getSubCategory(categoryId))
    }

  }, [categoryId])

  useEffect(() => {
    dispatch(getCategory())
  }, [])

  const onClickSubCategory = (item) => {
    setCategoryId(item._id)
  }

  return (
    <div className="categories-mobile">
      <div className="vertical-tab">
        <div className="tab-nav">
          {listCategory.map((category, index) => (
            category.total_product > 0 && (
              <div className={`tab ${index === selectedTab ? "active" : ""}`}
              onClick={() => [handleTabClick(index), onClickSubCategory(category)]}>
              <div className="d-flex flex-column text-center pb-3">
                <div className="image-icon">
                  <img src={`data:image/svg+xml;utf8,${encodeURIComponent(category.icon)}`} />
                </div>
                <div
                  className="title-product"
                  key={category._id}
                >
                  {category.name}
                </div>

              </div>
            </div>
            )
            
          ))}
        </div>
        <div className="tab-content">
          {/* <h2>{listCategory[selectedTab]?.name}</h2>
          <p>{listCategory[selectedTab]?.description}</p>
          
          {listCategory[selectedTab]?.images && (
            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(listCategory[selectedTab]?.icon)}`} />
          )} */}
          {
            listSubCategory && listSubCategory.length <= 0 ? ('') : (
              <div className="sub-category">
                {
                  listSubCategory.sort((a, b) => (a.icon === null ? -1 : b.icon === null ? 1 : 0)).map(item => (
                      item.icon == null ? (
                        <Link to={item.slug} className='no-icon'>
                          <div className="d-flex align-items-center justify-content-between p-3">
                            <p className="mb-0 fw-500">{item.name}</p>
                            <i className="fa fa-chevron-right text-gray"></i>
                          </div>
                        </Link>
                      ) : (
                        <Link to={item.slug} className='icon-items'>
                          <div className="d-inline-block align-items-center justify-content-between p-3">
                            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(item?.icon)}`} />
                            <p className="mb-0 fw-300">    {item.name}</p>
                          </div>
                        </Link>
                      )

                    ))
                }
              </div>
            )
          }
        </div>
      </div>
    </div>
  )

}
export default CategoriesMobile