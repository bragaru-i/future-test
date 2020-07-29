import React from 'react';

import styles from './ListItem.module.scss';

const ListItem = ({ pairity, row, data }) => {
  let stylesBackground = [styles.ListItem];
  if (pairity) stylesBackground.push(styles.Paired);

  return (
    <li className={stylesBackground.join(' ')}>
      <span className={styles.Row}>{row}</span>
      <span className={styles.Id}>{data.id}</span>
      <span className={styles.FirstName}>{data.firstName}</span>
      <span className={styles.LastName}>{data.lastName} </span>
      <span className={styles.Phone}>{data.phone}</span>
      <span className={styles.Email}>{data.email}</span>
    </li>
  );
};

export default ListItem;
