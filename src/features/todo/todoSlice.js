import { createSlice } from "@reduxjs/toolkit";

const initialState = { todo: [] };

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        title: action.payload,
        completed: false,
        id: Date.now(),
      };
      state.todo.push(newTodo);
    },
    completedTodo: (state, action) => {
      const selected = state.todo.find((item) => item.id === action.payload);
      selected.completed = !selected.completed;
    },
    deleteTodo: (state, action) => {
      state.todo = state.todo.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo, completedTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
