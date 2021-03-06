import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncAddTodo,
  asyncCompletedTodo,
  asyncDeleteTodo,
  asyncGetTodo,
} from "../features/todo/todoSlice";

const TodoComponent = () => {
  return (
    <section>
      <TodoForm />
      <TodoList />
    </section>
  );
};

export default TodoComponent;

const TodoForm = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const handler = () => {
    dispatch(asyncAddTodo(value));
    setValue("");
  };
  return (
    <div className="container">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handler}>add</button>
    </div>
  );
};

const TodoList = () => {
  const { todo, error, loading } = useSelector((store) => store.todoReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetTodo());
  }, [dispatch]);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      {todo.map((item) => {
        return <Todo todo={item} key={item.id} />;
      })}
    </section>
  );
};

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  const { title, completed, id } = todo;
  return (
    <section className="todo">
      <input
        type="radio"
        name={id}
        id={id}
        checked={completed}
        onChange={() => completed}
      />
      <label htmlFor={id}>{title}</label>
      <div>
        <button onClick={() => dispatch(asyncCompletedTodo(todo))}>
          completed
        </button>
        <button onClick={() => dispatch(asyncDeleteTodo(todo))}>delete</button>
      </div>
    </section>
  );
};
