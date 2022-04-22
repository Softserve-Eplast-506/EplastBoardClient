import { Layout } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import './App.css';
import LeftSideBar from './components/LeftSideBar/LeftSideBar';

function App() {
  return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="header" style={{ padding: 0 }} />
        <Layout>
          <LeftSideBar />
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
  );
}

export default App;
