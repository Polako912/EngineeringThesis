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

export default class PharmacySearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pharmacy: '',
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
            pharmacy: value
        });
    }

    handleSearch = () => {
        localStorage.removeItem('pharmacy')
        if (this.state.pharmacy != '') {
            localStorage.setItem('pharmacy', this.state.pharmacy)
            window.location.href = 'https://localhost:44399/pharmacyResult'
        }
        else {
            message.info("Input is empty")
        }
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Layout>
                    <content>
                        <Search
                            placeholder="input search text"
                            enterButton="Search"
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
                            <Descriptions.Item> Input name of pharmacy you want to search for and get details about it </Descriptions.Item>
                        </Descriptions>
                    </Footer>
                </Layout>

            </div>
        );
    }
}