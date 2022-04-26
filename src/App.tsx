import { Layout } from 'antd';
import { useEffect } from 'react';
import './App.css';
import ContentSpace from './components/ContentSpace/ContentSpace';
import HeaderBar from './components/HeaderBar/HeaderBar';
import LeftSideBar from './components/LeftSideBar/LeftSideBar';
import { useTable } from './store/store';

function App() {
  const [, actions] = useTable();
  useEffect(() =>{
    actions.getBoards();
  },[])

  return (
      <Layout style={{ minHeight: "100vh" }}>
        <HeaderBar />
        <Layout className='layoutStyles'>
          <LeftSideBar />
          <ContentSpace />
        </Layout>
      </Layout>
  );
}


export default App;
