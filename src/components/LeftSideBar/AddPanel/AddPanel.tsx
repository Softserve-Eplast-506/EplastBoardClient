import { PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { KeyboardEvent } from 'react';
import { addBoard } from '../../../api/boardsApi';
import Board from '../../../models/Board';
import { useTable } from '../../../store/store';

const AddPanel = () => {
    const [state, actions] = useTable();

    const showInput = async () =>{
        actions.openInputPanel();
    }
   
    const addNewBoard = async () => {
        let board = new Board();
        board.title = state.boardName;
        debugger
        await addBoard(board);
        
    }
    return (
        <>
            {state.isInputPanelHidden ? <Button onClick={showInput}>
                Create new board
                <PlusOutlined /></Button> 
                : 
                <form onSubmit={addNewBoard}>
                    <Input placeholder="Enter board title" 
                           autoFocus 
                           onBlur={showInput} 
                           onChange={(event)=>{
                                actions.setBoardName(event.target.value)
                                console.log(state.boardName)}}
                            // onSubmit={(event)=>{event.preventDefault()}}
                            // onPressEnter={
                            //     (event)=>{ 
                            //         addNewBoard()
                            //         event.preventDefault()
                            //         }}  
                        />
                </form>
                
                }
                </>
    )
}
export default AddPanel