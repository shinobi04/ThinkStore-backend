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

// Monochrome icon configuration
const typeConfig: Record<
  ContentType,
  { icon: React.ReactNode; label: string }
> = {
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

  const cardBaseStyles = "bg-[#18181b] border border-[#27272a] rounded-lg transition-all duration-200";
  const cardHoverStyles = "hover:border-[#3f3f46] hover:bg-[#1f1f23]";

  if (viewMode === "list") {
    return (
       <Card className={`${cardBaseStyles} ${cardHoverStyles} w-full`} styles={{ body: { padding: "1rem" } }}>
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 bg-[#27272a] rounded-lg flex items-center justify-center flex-shrink-0 border border-[#3f3f46]"
          >
            <span className="text-[#fafafa]">{typeInfo.icon}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Title level={5} className="!mb-0 truncate !font-medium !text-[#fafafa]">
                {content.title}
              </Title>
              {hasShareLink && (
                <Tag className="!bg-[#27272a] !text-[#a1a1aa] !border-[#3f3f46] rounded-full">
                  <GlobalOutlined className="mr-1" />
                  Shared
                </Tag>
              )}
            </div>
            <Space size="small" wrap>
              <Tag className="rounded-full bg-[#27272a] text-[#71717a] border-[#3f3f46]">
                {typeInfo.label}
              </Tag>
              {content.tags.map((tag) => (
                <Tag key={tag.id} className="rounded-full bg-[#27272a] text-[#a1a1aa] border-[#3f3f46]">
                  {tag.name}
                </Tag>
              ))}
              <Text className="text-[#52525b] text-sm">{formattedDate}</Text>
            </Space>
          </div>

          <Space className="flex-shrink-0">
            <Tooltip title="Copy title">
              <Button
                type="text"
                icon={<CopyOutlined className="text-[#71717a]" />}
                onClick={handleCopyTitle}
                className="hover:!bg-[#27272a] !border-none"
              />
            </Tooltip>
            <Tooltip title={hasShareLink ? "Copy share link" : "Create share link"}>
              <Button
                type="text"
                icon={<ShareAltOutlined className="text-[#71717a]" />}
                onClick={handleShare}
                loading={isSharing}
                className="hover:!bg-[#27272a] !border-none"
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                type="text"
                icon={<DeleteOutlined className="text-[#71717a]" />}
                onClick={handleDelete}
                loading={isDeleting}
                className="hover:!bg-[#27272a] hover:!text-[#ef4444] !border-none"
              />
            </Tooltip>
          </Space>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={`${cardBaseStyles} ${cardHoverStyles} h-full flex flex-col`}
      styles={{ body: { flex: 1, padding: "1rem" } }}
      actions={[
        <Tooltip title="Copy title" key="copy">
          <Button
            type="text"
            icon={<CopyOutlined className="text-[#71717a]" />}
            onClick={handleCopyTitle}
            className="hover:!bg-[#27272a] !border-none"
          />
        </Tooltip>,
        <Tooltip
          title={hasShareLink ? "Copy share link" : "Create share link"}
          key="share"
        >
          <Button
            type="text"
            icon={<ShareAltOutlined className="text-[#71717a]" />}
            onClick={handleShare}
            loading={isSharing}
            className="hover:!bg-[#27272a] !border-none"
          />
        </Tooltip>,
        <Tooltip title="Delete" key="delete">
          <Button
            type="text"
            icon={<DeleteOutlined className="text-[#71717a]" />}
            onClick={handleDelete}
            loading={isDeleting}
            className="hover:!bg-[#27272a] hover:!text-[#ef4444] !border-none"
          />
        </Tooltip>,
      ]}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-10 h-10 bg-[#27272a] rounded-lg flex items-center justify-center flex-shrink-0 border border-[#3f3f46]"
        >
          <span className="text-[#fafafa] text-lg">{typeInfo.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <Title level={5} className="!mb-0.5 !text-sm !font-medium truncate !text-[#fafafa]">
            {content.title}
          </Title>
          <Text className="text-[#52525b] text-xs">{formattedDate}</Text>
        </div>
        {hasShareLink && (
           <Tooltip title="Shared">
             <GlobalOutlined className="text-[#71717a]" />
           </Tooltip>
        )}
      </div>

      <div className="flex-grow mb-3">
        <Tag className="rounded-full bg-[#27272a] text-[#71717a] border-[#3f3f46] text-xs">
          {typeInfo.label}
        </Tag>
      </div>

      {content.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {content.tags.slice(0, 3).map((tag) => (
            <Tag key={tag.id} className="rounded-full bg-[#27272a] text-[#a1a1aa] border-[#3f3f46] text-xs">
              {tag.name}
            </Tag>
          ))}
          {content.tags.length > 3 && (
            <Tag className="rounded-full bg-[#27272a] text-[#71717a] border-[#3f3f46] text-xs">
              +{content.tags.length - 3}
            </Tag>
          )}
        </div>
      )}
    </Card>
  );
}
