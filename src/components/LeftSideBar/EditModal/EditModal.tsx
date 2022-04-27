import { Modal, Button, Input } from 'antd';
import React from 'react';
import { editBoardNameddBoard } from '../../../api/boardsApi';
import Board from '../../../models/Board';
import { useTable } from '../../../store/store';
import './EditModal.css';


const EditModal = () => {
  const [state, actions] = useTable();

  const showModal = () => {
    actions.showEditBoardModal(true);
  };

  const handleOk = async () => {
    let renamedBoard=new Board();
    await editBoardNameddBoard(renamedBoard);
    actions.showEditBoardModal(false);
    // setModalText('The modal will be closed after two seconds');
    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setVisible(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };

  const handleCancel = () => {
    actions.showEditBoardModal(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Edit
      </Button>
      <Modal
        title="Title"
        visible={state.isEditBoardModalShown}
        onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input
          //  value={} 
          onChange={(event) => {
            actions.setBoadrName(event.target.value)
          }}
        />
      </Modal>
    </>
  );
};

export default EditModal;