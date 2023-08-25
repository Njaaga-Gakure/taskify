import { useState, useRef, useEffect } from "react";
import { Todo } from "../models";

import {
  AiOutlineEdit,
  AiTwotoneDelete,
  AiOutlineFileDone,
} from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleCompleted: (id: string) => void;
  handleDelete: (id: string) => void;
  index: number;
}

const SingleTodo: React.FC<Props> = ({
  todo,
  todos,
  setTodos,
  handleCompleted,
  handleDelete,
  index,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleEdit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    if (editTodo) {
      setTodos(
        todos.map((todo) => {
          return id === todo.id ? { ...todo, todo: editTodo } : todo;
        })
      );
      setEdit(false);
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => {
        return (
          <form
            onSubmit={(e) => handleEdit(e, todo.id)}
            className="todo"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {edit ? (
              <input
                type="text"
                className="edit-input"
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                ref={inputRef}
              />
            ) : (
              <span
                className="todo__text"
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.todo}
              </span>
            )}
            <div className="icon-container">
              <span
                className="icon"
                onClick={() => {
                  if (!edit && !todo.isCompleted) {
                    setEdit(!edit);
                  }
                }}
              >
                <AiOutlineEdit />
              </span>
              <span className="icon">
                <AiTwotoneDelete onClick={() => handleDelete(todo.id)} />
              </span>
              <span className="icon">
                <AiOutlineFileDone onClick={() => handleCompleted(todo.id)} />
              </span>
            </div>
          </form>
        );
      }}
    </Draggable>
  );
};

export default SingleTodo;
