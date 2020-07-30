import React from 'react';
import _Aux from '../../hoc/_Aux';

const ActiveEntry = ({ entry }) => {
  let adress = null;
  if (entry.address) {
    adress = (
      <_Aux>
        <p>
          {' '}
          <span> Adress:</span> <b>{entry.address.streetAddress}</b>
        </p>
        <p>
          <span> City:</span> <b>{entry.address.city}</b>
        </p>
        <p>
          <span> State/province:</span> <b>{entry.address.state}</b>
        </p>
        <p>
          <span> Zip code:</span> : <b>{entry.address.zip}</b>
        </p>
      </_Aux>
    );
  }
  return (
    <div>
      <p>
        {' '}
        <span>Selected User </span>
        <b>
          {entry.firstName} {entry.lastName}
        </b>
      </p>
      <p>
        <span>Description</span>
        <textarea
          value={entry.description || 'No description registered'}
          onChange={() => {}}
        ></textarea>
      </p>
      {adress}
    </div>
  );
};

export default ActiveEntry;
