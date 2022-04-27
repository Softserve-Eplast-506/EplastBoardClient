import { useTable } from "../../store/store";
import { Button, Layout, Menu } from "antd";
import "./LeftSideBar.css";
import "antd/dist/antd.min.css";
import AddPanel from './AddPanel/AddPanel';
import { ItemType } from 'rc-menu/lib/interface';
import {
  DeleteOutlined,
  DoubleRightOutlined,
  EditOutlined,
  LeftOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const LeftSideBar = () => {
  const [state, actions] = useTable();

  const collapseSideBar = async () => {
    actions.hideSideBar();
  };

  const collapseSideBarOnBreakpoint = async () => {
    if (!state.isSideBarHidden) {
      collapseSideBar();
    }};
    
  return (
    <>
      <div className="sidebar">
        <div className="collapsedButton trigger" >
          {state.isSideBarHidden ? (
            <><div onClick={collapseSideBar}>
            <DoubleRightOutlined />
          </div></>
          ) : (
            <>
            <div className="collapsedButtonHide white-text" onClick={collapseSideBar}>List of Boards<LeftOutlined/></div>
            <div><AddPanel/></div>
            </>
          )}
        </div>

        <Sider
          className="sidebar"
          collapsedWidth={50}
          breakpoint="sm"
          onBreakpoint={collapseSideBarOnBreakpoint}
          trigger={null}
          collapsible
          collapsed={state.isSideBarHidden}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            className="menu"
            mode="inline"
            items={state.menuItems}
            onSelect={(event) => actions.setCurrentBoard(Number(event.key))}
          />
          {!state.isSideBarHidden ? (
            <div className="buttonsBlock">
              <Button className="itemButton">
                <EditOutlined />
              </Button>
              <Button className="itemButton">
                <DeleteOutlined />
              </Button>
            </div>
          ) : null}
        </Sider>
      </div>
    </>
  );
};
export default LeftSideBar;