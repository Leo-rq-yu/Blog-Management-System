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
  const searchParams = new URLSearchParams(req.url.split("?")[1]);
  const source = searchParams.get("source");
  let key = "image";
  if (source === "editorjs") {
    key = "file";
  } else if (source === "upload") {
    key = "image";
  }

  try {
    const formData = await req.formData();
    const file = formData.get(key) as File; // Assume the file input name is "image"
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const stream = file.stream();
    const ext = file.name.split(".").pop();
    const newFileName = `${uuidv4()}.${ext}`;
    const s3Route = `${newFileName}`;
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Key: s3Route,
        Body: stream,
        ContentType: file.type,
      },
    });

    await upload.done();
    const fileUrl = `${process.env.NEXT_PUBLIC_CDN_URL}/${s3Route}`;

    return NextResponse.json({ success: 1, file: { url: fileUrl } });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
