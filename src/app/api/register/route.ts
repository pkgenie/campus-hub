import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { hash } from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }
    const hashed = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: 'AUTHOR',
      },
    });
    return NextResponse.json({ message: 'User created', user }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to register' }, { status: 500 });
  }
}