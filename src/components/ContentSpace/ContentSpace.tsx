import {
  Card,
  Col,
  Dropdown,
  Layout,
  Menu,
  message,
  Popconfirm,
  Row,
} from "antd";
import "./ContentSpace.css";
import "antd/dist/antd.min.css";
import { useTable } from "../../store/store";
import CardM from "../../models/Card";
import { useEffect } from "react";
import columnsApi from "../../api/columnsApi";
import Column from "../../models/Column";
import CreateCardModal from "./CreateCardModal";
import BoardColumn from "../Column/ColumnAndCard";

const { Content } = Layout;

const ContentSpace = () => {
  const [state, actions] = useTable();

  useEffect(() => {
    actions.getBoards();
    actions.getAllCards();
    //actions.getCardsByColumnId(1);
  }, []);

  useEffect(() => {
    actions.getColumnByBoard(state.currentBoard.id);
  }, [state.currentBoard.id]);

  useEffect(() => {
    actions.getAllCards();
  }, []);

  return (
    <Content
      className={`content ${state.isSideBarHidden ? "content-full" : ""}`}
      style={{
        backgroundImage: `url("https://assets.hongkiat.com/uploads/holographic-gradient-background/5.jpg")`,
        backgroundSize: "cover",
      }}
    >
       <BoardColumn/>
    </Content>
  );
};
export default ContentSpace;
