"use client";
import React, { useState } from "react";
import { Modal } from "antd";
import dynamic from "next/dynamic";
const BlogForm = dynamic(() => import("./BlogForm"));

const CreateNewBlogButton = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        className="w-64 h-[300px] justify-self-start bg-white border-2 border-dashed border-gray-300 rounded-lg
             flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 hover:cursor-pointer"
        onClick={() => setOpenModal(true)}
      >
        <svg
          className="w-8 h-8 mb-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span className="font-medium">Create New Blog</span>
      </button>
      <Modal
        centered
        title="Create New Blog"
        footer={null}
        open={openModal}
        onCancel={() => setOpenModal(false)}
      >
        <div className="p-4">
          <BlogForm closeModel={() => setOpenModal(false)} isEdit={false} />
        </div>
      </Modal>
    </>
  );
};

export default CreateNewBlogButton;
