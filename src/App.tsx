import { useState } from "react";
import { InputField, TodoList } from "./components";
import { Todo } from "./models";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completeTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo) {
      toast.error("Input Field is Blank");
      return;
    }
    setTodos([...todos, { id: nanoid(), todo, isCompleted: false }]);
    setTodo("");
  };
  const handleCompleted = (id: string): void => {
    const newTodos: Todo[] = todos.map((todo) => {
      return id === todo.id
        ? { ...todo, isCompleted: !todo.isCompleted }
        : todo;
    });
    setTodos(newTodos);
  };
  const handleDelete = (id: string): void => {
    const newTodos: Todo[] = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }
    let add,
      active = [...todos],
      complete = [...completeTodos];
    if (source.droppableId === "todoList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    if (destination.droppableId === "todoList") {
      add = { ...add, isCompleted: false };
      active.splice(destination.index, 0, add);
    } else {
      add = { ...add, isCompleted: true };
      complete.splice(destination.index, 0, add);
    }
    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <div className="title">
          <h5 className="title__text">taskify</h5>
          <div className="title__underline"></div>
        </div>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          handleCompleted={handleCompleted}
          handleDelete={handleDelete}
          setTodos={setTodos}
          completedTodos={completeTodos}
          setCompletedTodos={setCompletedTodos}
        />
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </DragDropContext>
  );
};

export default App;
