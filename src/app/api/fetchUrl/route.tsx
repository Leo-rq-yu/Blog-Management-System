// app/api/fetchUrl/route.ts
import { NextResponse } from "next/server";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    // Fetch the image from the provided URL
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Error fetching image from URL" },
        { status: 400 }
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Get the file extension from the URL (this is a simple heuristic)
    const urlParts = url.split(".");
    const extPart = urlParts[urlParts.length - 1];
    const ext = extPart.split("?")[0]; // in case there are query params
    const newFileName = `${uuidv4()}.${ext}`;

    const s3Route = `${newFileName}`;
    // Get the content type from response headers or default to image/jpeg
    const contentType = response.headers.get("content-type") || "image/jpeg";

    const upload = new Upload({
      client: s3,
      params: {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Key: s3Route,
        Body: fileBuffer,
        ContentType: contentType,
      },
    });

    await upload.done();
    const fileUrl = `${process.env.NEXT_PUBLIC_CDN_URL}/${s3Route}`;
    
    return NextResponse.json({ success: 1, file: { url: fileUrl } });
  } catch (error) {
    console.log("Error processing fetchUrl:", error);
    return NextResponse.json(
      { error: "Error uploading file from URL" },
      { status: 500 }
    );
  }
}
