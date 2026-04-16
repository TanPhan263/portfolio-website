// Example: app/api/blogs/related/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/libs/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authorId = searchParams.get('authorId');

  if (!authorId) {
    return NextResponse.json({ error: "Missing authorId parameter" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("test");
    
    const data = await db.collection("blogs").find({authorId: new ObjectId(authorId) }).toArray();
    
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}