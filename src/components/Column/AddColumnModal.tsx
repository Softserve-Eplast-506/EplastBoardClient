import { Input, Modal } from "antd";
import columnsApi from "../../api/columnsApi";
import Column from "../../models/Column";
import { useTable } from "../../store/store";

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

  return (
    <Modal
      className="modal-container"
      title="Add new column"
      visible={state.isAddColumnModalHidden}
      onOk={addNewColumn}
      onCancel={handleCancel}
    >
      <Input
        onChange={(event) => {
          newColumnName = event.target.value;
        }}
      />
    </Modal>
  );
};
export default AddNewColumnModal;
