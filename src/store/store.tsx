import { MenuProps } from "antd";
import { createStore, createHook, Action } from "react-sweet-state";
import { getAllBoards } from "../api/boardsApi";
import columnsApi from "../api/columnsApi";
import { AddCard, editCard, getAllCards } from "../api/cardsApi";
import Board from "../models/Board";
import CardM from "../models/Card";
import Column from "../models/Column";

type MenuItem = Required<MenuProps>["items"][number];

type State = {
  isSideBarHidden: boolean;
  isEditCardModalHidden: boolean;
  menuItems: MenuItem[];
  cards: CardM[];
  columns: Column[];
  isInputPanelHidden: boolean;
  isInputPanelHiddenColumn: boolean;
  addingBoardName: string;
  editingColumnName: string;
  hiddenPanelColumn: number;
  currentColumn: Column;
  newBoard: string;
  editBoardName: string;
  isEditBoardModalShown: boolean;
  boards: Board[];
  currentBoard: Board;
};

const initialState: State = {
  isSideBarHidden: false,
  isEditCardModalHidden: false,
  menuItems: [],
  cards: [],
  columns: [],
  isInputPanelHidden: true,
  isInputPanelHiddenColumn: true,
  addingBoardName: "",
  editingColumnName: "",
  hiddenPanelColumn: 0,
  currentColumn: new Column(),
  newBoard: "",
  editBoardName: "",
  isEditBoardModalShown: false,
  boards: [],
  currentBoard: new Board(),
};

const actions = {
  getBoards:
    (): Action<State> =>
    async ({ setState, getState }) => {
      const boards: Board[] = (await getAllBoards()).data;
      let items: MenuItem[] = [];
      boards.map((board: Board) => {
        items.push(getItem(board.title, board.id));
      });
      setState({
        boards: boards,
        menuItems: items.reverse(),
      });
    },

  setInitialCurrentBoard:
    (): Action<State> =>
    async ({ setState, getState }) => {
      if (getState().boards.length > 0) {
        console.log(getState().boards[0]);
        setState({
          currentBoard: getState().boards[0],
        });
      }
    },

  hideSideBar:
    (): Action<State> =>
    ({ setState, getState }) => {
      setState({
        isSideBarHidden: !getState().isSideBarHidden,
      });
    },

  getColumnByBoard:
    (boardId: number): Action<State> =>
    async ({ setState }) => {
      const getColumns: Column[] = (
        await columnsApi.getAllColumnsByBoard(boardId)
      ).data;
      setState({ columns: getColumns });
    },

  openInputPanel:
    (): Action<State> =>
    ({ setState, getState }) => {
      setState({
        isInputPanelHidden: !getState().isInputPanelHidden,
      });
    },

  openColumnName:
    (idColumn: number): Action<State> =>
    ({ setState, getState }) => {
      setState({
        isInputPanelHiddenColumn: !getState().isInputPanelHiddenColumn,
        hiddenPanelColumn: idColumn,
      });
    },

  setBoardName:
    (name: string): Action<State> =>
    ({ setState, getState }) => {
      setState({
        addingBoardName: name,
      });
    },

  changeColumnName:
    (name: string): Action<State> =>
    ({ setState, getState }) => {
      setState({
        editingColumnName: name,
      });
    },

  setCurrentColumn:
    (columnId: number): Action<State> =>
    async ({ setState, getState }) => {
      const column = getState().columns.find(
        (column: Column) => column.id === columnId
      );
      setState({
        currentColumn: column,
      });
    },

  addBoardName:
    (name: string): Action<State> =>
    ({ setState, getState }) => {
      setState({
        newBoard: name,
      });
    },

  setBoadrName:
    (name: string): Action<State> =>
    ({ setState, getState }) => {
      setState({
        editBoardName: name,
      });
    },

  showEditBoardModal:
    (): Action<State> =>
    ({ setState, getState }) => {
      setState({
        isEditBoardModalShown: !getState().isEditBoardModalShown,
      });
    },

  hideEditCardModal:
    (): Action<State> =>
    ({ setState, getState }) => {
      setState({
        isEditCardModalHidden: !getState().isEditCardModalHidden,
      });
    },

  setCurrentBoard:
    (boardId: number): Action<State> =>
    async ({ setState, getState }) => {
      const board = getState().boards.find(
        (board: Board) => board.id === boardId
      );
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

  editCard:
    (Card: CardM): Action<State> =>
    async ({ setState, getState }) => {
      await editCardAction(Card);
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
  const response = await AddCard(Card);
  return response.data;
};

const editCardAction = async (Card: CardM) => {
  const response = await editCard(Card);
  return response.data;
};

export const useTable = createHook(Store);
