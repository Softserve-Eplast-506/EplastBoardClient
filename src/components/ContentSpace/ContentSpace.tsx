import { Breadcrumb, Card, Form, Layout, Row } from "antd";
import './ContentSpace.css';
import "antd/dist/antd.min.css";
import { useTable } from "../../store/store";
import CardM from "../../models/Card";
import { useEffect, useState } from "react";
import columnsApi from "../../api/columnsApi"
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import Item from "antd/lib/list/Item";

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
  const [Boards, setBoards] = useState([{id: 1, title: "To Do", items: [{id: 1, title: "Do something"}, {id: 2, title: "Do something"}]}, {id: 2, title: "Doing", items: [{id: 3, title: "Do something"}, {id: 4, title: "Do something"}, {id: 5, title: "Do something"}]}])
  const [state, actions] = useTable();

  useEffect(() => {
    actions.getAllCards();

    const newColumn = new Column();
    columnsApi.addColumn(newColumn);

  }, []);

  return (
    <Content style={{backgroundImage: `url("https://assets.hongkiat.com/uploads/holographic-gradient-background/5.jpg")`, backgroundSize: 'cover'}}>
      <div className="board">
      {
        Boards.map(Board =>
          <div className="column">
            <div className="column-title">{Board.title}</div>
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


  // const test = (): any => {
  //   return (
  //     state.cards.map((x: CardM) => {
       
  //       return (
  //       <Card key={x.id} title={x.title} bordered={false} style={{ width: 300 }}>
  //       <p>Card content</p>
  //       <p>Card content</p>
  //       <p>Card content</p>
  //     </Card>
  //       )

  //     })
  //   )
  // }

  // return (
  //   <>
  //   <Content className="content"
  //       style={{
  //         padding: 24,
  //         backgroundImage: `url("https://assets.hongkiat.com/uploads/holographic-gradient-background/5.jpg")`,
  //         backgroundSize: 'cover'
  //       }}
  //   >
    
  //   <div className="site-card-border-less-wrapper">
   
  //  { test()}

  // </div>
          
  //   </Content>
  //   </>
  // );
};
export default ContentSpace;
