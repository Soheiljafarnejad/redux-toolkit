import { useState } from "react";

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
  const [value, setValue] = useState("");
  return (
    <div className="container">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button>add</button>
    </div>
  );
};

const TodoList = () => {
  const todos = [
    { title: "one todo", id: 1, completed: false },
    { title: "two todo", id: 2, completed: false },
    { title: "there todo", id: 3, completed: false },
  ];
  return (
    <section>
      {todos.map((item) => {
        return <Todo todo={item} key={item.id} />;
      })}
    </section>
  );
};

const Todo = ({ todo }) => {
  const { title, completed, id } = todo;
  return (
    <section className="todo">
      <input type="radio" name="todo" id={id} checked={completed} />
      <label htmlFor={id}>{title}</label>
      <div>
        <button>completed</button>
        <button>delete</button>
      </div>
    </section>
  );
};
