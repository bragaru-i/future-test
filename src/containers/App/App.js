import React, { useState } from 'react';

import styles from './App.module.scss';
import Title from '../../hoc/Title/Title';
import Button from '../../components/UI/Button/Button';
import Loading from '../../components/UI/Loading/Loading';
import AddNewEntry from '../../components/AddNewEntry/AddNewEntry';
import Select from '../../components/UI/Select/Select';
import List from '../../components/List/List';

function App() {
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [selectDB, setSelectDB] = useState('lessDB');

  const dbChanger = (e) => {
    setSelectDB(e.target.value);
  };
  const handleAddNewEntry = (e) => setShowAddEntry(!showAddEntry);
  const closeAddNewEntry = (e) => setShowAddEntry(false);
  let select = (
    <Select
      values={[
        { text: 'Less DB', value: 'lessDB' },
        {
          text: 'FullDB',
          value: 'fullDB',
        },
      ]}
      value={selectDB}
      dbChange={dbChanger}
    />
  );
  return (
    <div className="row">
      <div className={styles.App}>
        <Title>Future Company test exercise</Title>
        <div className={styles.Options}>
          {select}
          <Button clickHandler={handleAddNewEntry} text="+ Add New" />
        </div>
        {showAddEntry && <AddNewEntry onClose={closeAddNewEntry} />}
        <List />
      </div>
    </div>
  );
}

export default App;
