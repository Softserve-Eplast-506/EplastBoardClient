import { EllipsisOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Menu,
  message,
  Popconfirm,
  Row,
} from "antd";
import React from "react";
import columnsApi from "../../api/columnsApi";
import CardM from "../../models/Card";
import Column from "../../models/Column";
import { useTable } from "../../store/store";
import CreateCardModal from "../ContentSpace/CreateCardModal";

const BoardColumn = () => {
  const [state, actions] = useTable();

  let columnName = state.currentColumn?.title;

  const handleOk = async (event: any) => {
    let newColumn: Column = state.currentColumn;
    newColumn.title = columnName;
    await columnsApi.editColumnName(newColumn);
  };

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    actions.setCurrentColumn(Number(event.currentTarget.id));
  };

  const handleEdit = async (event: React.FormEvent<HTMLInputElement>) => {
    columnName = event.currentTarget.textContent
      ? event.currentTarget.textContent
      : "";
  };

  async function confirm() {
    await columnsApi.deleteColumnById(state.currentColumn.id);
    message.success({
      content: "Column has been deleted",
      className: "message-box",
    });
    await actions.getColumnByBoard(state.currentBoard.id);
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

  const renderCard = (card: CardM): JSX.Element => (
    <Card
      className="item"
      key={card.id}
      title={card.title}
      bordered={false}
      style={{ width: 300 }}
      onClick={() =>{actions.setCurrentCard(card.id); actions.hideEditCardModal() }}
    >
      <p>{card.description}</p>
    </Card>
  );

  const renderColumns = (): JSX.Element => (
    <>
      {state.columns.map((col: Column) => (
        <div className="column">
          <Row>
            <Col flex={4.9}>
              <div
                id={col.id.toString()}
                contentEditable="true"
                suppressContentEditableWarning
                className="column-title"
                onInput={handleEdit}
                onClick={handleClick}
                defaultValue={columnName}
                onBlur={handleOk}
              >
                {col.title}
              </div>
            </Col>
            <Col flex={0.1}>
              <Dropdown
                className="deleteColumnButton"
                overlay={menu}
                placement="bottom"
                trigger={["click"]}
              >
                <Button onClick={() => actions.setCurrentColumn(col.id)}>
                  <EllipsisOutlined />
                </Button>
              </Dropdown>
            </Col>
          </Row>
          {state.cards.map(
            (card: CardM) => card.columnId === col.id && renderCard(card)
          )}
          <CreateCardModal colId={col.id} />
        </div>
      ))}
    </>
  );

  return <div className="board">{renderColumns()}</div>;
};
export default BoardColumn;
