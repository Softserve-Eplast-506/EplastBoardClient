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
import React, { useEffect, useState } from "react";
import columnsApi from "../../api/columnsApi";
import Board from "../../models/Board";
import CardM from "../../models/Card";
import Column from "../../models/Column";
import { useTable } from "../../store/store";
import CreateCardModal from "../ContentSpace/CreateCardModal";
import "./AddColumnModal.css";

const BoardColumn = () => {
  const [state, actions] = useTable();

  const [render, SetRender] = useState(false);

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
      draggable={true}
      className="item"
      key={card.id}
      title={card.title}
      bordered={false}
      style={{ width: 300 }}
      onClick={() => {
        actions.setCurrentCard(card.id);
        actions.hideEditCardModal();
      }}
    >
      <p>{card.description}</p>
    </Card>
  );

  const handleAddNewColumn = () => {
    actions.hideAddColumnModal();
  };

  let dragIndexStart = 0;
  let startColumn = new Column();
  let dragIndexEnd = 0;
  let endColumn = new Column();
  let colums = state.columns;

  const dragOverHandler = (event: any, column: Column) => {
    event.preventDefault();
    dragIndexEnd = column.index;
    endColumn = column;
    console.log(dragIndexEnd + " - dragIndexEnd"); //Коли наводити на якусь колонку вертається та колонка
  };
  const dragLeaveHandler = async (event: any) => {};

  const dragStartHandler = (e: any, column: Column) => {
    dragIndexStart = column.index;
    startColumn = column;
    console.log(dragIndexStart + " - dragIndexStart"); //Вертає ту колонку яку тягнути
    console.log(colums);
  };

  const dragEndHandler = (e: any, column: Column) => {
    e.preventDefault();
    //console.log(column); //Вертає ту колонку яку тягнути
  };
  const dropHandle = (e: any, column: Column) => {
    e.preventDefault();
    if (dragIndexStart < dragIndexEnd) {
      for (let i = dragIndexStart + 1; i <= dragIndexEnd; i++) {
        colums[i].index--;
      }
      colums.splice(dragIndexStart, 1);
      startColumn.index = dragIndexEnd;
      colums.splice(dragIndexEnd, 0, startColumn);
    } else {
      for (let i = dragIndexEnd; i < dragIndexStart; i++) {
        colums[i].index++;
      }
      colums.splice(dragIndexStart, 1);
      startColumn.index = dragIndexEnd;
      colums.splice(dragIndexEnd, 0, startColumn);
    }
    actions.setColumns(colums);
    SetRender(!render);
  };
  useEffect(() => {
    console.log("render");
    colums = state.columns;
  }, [render]);

  const renderColumns = (): JSX.Element => (
    <>
      {state.columns.map((col: Column) => (
        <div
          className="column"
          draggable={true}
          onDragOver={(e: any) => dragOverHandler(e, col)}
          onDragLeave={(e: any) => dragLeaveHandler(e)}
          onDragStart={(e: any) => dragStartHandler(e, col)}
          onDragEnd={(e: any) => dragEndHandler(e, col)}
          onDrop={(e: any) => dropHandle(e, col)}
        >
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
      <Button className="addColumn" onClick={handleAddNewColumn}>
        <PlusOutlined className="addColumnPlus" />
        Add new column
      </Button>
    </>
  );

  return <div className="board">{renderColumns()}</div>;
};
export default BoardColumn;
