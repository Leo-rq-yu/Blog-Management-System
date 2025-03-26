"use client";
import { useState } from "react";
import type { Blog } from "@/lib/blogType";
import { TimeStrConvertion } from "@/utils/timeFunc";
import EditBlogForm from "@/component/Homepage/EditBlogForm";
import Link from "next/link";
import { Card, notification, Modal, Image } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Meta } = Card;

interface BlogCardProps {
  blog: Blog;
}

const converTime = (time: string) => {
  const timeStamp = new Date(time).getTime();
  return TimeStrConvertion(timeStamp);
};

const BlogCard = ({ blog }: BlogCardProps) => {
  const router = useRouter();
  const [confirmModal, setConfirmModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const handleOk = async () => {
    setLoading(true);
    const response = await fetch(`/api/blog/${blog.id}`, {
      method: "DELETE",
    });
    if (response.status !== 200) {
      api.error({
        message: "Failed to delete blog",
        description: "Please try again later",
      });
    } else {
      api.success({
        message: "Blog deleted successfully",
      });
    }
    setLoading(false);
    setConfirmModal(false);
    router.refresh();
  };

  const handleCancel = () => {
    setConfirmModal(false);
  };

  return (
    <>
      {contextHolder}
      <Card
        hoverable
        className="w-64 border border-black  hover:bg-gray-100 hover:shadow-lg duration-50 transition-all overflow-hidden"
        cover={
          <Image
            alt="blog cover"
            src={blog.cover_image_url || ""}
            width={256}
            height={128}
          />
        }
        actions={[
          <Link key="edit" href={`/editor/${blog.id}`}>
            <EditOutlined />
          </Link>,
          <SettingOutlined key="setting" onClick={() => setEditModal(true)} />,
          <DeleteOutlined
            color="red"
            key="delete"
            onClick={() => setConfirmModal(true)}
          />,
        ]}
      >
        <Meta title={blog.title} />
        <div className="h-full mt-4">
          <p className="text-sm text-gray-500">
            Status: {blog.status === "draft" ? "Draft" : "Published"}
          </p>
          <p className="text-sm text-gray-400">
            Created At: {converTime(blog.created_at)}
          </p>
        </div>
      </Card>
      <Modal
        className="my-4"
        open={confirmModal}
        title="Confirm Delete"
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
        okType="danger"
        centered
        loading={loading}
      >
        <p>Are you sure you want to delete this blog?</p>
      </Modal>
      <Modal
        className="my-4"
        centered
        title="Edit Blog Details"
        footer={null}
        open={editModal}
        onCancel={() => setEditModal(false)}
      >
        <div className="p-4">
          <EditBlogForm blog={blog} closeModel={() => setEditModal(false)} />
        </div>
      </Modal>
    </>
  );
};
export default BlogCard;
