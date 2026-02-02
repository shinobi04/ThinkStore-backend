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
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

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
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50">
      <DashboardNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <Title level={3} className="!mb-1 !font-semibold">
              My Content
            </Title>
            <Text className="text-gray-500 text-sm">
              {filteredContents.length}{" "}
              {filteredContents.length === 1 ? "item" : "items"} {selectedType !== "all" ? `(${selectedType})` : ""}
            </Text>
          </div>

          <Space>
            <Segmented
              options={[
                { value: "grid", icon: <AppstoreOutlined /> },
                { value: "list", icon: <UnorderedListOutlined /> },
              ]}
              value={viewMode}
              onChange={(value) => setViewMode(value as ViewMode)}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:inline-flex"
            >
              Add Content
            </Button>
          </Space>
        </div>

        <div className="mb-6 overflow-x-auto">
          <Segmented
            options={typeOptions}
            value={selectedType}
            onChange={handleTypeFilter}
            className="min-w-max"
          />
        </div>

        {error && (
          <Alert
            title={error}
            type="error"
            showIcon
            closable
            className="mb-6"
          />
        )}

        {contentLoading ? (
          <div className="flex items-center justify-center py-20">
            <Spin size="large" />
          </div>
        ) : filteredContents.length === 0 ? (
          <Empty
            description={
              <Space orientation="vertical" size="middle">
                <Text className="text-gray-500">
                  {selectedType === "all"
                    ? "No content yet. Start saving your first resource!"
                    : `No ${selectedType} content found.`}
                </Text>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsModalOpen(true)}
                >
                  Add Your First Content
                </Button>
              </Space>
            }
            className="py-20"
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

        {/* Mobile FAB */}
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 shadow-lg sm:hidden z-50"
        />
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
    <Suspense fallback={<Spin size="large" />}>
      <DashboardContent />
    </Suspense>
  );
}
