import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import {PlusOutlined} from '@ant-design/icons'
import CardM from '../../models/Card';
import { useTable } from '../../store/store';

const EditCardModal = () => {
  const [state, actions] = useTable();
  const [form] = Form.useForm();
   let newCardTitle = "";
   let newCardDescription = "";

  const handleOk = async () => {
    let newCard = state.currentCard;
    console.log(newCard);
    newCard.description = newCardDescription;
    newCard.title = newCardTitle;
    actions.editCard(newCard);
    actions.hideEditCardModal();
    actions.getCardsByBoard(state.currentBoard.id);
  };

  const handleCancel = () => {
    actions.hideEditCardModal();
  };

  const handleDelete = async () => {
    await actions.deleteCard(state.currentCard.id);
          actions.hideEditCardModal();
          actions.getCardsByBoard(state.currentBoard.id);
  }

  return (
    <Modal
      visible={state.isEditCardModalHidden}
      title="Edit a new task"
      okText="Edit"
      cancelText="Cancel"
      onCancel={handleCancel}
     
      footer={[
        <Button type="primary" danger style={{"float":"left"}} onClick={() => {
          handleDelete()   
        }}>
        Delete
      </Button>,
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary"  onClick={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              handleOk();
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}>
          Edit
        </Button>,
       
      ]}
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
          initialValue={state.currentCard.title}
          rules={[{ required: true, message: 'Please input the name of task!' },
                    { max: 220 , message: 'Max-Length is 220!' }]}
        >
          <Input  onChange={(event) => {
          newCardTitle =  event.target.value;
        }} />
        </Form.Item>
       
        <Form.Item name="description" 
        label="Description" 
        initialValue={state.currentCard.description}
        rules={[{ max: 1000, message: 'Max-Length is 1000!' }]}
        >
         
          <Input type="textarea"  onChange={(event) => {
          newCardDescription =  event.target.value;
        }} />

        </Form.Item>
      </Form>
    </Modal>
  );
};



export default  EditCardModal;