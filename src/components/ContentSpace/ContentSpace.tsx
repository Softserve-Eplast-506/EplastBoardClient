import { Breadcrumb, Card, Form, Input, Layout, Row } from "antd";
import './ContentSpace.css';
import "antd/dist/antd.min.css";
import { useTable } from "../../store/store";
import CardM from "../../models/Card";
import { SetStateAction, useEffect, useRef, useState } from "react";
import columnsApi from "../../api/columnsApi"
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import Item from "antd/lib/list/Item";
import { CloseOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import Board from "../../models/Board";

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
  const [Boards, setBoards] = useState([{id: 2, title: "To Do", items: [{id: 1, title: "Do something"}, {id: 2, title: "Do something"}]}, {id: 3, title: "Doing", items: [{id: 3, title: "Do something"}, {id: 4, title: "Do something"}, {id: 5, title: "Do something"}]}])
  const [state, actions] = useTable();

  useEffect(() => {
    actions.getAllCards();

    const newColumn = new Column();
    columnsApi.addColumn(newColumn);

  }, []);

  const test = (): any => {
    return state.cards.map((x: CardM) => {
      return (
        <Card
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
  
  let columnName = state.currentColumn.title;

  const handleOk = async (event: any) => {
    console.log(event.target.id);
    actions.setCurrentColumn(event.target.id);
    let newColumn: Column = state.currentColumn;
    newColumn.title = columnName;
    console.log(newColumn);
    await columnsApi.editColumnName(newColumn);
  };

  const handleEdit = async (event: React.FormEvent<HTMLInputElement>) => {
    columnName = event.currentTarget.value;
  }

  return (
    <Content className={`content ${state.isSideBarHidden ? "content-full" : ""}`} style={{backgroundImage: `url("https://assets.hongkiat.com/uploads/holographic-gradient-background/5.jpg")`, backgroundSize: 'cover'}}>
      <div className="board">
      {
        Boards.map(Board =>
          <div className="column">
            <div id={Board.id.toString()} className="column-title" contentEditable="true" onChange={handleEdit} defaultValue={columnName} onBlur={handleOk}>{Board.title}</div>
            {Board.items.map(Item => 
              <div className="item">{Item.title}</div>
            )}
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
