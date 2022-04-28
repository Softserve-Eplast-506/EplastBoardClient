import { PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { KeyboardEvent } from 'react';
import { addBoard } from '../../../api/boardsApi';
import Board from '../../../models/Board';
import { useTable } from '../../../store/store';
import './AddPanel.css';

const AddPanel = () => {
    const [state, actions] = useTable();

    const showInput = async () =>{
        actions.openInputPanel();
    }
   
    const addNewBoard = async () => {
        let board = new Board();
        board.title = state.newBoard;
        await addBoard(board);
        actions.getBoards();
        actions.openInputPanel();
    }

    return (
        <>
            {state.isInputPanelHidden ? <div className="collapsedButtonHide white-text" onClick={showInput}>
                Create new board
                <PlusOutlined /></div> 
                : 
                <form onSubmit={(event)=>{event.preventDefault(); addNewBoard();}}>
                    <Input className='input-marginating' 
                           placeholder="Enter board title" 
                           autoFocus 
                           onBlur={showInput} 
                           onChange={(event)=>{
                                actions.addBoardName(event.target.value)}}
                        />
                </form>
            }
        </>
    )
}
export default AddPanel;
