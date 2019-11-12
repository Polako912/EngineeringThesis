import React from 'react';
import axios from 'axios';
import { Input } from 'antd';

const { Search } = Input;

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
    };

    this.handleChangeSearchValue = this.handleChangeSearchValue.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  };

  handleChangeSearchValue = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value,
    });
  };

  onChange = e => {
    const { value } = e.target;
    this.setState({
      searchValue: value
    });
  }

  handleSearch = () => {
    localStorage.removeItem('searchValue')
    if (this.state.searchValue != '') {
      localStorage.setItem('searchValue', this.state.searchValue)
      window.location.href = 'https://localhost:44399/searchPage'
    }
    else {
      alert("Input is empty")
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onChange={(e) => {
            this.onChange(e)
          }}
          onSearch={this.handleSearch}
        />
      </div>
    );
  }
}