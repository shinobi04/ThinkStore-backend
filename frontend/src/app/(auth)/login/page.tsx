"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  Space,
  Alert,
  Divider,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  ArrowLeftOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

const { Title, Text, Link } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading, error, clearError } =
    useAuthStore();
  const [form] = Form.useForm<LoginFormValues>();
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleSubmit = async (values: LoginFormValues) => {
    setLocalError(null);
    try {
      await login(values);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setLocalError(err.message);
      }
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-20 -left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"
          style={{ animation: 'blob 7s infinite' }}
        />
        <div 
          className="absolute top-40 -right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"
          style={{ animation: 'blob 7s infinite', animationDelay: '2s' }}
        />
        <div 
          className="absolute -bottom-20 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"
          style={{ animation: 'blob 7s infinite', animationDelay: '4s' }}
        />
      </div>

      <div className="absolute top-6 left-6 z-20">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push("/")}
          className="text-gray-600 hover:text-purple-600 transition-colors"
        >
          Back to Home
        </Button>
      </div>
      
      <Card 
        className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl shadow-purple-200/50 rounded-3xl p-4 md:p-8 border border-white/50"
      >
        <Space direction="vertical" size="large" className="w-full">
          {/* Header */}
           <div className="text-center">
            <Title level={2} className="!mb-2 !text-gray-900">
              Welcome Back
            </Title>
            <Text className="text-gray-600 text-base">
              Sign in to access your Think Store
            </Text>
          </div>

          {displayError && (
            <Alert
              message={displayError}
              type="error"
              showIcon
              closable
              onClose={() => {
                setLocalError(null);
                clearError();
              }}
              className="!rounded-xl"
            />
          )}

          <Form
            form={form}
            name="login"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
            className="!mt-6"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
              className="!mb-5"
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Username"
                className="!rounded-lg !py-3"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
                {
                  min: 6,
                  message: "Password must be at least 6 characters",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Password"
                className="!rounded-lg !py-3"
              />
            </Form.Item>

            <Form.Item className="!mt-8 !mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
                className="h-14 !text-base bg-gradient-to-r from-pink-500 to-purple-500 border-none rounded-full shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 hover:scale-105 transition-all duration-300"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <Divider plain className="!mt-6">
            <Text className="text-gray-400">or</Text>
          </Divider>

          <div className="text-center">
            <Text className="text-gray-600">Don&apos;t have an account? </Text>
            <Link 
              onClick={() => router.push("/signup")}
              className="font-semibold text-purple-600 hover:text-purple-700 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </Space>
      </Card>
      
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
      `}</style>
    </div>
  );
}
