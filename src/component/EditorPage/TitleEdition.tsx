import React, { useState, useEffect } from "react";
import { Input, Button, Space, notification } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useBlogContent } from "../context/BlogContantContext";

const EditableTitle = () => {
  const [api, contextHolder] = notification.useNotification();
  const { data, setData } = useBlogContent();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(data.title);

  useEffect(() => {
    setTitle(data.title);
  }, [data.title]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleConfirm = async () => {
    const response = await fetch(`/api/blog/${data.id}?key=title`, {
      method: "PUT",
      body: title,
    });
    if (response.status !== 200) {
      api.error({
        message: "Failed to update title",
        description: "Please try again later",
      });
      console.error("Failed to update title");
      return;
    }
    setData({ ...data, title });
    api.success({
      message: "Title updated",
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setTitle(data.title);
  };

  return (
    <>
      {contextHolder}
      <div className="w-full">
        {editing ? (
          <Space.Compact className="w-full">
            <Input value={title} onChange={handleChange} className="w-full" />
            <Button
              icon={<CheckOutlined />}
              type="primary"
              onClick={handleConfirm}
            />
            <Button icon={<CloseOutlined />} onClick={handleCancel} />
          </Space.Compact>
        ) : (
          <div
            onClick={handleEdit}
            className="cursor-pointer p-2 hover:bg-gray-100 rounded"
          >
            <p className="line-clamp-1 text-center">{title}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default EditableTitle;
