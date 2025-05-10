"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/component/Editor"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-300 animate-pulse rounded-md mx-2" />
  ),
});
const Previewer = dynamic(() => import("@/component/Previewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-300 animate-pulse rounded-md mx-2" />
  ),
});
import { Splitter } from "antd";
import type { Blog } from "@/lib/blogType";
import { useBlogContent } from "@/component/context/BlogContantContext";

const EditorPageUI = ({ blog }: { blog: Blog }) => {
  const { setData } = useBlogContent();

  useEffect(() => {
    setData(blog);
  }, [blog, setData]);

  return (
    <Splitter
      style={{
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        padding: "1rem 0 0 0",
      }}
    >
      <Splitter.Panel
        defaultSize="40%"
        min="20%"
        max="70%"
        style={{ margin: "0 2rem 1rem 0", backgroundColor: "#fff" }}
      >
        <p className="text-black font-semibold text-xl w-[calc(100%-16px)] text-center py-2 mx-2 border-b border-gray-300">Editor Panel</p>
        <Editor editorblock="editorjs-container" data={blog}/>
      </Splitter.Panel>
      <Splitter.Panel
        defaultSize="60%"
        min="30%"
        max="80%"
        style={{
          margin: "0 0 1rem 2rem",
          backgroundColor: "#fff",
        }}
      >
        <p className="text-black font-semibold text-xl w-[calc(100%-16px)] text-center py-2 mx-2 border-b border-gray-300">Preview Panel</p>
        <Previewer />
      </Splitter.Panel>
    </Splitter>
  );
};

export default EditorPageUI;
