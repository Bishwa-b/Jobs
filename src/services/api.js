const API_BASE = 'https://jsonplaceholder.typicode.com';

export async function fetchPosts({ signal } = {}) {
  const res = await fetch(`${API_BASE}/posts`, { signal });
  return res.json();
}

export async function fetchPostById(id, { signal } = {}) {
  const res = await fetch(`${API_BASE}/posts/${id}`,{signal});
  return res.json();
}
