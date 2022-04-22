import { useTable } from '../../store/store';
import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
} from "@ant-design/icons";
import './LeftSideBar.css';
import "antd/dist/antd.min.css";
import Board from '../../models/Board';

const { Sider } = Layout;

const LeftSideBar = () => {
  const [state, actions] = useTable();

  const onCollapse = () => {
    actions.hideSideBar();
  };

  const test = () => {
    return (
      state.boards.map((x: Board) => {
        <Menu.Item key={x.id} icon={<PieChartOutlined />}>
          {x.title}
        </Menu.Item>
      })
    )
  }
  return (
    <>
      <Sider className="sidebar" collapsible collapsed={state.isSideBarHidden} onCollapse={onCollapse} >
        <div className="logo" />
        <Menu theme="dark" className="sidebar" defaultSelectedKeys={["1"]} mode="inline">
          {test()}
        </Menu>
      </Sider>
    </>

  );
};
export default LeftSideBar;
