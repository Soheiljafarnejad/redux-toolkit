import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { todo: [], error: false, loading: false };

export const getAsyncTodos = createAsyncThunk(
  "todo/getAsyncTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/todos");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
  extraReducers: {
    [getAsyncTodos.pending]: (state, action) => {
      return { ...state, todo: [], error: false, loading: true };
    },

    [getAsyncTodos.fulfilled]: (state, action) => {
      return { ...state, todo: action.payload, error: false, loading: false };
    },

    [getAsyncTodos.rejected]: (state, action) => {
      return { ...state, todo: [], error: action.payload, loading: false };
    },
  },
});

export const { addTodo, deleteTodo, completedTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
