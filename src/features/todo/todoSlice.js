import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { todo: [], error: false, loading: false };

export const asyncGetTodo = createAsyncThunk(
  "todo/asyncGetTodo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/todos");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncAddTodo = createAsyncThunk(
  "todo/asyncAddTodo",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/todos", {
        title: payload,
        completed: false,
      });
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
    [asyncGetTodo.pending]: (state, action) => {
      return { ...state, todo: [], error: false, loading: true };
    },

    [asyncGetTodo.rejected]: (state, action) => {
      return { ...state, todo: [], error: action.payload, loading: false };
    },

    [asyncGetTodo.fulfilled]: (state, action) => {
      return { ...state, todo: action.payload, error: false, loading: false };
    },

    [asyncAddTodo.fulfilled]: (state, action) => {
      state.todo.push(action.payload);
    },
  },
});

export const { addTodo, deleteTodo, completedTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
