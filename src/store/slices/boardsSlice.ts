import { createSlice } from '@reduxjs/toolkit';
import { IBoard } from '../../types';

type TBoardsState = {
  modalActive: boolean;
  boardArray: IBoard[];
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

const boardsSlice = createSlice({ name: 'boards', initialState, reducers: {} });

export const boardsReducer = boardsSlice.reducer;
