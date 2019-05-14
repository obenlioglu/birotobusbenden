import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import {WrappedModalUI} from './ModalUI';
import Home  from './pages/Home';

const {
  Header, Footer, Content,
} = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
      <Header>
        <div className="logo__title">#birotobusbenden</div>
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
          <WrappedModalUI />
          <Home />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        created by <a href="https://twitter.com/osmanbenlioglu">@osmanbenlioglu </a> <a href="https://twitter.com/dincercanpunar">@dincercanpunar </a>
      </Footer>
    </Layout>
    );
  }
}

export default App;
