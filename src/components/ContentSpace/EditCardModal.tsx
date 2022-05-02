import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import {PlusOutlined} from '@ant-design/icons'
import CardM from '../../models/Card';
import { useTable } from '../../store/store';


const EditCardModal = () => {
  const [state, actions] = useTable();
  const [form] = Form.useForm();

  const handleOk = async () => {
    const newCard = new CardM();
    newCard.description = state.currentCard.description;
    newCard.title = state.currentCard.title;
    newCard.columnId = state.currentCard.colId;
    actions.editCard(newCard);
    actions.hideEditCardModal();
    await editBoardNameddBoard(renamedBoard);
    actions.getBoards(); 
  };
  const onCreate = (values: any) => {
    const newCard = new CardM();
    newCard.description = values.description;
    newCard.title = values.title;
    newCard.columnId = props.colId;
    actions.createCard(newCard);
  };

  const handleCancel = () => {
    actions.showEditBoardModal();
  };
  
  return (
    <Modal
      visible={state.isEditCardModalHidden}
      title="Edit a new task"
      okText="Edit"
      cancelText="Cancel"
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the name of task!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};


export default EditCardModal ;