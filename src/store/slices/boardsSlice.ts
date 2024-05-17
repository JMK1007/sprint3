import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBoard, IList, ITask } from '../../types';

type TBoardsState = {
  modalActive: boolean;
  boardArray: IBoard[];
};

type TAddBoardAction = {
  board: IBoard;
};

type TDeleteListAction = {
  boardId: string;
  listId: string;
};

type TAddListAction = {
  boardId: string;
  list: IList;
};

type TAddTaskAction = {
  boardId: string;
  listId: string;
  task: ITask;
};

type TdeleteTaskAction = {
  boardId: string;
  listId: string;
  taskId: string;
};

type TDeleteBoardAction = {
  boardId: string;
};

const initialState: TBoardsState = {
  modalActive: false,
  boardArray: [
    {
      id: 'board-0',
      name: '첫 번째 게시물',
      lists: [
        {
          id: 'list-0',
          name: 'list 1',
          tasks: [
            {
              id: 'tast-0',
              name: 'task 1',
              description: 'description',
              owner: 'John',
            },
          ],
        },
        {
          id: 'list-1',
          name: 'list 2',
          tasks: [
            {
              id: 'tast-3',
              name: 'task 3',
              description: 'description',
              owner: 'John',
            },
          ],
        },
      ],
    },
    {
      id: 'board-1',
      name: '두 번째 게시물',
      lists: [
        {
          id: 'list-2',
          name: 'list 3',
          tasks: [
            {
              id: 'tast-4',
              name: 'task 4',
              description: 'description',
              owner: 'John',
            },
          ],
        },
      ],
    },
  ],
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
      //immer를 사용하기 때문에 불변성을 위해 다시 복사하고 안해도 됨
      state.boardArray.push(payload.board);
    },
    deleteBoard: (state, { payload }: PayloadAction<TDeleteBoardAction>) => {
      state.boardArray = state.boardArray.filter(
        (board) => board.id !== payload.boardId,
      );
    },
    addList: (state, { payload }: PayloadAction<TAddListAction>) => {
      state.boardArray.forEach((board) => {
        if (board.id === payload.boardId) {
          board.lists.push(payload.list);
        }
      });
    },
    addTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray.forEach((board) => {
        if (board.id === payload.boardId) {
          board.lists.forEach((list) => {
            if (list.id === payload.listId) {
              list.tasks.push(payload.task);
            }
          });
        }
      });
    },
    updateTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray.forEach((board) => {
        if (board.id === payload.boardId) {
          board.lists.map((list) => {
            if (list.id === payload.listId) {
              list.tasks.map((task) => {
                if (task.id === payload.task.id) {
                  task = payload.task;
                }
              });
            }
          });
        }
      });
    },
    deleteTask: (state, { payload }: PayloadAction<TdeleteTaskAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.id === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.id === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.filter(
                        (task) => task.id !== payload.taskId,
                      ),
                    }
                  : list,
              ),
            }
          : board,
      );
    },
    deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.id === payload.boardId
          ? {
              ...board,
              lists: board.lists.filter((list) => list.id !== payload.listId),
            }
          : board,
      );
    },
    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },
  },
});
export const {
  addBoard,
  deleteBoard,
  deleteList,
  setModalActive,
  addList,
  addTask,
  updateTask,
  deleteTask,
} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
