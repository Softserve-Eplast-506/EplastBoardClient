import { Layout } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import React from 'react'
import ReactDOM from 'react-dom'
import './App.css';
import LeftSideBar from './components/LeftSideBar/LeftSideBar';

function App() {
  return (
    <>


      <Layout style={{ minHeight: "100vh" }}>
      <LeftSideBar />

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>

            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              Bill is a cat.
            </div>
          </Content>

        </Layout>
      </Layout>


    </>
  );
}

export default App;
