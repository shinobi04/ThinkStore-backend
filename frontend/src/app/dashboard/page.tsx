"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useContentStore } from "@/stores/contentStore";
import { ContentCard } from "@/components/ContentCard";
import { AddContentModal } from "@/components/AddContentModal";
import { DashboardNavbar } from "@/components/DashboardNavbar";
import {
  Typography,
  Row,
  Col,
  Empty,
  Spin,
  Alert,
  Button,
  Segmented,
  Space,
} from "antd";
import {
  PlusOutlined,
  LinkOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { ContentType } from "@/lib/types";

const { Title, Text } = Typography;

type ViewMode = "grid" | "list";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading: authLoading, checkAuth } = useAuthStore();
  const {
    filteredContents,
    isLoading: contentLoading,
    error,
    fetchContents,
    filterByType,
    selectedType,
  } = useContentStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchContents();
    }
  }, [isAuthenticated, fetchContents]);

  useEffect(() => {
    if (searchParams.get("add") === "true") {
      queueMicrotask(() => {
        setIsModalOpen(true);
      });
    }
  }, [searchParams]);

  const handleTypeFilter = (value: string | number) => {
    filterByType(value as ContentType | "all");
  };

  const typeOptions = [
    { label: "All", value: "all" },
    { label: "Links", value: "link", icon: <LinkOutlined /> },
    { label: "Tweets", value: "tweet", icon: <TwitterOutlined /> },
    { label: "YouTube", value: "youtube", icon: <YoutubeOutlined /> },
    { label: "Docs", value: "document", icon: <FileTextOutlined /> },
  ];

  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <Spin size="large" className="text-[#71717a]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <DashboardNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <Title level={2} className="!mb-1 !font-bold !text-[#fafafa]">
              My Content
            </Title>
            <Text className="text-[#71717a]">
              You have {filteredContents.length} items saved.
            </Text>
          </div>

          <Space>
            <Segmented
              options={[
                { value: "grid", icon: <AppstoreOutlined className="text-[#71717a]" /> },
                { value: "list", icon: <UnorderedListOutlined className="text-[#71717a]" /> },
              ]}
              value={viewMode}
              onChange={(value) => setViewMode(value as ViewMode)}
              className="!bg-[#18181b] !border !border-[#27272a] !rounded-lg"
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:inline-flex !bg-[#fafafa] !text-[#0a0a0a] hover:!bg-[#e4e4e7] !border-none"
              size="large"
            >
              Add Content
            </Button>
          </Space>
        </div>

        <div className="mb-8 overflow-x-auto">
          <Segmented
            options={typeOptions}
            value={selectedType}
            onChange={handleTypeFilter}
            className="!bg-[#18181b] !border !border-[#27272a] !p-2 !rounded-lg min-w-max"
          />
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            className="mb-6 !bg-[#18181b] !border-[#27272a]"
          />
        )}

        {contentLoading ? (
          <div className="flex items-center justify-center py-20">
            <Spin size="large" className="text-[#71717a]" />
          </div>
        ) : filteredContents.length === 0 ? (
          <Empty
            description={
              <Space orientation="vertical" size="middle">
                <Text className="text-[#71717a]">
                  {selectedType === "all"
                    ? "No content yet. Start saving your first resource!"
                    : `No ${selectedType} content found.`}
                </Text>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsModalOpen(true)}
                  className="!bg-[#fafafa] !text-[#0a0a0a] hover:!bg-[#e4e4e7] !border-none"
                >
                  Add Your First Content
                </Button>
              </Space>
            }
            className="py-20"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : viewMode === "grid" ? (
          <Row gutter={[24, 24]}>
            {filteredContents.map((content) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={content.id}>
                <ContentCard content={content} />
              </Col>
            ))}
          </Row>
        ) : (
          <Space orientation="vertical" className="w-full" size="middle">
            {filteredContents.map((content) => (
              <ContentCard key={content.id} content={content} viewMode="list" />
            ))}
          </Space>
        )}
      </div>

      <AddContentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          if (searchParams.get("add") === "true") {
            router.push("/dashboard");
          }
        }}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<Spin size="large" className="text-[#71717a]" />}>
      <DashboardContent />
    </Suspense>
  );
}
