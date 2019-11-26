import { Descriptions, Table } from 'antd';
import axios from 'axios';
import React from 'react';
import 'antd/lib/table/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/descriptions/style/css';
import { notification } from 'antd';
import 'antd/lib/notification/style/css';

const columnsMedicine = [
    { title: 'Nazwa leku', dataIndex: 'name', key: 'name' },
    { title: 'Pełna nazwa', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Rodzaj', dataIndex: 'type', key: 'type' },
    { title: 'Pojemność opakowania', dataIndex: 'capacity', key: 'capacity' },
    { title: 'Data ważności', dataIndex: 'expireDate', key: 'expireDate' },
    { title: 'Czy na receptę', dataIndex: 'prescription', key: 'prescription' },
    { title: 'Kiedy stosować', dataIndex: 'whenToUse', key: 'whenToUse' },
    { title: 'Dawkowanie', dataIndex: 'usage', key: 'usage' },
    { title: 'Dodatkowe infroamcje', dataIndex: 'medicineDescription', key: 'medicineDescription' }
];

const openNotification = () => {
    notification.open({
        message: 'Nie znaleziono',
        description:
            'Nie znaleziono danych dla podanej frazy',
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
            prescription: m.prescriptionDto,
            expireDate: m.expireTimeDto,
            whenToUse: m.whenToUseDto,
            usage: m.usageDto,
            medicineDescription: m.medicineDtoDescription
        }));
        return (
            <div>
                <Table
                    columns={columnsMedicine}
                    dataSource={medicineData}
                />
            </div >
        )
    }
}