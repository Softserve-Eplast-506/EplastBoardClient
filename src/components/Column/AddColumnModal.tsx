import { Button, Input, Modal } from 'antd';
import columnsApi from '../../api/columnsApi';
import Column from '../../models/Column';
import { useTable } from '../../store/store';

const AddNewColumnModal = () => {
    const [state, actions] = useTable();
   
    const addNewColumn = async () => {
        let column = new Column();
        column.title = state.newBoard;
        await columnsApi.addColumn(column);
        actions.getColumns(state.currentBoard.id);
    }
    
    const handleCancel = () => {
        actions.hideAddColumnModal();
    };

    let newColumnName = "";
    
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
}
export default AddNewColumnModal;
