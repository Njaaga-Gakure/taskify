interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  return (
    <form onSubmit={handleAdd} className="form">
      <input
        type="text"
        className="form__input"
        placeholder="Enter a Task..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="form__btn">Add</button>
    </form>
  );
};
export default InputField;
