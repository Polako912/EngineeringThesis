import { Descriptions, Table } from 'antd';
import axios from 'axios';
import React from 'react';
import 'antd/lib/table/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/descriptions/style/css';
import { notification } from 'antd';
import 'antd/lib/notification/style/css';

const columnsMedicine = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Full Name', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
    { title: 'Prescription', dataIndex: 'prescription', key: 'prescription' },
];

const openNotification = () => {
    notification.open({
        message: 'Not Found',
        description:
            'No contnet found for given search value',
        onClose: () => {
            window.location.href = 'https://localhost:44399/medicineSearch'
        },
    });
};

export default class MedicineResult extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            medicine: []
        }
    };

    componentDidMount() {
        axios.get('https://localhost:44399/api/medicine/' + localStorage.getItem('medicine') + '/find',
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                const medicine = response.data;
                this.setState({ medicine });
            })
            .catch((error) => {
                console.log(error);
                openNotification();
            });
    }

    render() {
        const { medicine } = this.state
        const medicineData = medicine.map(m => ({
            name: m.medicineDtoName,
            fullName: m.medicineDtoFullName,
            type: m.medicineDtoType,
            capacity: m.medicineDtoCapacity,
            prescription: m.prescription
        }));
        return (
            <div>
                <Table
                    columns={columnsMedicine}
                    expandedRowRender={record => <p style={{ margin: 0 }}>{record.address}</p>}
                    dataSource={medicineData}
                />
            </div >
        )
    }
}