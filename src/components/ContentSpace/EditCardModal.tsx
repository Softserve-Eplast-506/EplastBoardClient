import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import {PlusOutlined} from '@ant-design/icons'
import CardM from '../../models/Card';
import { useTable } from '../../store/store';

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionEditFormProps {
  visible: boolean;
  onEdit: (values: Values) => void;
  onCancel: () => void;
  onDelete: () => void
}

const CollectionEditForm: React.FC<CollectionEditFormProps> = ({
  onEdit,
  onCancel,
  onDelete,
}) => {
  const [state, actions] = useTable();
  const [form] = Form.useForm();
  return (
    <Modal
      visible={state.isEditCardModalHidden}
      title="Edit a new task"
      okText="Edit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onEdit(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
      footer={[
        <Button type="primary" danger style={{"float":"left"}} onClick={() => {
          onDelete()   
        }}>
        Delete
      </Button>,
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary"  onClick={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onEdit(values);
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

const CollectionsPage = () => {
  const [visible, setVisible] = useState(false);
  const [state, actions] = useTable();

  const onEdit = (values: any) => {
    const newCard = new CardM();
    newCard.description = values.description;
    newCard.title = values.title;
    newCard.columnId = 1;
    actions.editCard(newCard);
    setVisible(false);
  };
  const onDelete = () => {
    actions.deleteCard(state.currentCard.id);
    actions.hideEditCardModal();
  }

  return (
    <div>
      <CollectionEditForm
        visible={visible}
        onEdit={onEdit}
        onCancel={
          actions.hideEditCardModal}
        onDelete = {onDelete}
      />
    </div>
  );
};

export default () => <CollectionsPage />;