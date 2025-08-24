"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface EditPostFormProps {
  post: {
    id: string;
    title: string;
    content: string;
    category: string;
    imageUrl?: string | null;
  };
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [category, setCategory] = useState(post.category);
  const [content, setContent] = useState(post.content);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined | null>(post.imageUrl ?? undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let uploadedUrl = imageUrl;
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || 'Upload failed');
        uploadedUrl = uploadData.fileUrl;
      }
      const res = await fetch(`/api/posts?id=${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category, imageUrl: uploadedUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update post');
      router.push('/dashboard/posts');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
            <option value="RESEARCH">Research</option>
            <option value="EVENTS">Events</option>
            <option value="ACHIEVEMENTS">Achievements</option>
            <option value="NOTICES">Notices</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Image</label>
          {imageUrl ? (
            <img src={imageUrl} alt="Current" className="max-h-40 mb-2" />
          ) : (
            <p className="text-sm text-gray-500">No image uploaded.</p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImageFile(file);
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
}