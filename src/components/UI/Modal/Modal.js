import React from 'react';
import Backdrop from '../Backdrop/Backdrop';

import style from './Modal.module.scss';
import closeModalIcon from '../../../assets/images/icons/close_small.png';
import useClickOutside from '../../../hooks/useClickOutside';

const Modal = ({ title, children, closeModal }) => {
  const node = React.useRef();

  // First callback - on inside click
  // Second callback on outide click
  useClickOutside(node, closeModal);
  return (
    <Backdrop>
      <div ref={node} className={style.Modal}>
        <img
          onClick={closeModal}
          className={style.ModalImg}
          src={closeModalIcon}
          alt=" Close Modal"
        />

        <span>{title}</span>
        {children}
      </div>
    </Backdrop>
  );
};

export default Modal;
