import { useState, useEffect } from "react";
export default function SearchBar({ onChange }) {
  const [text, setText] = useState("");
  useEffect(() => {
    const h = setTimeout(() => onChange(text), 150);
    return () => clearTimeout(h);
  }, [text, onChange]);
  return (
    <input
      type="text"
      placeholder="Search by title…"
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="border p-2 mb-4 rounded-full"
    />
  );
}
