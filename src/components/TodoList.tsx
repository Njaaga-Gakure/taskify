import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../models";
import SingleTodo from "./SingleTodo";
interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleCompleted: (id: string) => void;
  handleDelete: (id: string) => void;
}
const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
  handleCompleted,
  handleDelete,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="todoList">
        {(provided, snapshot) => {
          return (
            <div
              className={`todos ${
                snapshot.isDraggingOver ? "drag-active" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">active tasks</span>
              {todos.map((todo, index) => {
                return (
                  <SingleTodo
                    index={index}
                    key={todo.id}
                    todo={todo}
                    todos={todos}
                    setTodos={setTodos}
                    handleCompleted={handleCompleted}
                    handleDelete={handleDelete}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
      <Droppable droppableId="todoRemove">
        {(provided, snapshot) => {
          return (
            <div
              className={`todos todos--remove ${
                snapshot.isDraggingOver ? "drag-remove" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">completed tasks</span>
              {completedTodos.map((todo, index) => {
                return (
                  <SingleTodo
                    index={index}
                    key={todo.id}
                    todo={todo}
                    todos={completedTodos}
                    setTodos={setCompletedTodos}
                    handleCompleted={handleCompleted}
                    handleDelete={handleDelete}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default TodoList;
