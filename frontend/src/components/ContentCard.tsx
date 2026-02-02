"use client";

import { Card, Typography, Tag, Space, Button, Tooltip, App } from "antd";
import {
  LinkOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  FileTextOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  CopyOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Content, ContentType } from "@/lib/types";
import { useContentStore } from "@/stores/contentStore";
import { useState } from "react";

const { Title, Text } = Typography;

interface ContentCardProps {
  content: Content;
  viewMode?: "grid" | "list";
}

const typeConfig: Record<
  ContentType,
  { icon: React.ReactNode; color: string; bgColor: string; label: string }
> = {
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

export function ContentCard({ content, viewMode = "grid" }: ContentCardProps) {
  const { message } = App.useApp();
  const { deleteContent, createShareLink } = useContentStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const typeInfo = typeConfig[content.type];
  const hasShareLink = content.link !== null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteContent(content.id);
      message.success("Content deleted successfully");
    } catch {
      message.error("Failed to delete content");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleShare = async () => {
    if (hasShareLink) {
      const shareUrl = `${window.location.origin}/share/${content.link}`;
      navigator.clipboard.writeText(shareUrl);
      message.success("Share link copied to clipboard!");
      return;
    }

    setIsSharing(true);
    try {
      const shareId = await createShareLink(content.id);
      const shareUrl = `${window.location.origin}/share/${shareId}`;
      navigator.clipboard.writeText(shareUrl);
      message.success("Share link created and copied!");
    } catch {
      message.error("Failed to create share link");
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyTitle = () => {
    navigator.clipboard.writeText(content.title);
    message.success("Title copied to clipboard!");
  };

  const formattedDate = new Date(content.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (viewMode === "list") {
    return (
      <Card className="w-full hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 ${typeInfo.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
          >
            <span className={typeInfo.color}>{typeInfo.icon}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Title level={5} className="!mb-0 truncate">
                {content.title}
              </Title>
              {hasShareLink && (
                <Tag color="green" icon={<GlobalOutlined />}>
                  Shared
                </Tag>
              )}
            </div>
            <Space size="small" wrap>
              <Tag color="default">{typeInfo.label}</Tag>
              {content.tags.map((tag) => (
                <Tag key={tag.id} color="pink">
                  {tag.name}
                </Tag>
              ))}
              <Text className="text-gray-400 text-sm">{formattedDate}</Text>
            </Space>
          </div>

          <Space className="flex-shrink-0">
            <Tooltip title="Copy title">
              <Button
                type="text"
                icon={<CopyOutlined />}
                onClick={handleCopyTitle}
              />
            </Tooltip>
            <Tooltip title={hasShareLink ? "Copy share link" : "Create share link"}>
              <Button
                type="text"
                icon={<ShareAltOutlined />}
                onClick={handleShare}
                loading={isSharing}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={handleDelete}
                loading={isDeleting}
              />
            </Tooltip>
          </Space>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="h-full hover:shadow-lg transition-shadow"
      actions={[
        <Tooltip title="Copy title" key="copy">
          <Button
            type="text"
            icon={<CopyOutlined />}
            onClick={handleCopyTitle}
          />
        </Tooltip>,
        <Tooltip
          title={hasShareLink ? "Copy share link" : "Create share link"}
          key="share"
        >
          <Button
            type="text"
            icon={<ShareAltOutlined />}
            onClick={handleShare}
            loading={isSharing}
          />
        </Tooltip>,
        <Tooltip title="Delete" key="delete">
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDelete}
            loading={isDeleting}
          />
        </Tooltip>,
      ]}
    >
      <div className="flex items-start gap-3 mb-4">
        <div
          className={`w-10 h-10 ${typeInfo.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
        >
          <span className={`${typeInfo.color} text-lg`}>{typeInfo.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <Title level={5} className="!mb-1 !text-base truncate">
            {content.title}
          </Title>
          <Text className="text-gray-400 text-xs">{formattedDate}</Text>
        </div>
        {hasShareLink && (
          <Tag color="green" className="flex-shrink-0" icon={<GlobalOutlined />}>
            Shared
          </Tag>
        )}
      </div>

      <div className="mb-3">
        <Tag color="default" className="mb-2">
          {typeInfo.label}
        </Tag>
      </div>

      {content.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {content.tags.slice(0, 3).map((tag) => (
            <Tag key={tag.id} color="pink" className="text-xs">
              {tag.name}
            </Tag>
          ))}
          {content.tags.length > 3 && (
            <Tag color="default" className="text-xs">
              +{content.tags.length - 3}
            </Tag>
          )}
        </div>
      )}
    </Card>
  );
}
