import { MenuProps } from 'antd';
import { createStore, createHook, Action } from 'react-sweet-state';
import { getAllBoards } from '../api/boardsApi';
import Board from '../models/Board';

type MenuItem = Required<MenuProps>['items'][number];

type State = {
    isSideBarHidden: boolean,
    menuItems: MenuItem[],
};

const initialState: State = {
    isSideBarHidden: false,
    menuItems: [],
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

export const useTable = createHook(Store);
