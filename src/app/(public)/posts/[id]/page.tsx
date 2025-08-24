import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PostPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await prisma.post.findUnique({ where: { id: params.id } });
  return {
    title: post ? `${post.title} | AI Batch Blog` : 'Post not found',
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { author: true },
  });
  if (!post) {
    notFound();
  }
  return (
    <article className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-primary mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {post.category.charAt(0) + post.category.slice(1).toLowerCase()} •{' '}
        {new Date(post.createdAt).toLocaleDateString()} • by {post.author?.name || post.author?.email}
      </p>
      {post.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.imageUrl}
          alt="Post image"
          className="w-full max-h-96 object-cover rounded-md mb-4"
        />
      )}
      <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}