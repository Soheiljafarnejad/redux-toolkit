import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, completedTodo, deleteTodo } from "../features/todo/todoSlice";

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
  return (
    <div className="container">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => dispatch(addTodo(value))}>add</button>
    </div>
  );
};

const TodoList = () => {
  const { todo } = useSelector((store) => store.todoReducer);
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
        <button onClick={() => dispatch(completedTodo(id))}>completed</button>
        <button onClick={() => dispatch(deleteTodo(id))}>delete</button>
      </div>
    </section>
  );
};
