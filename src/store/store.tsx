import { createStore, createHook, Action } from 'react-sweet-state';
import { getAllBoards } from '../api/boardsApi';
import Board from '../models/Board';

type State = {
    isSideBarHidden: boolean,
    boards: any,
};

const initialState: State = {
    isSideBarHidden: false,
    boards: [],
};

const actions = {

    getBoards:
        (): Action<State> =>
            ({ setState, getState }) => {
                setState({
                    boards: getBoards()
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
    const response = await getAllBoards();
    return response.data;
};

export const useTable = createHook(Store);
