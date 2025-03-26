/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  Input,
  Select,
  Button,
  Spin,
  notification,
  Upload,
  type UploadFile,
} from "antd";
import type { SelectProps } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { createBlog } from "@/utils/serverActions";

const options: SelectProps["options"] = [];

type FieldType = {
  title?: string;
  author?: string;
  tag?: string;
  description?: string;
  keywords?: string[];
  cover_image_url?: UploadFile[];
};

interface CreateBlogFormProps {
  closeModel: () => void;
}

const CreateBlogForm = ({ closeModel }: CreateBlogFormProps) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList || [];
  };

  const handleSubmit = async (values: FieldType) => {
    setLoading(true);
    if ((values.cover_image_url ?? []).length > 1) {
      api.error({
        message: "Please upload only one image",
      });
      setLoading(false);
      return;
    }  
    const created_at = Date.now();
    const response = await fetch("/api/blog", {
      method: "POST",
      body: JSON.stringify({
        title: values.title,
        author: values.author,
        tag: values.tag,
        description: values.description,
        keywords: values.keywords,
        cover_image_url: values.cover_image_url?.[0]?.url,
        created_at,
      }),
    });
    if (response.status !== 200) {
      api.error({
        message: "Failed to create blog",
        description: "Please try again later",
      });
      setLoading(false);
      return;
    }

    const data: { id: string } = await response.json();
    setLoading(false);
    router.push(`/editor/${data.id}`);
    closeModel();
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item<FieldType>
            label="Title"
            name="title"
            layout="vertical"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Blog Title" />
          </Form.Item>
          <Form.Item<FieldType> layout="vertical" label="Author" name="author">
            <Input placeholder="Author name" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Tag"
            name="tag"
            layout="vertical"
            tooltip="This tag will be used for blog content storage routing, as a folder name."
            rules={[{ required: false }]}
          >
            <Input placeholder="Tag for storage routing" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Description"
            name="description"
            layout="vertical"
            tooltip="This description will be used for SEO."
            rules={[{ required: false }]}
          >
            <Input.TextArea placeholder="Description for SEO" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Keywords"
            name="keywords"
            layout="vertical"
            tooltip="These keywords will be used for SEO."
            rules={[{ required: false }]}
          >
            <Select
              mode="tags"
              options={options}
              placeholder="Keywords for SEO"
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Cover Image URL"
            name="cover_image_url"
            layout="vertical"
            tooltip="This image will be used for SEO."
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: false }]}
          >
            <Upload.Dragger
              name="file"
              action="/api/uploadFile?source=editorjs" // Your API endpoint for file upload
              multiple={false}
              listType="picture"
              onChange={(info) => {
                const { status, response } = info.file;
                if (status !== "uploading") {
                  console.log(info.file, info.fileList);
                }
                if (status === "done") {
                  api.success({
                    message: `${info.file.name} file uploaded successfully.`,
                  });
                  if (response && response.success) {
                    // Update the form field with the returned URL
                    const url = response.file.url;
                    form.setFieldsValue({
                      cover_image_url: [
                        { id: info.file.uid, url: url, status: "done", name: info.file.name },
                      ],
                    });
                  }
                } else if (status === "error") {
                  api.error({
                    message: `${info.file.name} file upload failed.`,
                  });
                }
              }}
              onDrop={(e) => {
                console.log("Dropped files", e.dataTransfer.files);
              }}
            >
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single upload. Drag and drop a file or click to
                select one.
              </p>
            </Upload.Dragger>
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};

export default CreateBlogForm;
