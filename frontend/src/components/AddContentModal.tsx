"use client";

import { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Space,
  App,
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
  const { message } = App.useApp();
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
      title={<span className="text-[#fafafa]">Add New Content</span>}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={600}
      destroyOnHidden
      className="dark-modal"
      styles={{
        mask: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        header: { backgroundColor: "#18181b", borderBottom: "1px solid #27272a" },
      }}
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
          label={<span className="text-[#a1a1aa]">Content Type</span>}
          rules={[{ required: true, message: "Please select a content type" }]}
        >
          <Select 
            size="large" 
            placeholder="Select type"
            className="!bg-[#27272a]"
            styles={{ popup: { backgroundColor: "#27272a", border: "1px solid #3f3f46" } }}
          >
            {typeOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                <Space>
                  <span className="text-[#fafafa]">{option.icon}</span>
                  <span className="text-[#fafafa]">{option.label}</span>
                </Space>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="title"
          label={<span className="text-[#a1a1aa]">Title</span>}
          rules={[
            { required: true, message: "Please enter a title" },
            { max: 200, message: "Title must be less than 200 characters" },
          ]}
        >
          <Input 
            size="large" 
            placeholder="Enter content title" 
            className="!bg-[#27272a] !border-[#3f3f46] !text-[#fafafa] placeholder:!text-[#71717a]"
          />
        </Form.Item>

        <Form.Item
          name="tags"
          label={<span className="text-[#a1a1aa]">Tags</span>}
          help={<span className="text-[#71717a]">Separate tags with commas (e.g., tutorial, javascript, webdev)</span>}
        >
          <Input 
            size="large" 
            placeholder="Add tags (optional)" 
            className="!bg-[#27272a] !border-[#3f3f46] !text-[#fafafa] placeholder:!text-[#71717a]"
          />
        </Form.Item>

        <Form.Item className="mb-0 mt-6">
          <Space className="w-full justify-end">
            <Button 
              onClick={handleCancel} 
              size="large"
              className="!bg-transparent !text-[#a1a1aa] !border-[#27272a] hover:!border-[#3f3f46] hover:!text-[#fafafa]"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              size="large"
              className="!bg-[#fafafa] !text-[#0a0a0a] hover:!bg-[#e4e4e7] !border-none !rounded-md !font-medium"
            >
              Add Content
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
