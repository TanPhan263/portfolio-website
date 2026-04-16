// Example: app/api/experience/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/libs/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    
    const data = await db.collection("experiences").find({}).toArray();
    
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}