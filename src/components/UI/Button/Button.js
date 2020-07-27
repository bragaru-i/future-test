import React from 'react';

import styles from './Button.module.scss';

const Button = ({ clickHandler, status, text }) => {
  let style = [styles.Button];
  if (status === 'disabled') style.push(styles.Disabled);
  return (
    <button onClick={clickHandler} className={style.join(' ')}>
      <span>{text}</span>
    </button>
  );
};

export default Button;
