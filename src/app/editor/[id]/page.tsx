import { Metadata } from "next";
import { BlogContentProvider } from "@/component/context/BlogContantContext";
import EditorPageUI from "@/component/EditorPage/EditorPageUI";
import EditorPageHeader from "@/component/EditorPage/header";
import { type Blog, DEFAULT_BLOG } from "@/lib/blogType";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  // Fetch the blog data based on the blog id from URL parameters
  const blogResponse = await fetch(
    process.env.NEXT_PUBLIC_DOMAIN + `/api/blog/${id}`
  );
  const blog = await blogResponse.json();

  // Create a dynamic title and description for SEO
  return {
    title: `${blog.title} | Inkspire`,
    description: blog.description,
    // Keywords can be an array or a comma-separated string; Next.js supports both.
    keywords: blog.keywords,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: blog.cover_image_url ? [blog.cover_image_url] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: blog.cover_image_url ? [blog.cover_image_url] : [],
    },
  };
}

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let blog: Blog = {
    id: "",
    title: "",
    author: "",
    tag: "",
    status: "draft",
    keywords: null,
    cover_image_url: null,
    description: null,
    created_at: "",
    updated_at: "",
    published_at: null,
  };

  if (id == "example") {
    blog = DEFAULT_BLOG;
  } else {
    const blogResponse = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + `/api/blog/${id}`
    );
    blog = await blogResponse.json();
  }

  return (
    <BlogContentProvider>
      <div className="flex flex-col h-screen bg-zinc-100">
        <header className="border-b-gray-300 border-b shadow-lg">
          <EditorPageHeader />
        </header>
        <main className="w-full h-full flex flex-col gap-4 overflow-hidden mt-4">
          <EditorPageUI blog={blog} />
        </main>
      </div>
    </BlogContentProvider>
  );
}
