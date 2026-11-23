import { useState } from "react";

function TodoList() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const tambahTodo = () => {
    if (input.trim() === "") return;
    // buat array baru, jangan di-push langsung
    setTodos([...todos, { id: Date.now(), text: input, selesai: false }]);
    setInput("");
  };

  const toggleSelesai = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, selesai: !t.selesai } : t))
    );
  };

  const hapusTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tulis tugas..."
      />
      <button onClick={tambahTodo}>Tambah</button>

      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <span
              onClick={() => toggleSelesai(t.id)}
              style={{
                textDecoration: t.selesai ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {t.text}
            </span>
            <button onClick={() => hapusTodo(t.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;