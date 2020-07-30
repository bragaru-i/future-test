import React, { useState } from 'react';

import styles from './List.module.scss';
import ListItem from './ListItem/ListItem';
import arrowDownIco from '../../assets/images/icons/arrow_drop_down_24px.png';
import arrowUpIco from '../../assets/images/icons/arrow_drop_up_24px.png';
import sortBy from '../../utils/sortBy';

const List = ({ list, setActiveEntry }) => {
  const [filterBy, setFilterBy] = React.useState({
    id: false,
    email: false,
    firstName: false,
    lastName: false,
    phone: false,
  });
  const filterHandler = (e, type) => {
    e.preventDefault();
    setFilterBy((prevState) => ({ ...prevState.filterBy, [type]: !filterBy[type] }));
    if (filterBy[type]) {
      list.sort(sortBy(type, 'asc'));
    } else {
      list.sort(sortBy(type, 'desc'));
    }
  };
  const spanChecker = (type) =>
    !filterBy[type] ? (
      <img src={arrowDownIco} alt="Filter Ascending" />
    ) : (
      <img src={arrowUpIco} alt="Filter Descending" />
    );
  const listItems = list.map((item, index) => {
    let pairity = true;
    if (index % 2 === 1) pairity = false;
    return (
      <ListItem
        doActive={setActiveEntry}
        key={index}
        pairity={pairity}
        row={index + 1}
        data={item}
      />
    );
  });
  return (
    <ul className={styles.List}>
      <li className={styles.ListHeader}>
        <span className={styles.Row}>#</span>
        <span className={styles.Id} onClick={(e) => filterHandler(e, 'id')}>
          ID {spanChecker('id')}
        </span>
        <span onClick={(e) => filterHandler(e, 'firstName')} className={styles.FirstName}>
          First Name{spanChecker('firstName')}
        </span>
        <span onClick={(e) => filterHandler(e, 'lastName')} className={styles.LastName}>
          Last Name {spanChecker('lastName')}
        </span>

        <span onClick={(e) => filterHandler(e, 'phone')} className={styles.Phone}>
          Phone {spanChecker('phone')}
        </span>
        <span onClick={(e) => filterHandler(e, 'email')} className={styles.Email}>
          Email{spanChecker('email')}
        </span>
      </li>
      {listItems}
    </ul>
  );
};

export default List;
