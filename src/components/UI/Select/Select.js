import React from 'react';

import styles from './Select.module.scss';

const Select = (props) => {
  const { values, dbChange, value } = props;

  let options = null;
  if (values)
    options = values.map((item) => {
      return (
        <option key={item.value} value={item.value}>
          {item.text}
        </option>
      );
    });
  return (
    <select className={styles.Select} value={value} onChange={dbChange}>
      {options && options}
    </select>
  );
};

export default Select;
