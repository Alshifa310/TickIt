import Navbar from "./Components/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = localStorage.getItem("todos");
      setTodos(JSON.parse(todos));
    }
  }, []);

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const saveToLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (id) => {
    let t = todos.filter((item) => item.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      const newTodos = todos.filter((item) => item.id !== id);
      setTodos(newTodos);
      saveToLocalStorage(newTodos);
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLocalStorage(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container shadow-xl  bg-white mx-auto px-4 sm:w-full md:w-2/3 lg:w-1/2 my-4 border border-gray-200 p-4 rounded-lg min-h-[80vh] shadow-gray-500/50">
        <h1 className="text-center lg:text-2xl font-bold my-2 text-xl ">
          TickIt – Check off your tasks with ease
        </h1>
        <div className="addTodo">
          <h2 className="font-bold md:text-xl m-2 text-lg">Add a Todo</h2>
          <div className="flex space-x-2 my-2">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              name="addtodo"
              id=""
              className="block w-full text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 px-3"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>
        <input
          type="checkbox"
          onChange={toggleShowCompleted}
          name=""
          id=""
          checked={showCompleted}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 m-2"
        />{" "}
        Show Completed Todos
        <hr className="m-4" />
        <h2 className="font-bold text-xl m-2">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="text-center text-gray-500">No todos yet</div>
          )}
          {todos.map(
            (item) =>
              (showCompleted || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex justify-between items-center m-2"
                >
                  <div className="flex items-center space-x-2 ">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckbox(item.id)}
                      checked={item.isCompleted}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <div
                      className={
                        item.isCompleted ? "line-through pr-2" : "pr-2"
                      }
                    >
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex space-x-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-xs w-full sm:w-auto px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-xs w-full sm:w-auto px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
