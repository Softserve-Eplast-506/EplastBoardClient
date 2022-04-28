import { Breadcrumb, Card, Form, Input, Layout, Row } from "antd";
import './ContentSpace.css';
import "antd/dist/antd.min.css";
import { useTable } from "../../store/store";
import CardM from "../../models/Card";
import { SetStateAction, useEffect, useRef, useState } from "react";
import columnsApi from "../../api/columnsApi"

import Item from "antd/lib/list/Item";
import { CloseOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import Board from "../../models/Board";
import CreateCardModal from "./CreateCardModal";

const { Content } = Layout;

class Column {
  id: number;
  title: string;
  boardId: number;

  constructor() {
    this.id = 5;
    this.title = "col5";
    this.boardId = 1;
  }

};

const ContentSpace = () => {
  const [state, actions] = useTable();
  
  useEffect(() => {
    actions.getBoards();
  }, []);

  useEffect(() => {
    actions.getColumnByBoard(state.currentBoard.id);
  }, [state.currentBoard.id]);

  useEffect(() => {
    actions.getAllCards();
    
    console.log(state.currentBoard);
    console.log(state.columns);
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
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
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
  }

  return (
    <Content className={`content ${state.isSideBarHidden ? "content-full" : ""}`} style={{backgroundImage: `url("https://assets.hongkiat.com/uploads/holographic-gradient-background/5.jpg")`, backgroundSize: 'cover'}}>
      <div className="board">
      {
        state.columns.map(col =>
          <div className="column">
            <div id={col.id.toString()} className="column-title" contentEditable="true" onChange={handleEdit} defaultValue={columnName} onBlur={handleOk}>{col.title}</div>
            {

              renderAllCards()

            }
             <CreateCardModal />
          </div>
          
      )}
      
    </div>
    </Content>
    
  )

  // const numbers = [1, 2, 3, 4];
  // return (
  //   <Form
  //   name="basic"
  //   labelCol={{ span: 8 }}
  //   wrapperCol={{ span: 16 }}
  //   initialValues={{ remember: true }}
  //   autoComplete="off"
  //   >
  //     <Row>
  //     numbers.map((x) => {
       
  //       return (

  //       )

  //     })
  //   )
  //     </Row>
  //   </Form>

  // );
  //   <>
  //     <Content 
  //       className={`content ${state.isSideBarHidden ? "content-full" : ""}`}
  //       style={{
  //         padding: 24,
  //         backgroundImage: `url("https://assets.hongkiat.com/uploads/holographic-gradient-background/5.jpg")`,
  //         backgroundSize: "cover",
  //       }}
  //     >
  //       <div className="site-card-border-less-wrapper">{test()}</div>
  //     </Content>
  //   </>
  // );
};
export default ContentSpace;
