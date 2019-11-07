import { Input, Descriptions, Table } from 'antd';
import axios from 'axios';
import React from 'react';
import 'antd/lib/table/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/descriptions/style/css';

const { Search } = Input;

const columnsPharmacies = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'City', dataIndex: 'city', key: 'city' },
    { title: 'OpenFrom', dataIndex: 'openFrom', key: 'openFrom' },
    { title: 'OpenTo', dataIndex: 'openTo', key: 'openTo' },
];

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            medicine: [],
            pharmacies: []
        }
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

    handleSearch = searchValue => {
        const requestOptions =
            axios.get('https://localhost:44399/api/medicine/' + this.state.searchValue,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    console.log("response", response.data[0].pharmaciesDto);
                    const medicine = response.data;
                    const pharmacies = response.data[0].pharmaciesDto;
                    this.setState({ medicine, pharmacies });
                })
                .catch((error) => {
                    console.log(error);
                });
    }

    render() {
        const { medicine, pharmacies } = this.state;
        const pharmacyData = pharmacies.map(p => ({
            name: p.pharmacyDtoName,
            address: p.pharmacyDtoAddress,
            city: p.pharmacyDtoCity,
            openFrom: p.openFromDto,
            openTo: p.openToDto
        }));
        return (
            <div>
                <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    onChange={(e) => {
                        this.onChange(e)
                    }}
                    onSearch={this.handleSearch}
                />
                <Descriptions>
                    {medicine.map(row => (
                        <Descriptions.Item label="Name">{row.medicineDtoName}</Descriptions.Item>

                    ))}
                    {medicine.map(row => (
                        <Descriptions.Item label="Full Name">{row.medicineDtoFullName}</Descriptions.Item>
                    ))}
                    {medicine.map(row => (
                        <Descriptions.Item label="Capacity">{row.medicineDtoCapacity}</Descriptions.Item>
                    ))}
                    {medicine.map(row => (
                        <Descriptions.Item label="Type">{row.medicineDtoType}</Descriptions.Item>
                    ))}
                    {medicine.map(row => (
                        <Descriptions.Item label="Prescription">{row.prescription}</Descriptions.Item>
                    ))}
                </Descriptions>
                <Table
                    columns={columnsPharmacies}
                    expandedRowRender={record => <p style={{ margin: 0 }}>{record.address}</p>}
                    dataSource={pharmacyData}
                />
            </div>
        )
    }
}