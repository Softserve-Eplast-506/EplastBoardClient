import { createStore, createHook, Action } from 'react-sweet-state';
import { getAllCards } from '../api/cardsApi';
import { getAllColumnsByBoard } from '../api/columnsApi';
import Board from '../models/Board';
import CardM from '../models/Card';

type State = {
    isSideBarHidden: boolean,
    boards: Board[],
    cards: CardM[],
    
};

const initialState: State = {
    isSideBarHidden: false,
    boards: [],
    cards: []
};

// actions that trigger store mutation
const  actions = {

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
            getAllCards:
            (): Action<State> =>
                async ({ setState, getState }) => {
                    setState({
                        cards: await getCards()
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
const getCards = async () => {
    const response = await getAllCards();
    return response.data;
};


export const useTable = createHook(Store);
