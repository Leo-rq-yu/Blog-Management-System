// import Link from "next/link";
import Image from "next/image";
import {type Blog, DEFAULT_BLOG } from "@/lib/blogType";
import BlogCard from "@/component/Homepage/BlogCard";
import CreateNewBlogButton from "@/component/Homepage/CreateNewBlog";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

async function getBlogs(): Promise<Blog[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/blog");
  const blogs = await response.json();
  return blogs;
}

export default async function Home() {
  const blogs: Blog[] = await getBlogs();
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <header className="bg-white shadow fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/inkspire.svg"
              width={40}
              height={40}
              alt="Inkspire Logo"
            />
            <span className="text-xl font-bold text-gray-800 select-none">
              Inkspire
            </span>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto mt-16 px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Ignite Your Ideas with Inkspire
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A modern open-source blog management tool designed for seamless
          creation, editing, and publishing.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mx-auto">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
          <BlogCard
            blog={{
              id: DEFAULT_BLOG.id,
              title: DEFAULT_BLOG.title,
              author: DEFAULT_BLOG.author,
              tag: DEFAULT_BLOG.tag,
              keywords: DEFAULT_BLOG.keywords,
              description: DEFAULT_BLOG.description,
              status: DEFAULT_BLOG.status,
              cover_image_url: DEFAULT_BLOG.cover_image_url,
              created_at: DEFAULT_BLOG.created_at,
              updated_at: DEFAULT_BLOG.updated_at,
              published_at: DEFAULT_BLOG.published_at,
            }}
          />

          <CreateNewBlogButton />
        </div>
      </main>

      <footer className="bg-white shadow mt-8">
        <div className="container mx-auto px-4 py-6 text-gray-500 text-sm">
          © {new Date().getFullYear()} Inkspire. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
