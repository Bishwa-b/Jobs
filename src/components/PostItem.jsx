import { Link } from "react-router-dom";
import { useState } from "react";
import PostForm from "./PostForm";

export default function PostItem({ post, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <PostForm
        initial={post}
        onSave={(p) => {
          onEdit(p);
          setIsEditing(false);
        }}
      />
    );
  }

  return (
    <li className="border p-4 rounded shadow hover:shadow-lg transform hover:-translate-y-1 transition duration-200 ease-out">
      <h3 className="text-lg font-semibold">{post.title}</h3>
      <p>{post.body.slice(0, 80)}…</p>
      <div className="mt-2 flex gap-2">
        <Link to={`/posts/${post.id}`} className="text-blue-600">
          View
        </Link>
        {/* only allow editing of locally added posts (id > 10000) */}
        {post.id > 10000 && (
          <button onClick={() => setIsEditing(true)} className="text-green-600">
            Edit
          </button>
        )}
      </div>
    </li>
  );
}
