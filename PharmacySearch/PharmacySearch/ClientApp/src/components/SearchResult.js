import { Input, Button } from 'antd';
import axios from 'axios';
import React from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Table,
    Col,
} from 'reactstrap';
import 'antd/lib/table/style/css';

const { Search } = Input;

const columns = [
    { title: 'Id', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'FullName', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
    { title: 'Prescription', dataIndex: 'prescription', key: 'prescription' },
    {
        dataIndex: '',
        key: 'FullName',
    },
];

// const Row = ({ name, fullName, type, capacity, prescription, id }) =>
//     [
//         { title: 'Id', dataIndex: 'id', key: 'id' },
//         { title: 'Name', dataIndex: 'name', key: 'name' },
//         { title: 'FullName', dataIndex: 'fullName', key: 'fullName' },
//         { title: 'Type', dataIndex: 'type', key: 'type' },
//         { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
//         { title: 'Prescription', dataIndex: 'prescription', key: 'prescription' },
//         {
//             dataIndex: '',
//             key: 'id'
//         },
//     ];

const Row = ({ medicineDtoName, medicineDtoFullName, medicineDtoType, medicineDtoCapacity, prescription, id }) =>
    <tr>
        <td>{medicineDtoName}</td>
        <td>{medicineDtoFullName}</td>
        <td>{medicineDtoType}</td><br />
        <td>{medicineDtoCapacity}</td>
        <td>{prescription}</td>
    </tr>

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
                    onChange={this.onChange}
                    style={{ width: "300px" }}
                />
                <Button type="primary" shape="circle" icon="search" onClick={this.onChange} />

                {/* <Table
                    columns={columns}
                    expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    dataSource={result.map(Row)}
                    rowKey={record => record.key}
                /> */}
                <Table striped>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>FullName</th>
                            <th>Type</th><br />
                            <th>Capacity</th>
                            <th>Prescription</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.map(Row)}
                    </tbody>
                </Table>
            </div>
        )
    }

}