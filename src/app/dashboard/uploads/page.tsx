"use client";
import { useEffect, useState } from 'react';

interface Upload {
  id: string;
  fileUrl: string;
  fileType: string;
  createdAt: string;
  uploadedBy: {
    id: string;
    name: string | null;
    email: string;
  };
}

export default function UploadsDashboard() {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUploads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/upload');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch');
      setUploads(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Uploads</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : uploads.length === 0 ? (
        <p>No uploads found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {uploads.map((upload) => (
            <div
              key={upload.id}
              className="p-4 bg-white shadow rounded-lg flex flex-col"
            >
              {upload.fileType.startsWith('image') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={upload.fileUrl}
                  alt="Uploaded"
                  className="w-full h-40 object-cover rounded mb-2"
                />
              ) : (
                <div className="h-40 flex items-center justify-center bg-gray-100 rounded mb-2">
                  <p className="text-gray-500">{upload.fileType}</p>
                </div>
              )}
              <a
                href={upload.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline mt-auto"
              >
                View File
              </a>
              <p className="text-sm text-gray-500 mt-1">
                Uploaded by {upload.uploadedBy.name || upload.uploadedBy.email}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(upload.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}