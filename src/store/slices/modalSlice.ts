import { createSlice } from '@reduxjs/toolkit';
import { ITask } from '../../types';

type TModalState = {
  boardId: string;
  listId: string;
  task: ITask;
};

const initialState: TModalState = {
  boardId: 'board-0',
  listId: 'list-0',
  task: {
    id: 'tast-0',
    name: 'task 0',
    description: 'teask description',
    owner: 'John',
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {},
});

export const modalReducer = modalSlice.reducer;
