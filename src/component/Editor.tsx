"use client";
import "@/styles/editor.css";
import { useBlogContent } from "./context/BlogContantContext";
import { useEffect, useRef, memo } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "@/utils/tools";
import type { Blog } from "@/lib/blogType";

interface EditorProps {
  editorblock: string;
  data: Blog;
}

const Editor = ({ editorblock, data }: EditorProps) => {
  const { setData } = useBlogContent();
  const ejInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!data || !data.blocks || ejInstance.current) return;

    if (!ejInstance.current) {
      const editor = new EditorJS({
        holder: editorblock,
        data: {
          time: new Date(data.updated_at).getTime(),
          blocks: data.blocks,
        },
        onReady: async () => {
          console.log("Editor is ready to use!");
        },
        onChange: async () => {
          try {
            const content = await editor.saver.save();

            console.log("Data has changed:", content);
            setData({
              ...data,
              blocks: content.blocks,
              updated_at: content.time,
            });
          } catch (e) {
            console.log(e);
          }
        },
        tools: EDITOR_JS_TOOLS,
      });
      ejInstance.current = editor;
    }

    return () => {
      if (ejInstance.current && ejInstance.current.destroy) {
        ejInstance.current.destroy();
      }
    };
  }, [editorblock, data, setData]);

  return <div className="flex-1 h-full px-20 min-w-3/5" id={editorblock} />;
};

export default memo(Editor);
