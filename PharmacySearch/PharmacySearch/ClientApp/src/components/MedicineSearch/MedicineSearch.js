import React from 'react';
import 'antd/lib/input/style/css';
import 'antd/lib/message/style/css';
import { Input } from 'antd';
import { message } from 'antd';
import { Descriptions } from 'antd';
import 'antd/lib/descriptions/style/css';
import { Layout } from 'antd';

const { Search } = Input;
const { Header, Footer, Sider, Content } = Layout;

export default class MedicineSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            medicine: '',
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
            medicine: value
        });
    }

    handleSearch = () => {
        localStorage.removeItem('medicine')
        if (this.state.medicine != '') {
            localStorage.setItem('medicine', this.state.medicine)
            window.location.href = 'https://localhost:44399/medicineResult'
        }
        else {
            message.info("Wyszukiwana fraza nie może być pusta")
        }
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Layout>
                    <content>
                        <Search
                            placeholder="wpisz nazwę leku..."
                            enterButton="Szukaj"
                            size="large"
                            style={{ width: 700 }}
                            onChange={(e) => {
                                this.onChange(e)
                            }}
                            onSearch={this.handleSearch}
                        />
                    </content>
                    <Footer style={{ marginTop: '20px' }}>
                        <Descriptions >
                            <Descriptions.Item>Wpisz nazwę leku, na temat którego chcesz znaleźć informacje</Descriptions.Item>
                        </Descriptions>
                    </Footer>
                </Layout>

            </div>
        );
    }
}