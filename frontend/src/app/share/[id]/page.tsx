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
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

const typeConfig = {
  link: {
    icon: <LinkOutlined />,
    color: "text-green-500",
    bgColor: "bg-green-50",
    label: "Link",
  },
  tweet: {
    icon: <TwitterOutlined />,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    label: "Tweet",
  },
  youtube: {
    icon: <YoutubeOutlined />,
    color: "text-red-500",
    bgColor: "bg-red-50",
    label: "YouTube",
  },
  document: {
    icon: <FileTextOutlined />,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
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
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push("/")}
            className="mb-4"
          >
            Back to Home
          </Button>
          <Alert
            title="Content Not Found"
            description={error || "This shared link may have expired or been removed."}
            type="error"
            showIcon
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push("/")}
          className="mb-4"
        >
          Back to Home
        </Button>

        <Card className="shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-pink-400 to-pink-500 p-6 -m-6 mb-6">
            <Space orientation="vertical" size="small">
              <Text className="text-white opacity-90">Shared via Think Store</Text>
              <Space>
                <Avatar icon={<UserOutlined />} className="bg-white text-pink-500" />
                <Text className="text-white font-medium text-lg">
                  {content.user.username}
                </Text>
              </Space>
            </Space>
          </div>

          <Space orientation="vertical" size="large" className="w-full">
            <div className="flex items-start gap-4">
              <div
                className={`w-14 h-14 ${typeInfo.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
              >
                <span className={`${typeInfo.color} text-2xl`}>{typeInfo.icon}</span>
              </div>
              <div className="flex-1">
                <Tag color="default" className="mb-2">
                  {typeInfo.label}
                </Tag>
                <Title level={3} className="!mb-2">
                  {content.title}
                </Title>
                <Text className="text-gray-500">Shared on {formattedDate}</Text>
              </div>
            </div>

            {content.tags.length > 0 && (
              <div>
                <Text className="text-gray-500 block mb-2">Tags:</Text>
                <div className="flex flex-wrap gap-2">
                  {content.tags.map((tag) => (
                    <Tag key={tag.id} color="pink" className="text-sm px-3 py-1">
                      {tag.name}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-100">
              <Text className="text-gray-600 block mb-4">
                Want to save and organize content like this?
              </Text>
              <Button
                type="primary"
                size="large"
                block
                onClick={() => router.push("/signup")}
              >
                Create Your Free Account
              </Button>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
}
