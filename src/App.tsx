import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useEffect } from 'react';
import './App.css';
import HeaderBar from './components/HeaderBar/HeaderBar';
import LeftSideBar from './components/LeftSideBar/LeftSideBar';
import { useTable } from './store/store';

function App() {
  const [state, actions] = useTable();
  useEffect(() =>{
    actions.getBoards();
  },[])

  return (
      <Layout style={{ minHeight: "100vh" }}>
        <HeaderBar />
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
