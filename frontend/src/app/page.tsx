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
  StarOutlined,
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <Spin size="large" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blob 1 - Pink */}
        <div 
          className="absolute -top-20 -left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"
          style={{ animation: 'blob 7s infinite' }}
        />
        {/* Blob 2 - Purple */}
        <div 
          className="absolute top-40 -right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"
          style={{ animation: 'blob 7s infinite', animationDelay: '2s' }}
        />
        {/* Blob 3 - Blue */}
        <div 
          className="absolute -bottom-20 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"
          style={{ animation: 'blob 7s infinite', animationDelay: '4s' }}
        />
        {/* Small floating shapes */}
        <div className="absolute top-20 right-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-pulse" />
        <div className="absolute top-40 left-1/4 w-6 h-6 bg-pink-400 rounded-lg rotate-45 animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-40 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Hero Section */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <Space orientation="vertical" size="large" className="w-full">
                <div>
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg shadow-pink-200/50 mb-6 border border-pink-100 hover:scale-105 transition-transform duration-300">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                    <Text className="text-sm text-gray-700 font-medium">
                      Your personal Think Store
                    </Text>
                    <StarOutlined className="text-yellow-500 text-sm" />
                  </div>
                  
                  {/* Main Heading with Gradient */}
                  <Title
                    level={1}
                    className="!text-4xl md:!text-5xl lg:!text-6xl !font-bold !text-gray-900 !mb-4"
                  >
                    Save, Organize,
                    <br />
                    <span className="animated-gradient-text">
                      & Share
                    </span>
                  </Title>
                  <Paragraph className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
                    Think Store helps you capture and organize links, tweets,
                    YouTube videos, and documents. Never lose an important
                    resource again.
                  </Paragraph>
                </div>

                {/* CTA Buttons */}
                <Space size="middle" className="flex-wrap">
                  <Button
                    type="primary"
                    size="large"
                    icon={<ArrowRightOutlined />}
                    onClick={() => router.push("/login")}
                    className="h-14 px-8 text-base bg-gradient-to-r from-pink-500 to-purple-500 border-none rounded-full shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 hover:scale-105 transition-all duration-300"
                  >
                    Get Started
                  </Button>
                  <Button
                    size="large"
                    onClick={() => router.push("/signup")}
                    className="h-14 px-8 text-base rounded-full border-2 border-gray-300 hover:border-purple-400 hover:text-purple-600 transition-all duration-300"
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
                {/* Decorative background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-400 rounded-3xl transform rotate-6 opacity-20 blur-2xl" />
                
                {/* Main Demo Card */}
                <Card className="relative bg-white/90 backdrop-blur-xl shadow-2xl shadow-pink-200/50 rounded-3xl p-8 border border-white/50 hover:scale-[1.02] transition-transform duration-500">
                  {/* Card Header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                      <DatabaseOutlined className="text-white text-lg" />
                    </div>
                    <div>
                      <Text className="font-semibold text-gray-900 block">Think Store</Text>
                      <Text className="text-xs text-gray-500">12 items saved</Text>
                    </div>
                  </div>

                  <Space direction="vertical" size="middle" className="w-full">
                    {/* Content Item 1 */}
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl hover:shadow-md transition-shadow duration-300 border border-red-100">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
                        <YoutubeOutlined className="text-white text-xl" />
                      </div>
                      <div className="flex-1">
                        <Text className="font-semibold text-gray-800 block">How to Build a Startup</Text>
                        <Text className="text-xs text-gray-500">YouTube • 15 mins ago</Text>
                      </div>
                    </div>

                    {/* Content Item 2 */}
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:shadow-md transition-shadow duration-300 border border-blue-100">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                        <TwitterOutlined className="text-white text-xl" />
                      </div>
                      <div className="flex-1">
                        <Text className="font-semibold text-gray-800 block">10 Tips for Developers</Text>
                        <Text className="text-xs text-gray-500">Tweet • 2 hours ago</Text>
                      </div>
                    </div>

                    {/* Content Item 3 */}
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:shadow-md transition-shadow duration-300 border border-green-100">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
                        <LinkOutlined className="text-white text-xl" />
                      </div>
                      <div className="flex-1">
                        <Text className="font-semibold text-gray-800 block">Best Design Resources</Text>
                        <Text className="text-xs text-gray-500">Link • 5 hours ago</Text>
                      </div>
                    </div>

                    {/* Content Item 4 */}
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl hover:shadow-md transition-shadow duration-300 border border-purple-100">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200">
                        <FileTextOutlined className="text-white text-xl" />
                      </div>
                      <div className="flex-1">
                        <Text className="font-semibold text-gray-800 block">Project Documentation</Text>
                        <Text className="text-xs text-gray-500">Document • Yesterday</Text>
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
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Title level={2} className="!text-3xl md:!text-4xl !font-bold !text-gray-900">
              Everything you need
            </Title>
            <Paragraph className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Powerful features to help you organize your digital life
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={6}>
              <Card className="h-full bg-white/80 backdrop-blur-sm hover:shadow-xl hover:shadow-pink-200/50 hover:-translate-y-2 transition-all duration-300 border border-white/50">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-pink-200">
                  <LinkOutlined className="text-white text-2xl" />
                </div>
                <Title level={4} className="!text-lg !mb-3 !text-gray-900">
                  Save Anything
                </Title>
                <Text className="text-gray-600 leading-relaxed">
                  Links, tweets, YouTube videos, and documents all in one place.
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="h-full bg-white/80 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-200/50 hover:-translate-y-2 transition-all duration-300 border border-white/50">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-blue-200">
                  <svg
                    className="w-7 h-7 text-white"
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
                <Title level={4} className="!text-lg !mb-3 !text-gray-900">
                  Tag & Organize
                </Title>
                <Text className="text-gray-600 leading-relaxed">
                  Use tags to categorize and find your content quickly.
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="h-full bg-white/80 backdrop-blur-sm hover:shadow-xl hover:shadow-green-200/50 hover:-translate-y-2 transition-all duration-300 border border-white/50">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-green-200">
                  <svg
                    className="w-7 h-7 text-white"
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
                <Title level={4} className="!text-lg !mb-3 !text-gray-900">
                  Share Easily
                </Title>
                <Text className="text-gray-600 leading-relaxed">
                  Generate shareable links to share content with others.
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card className="h-full bg-white/80 backdrop-blur-sm hover:shadow-xl hover:shadow-purple-200/50 hover:-translate-y-2 transition-all duration-300 border border-white/50">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-purple-200">
                  <svg
                    className="w-7 h-7 text-white"
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
                <Title level={4} className="!text-lg !mb-3 !text-gray-900">
                  Secure
                </Title>
                <Text className="text-gray-600 leading-relaxed">
                  Your data is protected with JWT authentication.
                </Text>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div 
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.18)',
            }}
          >
            {/* Decorative shapes */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-pink-400/20 rounded-full -translate-x-1/2 -translate-y-1/2 filter blur-2xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-400/20 rounded-full translate-x-1/3 translate-y-1/3 filter blur-2xl" />
            
            <Title level={2} className="!text-3xl md:!text-4xl !font-bold !text-gray-900 !mb-4 relative z-10">
              Ready to organize your thoughts?
            </Title>
            <Paragraph className="text-gray-700 text-lg mb-8 relative z-10">
              Join thousands of users who trust Think Store to manage their digital content.
            </Paragraph>
            <Button
              type="primary"
              size="large"
              onClick={() => router.push("/signup")}
              className="h-14 px-10 text-base bg-gradient-to-r from-pink-500 to-purple-600 text-white border-none rounded-full shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 relative z-10"
            >
              Start for Free
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center">
        <Text className="text-gray-500 text-sm">
          © 2026 Think Store. All rights reserved.
        </Text>
      </footer>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-gradient-text {
          background: linear-gradient(90deg, #ff7e5f, #feb47b, #86a8e7, #91eae4);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-animation 5s ease infinite;
        }
      `}</style>
    </div>
  );
}
