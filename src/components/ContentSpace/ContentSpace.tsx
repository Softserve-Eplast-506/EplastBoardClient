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

const { Content } = Layout;

const ContentSpace = () => {
  const [state, actions] = useTable();

  useEffect(() => {
    actions.getColumnByBoard(state.currentBoard.id);
  }, [state.currentBoard.id]);

  useEffect(() => {
    actions.getAllCards();
  }, []);

  const renderAllCards = (): any => {
    return state.cards.map((x: CardM) => {
      return (
        <Card
          className="item"
          key={x.id}
          title={x.title}
          bordered={false}
          style={{ width: 300 }}
          onClick={actions.hideEditCardModal}
        >
          <p style={{ margin: 0 }}>Card content</p>
          <p style={{ margin: 0 }}>Card content</p>
          <p style={{ margin: 0 }}>Card content</p>
        </Card>
      );
    });
  };

  let columnName = state.currentColumn?.title;

  const handleOk = async (event: any) => {
    actions.setCurrentColumn(event.target.id);
    let newColumn: Column = state.currentColumn;
    newColumn.title = columnName;
    await columnsApi.editColumnName(newColumn);
  };

  const handleEdit = async (event: React.FormEvent<HTMLInputElement>) => {
    columnName = event.currentTarget.value;
  };

  function confirm() {
    message.success({
      content: "Column has been deleted",
      className: "message-box",
    });
  }

  const menu: any = (
    <Menu>
      <Menu.Item>
        <div>
          <div style={{ clear: "both", whiteSpace: "nowrap" }}>
            <Popconfirm
              placement="bottom"
              title={"Are you sure to delete this task?"}
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <label>Delete column</label>
            </Popconfirm>
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Content
      className={`content ${state.isSideBarHidden ? "content-full" : ""}`}
      style={{
        backgroundImage: `url("https://assets.hongkiat.com/uploads/holographic-gradient-background/5.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <div className="board">
        {state.columns.map((col) => (
          <div className="column">
            <div
              id={col.id.toString()}
              className="column-title"
              contentEditable="true"
              onChange={handleEdit}
              defaultValue={columnName}
              onBlur={handleOk}
            >
              <Row>
                <Col flex={4.9}>{col.title}</Col>
                <Col flex={0.1}>
                  <Dropdown.Button
                    overlay={menu}
                    placement="bottom"
                    trigger={["click"]}
                  ></Dropdown.Button>
                </Col>
              </Row>
            </div>
            {renderAllCards()}
            <CreateCardModal />
          </div>
        ))}
      </div>
    </Content>
  );
};
export default ContentSpace;
