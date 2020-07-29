/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';

import Input from '../UI/Input/Input';
import styles from './Pagination.module.scss';

const Pagination = ({
  postsPerPage,
  currentPage,
  postPerPageHandler,
  totalPages,
  pageSwitcher,
}) => {
  const pageHandler = (page, action, nr) => {
    if (action === 'next') return page + 1;
  };
  const getPage = (page, action, nr) => {
    let res = null;
    switch (action) {
      case 'next': {
        if (nr + page > totalPages) {
          res = null;
          break;
        }
        res = page + nr;
        break;
      }
      case 'prev': {
        if (page - nr <= 0) {
          res = null;
          break;
        }
        res = page - nr;
        break;
      }
      default:
        return (res = null);
    }

    return res;
  };
  console.log(getPage(currentPage, 'next', 1));
  return (
    <div className={styles.Pagination}>
      <div></div>
      <div className={styles.PageNumbers}>
        <span onClick={() => pageSwitcher(getPage(currentPage, 'prev', 2))}>
          {getPage(currentPage, 'prev', 2)}
        </span>
        <span onClick={() => pageSwitcher(getPage(currentPage, 'prev', 1))}>
          {getPage(currentPage, 'prev', 1)}
        </span>
        <span className={styles.Active}>{currentPage}</span>
        <span onClick={() => pageSwitcher(getPage(currentPage, 'next', 1))}>
          {getPage(currentPage, 'next', 1)}
        </span>
        <span onClick={() => pageSwitcher(getPage(currentPage, 'next', 2))}>
          {getPage(currentPage, 'next', 2)}
        </span>
        <em>....</em>
        <span onClick={() => pageSwitcher(totalPages)}> total of {totalPages}</span>
      </div>
      <div className={styles.Input}>
        <span>*res per page</span>
        <Input
          type="number"
          value={postsPerPage}
          inputOnChange={postPerPageHandler}
          name="postPerPage"
          id="postPerPage"
        ></Input>
      </div>
    </div>
  );
};

export default Pagination;
