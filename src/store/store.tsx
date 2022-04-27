import { MenuProps } from "antd";
import { createStore, createHook, Action } from "react-sweet-state";
import { getAllBoards } from "../api/boardsApi";
import { AddCard, getAllCards } from "../api/cardsApi";
import Board from "../models/Board";
import CardM from "../models/Card";

type MenuItem = Required<MenuProps>["items"][number];

type State = {
  isSideBarHidden: boolean,
  isEditCardModalHidden: boolean,
  menuItems: MenuItem[],
  cards: CardM[],
  isInputPanelHidden: boolean,
  newBoard: string,
  editBoardName: string,
  isEditBoardModalShown: boolean,
  boards: Board[],
  currentBoard: Board,
  render: boolean
};

const initialState: State = {
  isSideBarHidden: false,
  isEditCardModalHidden: false,
  menuItems: [],
  cards: [],
  isInputPanelHidden: true,
  newBoard: "",
  editBoardName: "",
  isEditBoardModalShown: false,
  boards: [],
  currentBoard: new Board(),
  render: false
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
        if (boards.length > 0) {
          setState({
            currentBoard: boards[0],
          })
        }
        setState({
          boards: boards,
          menuItems: items.reverse()
        });
      },

  setInitialCurrentBoard:
    (): Action<State> =>
      async ({ setState, getState }) => {
        if (getState().boards.length > 0) {
          setState({
            currentBoard: await getState().boards[0],
          })
        }
      },


  setRender:
    (): Action<State> =>
      ({ setState, getState }) => {
        setState({
          render: !getState().render
        });
      },

  hideSideBar:
    (): Action<State> =>
      ({ setState, getState }) => {
        setState({
          isSideBarHidden: !getState().isSideBarHidden
        });
      },

  openInputPanel:
    (): Action<State> =>
      ({ setState, getState }) => {
        setState({
          isInputPanelHidden: !getState().isInputPanelHidden
        });
      },

  addBoardName:
    (name: string): Action<State> =>
      ({ setState, getState }) => {
        setState({
          newBoard: name
        });
      },

  setBoadrName:
    (name: string): Action<State> =>
      ({ setState, getState }) => {
        setState({
          editBoardName: name
        });
      },
  showEditBoardModal:
    (): Action<State> =>
      ({ setState, getState }) => {
        setState({
          isEditBoardModalShown: !getState().isEditBoardModalShown
        });
      },

  hideEditCardModal:
    (): Action<State> =>
      ({ setState, getState }) => {
        setState({
          isEditCardModalHidden: !getState().isEditCardModalHidden
        });
      },

  setCurrentBoard:
    (boardId: number): Action<State> =>
      async ({ setState, getState }) => {
        const board = getState().boards.find(
          (board: Board) => board.id === boardId
        );
        console.log(board);
        setState({
          currentBoard: board,
        });
      },

  getAllCards:
    (): Action<State> =>
      async ({ setState, getState }) => {
        setState({
          cards: await getCards(),
        });
      },
  createCard:
    (Card: CardM): Action<State> =>
      async ({ setState, getState }) => {
        await createCard(Card);
        setState({
          cards: await getCards(),
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
  icon?: React.ReactNode
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
