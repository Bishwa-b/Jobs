import { useState, useEffect } from "react";
import { fetchPosts } from "../services/api";
import SearchBar from "../components/SearchBar";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";

export default function HomePage() {
  const [allPosts, setAllPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // load initial posts
  useEffect(() => {
    const controller = new AbortController();
    fetchPosts({ signal: controller.signal })
      .then((posts) => setAllPosts(posts))
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });
    return () => controller.abort();
  }, []);

  // add or update post in local state
  function upsertPost(post) {
    setAllPosts((prev) => {
      const exists = prev.find((p) => p.id === post.id);
      return exists
        ? prev.map((p) => (p.id === post.id ? post : p))
        : [post, ...prev];
    });
  }

  // filtered by title
  const visible = allPosts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 bg-grey-50 flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold mb-6">Posts</h1>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <PostForm onSave={upsertPost} />
      <PostList posts={visible} onEdit={upsertPost} />
    </div>
  );
}
