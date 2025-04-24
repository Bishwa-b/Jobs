import { useState, useEffect } from "react";

export default function PostForm({ onSave, initial = null }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // if editing, pre-fill
  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setBody(initial.body);
    }
  }, [initial]);

  function handleSubmit(e) {
    e.preventDefault();
    const post = initial
      ? { ...initial, title, body }
      : { id: Date.now(), title, body };
    onSave(post);
    if (!initial) {
      setTitle("");
      setBody("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-xl font-bold mb-6">
        {initial ? "Edit Post" : "New Post"}
      </h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="border p-2 w-full mb-2 rounded-lg"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
        required
        className="border p-2 w-full mb-2 rounded-lg"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        {initial ? "Update" : "Add"} Post
      </button>
    </form>
  );
}
