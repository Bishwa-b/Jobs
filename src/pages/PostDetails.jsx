import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchPostById } from "../services/api";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchPostById(id, { signal: controller.signal })
      .then((data) => setPost(data))
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Failed to load post:", err);
        }
      });

    return () => {
      controller.abort();
    };
  }, [id]);

  if (!post) return <p>Loading…</p>;

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-600">
        &larr; Back
      </Link>
      <h1 className="text-2xl font-bold mt-4">{post.title}</h1>
      <p className="mt-2">{post.body}</p>
    </div>
  );
}
