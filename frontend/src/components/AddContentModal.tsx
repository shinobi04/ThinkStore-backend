"use client";

import { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Space,
  message,
  Typography,
} from "antd";
import {
  LinkOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useContentStore } from "@/stores/contentStore";
import { ContentType } from "@/lib/types";

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  type: ContentType;
  title: string;
  tags: string;
}

const typeOptions = [
  { value: "link", label: "Link", icon: <LinkOutlined /> },
  { value: "tweet", label: "Tweet", icon: <TwitterOutlined /> },
  { value: "youtube", label: "YouTube", icon: <YoutubeOutlined /> },
  { value: "document", label: "Document", icon: <FileTextOutlined /> },
];

export function AddContentModal({ isOpen, onClose }: AddContentModalProps) {
  const [form] = Form.useForm<FormValues>();
  const { addContent } = useContentStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const tagsArray = values.tags
        ? values.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
        : [];

      await addContent({
        type: values.type,
        title: values.title,
        tags: tagsArray,
      });

      message.success("Content added successfully!");
      form.resetFields();
      onClose();
    } catch {
      message.error("Failed to add content");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Add New Content"
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={600}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ type: "link" }}
        className="mt-4"
      >
        <Form.Item
          name="type"
          label="Content Type"
          rules={[{ required: true, message: "Please select a content type" }]}
        >
          <Select size="large" placeholder="Select type">
            {typeOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                <Space>
                  {option.icon}
                  {option.label}
                </Space>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: "Please enter a title" },
            { max: 200, message: "Title must be less than 200 characters" },
          ]}
        >
          <Input size="large" placeholder="Enter content title" />
        </Form.Item>

        <Form.Item
          name="tags"
          label="Tags"
          help="Separate tags with commas (e.g., tutorial, javascript, webdev)"
        >
          <Input size="large" placeholder="Add tags (optional)" />
        </Form.Item>

        <Form.Item className="mb-0 mt-6">
          <Space className="w-full justify-end">
            <Button onClick={handleCancel} size="large">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              size="large"
            >
              Add Content
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
