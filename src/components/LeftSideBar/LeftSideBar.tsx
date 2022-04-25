import { useTable } from '../../store/store';
import { Layout, Menu, MenuProps } from "antd";
import './LeftSideBar.css';
import "antd/dist/antd.min.css";
import Board from '../../models/Board';
import { useEffect } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

const { Sider } = Layout;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const LeftSideBar = () => {
  const [state, actions] = useTable();

  var items: MenuItem[] = [];

  const getMenuItems = () => {
    
  }
  const onCollapse = async () => {
    actions.hideSideBar();
  };

  useEffect(() =>{
    getMenuItems();
  },[])

  return (
    <>
      <Sider className="sidebar" collapsedWidth={30}  breakpoint='lg' collapsible collapsed={state.isSideBarHidden} onCollapse={onCollapse} >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
    </>

  );
};
export default LeftSideBar;
