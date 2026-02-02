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
} from "@ant-design/icons";

const { Title, Text, Link } = Typography;

interface SignupFormValues {
  username: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const router = useRouter();
  const { signup, isAuthenticated, isLoading, error, clearError } =
    useAuthStore();
  const [form] = Form.useForm<SignupFormValues>();
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

  const handleSubmit = async (values: SignupFormValues) => {
    setLocalError(null);

    if (values.password !== values.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    try {
      await signup({
        username: values.username,
        password: values.password,
      });
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setLocalError(err.message);
      }
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push("/")}
          className="mb-4 -ml-4"
        >
          Back to Home
        </Button>

        <Card className="shadow-xl rounded-2xl">
          <Space orientation="vertical" size="large" className="w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Text className="text-white font-bold text-2xl">T</Text>
              </div>
              <Title level={2} className="!mb-2">
                Create Account
              </Title>
              <Text className="text-gray-600">
                Start building your Think Store today
              </Text>
            </div>

            {displayError && (
              <Alert
                title={displayError}
                type="error"
                showIcon
                closable
                onClose={() => {
                  setLocalError(null);
                  clearError();
                }}
              />
            )}

            <Form
              form={form}
              name="signup"
              onFinish={handleSubmit}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please enter a username" },
                  { min: 3, message: "Username must be at least 3 characters" },
                  {
                    max: 20,
                    message: "Username must be less than 20 characters",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please enter a password" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                rules={[
                  { required: true, message: "Please confirm your password" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Confirm Password"
                />
              </Form.Item>

              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  block
                  className="h-12"
                >
                  Create Account
                </Button>
              </Form.Item>
            </Form>

            <Divider plain>
              <Text className="text-gray-400">or</Text>
            </Divider>

            <div className="text-center">
              <Text className="text-gray-600">Already have an account? </Text>
              <Link onClick={() => router.push("/login")}>Sign in</Link>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
}
