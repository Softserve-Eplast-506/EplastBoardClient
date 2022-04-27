import { MenuProps } from 'antd';
import { createStore, createHook, Action } from 'react-sweet-state';
import { getAllBoards } from '../api/boardsApi';
import columnsApi from '../api/columnsApi';
import { AddCard, getAllCards } from '../api/cardsApi';
import Board from '../models/Board';
import CardM from '../models/Card';
import Column from '../models/Column';

type MenuItem = Required<MenuProps>['items'][number];

type State = {
    isSideBarHidden: boolean,
    isEditCardModalHidden: boolean,
    menuItems: MenuItem[],
    cards: CardM[],
    columns: Column[]
};

const initialState: State = {
    isSideBarHidden: false,
    isEditCardModalHidden: false,
    menuItems: [],
    cards: [],
    columns: []
};

const actions = {
      
    getBoards:
        (): Action<State> => 
            async ({ setState, getState }) => {
                const boards: Board[] = (await getAllBoards()).data;
                let items: MenuItem[] = [];
                boards.map((board: Board) => {
                    items.push(getItem(board.title, board.id));
                })
                setState({
                    menuItems: items
                });

            },

    hideSideBar:
        (): Action<State> =>
            ({ setState, getState }) => {
                setState({
                    isSideBarHidden: !getState().isSideBarHidden
                });
            },

    getColumnByBoard:
        (idBoard: number): Action<State> => 
                async ({setState}) => {
                    const getColumns: Column[] = await columnsApi.getColumnById(idBoard);
                    setState({columns: getColumns});
                },
             
    hideEditCardModal:
    (): Action<State> =>
        ({ setState, getState }) => {
            setState({
                isEditCardModalHidden: !getState().isEditCardModalHidden
            });
        },
    getAllCards:
    (): Action<State> =>
        async ({ setState, getState }) => {
            setState({
                cards: await getCards()
            });
        },
    createCard:
    (Card: CardM): Action<State> =>
        async ({ setState, getState }) => {
            await createCard(Card);
            setState({
                cards: await getCards()
            });
        },
};

const Store = createStore({
    initialState,
    actions,
});

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
  ): MenuItem {
    return {
      key,
      icon,
      label,
    } as MenuItem;
  }
        
const getCards = async () => {
    const response = await getAllCards();
    return response.data;
};

const createCard = async (Card: CardM) => {
    console.log("crac");
    const response = await AddCard(Card);
    console.log(response.data);
    return response.data;
};
export const useTable = createHook(Store);
