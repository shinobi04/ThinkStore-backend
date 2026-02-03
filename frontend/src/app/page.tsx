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
  DatabaseOutlined,
  ExportOutlined,
  GithubOutlined,
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
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <Spin size="large" className="text-[#71717a]" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa]">
      {/* Navigation */}
      <nav className="border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#27272a] rounded-lg flex items-center justify-center border border-[#3f3f46]">
                <DatabaseOutlined className="text-[#fafafa] text-lg" />
              </div>
              <Text className="text-lg font-semibold text-[#fafafa]">
                Think Store
              </Text>
            </div>
            <div className="flex items-center gap-4">
              <Button
                type="text"
                className="text-[#a1a1aa] hover:text-[#fafafa]"
                onClick={() => router.push("/login")}
              >
                Sign in
              </Button>
               <Button
                type="primary"
                onClick={() => router.push("/signup")}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#27272a] bg-[#18181b] mb-8">
              <Text className="text-sm text-[#a1a1aa]">
                The most comprehensive content organizer for the web
              </Text>
            </div>
            
            <Title
              level={1}
              className="!text-4xl sm:!text-5xl lg:!text-6xl !font-bold !text-[#fafafa] !mb-6 !leading-tight"
            >
              Save. Organize.
              <br />
              <span className="text-[#71717a]">Share.</span>
            </Title>
            
            <Paragraph className="text-lg sm:text-xl text-[#a1a1aa] max-w-2xl mx-auto mb-10 leading-relaxed">
              Think Store helps you capture and organize links, tweets, 
              YouTube videos, and documents. Never lose an important resource again.
            </Paragraph>

            <Space size="large" className="flex-wrap justify-center">
              <Button
                type="primary"
                size="large"
                icon={<ArrowRightOutlined />}
                onClick={() => router.push("/signup")}
                className="h-12 px-8 bg-[#fafafa] text-[#0a0a0a] hover:bg-[#e4e4e7] border-none text-base font-medium"
              >
                Get Started
              </Button>
              <Button
                size="large"
                icon={<GithubOutlined />}
                onClick={() => window.open("https://github.com", "_blank")}
                className="h-12 px-8 bg-transparent text-[#fafafa] border-[#27272a] hover:border-[#3f3f46] hover:text-[#fafafa] text-base font-medium"
              >
                View on GitHub
              </Button>
            </Space>

            <div className="mt-4">
              <Text className="text-sm text-[#71717a]">
                Free to use. No credit card required.
              </Text>
            </div>
          </div>
        </div>

        {/* Demo Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-5xl mx-auto">
            <Card 
              className="bg-[#09090b] border border-[#27272a] shadow-2xl"
              styles={{ body: { padding: 0 } }}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#27272a]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#27272a] rounded-md flex items-center justify-center">
                    <DatabaseOutlined className="text-[#fafafa]" />
                  </div>
                  <Text className="text-[#fafafa] font-medium">Think Store</Text>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#27272a]" />
                  <div className="w-3 h-3 rounded-full bg-[#27272a]" />
                  <div className="w-3 h-3 rounded-full bg-[#27272a]" />
                </div>
              </div>

              {/* Content Items */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 p-4 bg-[#18181b] rounded-lg border border-[#27272a] hover:border-[#3f3f46] transition-colors">
                  <div className="w-10 h-10 bg-[#27272a] rounded-lg flex items-center justify-center">
                    <YoutubeOutlined className="text-[#fafafa]" />
                  </div>
                  <div className="flex-1">
                    <Text className="text-[#fafafa] block">How to Build a Startup</Text>
                    <Text className="text-xs text-[#71717a]">YouTube • 15 mins ago</Text>
                  </div>
                  <ExportOutlined className="text-[#71717a]" />
                </div>

                <div className="flex items-center gap-4 p-4 bg-[#18181b] rounded-lg border border-[#27272a] hover:border-[#3f3f46] transition-colors">
                  <div className="w-10 h-10 bg-[#27272a] rounded-lg flex items-center justify-center">
                    <TwitterOutlined className="text-[#fafafa]" />
                  </div>
                  <div className="flex-1">
                    <Text className="text-[#fafafa] block">10 Tips for Developers</Text>
                    <Text className="text-xs text-[#71717a]">Tweet • 2 hours ago</Text>
                  </div>
                  <ExportOutlined className="text-[#71717a]" />
                </div>

                <div className="flex items-center gap-4 p-4 bg-[#18181b] rounded-lg border border-[#27272a] hover:border-[#3f3f46] transition-colors">
                  <div className="w-10 h-10 bg-[#27272a] rounded-lg flex items-center justify-center">
                    <LinkOutlined className="text-[#fafafa]" />
                  </div>
                  <div className="flex-1">
                    <Text className="text-[#fafafa] block">Best Design Resources</Text>
                    <Text className="text-xs text-[#71717a]">Link • 5 hours ago</Text>
                  </div>
                  <ExportOutlined className="text-[#71717a]" />
                </div>

                <div className="flex items-center gap-4 p-4 bg-[#18181b] rounded-lg border border-[#27272a] hover:border-[#3f3f46] transition-colors">
                  <div className="w-10 h-10 bg-[#27272a] rounded-lg flex items-center justify-center">
                    <FileTextOutlined className="text-[#fafafa]" />
                  </div>
                  <div className="flex-1">
                    <Text className="text-[#fafafa] block">Project Documentation</Text>
                    <Text className="text-xs text-[#71717a]">Document • Yesterday</Text>
                  </div>
                  <ExportOutlined className="text-[#71717a]" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <Title level={2} className="!text-3xl sm:!text-4xl !font-bold !text-[#fafafa] !mb-4">
              Everything you need
            </Title>
            <Paragraph className="text-lg text-[#71717a] max-w-2xl mx-auto">
              Powerful features to help you organize your digital life
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={6}>
              <div className="p-6 bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3f3f46] transition-colors h-full">
                <div className="w-10 h-10 bg-[#27272a] rounded-lg flex items-center justify-center mb-4">
                  <LinkOutlined className="text-[#fafafa]" />
                </div>
                <Text className="text-[#fafafa] block text-lg font-semibold mb-2">
                  Save Anything
                </Text>
                <Text className="text-[#a1a1aa]">
                  Links, tweets, YouTube videos, and documents all in one place.
                </Text>
              </div>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <div className="p-6 bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3f3f46] transition-colors h-full">
                <div className="w-10 h-10 bg-[#27272a] rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-[#fafafa]"
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
                <Text className="text-[#fafafa] block text-lg font-semibold mb-2">
                  Tag & Organize
                </Text>
                <Text className="text-[#a1a1aa]">
                  Use tags to categorize and find your content quickly.
                </Text>
              </div>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <div className="p-6 bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3f3f46] transition-colors h-full">
                <div className="w-10 h-10 bg-[#27272a] rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-[#fafafa]"
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
                <Text className="text-[#fafafa] block text-lg font-semibold mb-2">
                  Share Easily
                </Text>
                <Text className="text-[#a1a1aa]">
                  Generate shareable links to share content with others.
                </Text>
              </div>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <div className="p-6 bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3f3f46] transition-colors h-full">
                <div className="w-10 h-10 bg-[#27272a] rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-[#fafafa]"
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
                <Text className="text-[#fafafa] block text-lg font-semibold mb-2">
                  Secure
                </Text>
                <Text className="text-[#a1a1aa]">
                  Your data is protected with JWT authentication.
                </Text>
              </div>
            </Col>
          </Row>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="p-8 bg-[#18181b] border border-[#27272a] rounded-xl">
              <Title level={2} className="!text-2xl sm:!text-3xl !font-bold !text-[#fafafa] !mb-4">
                Ready to organize your thoughts?
              </Title>
              <Paragraph className="text-[#71717a] mb-6">
                Join thousands of users who trust Think Store to manage their digital content.
              </Paragraph>
              <Button
                type="primary"
                size="large"
                onClick={() => router.push("/signup")}
                className="h-12 px-10 bg-[#fafafa] text-[#0a0a0a] hover:bg-[#e4e4e7] border-none font-medium"
              >
                Start for Free
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#27272a] mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#27272a] rounded flex items-center justify-center">
                <DatabaseOutlined className="text-[#fafafa] text-xs" />
              </div>
              <Text className="text-[#71717a] text-sm">
                © 2026 Think Store. All rights reserved.
              </Text>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-[#71717a] hover:text-[#fafafa] text-sm transition-colors">
                Docs
              </a>
              <a href="#" className="text-[#71717a] hover:text-[#fafafa] text-sm transition-colors">
                GitHub
              </a>
              <a href="#" className="text-[#71717a] hover:text-[#fafafa] text-sm transition-colors">
                Community
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
