import React from 'react';
import Pagination from "react-js-pagination";

const Paginations = (props) => {

  const { page, setPage, perPage, totalItem } = props;

  return (
    <div className='d-flex justify-content-center pagination'>
      {
        (totalItem && totalItem !== 0 && totalItem !== 'undefined') ?
          (<Pagination
            activePage={page}
            itemsCountPerPage={perPage}
            totalItemsCount={totalItem}
            pageRangeDisplayed={5}
            onChange={setPage}
            itemClass="page-item"
            linkClass="page-link"
          />) : ('')
      }
    </div>
  )
}


export default Paginations;