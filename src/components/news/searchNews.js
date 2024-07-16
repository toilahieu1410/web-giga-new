import React from "react"
import { useParams, Link } from "react-router-dom"
import { checkImageNews } from "../../utilities/checkNumber"
import ReactHtmlParser from 'react-html-parser'
import moment from "moment"

const SearchNews = () => {

  const { search } = useParams()

  const dataSearchNews = [
    {
      id: 1,
      image: '1700628785270-cach-bao-quan-thot-go-khong-bi-am-moc-khi-su-dung-8.jpg',
      categorySlug: 'meo-hay',
      slug: 'meo-hay-giup',
      title: 'Mẹo hay giúp làm mềm thịt bò dai',
      categoryName: 'Mẹo hay',
      content: 'Bí kíp',

    },
    {
      id: 2,
      image: '1700628505144-meo-hay-giup-lam-mem-thit-bo-dai-4.jpg',
      categorySlug: 'meo-hay',
      slug: 'meo-hay-giup',
      title: 'Mẹo hay giúp làm mềm thịt bò dai',
      categoryName: 'Mẹo hay',
      content: 'Bí kíp',

    },
  ]

  return (
    <div className="search-news mt-4">

      <div className="col-md-12">
        <div className="row">

          {
            dataSearchNews.map((item, index) => (
              <div className="col-md-6">
                <div className="listSearchNews d-inline-block w-100 mb-4">
                  <div className="listSearchNews-image position-relative float-left">
                    <Link to={`/tin-tuc/${item.categorySlug}/${item.slug}`}>
                      <img src={checkImageNews(item.image)} className="w-100" />
                    </Link>
                  </div>
                  <div className="listSearchNews-content d-inline-block ms-3">
                    <h6 className="fw-bold">
                      <Link to={`/tin-tuc/${item.categorySlug}/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h6>
                    <p className="createAt">
                      {item.categoryName != undefined ? (<span
                        style={{
                          backgroundColor: item.categorySlug === 'tin-moi' && '#47c757' ||
                            item.categorySlug === 'meo-hay' && '#f58b37' ||
                            item.categorySlug === 'nau-an' && '#aaa' ||
                            item.categorySlug === 'video-hot' && '#425A8B' ||
                            item.categorySlug === 'danh-gia-tu-van' && '#7b5ebe'
                        }}
                        className="mr-10 category text-white">{item.categoryName}</span>) : ('')}
                      <i className='fa fa-clock text-primary'></i>
                      <span className="ml-5">{moment('18/12/2023').format('DD-MM-YYYY')}</span>
                    </p>
                    <p className="content-detail mt-3">
                      {
                        ReactHtmlParser(item.content)
                      }
                    </p>
                  </div>
                </div>
              </div>

            ))
          }
        </div>

      </div>

    </div>
  )
}

export default SearchNews