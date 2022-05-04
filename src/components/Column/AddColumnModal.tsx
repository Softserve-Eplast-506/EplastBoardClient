import { Form, Input, Modal } from "antd";
import columnsApi from "../../api/columnsApi";
import Column from "../../models/Column";
import { descriptionValidation } from "../../models/Validation/Validation";
import { useTable } from "../../store/store";
import { emptyInput, maxLength } from "../Notifications/Messages";

const AddNewColumnModal = () => {
  const [state, actions] = useTable();
  let newColumnName = "";

  const addNewColumn = async () => {
    let column = new Column();
    column.title = newColumnName;
    column.boardId = state.currentBoard.id;
    await columnsApi.addColumn(column);
    actions.hideAddColumnModal();
    actions.getColumns(state.currentBoard.id);
  };

  const handleCancel = () => {
    actions.hideAddColumnModal();
  };
  const [form] = Form.useForm();
  
  return (
    <Modal
      className="modal-container"
      title="Add new column"
      visible={state.isAddColumnModalHidden}
      onOk={addNewColumn}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={descriptionValidation.TitleCard}
        >
          <Input
          onChange={(event) => {
            newColumnName = event.target.value;
          }}
      />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddNewColumnModal;
