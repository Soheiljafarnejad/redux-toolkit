import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../features/counter/counterSlice";

const CounterComponent = () => {
  const [value, setValue] = useState("");
  const { count } = useSelector((store) => store.counterReducer);
  const dispatch = useDispatch();
  return (
    <section className="container">
      <h2>count: {count}</h2>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => dispatch(increment(Number(value) || 1))}>
        increment
      </button>
      <button onClick={() => dispatch(decrement(Number(value) || 1))}>
        decrement
      </button>
    </section>
  );
};

export default CounterComponent;
