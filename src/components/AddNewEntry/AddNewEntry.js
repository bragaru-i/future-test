import React, { useState } from 'react';

import Modal from '../UI/Modal/Modal';
import Aux from '../../hoc/_Aux';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

const AddNewEntry = ({ onClose }) => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    id: '',
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setData((prevState) => ({ ...prevState, [name]: value }));
    console.log(data);
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
              inputOnChange={onChangeHandler}
            />
          </div>

          <div className="float-right">
            <Button text="+Add New"></Button>
          </div>
        </form>
      </Modal>
    </Aux>
  );
};

export default AddNewEntry;
