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
  };

  const dragLeaveHandler = async (event: any) => {};

  const dragStartHandler = (e: any, column: Column) => {
    dragIndexStart = column.index;
    startColumn = column;
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
    cards = state.cards;
  }, [render]);


  let dragIndexStartCard = 0;
  let startCard = new CardM();
  let dragIndexEndCard = 0;
  let endCard = new CardM();
  let cards = state.cards;

  function dragOverCardHandler(event: React.DragEvent<HTMLDivElement>, card: CardM){
    event.preventDefault()
    dragIndexEndCard = card.index;
    endCard = card;
    //console.log("over")
  }
  function dragLeaveCardHandler (e: React.DragEvent<HTMLDivElement>, card: CardM) {
    //console.log("leave0", state.currentCard)
    //actions.changeColumnsWithCardByBoard(column, card)
    
    //actions.state.currentColumn.cards.splice(currentCardIndex, 1)
  }
  function dragStartCardHandler (e: React.DragEvent<HTMLDivElement>, card: CardM){        
    dragIndexStartCard = card.index;
    startCard = card;
    console.log(dragIndexStartCard + "cardStartIndex"); 
  }

  function dragEndCardHandler(e: any){   
    //console.log("end")
  }
  function dropCardHandle (e: React.DragEvent<HTMLDivElement>, card: CardM, col: Column) {
    e.preventDefault()
    console.log(cards);
    if (dragIndexStartCard < dragIndexEndCard) {
      for (let i = dragIndexStartCard + 1; i <= dragIndexEndCard; i++) {
        cards[i].index--;
      }
      cards.splice(dragIndexStartCard, 1);
      startCard.index = dragIndexEndCard;
      cards.splice(dragIndexEndCard, 0, startCard);
    } else {
      for (let i = dragIndexEndCard; i < dragIndexStartCard; i++) {
        cards[i].index++;
      }
      cards.splice(dragIndexStartCard, 1);
      startCard.index = dragIndexEndCard;
      cards.splice(dragIndexEndCard, 0, startCard);
    }
    actions.setCards(cards, col);
    SetRender(!render);
  }






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
          {col.cards.map((card: CardM) => (
            <Card
              draggable={true}
              onDragOver={(e: any) => dragOverCardHandler(e, card)}
              onDragLeave={(e: any) => dragLeaveCardHandler(e, card)}
              onDragStart={(e: any) => dragStartCardHandler(e, card)}
              onDragEnd={(e: any) => dragEndCardHandler(e)}
              onDrop={(e: any) => dropCardHandle(e, card, col)}
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
          ))}
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


