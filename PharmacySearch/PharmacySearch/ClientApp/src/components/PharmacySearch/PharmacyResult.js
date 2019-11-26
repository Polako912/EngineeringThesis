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
            window.location.href = 'https://localhost:44399/pharmacySearch'
        },
    });
};

export default class PharmacyResult extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pharmacy: []
        }
    };

    componentDidMount() {
        axios.get('https://localhost:44399/api/pharmacy/' + localStorage.getItem('pharmacy'),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                const pharmacy = response.data;
                this.setState({ pharmacy });
            })
            .catch((error) => {
                console.log(error);
                openNotification();
            });
    }

    render() {
        const { pharmacy } = this.state
        const pharmacyData = pharmacy.map(p => ({
            name: p.pharmacyDtoName,
            address: p.pharmacyDtoAddress,
            city: p.pharmacyDtoCity,
            openFrom: p.openFromDto,
            openTo: p.openToDto,
            addres: p.pharmacyDtoAddress
        }));
        return (
            <div>
                <Table
                    columns={columnsPharmacies}
                    dataSource={pharmacyData}
                />
            </div >
        )
    }
}