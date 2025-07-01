import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client'; // Adjust path
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  const body = await req.json();
  const { name, email, comment, blogId } = body;

  try {
    await client.create({
      _type: 'blogComment',
      name,
      email,
      comment,
      blog: {
        _type: 'reference',
        _ref: blogId,
      },
      approved: false,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Comment creation failed:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
