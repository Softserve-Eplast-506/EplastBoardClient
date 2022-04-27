import { Layout } from 'antd';
import { useEffect } from 'react';
import './App.css';
import ContentSpace from './components/ContentSpace/ContentSpace';
import CreateCardModal from './components/ContentSpace/CreateCardModal';
import EditCardModal from './components/ContentSpace/EditCardModal';
import HeaderBar from './components/HeaderBar/HeaderBar';
import LeftSideBar from './components/LeftSideBar/LeftSideBar';
import { useTable } from './store/store';

function App() {
  const [state, actions] = useTable();
  useEffect(() =>{
    actions.getBoards();
  },[actions])

  return (
      <Layout style={{ minHeight: "100vh" }}>
        <HeaderBar />
        <Layout className='layoutStyles'>
          <LeftSideBar />
          <CreateCardModal/>
          {state.isEditCardModalHidden ?  <EditCardModal/>:null}

          <ContentSpace />
        </Layout>
      </Layout>
  );
}


export default App;
