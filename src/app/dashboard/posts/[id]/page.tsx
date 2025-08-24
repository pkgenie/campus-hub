import prisma from '@/lib/db';
import EditPostForm from '@/components/EditPostForm';
import { notFound } from 'next/navigation';

interface EditPageProps {
  params: { id: string };
}

export default async function EditPostPage({ params }: EditPageProps) {
  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) {
    notFound();
  }
  return <EditPostForm post={post} />;
}