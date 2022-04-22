import "./App.css";
import { Provider } from "react-redux";
import { store } from "./features/store";
// import CounterComponent from "./components/CounterComponent";
import TodoComponent from "./components/TodoComponent";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <CounterComponent /> */}
        <TodoComponent />
      </div>
    </Provider>
  );
}

export default App;
