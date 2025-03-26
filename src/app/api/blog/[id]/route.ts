/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Readable } from 'stream';

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const sql = neon(String(process.env.DATABASE_URL));

const streamToString = async (stream: Readable): Promise<string> =>
  new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
  });

// Get the blog with id
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // get blog meta data
    const blog = await sql`SELECT * FROM blogs WHERE id = ${id}`;
    if (blog.length === 0) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }
    const recordTag = blog[0].tag;
    const s3Route = `${recordTag}/${id}.json`;

    const command = new GetObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: s3Route,
    });
    const s3Response = await s3.send(command);

    const bodyContents = s3Response.Body ? await streamToString(s3Response.Body as Readable) : null;
    if (!bodyContents) {
      return NextResponse.json({ message: 'Blog content not found' }, { status: 404 });
    }

    const blogContent = JSON.parse(bodyContents);
    return NextResponse.json({ ...blog[0], blocks: blogContent }, { status: 200 });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ message: 'An error occurred in get a blog' }, { status: 500 });
  }
}

// Update blog content with id to S3
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { tag, content } = await req.json();
    const s3Route = `/${tag}/${id}.json`;
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Key: s3Route,
        Body: JSON.stringify(content),
        ContentType: "application/json",
      },
    });

    await upload.done();

    const updated_at = Date.now();
    await sql`UPDATE blogs SET updated_at = TO_TIMESTAMP(${updated_at / 1000}) WHERE id = ${id}`;

    return NextResponse.json({ id });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ message: 'An error occurred in update blog content' }, { status: 500 });
  }
};


// Update the blog with id
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const searchParams = req.nextUrl.searchParams;
    const key = searchParams.get('key');
    // if has key, then update one field, otherwise, update all fields
    if (key) {
      const value = await req.text();
      await sql`UPDATE blogs SET ${key} = ${value} WHERE id = ${id}`;
      return NextResponse.json({ id });
    }
    const { title, author, tag, description, keywords, cover_image_url }: {
      title: string,
      author: string | null,
      tag: string,
      description: string | null,
      keywords: string[] | null,
      cover_image_url: string | null,
    } = await req.json();

    const updated_at = Date.now();

    await sql`UPDATE blogs SET title = ${title}, author = ${author}, tag = ${tag}, description = ${description}, keywords = ${keywords}, cover_image_url = ${cover_image_url}, updated_at = to_timestamp(${updated_at / 1000}) WHERE id = ${id}`;

    return NextResponse.json({ id });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ message: 'An error occurred in update blog' }, { status: 500 });
  }
};

// Delete the blog with id
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (id === "example") {
      return NextResponse.json({ id });
    }
    await sql`DELETE FROM blogs WHERE id = ${id}`;

    return NextResponse.json({ id });
  }
  catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ message: 'An error occurred in delete blog' }, { status: 500 });
  }
};

export const config = {
  runtime: 'edge',
};
