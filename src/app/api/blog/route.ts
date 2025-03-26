import { NextResponse, NextRequest } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { v4 as uuidv4 } from 'uuid';

const sql = neon(String(process.env.DATABASE_URL));

// Get all blogs
export async function GET() {
  try {
    const blogs = await sql('SELECT * FROM blogs');
    return NextResponse.json(blogs);
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ message: 'An error occurred in get all blogs' }, { status: 500 });
  }
}

// Create a new blog
export async function POST(req: NextRequest) {
  try {
    const { title, author, tag, description, keywords, cover_image_url, created_at }: {
      title: string,
      author: string | null,
      tag: string,
      description: string | null,
      keywords: string[] | null,
      cover_image_url: string | null,
      created_at: number
    } = await req.json();

    const id = uuidv4();
    await sql`INSERT INTO blogs (id, title, author, tag, status, description, keywords, cover_image_url, created_at, updated_at) VALUES (${id}, ${title}, ${author}, ${tag}, ${'draft'}, ${description}, ${keywords?.join(";")}, ${cover_image_url}, TO_TIMESTAMP(${created_at / 1000} ), TO_TIMESTAMP(${created_at / 1000}))`;

    await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + `/api/blog/${id}`,
      {
        method: 'POST',
        body: JSON.stringify({
          tag, content: [{
            id: "1",
            type: "header",
            data: {
              text: "Hello, I am a blog. Start from the title!",
              level: 1,
            },
          },]
        }),
      }
    );

    return NextResponse.json({ id });
  }
  catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ message: 'An error occurred in create a blog' }, { status: 500 });
  }
}

export const config = {
  runtime: 'edge',
};
