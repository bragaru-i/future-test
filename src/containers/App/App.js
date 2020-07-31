import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './App.module.scss';
import Title from '../../hoc/Title/Title';
import Button from '../../components/UI/Button/Button';
import Loading from '../../components/UI/Loading/Loading';
import AddNewEntry from '../../components/AddNewEntry/AddNewEntry';
import Select from '../../components/UI/Select/Select';
import List from '../../components/List/List';
import SearchForm from '../../components/SearchForm/SearchForm';
import Pagination from '../../components/Pagination/Pagination';
import ActiveEntry from '../../components/ActiveEntry/ActiveEntry';

function App() {
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [selectDB, setSelectDB] = useState('lessDB');
  const [activeEntry, setActiveEntry] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    postPerPage: 24,
    totalPages: 1,
    pageData: [],
    changed: false,
  });
  const [data, setData] = useState({
    isLoading: false,
    data: [],
    error: '',
    results: 0,
  });

  useEffect(() => {
    setActiveEntry(null);
    setPagination((prevState) => ({ ...prevState, currentPage: 1 }));
    let dbUrl =
      selectDB === 'lessDB'
        ? 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
        : 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
    setData((prevState) => ({ ...prevState.data, isLoading: true }));
    axios({
      method: 'get',
      url: `https://cors-anywhere.herokuapp.com/${dbUrl}`,
      headers: { Origin: 'https://example.com' },
    })
      .then((res) => {
        setData((prevState) => ({
          ...prevState,
          isLoading: false,
          data: res.data,
          results: res.data.length,
        }));

        setPagination((prevState) => {
          const data = res.data.slice(0, prevState.postPerPage);
          let totalPages = Math.ceil(res.data.length / prevState.postPerPage);
          return { ...prevState, pageData: data, totalPages };
        });
      })
      .catch((e) => setData((prevState) => ({ ...prevState, error: e, results: 0 })));
  }, [selectDB]);

  const dbChanger = (e) => setSelectDB(e.target.value);
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

  let list = null;
  if (data.isLoading) list = <Loading />;
  if (!data.isLoading && !data.error && data.data)
    list = <List list={pagination.pageData} setActiveEntry={setActiveEntry} />;
  const searchHandler = (e, filterData) => {
    e.preventDefault();

    // 1. If no filter text - returning from handler,

    // a) and form ws never changed
    if ((!filterData.value || filterData.value === '') && !pagination.changed) return;

    // b)we had changes before, but now no value in input text
    if ((!filterData.value || filterData.value === '') && pagination.changed) {
      return setPagination((prevState) => ({
        ...prevState,
        changed: false,
        pageData: data.data.slice(
          (pagination.currentPage - 1) * pagination.postPerPage,
          pagination.currentPage * pagination.postPerPage
        ),
      }));
    }
    let filterQuery = Object.keys(filterData).filter(
      (el) => filterData[el] !== false && el !== 'value'
    );

    let filterArr = [...pagination.pageData];
    const queryText = filterData.value.toString().toLowerCase().trim();

    // 2. If we have selected fields
    if (filterQuery.length > 0) {
      for (let queryParams of filterQuery) {
        filterArr = filterArr.filter((el) => {
          if (el[queryParams].toString().toLowerCase().includes(queryText)) return el;
        });
      }
      return setPagination((prevState) => ({
        ...prevState,
        pageData: filterArr,
        changed: true,
      }));
    }

    // 3. Value persists, but no selected fields.. so we loop through all list
    filterQuery = Object.keys(filterData).filter((el) => el !== 'value');

    filterArr = filterArr.filter((el) => {
      let res = false;
      for (let value of filterQuery) {
        let valueString = el[value].toString().toLowerCase().trim();

        if (valueString.includes(queryText)) res = true;
      }
      return res;
    });
    return setPagination((prevState) => ({
      ...prevState,
      changed: true,
      pageData: filterArr,
    }));
  };
  const postPerPageHandler = (e) => {
    e.preventDefault();
    let value = e.target.value;
    if (e.target.value > 50 || !e.target.value) value = 50;

    const newData = data.data.slice(
      (pagination.currentPage - 1) * value,
      pagination.currentPage * value
    );
    return setPagination((prevState) => ({
      ...prevState,
      postPerPage: value,
      pageData: newData,
      totalPages: Math.ceil(data.results / value),
    }));
  };

  const pageSwitcher = (page) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: page,
      pageData: data.data.slice(
        (page - 1) * pagination.postPerPage,
        page * pagination.postPerPage
      ),
    }));
  };

  const AddEntryToData = (entry) => {
    setPagination((prevState) => ({
      ...prevState,
      pageData: [entry, ...prevState.pageData],
    }));
  };
  return (
    <div className="row">
      <div className={styles.App}>
        <Title>Future Company test exercise</Title>
        <div className={styles.Options}>
          {select}
          <Button clickHandler={handleAddNewEntry} text="+ Add New" />
        </div>
        {showAddEntry && (
          <AddNewEntry onClose={closeAddNewEntry} AddEntryToData={AddEntryToData} />
        )}
        {list}
        <SearchForm searchHandler={searchHandler} />
        <Pagination
          postsPerPage={pagination.postPerPage}
          postPerPageHandler={postPerPageHandler}
          currentPage={pagination.currentPage}
          pageSwitcher={pageSwitcher}
          totalPages={pagination.totalPages}
        />
        <div className={styles.ActiveClicked}>
          {activeEntry && <ActiveEntry entry={activeEntry} />}
        </div>
      </div>
    </div>
  );
}

export default App;
