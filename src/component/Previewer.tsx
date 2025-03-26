"use client";
import "@/styles/previewer.css";
import { useEffect } from "react";
import { renderEditorJS } from "@/utils/renderfunc";
import { useBlogContent } from "./context/BlogContantContext";

const Previewer = () => {
  const { data } = useBlogContent();

  useEffect(() => {
    if (!data.blocks) {
      return;
    }
    const anchors = document.querySelectorAll(".article-page a");
    anchors.forEach((anchor) => {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
    });
  }, [data]);

  if (!data.blocks) {
    return <></>;
  }
  const htmlContent = renderEditorJS(data.blocks);

  return (
    <article
      className="article-page"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default Previewer;
