import { useTable } from '../../store/store';
import { Layout, Menu } from "antd";
import './LeftSideBar.css';
import "antd/dist/antd.min.css";
import { DoubleRightOutlined, LeftOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const LeftSideBar = () => {
  const [state, actions] = useTable();

  const collapseSideBar = async () => {
    actions.hideSideBar();
  };

  const collapseSideBarOnBreakpoint = async () => {
    if (!state.isSideBarHidden){
      collapseSideBar();
    }
  };
  return (
    <>
      <div className="sidebar">
        <div className="collapsedButton trigger" onClick={collapseSideBar}>
          {state.isSideBarHidden ? (
            <div><DoubleRightOutlined/></div>
          ) : (
            <div className="collapsedButtonHide white-text">List of Boards<LeftOutlined/></div>
          )}
        </div>

        <Sider className="sidebar" collapsedWidth={50} breakpoint='sm' onBreakpoint={collapseSideBarOnBreakpoint} trigger={null} collapsible collapsed={state.isSideBarHidden} >
          <div className="logo" />
          <Menu theme="dark" className='menu' defaultSelectedKeys={['1']} mode="inline" items={state.menuItems} />
        </Sider>
      </div>
    </>
  );
};
export default LeftSideBar;
