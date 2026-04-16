// Example: app/api/blogs/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/libs/mongodb';

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("test");

    const { searchParams } = new URL(request.url);
    
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '12';
    const skip = (parseInt(page) - 1) * parseInt(pageSize);

    const data = await db.collection("blogs").find({}).skip(skip).limit(parseInt(pageSize)).toArray();
    
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Database error" }, { status: 500 });
  }
}