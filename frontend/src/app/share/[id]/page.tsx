"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/api";
import { ShareContent } from "@/lib/types";
import {
  Card,
  Typography,
  Tag,
  Space,
  Spin,
  Alert,
  Button,
  Avatar,
} from "antd";
import {
  LinkOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  FileTextOutlined,
  UserOutlined,
  ArrowLeftOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

// Monochrome icon configuration
const typeConfig = {
  link: {
    icon: <LinkOutlined />,
    label: "Link",
  },
  tweet: {
    icon: <TwitterOutlined />,
    label: "Tweet",
  },
  youtube: {
    icon: <YoutubeOutlined />,
    label: "YouTube",
  },
  document: {
    icon: <FileTextOutlined />,
    label: "Document",
  },
};

export default function SharePage() {
  const router = useRouter();
  const params = useParams();
  const [content, setContent] = useState<ShareContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const linkId = params.id as string;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await apiClient.getSharedContent(linkId);
        setContent(response.data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load shared content";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [linkId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Spin size="large" className="text-[#71717a]" />
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push("/")}
            className="mb-4 text-[#71717a] hover:text-[#fafafa] !border-none"
          >
            Back to Home
          </Button>
          <Alert
            message="Content Not Found"
            description={error || "This shared link may have expired or been removed."}
            type="error"
            showIcon
            className="!bg-[#18181b] !border-[#27272a]"
          />
        </div>
      </div>
    );
  }

  const typeInfo = typeConfig[content.type];
  const formattedDate = new Date(content.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push("/")}
          className="mb-6 text-[#71717a] hover:text-[#fafafa] !border-none"
        >
          Back to Home
        </Button>

        <Card 
          className="bg-[#18181b] border-[#27272a] rounded-lg overflow-hidden"
          styles={{ body: { padding: 0 } }}
        >
          {/* Header Section */}
          <div className="bg-[#27272a] border-b border-[#3f3f46] p-6">
            <Space orientation="vertical" size="small" className="w-full">
              <div className="flex items-center gap-2 mb-2">
                <DatabaseOutlined className="text-[#71717a]" />
                <Text className="text-[#a1a1aa]">Shared via Think Store</Text>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="bg-[#3f3f46] text-[#fafafa] border border-[#52525b]">
                  {content.user.username[0].toUpperCase()}
                </Avatar>
                <Text className="text-[#fafafa] font-medium text-lg">
                  {content.user.username}
                </Text>
              </div>
            </Space>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <Space orientation="vertical" size="large" className="w-full">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#27272a] rounded-lg flex items-center justify-center flex-shrink-0 border border-[#3f3f46]">
                  <span className="text-[#fafafa] text-xl">{typeInfo.icon}</span>
                </div>
                <div className="flex-1">
                  <Tag className="mb-2 bg-[#27272a] text-[#a1a1aa] border-[#3f3f46]">
                    {typeInfo.label}
                  </Tag>
                  <Title level={3} className="!mb-2 !text-[#fafafa]">
                    {content.title}
                  </Title>
                  <Text className="text-[#71717a]">Shared on {formattedDate}</Text>
                </div>
              </div>

              {content.tags.length > 0 && (
                <div>
                  <Text className="text-[#71717a] block mb-2">Tags:</Text>
                  <div className="flex flex-wrap gap-2">
                    {content.tags.map((tag) => (
                      <Tag 
                        key={tag.id} 
                        className="bg-[#27272a] text-[#a1a1aa] border-[#3f3f46] text-sm px-3 py-1"
                      >
                        {tag.name}
                      </Tag>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-[#27272a]">
                <Text className="text-[#a1a1aa] block mb-4">
                  Want to save and organize content like this?
                </Text>
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={() => router.push("/signup")}
                  className="!bg-[#fafafa] !text-[#0a0a0a] hover:!bg-[#e4e4e7] !border-none !rounded-md !font-medium"
                >
                  Create Your Free Account
                </Button>
              </div>
            </Space>
          </div>
        </Card>
      </div>
    </div>
  );
}
