"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  category: string;
  createdAt: string;
}

export default function PostsDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch');
      setPosts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`/api/posts?id=${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete');
      }
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link
          href="/dashboard/posts/new"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          New Post
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-sm font-medium text-gray-600">Title</th>
                <th className="px-3 py-2 text-left text-sm font-medium text-gray-600">Category</th>
                <th className="px-3 py-2 text-left text-sm font-medium text-gray-600">Created</th>
                <th className="px-3 py-2 text-right text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id} className="bg-white hover:bg-gray-50">
                  <td className="px-3 py-2 whitespace-nowrap">{post.title}</td>
                  <td className="px-3 py-2 whitespace-nowrap capitalize">
                    {post.category.toLowerCase()}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right space-x-2">
                    <Link
                      href={`/dashboard/posts/${post.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}