import PostItem from "./PostItem";

export default function PostList({ posts, onEdit }) {
  return (
    <>
      <h1 className="text-xl font-bold mb-6">Job Listings</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} onEdit={onEdit} />
        ))}
      </ul>
    </>
  );
}
