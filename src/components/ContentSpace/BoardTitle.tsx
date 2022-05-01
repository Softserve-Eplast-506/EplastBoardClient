import { Col, Row } from "antd";
import { editBoardNameBoard } from "../../api/boardsApi";
import { useTable } from "../../store/store";
import "./ContentSpace.css";

const BoardTitle = () => {
  const [state, actions] = useTable();
  let boardName = state.currentBoard.title;

  const handleOk = async () => {
    let renamedBoard = state.currentBoard;
    renamedBoard.title = boardName;
    await editBoardNameBoard(renamedBoard);
    actions.getBoards();
  };

  const handleEdit = async (event: React.FormEvent<HTMLInputElement>) => {
    boardName = event.currentTarget.textContent
      ? event.currentTarget.textContent
      : "";
  };

  return (
    <Row>
      <Col flex="auto">
        <div
          id={state.currentBoard.id.toString()}
          contentEditable="true"
          suppressContentEditableWarning
          className="boardTitle"
          onInput={handleEdit}
          onBlur={handleOk}
        >
          {boardName}
        </div>
      </Col>
    </Row>
  );
};

export default BoardTitle;
