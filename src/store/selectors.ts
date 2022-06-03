import {TodosState} from './types';

export const selectTodos = (state: TodosState) => state.todos;

export const selectStatus = (state: TodosState) => state.status;
