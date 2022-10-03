import React, { Component } from "react";
import _ from "lodash";

const Pagination = (props) => {
  //we want to get array of pagenumber [1,2,3,4] so we can map and render each to element
  const { itemCount, pageSize } = props;
  const pageNumber = Math.ceil(itemCount / pageSize);
  if(pageNumber === 1) return null
  //how to create an array from a number. from [1, ... pageNumber]
  //using lodash
  const page = _.range(1, pageNumber + 1);

    
  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination'>
      {page.map((page) => (
          <li key={page} className='page-item'>
            <a className='page-link'>{page}</a>
          </li>
      ))}
      </ul>
    </nav>
  );
};

export default Pagination;
