import React from 'react';

import styles from './Backdrop.module.scss';

const Backdrop = ({ children }) => {
  return <div className={styles.Backdrop}>{children}</div>;
};

export default Backdrop;
