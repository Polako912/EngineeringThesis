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
            openTo: p.openToDto
        }));
        return (
            <div>
                <Table
                    columns={columnsPharmacies}
                    expandedRowRender={record => <p style={{ margin: 0 }}>{record.address}</p>}
                    dataSource={pharmacyData}
                />
            </div >
        )
    }
}