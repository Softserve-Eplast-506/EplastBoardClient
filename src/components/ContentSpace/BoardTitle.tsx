import { Col, Form, Input, Row } from "antd";
import { useEffect } from "react";
import { editBoardNameBoard } from "../../api/boardsApi";
import { descriptionValidation } from "../../models/Validation/Validation";
import { useTable } from "../../store/store";
import "./BoardTitle.css";

const BoardTitle = () => {
  const [state, actions] = useTable();
  const [form] = Form.useForm();
  
  useEffect(() => {
    form.setFieldsValue({
      boardtitle: state.currentBoard.title
    })
  }, [state.currentBoard]);

  let renamedBoard = state.currentBoard;
  const handleOk = async (event: any) => {
    
    form
      .validateFields()
      .then(async (values) => {
        renamedBoard.title = state.editBoardName;
        await editBoardNameBoard(renamedBoard);
        actions.getBoards();
        event.preventDefault();
      })
      .catch((info) => {
        form.setFieldsValue({
          boardtitle: state.currentBoard.title
        })
        console.log("Validate Failed:", info);
      });
  };

  const handleEdit = async (event: any) => {
    actions.setBoadrName(event.target.value);
  };
  return (
    <Row>
      <Col flex="auto">
        <div className="boardtitle-container">
          <Form
            onSubmitCapture={handleOk}
            form={form}
            layout="inline"
            name="form_in_contentspace"
            id="form_in_contentspace"
          >
            <Form.Item
              id="boardtitle"
              name="boardtitle"
              rules={descriptionValidation.BoardTitleContentSpace}
            >
              <Input
                id="input-marginating"
                className="input-marginating"
                onBlur={handleOk}
                onChange={handleEdit}
                

              />
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default BoardTitle;
