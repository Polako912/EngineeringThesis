import { Descriptions, Table } from 'antd';
import axios from 'axios';
import React from 'react';
import 'antd/lib/table/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/descriptions/style/css';
import { notification } from 'antd';
import 'antd/lib/notification/style/css';

const columnsPharmacies = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'City', dataIndex: 'city', key: 'city' },
    { title: 'OpenFrom', dataIndex: 'openFrom', key: 'openFrom' },
    { title: 'OpenTo', dataIndex: 'openTo', key: 'openTo' },
];

const openNotification = () => {
    notification.open({
        message: 'Not Found',
        description:
            'No contnet found for given search value',
        onClose: () => {
            window.location.href = 'https://localhost:44399/'
        },
    });
};

export default class SearchResult extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            medicine: [],
            pharmacies: []
        }
    };

    componentDidMount() {
        axios.get('https://localhost:44399/api/medicine/' + localStorage.getItem('searchValue'),
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
                openNotification();
            });
    }

    render() {
        const { medicine, pharmacies } = this.state
        const pharmacyData = pharmacies.map(p => ({
            name: p.pharmacyDtoName,
            address: p.pharmacyDtoAddress,
            city: p.pharmacyDtoCity,
            openFrom: p.openFromDto,
            openTo: p.openToDto
        }));
        return (
            <div>
                <Descriptions title="Medicine Info">
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
            </div >
        )
    }
}