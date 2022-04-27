import { Card, Layout } from "antd";
import "./ContentSpace.css";
import "antd/dist/antd.min.css";
import { useTable } from "../../store/store";
import CardM from "../../models/Card";
import { useEffect } from "react";

const { Content } = Layout;

const ContentSpace = () => {
  const [state, actions] = useTable();

  useEffect(() => {
    actions.getAllCards();
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

  return (
    <>
      <Content
        className="content"
        style={{
          padding: 24,
          backgroundImage: `url("https://assets.hongkiat.com/uploads/holographic-gradient-background/5.jpg")`,
          backgroundSize: "cover",
        }}
      >
        <div className="site-card-border-less-wrapper">{test()}</div>
      </Content>
    </>
  );
};
export default ContentSpace;
