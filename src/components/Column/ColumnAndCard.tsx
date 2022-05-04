import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
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
import Board from "../../models/Board";
import CardM from "../../models/Card";
import Column from "../../models/Column";
import { useTable } from "../../store/store";
import CreateCardModal from "../ContentSpace/CreateCardModal";
import './AddColumnModal.css';

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

  const dragOverHandler = (event: any, item: Column) => {
    event.preventDefault();
  };
  const dragLeaveHandler = async (event: any) => {};
  const dragStartHandler = (e: any, column: Column) => {
    actions.setCurrentColumn(column.id);
  };
  const dragEndHandler = (e: any, column: Column) => {
    e.preventDefault();
    const currentIndex = state.columns.indexOf(state.currentColumn);
    state.columns.splice(currentIndex, 1);
    const dropIndex = state.columns.indexOf(column);
    state.columns.slice(dropIndex + 1, state.currentColumn.id);
  };
  const dropHandle = (e: any, board: Board, item: Column) => {
    e.preventDefault();
  };

  const deleteMenu: any = (
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
      draggable={true}
      className="item"
      key={card.id}
      title={card.title}
      bordered={false}
      style={{ width: 320 }}
      onClick={() =>{actions.setCurrentCard(card.id); actions.hideEditCardModal() }}
    >
      <p>{card.description}</p>
    </Card>
  );

  const handleAddNewColumn = () => {
    actions.hideAddColumnModal();
  };

  const maxLength = 50;
  const onKeyDwn = (e: any) => {
        const currentTextLength = e.target.outerText.length;
        if (currentTextLength === maxLength && e.keyCode != 8) {
            e.preventDefault();
        }
  }

  const renderColumns = (): JSX.Element => (
    <>
      {state.columns.map((col: Column) => (
        <div
          className="column"
          onDragOver={(e: any) => dragOverHandler(e, state.currentColumn)}
          onDragLeave={(e: any) => dragLeaveHandler(e)}
          onDragStart={(e: any) => dragStartHandler(e, state.currentColumn)}
          //onDragEnd={(e: any) => dragEndHandler(e)}
          onDrop={(e: any) =>
            dropHandle(e, state.currentBoard, state.currentColumn)
          }
        >
          <Row style={{flexWrap: "nowrap"}}>
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
                onKeyDown={onKeyDwn}
              >
                {col.title}
              </div>
            </Col>
            <Col flex={0.1}>
              <Dropdown
                className="deleteColumnButton"
                overlay={deleteMenu}
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
      <Button className="addColumn" onClick={handleAddNewColumn}><PlusOutlined className="addColumnPlus"/>Add new column</Button>
    </>
  );

  return <div className="board">{renderColumns()}</div>;
};
export default BoardColumn;
