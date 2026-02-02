"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import {
  Button,
  Typography,
  Space,
  Row,
  Col,
  Card,
  Spin,
} from "antd";
import {
  LinkOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  FileTextOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function WelcomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100">
        <Spin size="large" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
      {/* Hero Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <Space orientation="vertical" size="large" className="w-full">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
                    <Text className="text-sm text-gray-600">
                      Your personal Think Store
                    </Text>
                  </div>
                  <Title
                    level={1}
                    className="!text-4xl md:!text-5xl lg:!text-6xl !font-bold !text-gray-900 !mb-4"
                  >
                    Save, Organize,
                    <br />
                    <span className="text-pink-500">& Share</span>
                  </Title>
                  <Paragraph className="text-lg text-gray-600 max-w-lg">
                    Think Store helps you capture and organize links, tweets,
                    YouTube videos, and documents. Never lose an important
                    resource again.
                  </Paragraph>
                </div>

                <Space size="middle">
                  <Button
                    type="primary"
                    size="large"
                    icon={<ArrowRightOutlined />}
                    onClick={() => router.push("/login")}
                    className="h-12 px-8 text-base"
                  >
                    Get Started
                  </Button>
                  <Button
                    size="large"
                    onClick={() => router.push("/signup")}
                    className="h-12 px-8 text-base"
                  >
                    Create Account
                  </Button>
                </Space>

                <Text className="text-sm text-gray-500">
                  Free to use. No credit card required.
                </Text>
              </Space>
            </Col>

            <Col xs={24} lg={12} className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-pink-200 rounded-3xl transform rotate-3 opacity-30" />
                <Card className="relative bg-white shadow-xl rounded-2xl p-8">
                  <Space orientation="vertical" size="large" className="w-full">
                    <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-lg">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <YoutubeOutlined className="text-red-500 text-xl" />
                      </div>
                      <div>
                        <Text className="font-medium block">
                          How to Build a Startup
                        </Text>
                        <Text className="text-xs text-gray-500">YouTube</Text>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <TwitterOutlined className="text-blue-500 text-xl" />
                      </div>
                      <div>
                        <Text className="font-medium block">
                          10 Tips for Developers
                        </Text>
                        <Text className="text-xs text-gray-500">Tweet</Text>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <LinkOutlined className="text-green-500 text-xl" />
                      </div>
                      <div>
                        <Text className="font-medium block">
                          Best Design Resources
                        </Text>
                        <Text className="text-xs text-gray-500">Link</Text>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FileTextOutlined className="text-purple-500 text-xl" />
                      </div>
                      <div>
                        <Text className="font-medium block">
                          Project Documentation
                        </Text>
                        <Text className="text-xs text-gray-500">Document</Text>
                      </div>
                    </div>
                  </Space>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Title level={2} className="!text-3xl !font-bold !text-gray-900">
              Everything you need
            </Title>
            <Paragraph className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Powerful features to help you organize your digital life
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={6}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                  <LinkOutlined className="text-pink-500 text-2xl" />
                </div>
                <Title level={4} className="!text-lg !mb-2">
                  Save Anything
                </Title>
                <Text className="text-gray-600">
                  Links, tweets, YouTube videos, and documents all in one place.
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
                <Title level={4} className="!text-lg !mb-2">
                  Tag & Organize
                </Title>
                <Text className="text-gray-600">
                  Use tags to categorize and find your content quickly.
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </div>
                <Title level={4} className="!text-lg !mb-2">
                  Share Easily
                </Title>
                <Text className="text-gray-600">
                  Generate shareable links to share content with others.
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <Title level={4} className="!text-lg !mb-2">
                  Secure
                </Title>
                <Text className="text-gray-600">
                  Your data is protected with JWT authentication.
                </Text>
              </Card>
            </Col>
          </Row>
        </div>
      </div>


    </div>
  );
}
