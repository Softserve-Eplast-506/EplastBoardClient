import { Modal, Button, Input } from 'antd';
import React from 'react';
import { editBoardNameddBoard } from '../../../api/boardsApi';
import Board from '../../../models/Board';
import { useTable } from '../../../store/store';


const EditModal = () => {
  const [state, actions] = useTable();

  const showModal = () => {
    actions.showEditBoardModal();
  };

  const handleOk = async () => {
    let renamedBoard=state.currentBoard;
    renamedBoard.title=state.editBoardName;
    actions.showEditBoardModal();
    await editBoardNameddBoard(renamedBoard);
    actions.getBoards(); 
  };

  const handleCancel = () => {
    actions.showEditBoardModal();
  };

  return (
      <Modal
      className='modal-container'
        title="Rename your board"
        visible={state.isEditBoardModalShown}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
           defaultValue={state.currentBoard?.title} 
           onChange={(event) => {
            actions.setBoadrName(event.target.value)
          }}
        />
      </Modal>
  );
};

export default EditModal;
