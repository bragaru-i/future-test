import React from 'react';
import Input from '../UI/Input/Input';

import Button from '../UI/Button/Button';
import styles from './SearchForm.module.scss';

const SearchForm = ({ searchHandler }) => {
  const [activeField, setActiveField] = React.useState({
    id: false,
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    value: '',
  });
  const activeClickHandler = (e, element) => {
    e.preventDefault();
    setActiveField({
      ...activeField,
      [element]: !activeField[element],
    });
  };
  const checkActive = (el) => (activeField[el] ? styles.Active : null);
  const inputOnChange = (e) => {
    setActiveField({ ...activeField, value: e.target.value });
  };
  return (
    <form className={styles.SearchForm}>
      <Input
        name="search"
        id="search"
        value={activeField.value}
        inputOnChange={inputOnChange}
        placeholder="Search for text in selected fields"
      />
      <div className={styles.Div}>
        <span className={checkActive('id')} onClick={(e) => activeClickHandler(e, 'id')}>
          ID{' '}
        </span>
        <span
          className={checkActive('firstName')}
          onClick={(e) => activeClickHandler(e, 'firstName')}
        >
          First Name{' '}
        </span>
        <span
          className={checkActive('lastName')}
          onClick={(e) => activeClickHandler(e, 'lastName')}
        >
          Last Name{' '}
        </span>
        <span
          className={checkActive('phone')}
          onClick={(e) => activeClickHandler(e, 'phone')}
        >
          Phone{' '}
        </span>
        <span
          className={checkActive('email')}
          onClick={(e) => activeClickHandler(e, 'email')}
        >
          Email{' '}
        </span>
        <p>Click on items below to activate the field</p>
      </div>

      <Button text="Search" clickHandler={(e) => searchHandler(e, activeField)} />
    </form>
  );
};

export default SearchForm;
