import prisma from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; // allow dynamic data at build

async function getLatestPosts() {
  return await prisma.post.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  });
}

export default async function HomePage() {
  const posts = await getLatestPosts();
  return (
    <main className="max-w-5xl mx-auto py-8 px-4">
      {/* Hero Section */}
      <section className="text-center py-10">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          M.Tech AI Batch 2025–27
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Welcome to the official blog and news portal for the M.Tech Artificial Intelligence batch at IIT Jodhpur. Stay tuned for research updates, events, achievements, and notices.
        </p>
      </section>
      {/* Latest Posts Section */}
      <section className="py-6">
        <h2 className="text-2xl font-semibold mb-4">Latest Updates</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.id}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-primary mb-1">
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {post.category.charAt(0) + post.category.slice(1).toLowerCase()} •{' '}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 overflow-hidden">
                {post.content.slice(0, 150)}
                {post.content.length > 150 ? '...' : ''}
              </p>
              <div className="mt-2 text-right">
                <Link
                  href={`/posts/${post.id}`}
                  className="text-sm text-primary hover:underline"
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}