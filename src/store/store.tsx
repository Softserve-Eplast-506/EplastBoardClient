import { createStore, createHook, Action } from 'react-sweet-state';
import { getAllColumnsByBoard } from '../api/columnsApi';
import Board from '../models/Board';

type State = {
    isSideBarHidden: boolean,
    boards: Board[],
};

const initialState: State = {
    isSideBarHidden: false,
    boards: [],
};

// actions that trigger store mutation
const actions = {

    getBoards:
        (): Action<State> =>
            ({ setState, getState }) => {
                setState({
                    //boards: getBoards()
                });
            },

    hideSideBar:
        (): Action<State> =>
            ({ setState, getState }) => {
                setState({
                    isSideBarHidden: !getState().isSideBarHidden
                });
            },
};

const Store = createStore({
    initialState,
    actions,
});

const getBoards = async () => {
    const response = await getAllColumnsByBoard(1);
    return response;
};

export const useTable = createHook(Store);
