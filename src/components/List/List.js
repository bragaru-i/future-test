import React from 'react';

import styles from './List.module.scss';
import ListItem from './ListItem/ListItem';

const List = (props) => {
  return (
    <ul className={styles.List}>
      <ListItem />
    </ul>
  );
};

export default List;
