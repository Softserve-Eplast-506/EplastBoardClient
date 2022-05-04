import { MenuProps } from "antd";
import { createStore, createHook, Action } from "react-sweet-state";
import { getAllBoards } from "../api/boardsApi";
import columnsApi from "../api/columnsApi";
import Board from "../models/Board";
import CardM from "../models/Card";
import Column from "../models/Column";

import {
  AddCard,
  editCard,
  getAllCards,
  deleteCard,
  getCardsByBoard,
  getCardsByColumn,
  updateCards,
} from "../api/cardsApi";

type MenuItem = Required<MenuProps>["items"][number];

type State = {
  isSideBarHidden: boolean;
  isEditCardModalHidden: boolean;
  menuItems: MenuItem[];
  cards: CardM[];
  cardsByColumnId: CardM[];
  currentCard: CardM;
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
  render: boolean;
  isAddColumnModalHidden: boolean;
};

const initialState: State = {
  isSideBarHidden: false,
  isEditCardModalHidden: false,
  menuItems: [],
  cards: [],
  cardsByColumnId: [],
  currentCard: new CardM(),
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
  isAddColumnModalHidden: false,
  render: false,
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

  getColumns:
    (boardId: number): Action<State> =>
    async ({ setState, getState }) => {
      const columns: Column[] = (await columnsApi.getAllColumnsByBoard(boardId))
        .data;
      setState({
        columns: columns,
      });
    },

  setColumns:
    (columns: Column[]): Action<State> =>
    async ({ setState, getState }) => {
      await columnsApi.updateColumns(columns);
      setState({
        columns: columns,
      });
    },

  setCards:
    (cards: CardM[], col: Column): Action<State> =>
    async ({ setState, getState }) => {
      let cols = getState().columns;
      cols[col.index].cards = cards;
      await updateCards(cards);
      setState({
        columns: cols,
      });
    },

  setInitialCurrentBoard:
    (): Action<State> =>
    async ({ setState, getState }) => {
      if (getState().boards.length > 0) {
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
      let getColumns: Column[] = (
        await columnsApi.getAllColumnsByBoard(boardId)
      ).data;
      setState({ columns: getColumns });
    },

  getCardsByBoard:
    (boardId: number): Action<State> =>
    async ({ setState }) => {
      const getCards: CardM[] = (await getCardsByBoard(boardId)).data;
      setState({ cards: getCards });
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
        (column: Column) => column.id == columnId
      );
      setState({
        currentColumn: column,
      });
    },
  setCurrentCard:
    (cardId: number): Action<State> =>
    async ({ setState, getState }) => {
      const card = getState().cards.find((card: CardM) => card.id == cardId);
      setState({
        currentCard: card,
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

  hideAddColumnModal:
    (): Action<State> =>
    ({ setState, getState }) => {
      setState({
        isAddColumnModalHidden: !getState().isAddColumnModalHidden,
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
  getCardsByColumnId:
    (columnId: number): Action<State> =>
    async ({ setState, getState }) => {
      setState({
        cardsByColumnId: await getCardsByColumnId(columnId),
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
  deleteCard:
    (cardId: number): Action<State> =>
    async ({ setState, getState }) => {
      await deleteCardAction(cardId);
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
const getCardsByColumnId = async (columnId: number) => {
  const response = await getCardsByColumn(columnId);
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
const deleteCardAction = async (cardId: number) => {
  const response = await deleteCard(cardId);
  return response.data;
};

export const useTable = createHook(Store);
