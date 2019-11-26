import { Descriptions, Table } from 'antd';
import axios from 'axios';
import React from 'react';
import 'antd/lib/table/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/descriptions/style/css';
import { notification } from 'antd';
import 'antd/lib/notification/style/css';

const columnsPharmacies = [
    { title: 'Nazwa Apteki', dataIndex: 'name', key: 'name' },
    { title: 'Miasto', dataIndex: 'city', key: 'city' },
    { title: 'Otwrta od', dataIndex: 'openFrom', key: 'openFrom' },
    { title: 'Otwarta do', dataIndex: 'openTo', key: 'openTo' },
    { title: 'Adres apteki', dataIndex: 'address', key: 'address' }
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
            openTo: p.openToDto,
            addres: p.pharmacyDtoAddress
        }));
        return (
            <div>
                <Descriptions bordered title="Informacje o leku" size='default'>
                    {medicine.map(row => (
                        <Descriptions.Item label="Nazwa">{row.medicineDtoName}</Descriptions.Item>
                    ))}
                    {medicine.map(row => (
                        <Descriptions.Item label="Pełna nazwa">{row.medicineDtoFullName}</Descriptions.Item>
                    ))}
                    {medicine.map(row => (
                        <Descriptions.Item label="Pojemność opakowania">{row.medicineDtoCapacity}</Descriptions.Item>
                    ))}
                    {medicine.map(row => (
                        <Descriptions.Item label="Rodzaj">{row.medicineDtoType}</Descriptions.Item>
                    ))}
                    {medicine.map(row => (
                        <Descriptions.Item label="Data ważności">{row.expireTimeDto}</Descriptions.Item>
                    ))}
                </Descriptions>
                <h5>Dostępny w aptekach:</h5>
                <Table
                    columns={columnsPharmacies}
                    dataSource={pharmacyData}
                />
            </div >
        )
    }
}