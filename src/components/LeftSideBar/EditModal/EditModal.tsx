import { Modal, Input } from "antd";
import { editBoardNameBoard } from "../../../api/boardsApi";
import { useTable } from "../../../store/store";

const EditModal = () => {
  const [state, actions] = useTable();

  const handleOk = async () => {
    let renamedBoard = state.currentBoard;
    renamedBoard.title = state.editBoardName;
    actions.showEditBoardModal();
    await editBoardNameBoard(renamedBoard);
    actions.getBoards();
  };

  const handleCancel = () => {
    actions.showEditBoardModal();
  };

  return (
    <Modal
      className="modal-container"
      title="Rename your board"
      visible={state.isEditBoardModalShown}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input
        defaultValue={state.currentBoard?.title}
        onChange={(event) => {
          actions.setBoardName(event.target.value);
        }}
      />
    </Modal>
  );
};

export default EditModal;
