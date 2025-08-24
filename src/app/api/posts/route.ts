import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/db';

// Handler for GET and POST requests to /api/posts
export async function GET(req: NextRequest) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: true },
    });
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { title, content, imageUrl, category } = await req.json();
  if (!title || !content || !category) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
        category,
        authorId: session.user.id,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

// Handler for PUT and DELETE requests to /api/posts?id=<postId>
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const { title, content, imageUrl, category } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        imageUrl,
        category,
      },
    });
    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  try {
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ message: 'Post deleted' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}