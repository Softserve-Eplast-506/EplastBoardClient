import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
} from "@ant-design/icons";
import './LeftSideBar.css';
import "antd/dist/antd.css";

const { Sider } = Layout;

const LeftSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Sider className="sidebar" collapsible collapsed={collapsed} onCollapse={onCollapse} >
        <div className="logo" />
        <Menu theme="dark" className="sidebar" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="3" icon={<FileOutlined />} />
        </Menu>
      </Sider>
    </>

  );
};
export default LeftSideBar;
