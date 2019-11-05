import { Input, Button } from 'antd';
import axios from 'axios';
import React from 'react';

const { Search } = Input;

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            result: []
        }

        this.handleChangeSearchValue = this.handleChangeSearchValue.bind(this);
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

        this.handleSearch(value);
    }

    handleSearch = searchValue => {
        const requestOptions =
            axios.get('https://localhost:44399/api/medicine/' + searchValue,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                .then((response) => {
                    console.log("response", response);
                    const result = response.data;
                    this.setState({ result });
                })
                .catch((error) => {
                    console.log(error);
                });

    }

    render() {
        const { result } = this.state;
        return (
            <div>
                <input
                    type="text"
                    name="text"
                    placeholder="Search.."
                    ref={node => this.searchValue = node}
                    //onChange={this.onChange}
                    style={{ width: "300px" }}
                />
                <Button type="primary" shape="circle" icon="search" onClick={this.onChange} />
            </div>
        )
    }

}