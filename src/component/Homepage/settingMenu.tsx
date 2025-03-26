"use client";
import EditBlogForm from "@/component/Homepage/EditBlogForm";
import { Button, Dropdown, type MenuProps, notification, Modal } from "antd";
import {
  DeleteOutlined,
  SettingOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Blog } from "@/lib/blogType";

const SettingMenu = ({ blog }: { blog: Blog }) => {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const [confirmModal, setConfirmModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteClick = (e: {
    domEvent: { stopPropagation: () => void };
  }) => {
    // Stop event propagation to prevent unwanted side-effects from Dropdown
    e.domEvent.stopPropagation();
    setConfirmModal(true);
  };

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

  const items: MenuProps["items"] = [
    {
      label: <p>Edit</p>,
      icon: <EditOutlined />,
      key: "0",
      onClick: () => {
        setEditModal(true);
      },
    },
    {
      label: <p>Delete</p>,
      icon: <DeleteOutlined />,
      key: "1",
      onClick: handleDeleteClick,
      danger: true,
    },
  ];

  return (
    <>
      {contextHolder}
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button type="text" icon={<SettingOutlined />} />
      </Dropdown>
      <Modal
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
      </Modal>{" "}
      <Modal
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

export default SettingMenu;
