import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/db';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const formData = await req.formData();
    const file = formData.get('file') as unknown as File;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadToCloudinary(buffer, 'uploads');
    const uploadRecord = await prisma.upload.create({
      data: {
        fileUrl: url,
        fileType: file.type || 'unknown',
        userId: session.user.id,
      },
    });
    return NextResponse.json(uploadRecord, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}

// List uploads
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    let uploads;
    if (session.user.role === 'ADMIN') {
      uploads = await prisma.upload.findMany({
        include: { uploadedBy: true },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      uploads = await prisma.upload.findMany({
        where: { userId: session.user.id },
        include: { uploadedBy: true },
        orderBy: { createdAt: 'desc' },
      });
    }
    return NextResponse.json(uploads);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch uploads' }, { status: 500 });
  }
}