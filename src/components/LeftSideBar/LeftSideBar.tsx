import { useTable } from '../../store/store';
import { Layout, Menu, MenuProps } from "antd";
import './LeftSideBar.css';
import "antd/dist/antd.min.css";
import AddPanel from './AddPanel/AddPanel';

const { Sider } = Layout;


const LeftSideBar = () => {
  const [state, actions] = useTable();

  const onCollapse = async () => {
    actions.hideSideBar();
  };

  return (
    <>
      <Sider className="sidebar" collapsedWidth={30} breakpoint='lg' collapsible collapsed={state.isSideBarHidden} onCollapse={onCollapse} >
        <div className="logo" />
        <AddPanel/>
        <Menu theme="dark" className='menu' defaultSelectedKeys={['1']} mode="inline" items={state.menuItems} />
      </Sider>
    </>

  );
};
export default LeftSideBar;
