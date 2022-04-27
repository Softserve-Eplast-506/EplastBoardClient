import { MenuProps } from 'antd';
import { createStore, createHook, Action } from 'react-sweet-state';
import { getAllBoards } from '../api/boardsApi';
import { getAllCards } from '../api/cardsApi';
import Board from '../models/Board';
import CardM from '../models/Card';

type MenuItem = Required<MenuProps>['items'][number];

type State = {
    isSideBarHidden: boolean,
    menuItems: MenuItem[],
    cards: CardM[],
    isInputPanelHidden: boolean,
    addingBoardName: string
};

const initialState: State = {
    isSideBarHidden: false,
    menuItems: [],
    cards: [],
    isInputPanelHidden: true,
    addingBoardName: ""
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
                    menuItems: items.reverse()
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
    
    openInputPanel:
        (): Action<State> =>
            ({setState, getState}) => {
                setState({
                    isInputPanelHidden: !getState().isInputPanelHidden
                });
            },
            
    setBoardName:
        (name: string): Action<State> =>
        ({setState, getState}) => {
            setState({
                addingBoardName: name
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

export const useTable = createHook(Store);
