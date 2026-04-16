// Example: app/api/blogs/[id]/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/libs/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("test");
    
    const data = await db.collection("blogs").find({_id: new ObjectId(id) }).toArray();
    
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}