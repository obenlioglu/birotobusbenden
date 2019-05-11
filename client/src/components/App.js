import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import ModalUI from './ModalUI';
import Home  from './pages/Home';

const {
  Header, Footer, Content,
} = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <ModalUI />
          <Home />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
    );
  }
}

export default App;
