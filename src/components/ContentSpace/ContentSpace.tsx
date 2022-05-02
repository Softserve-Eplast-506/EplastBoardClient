import { Layout } from "antd";
import "./ContentSpace.css";
import "antd/dist/antd.min.css";
import { useTable } from "../../store/store";
import { useEffect } from "react";
import BoardColumn from "../Column/ColumnAndCard";
import BoardTitle from "./BoardTitle";

const { Content } = Layout;

const ContentSpace = () => {
  const [state, actions] = useTable();

  useEffect(() => {
    actions.getColumnByBoard(state.currentBoard.id);
    actions.getCardsByBoard(state.currentBoard.id);
  }, [state.currentBoard.id]);

  return (
    <Content
      className={`content ${state.isSideBarHidden ? "content-full" : ""}`}
      style={{
        backgroundImage: `url("https://assets.hongkiat.com/uploads/holographic-gradient-background/5.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <BoardTitle />
      <BoardColumn />
    </Content>
  );
};
export default ContentSpace;
