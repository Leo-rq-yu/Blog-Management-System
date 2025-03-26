import { NextResponse, NextRequest } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(String(process.env.DATABASE_URL));

//Publish a blog with id
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const published_at = Date.now();

    await sql`UPDATE blogs SET status = ${'published'}, published_at = to_timestamp(${published_at / 1000}) WHERE id = ${id}`;
    return NextResponse.json({ id });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ message: 'An error occurred in publish blog' }, { status: 500 });
  }
}