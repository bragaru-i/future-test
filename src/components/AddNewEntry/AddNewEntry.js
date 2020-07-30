import React, { useState } from 'react';

import Modal from '../UI/Modal/Modal';
import Aux from '../../hoc/_Aux';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import formValidate from '../../utils/formValidate';

const AddNewEntry = ({ onClose, AddEntryToData }) => {
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    id: Math.floor(Math.random() * 100000),
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setData((prevState) => ({ ...prevState, [name]: value }));
    if (formValidate(data)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (isValid) {
      AddEntryToData(data);

      onClose(e);
    }
  };
  return (
    <Aux>
      <Modal title="Add A New Entry" closeModal={onClose}>
        <form>
          <div className="padding-y">
            <Input
              name="firstName"
              id="firstName"
              placeholder="First Name"
              value={data.firstName}
              inputOnChange={onChangeHandler}
            />
          </div>
          <div className="padding-y">
            <Input
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              value={data.lastName}
              inputOnChange={onChangeHandler}
            />
          </div>
          <div className="padding-y">
            <Input
              name="phone"
              id="phone"
              placeholder="Phone"
              value={data.phone}
              inputOnChange={onChangeHandler}
            />
          </div>
          <div className="padding-y">
            <Input
              name="email"
              id="email"
              placeholder="Email"
              value={data.email}
              inputOnChange={onChangeHandler}
            />
          </div>
          <div className="padding-y">
            <Input
              name="id"
              id="id"
              placeholder="ID"
              value={data.id}
              disabled={true}
              inputOnChange={() => {}}
            />
          </div>

          <div className="float-right">
            <Button
              status={!isValid && 'disabled'}
              clickHandler={submit}
              text="+Add New"
            ></Button>
          </div>
        </form>
      </Modal>
    </Aux>
  );
};

export default AddNewEntry;
