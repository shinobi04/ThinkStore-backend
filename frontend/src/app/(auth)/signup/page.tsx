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
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
      <div className="absolute top-6 left-6 z-20">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push("/")}
          className="text-[#71717a] hover:text-[#fafafa] border-none"
        >
          Back to Home
        </Button>
      </div>

      <Card
        className="w-full max-w-md bg-[#18181b] border-[#27272a] rounded-lg"
        styles={{ body: { padding: "2rem" } }}
      >
        <Space orientation="vertical" size="large" className="w-full">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#27272a] rounded-lg flex items-center justify-center mx-auto mb-4 border border-[#3f3f46]">
              <DatabaseOutlined className="text-[#fafafa] text-xl" />
            </div>
            <Title level={2} className="!mb-2 !text-[#fafafa]">
              Create Account
            </Title>
            <Text className="text-[#a1a1aa]">
              Start building your Think Store today
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
              className="!bg-[#18181b] !border-[#27272a]"
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
                prefix={<UserOutlined className="text-[#71717a]" />}
                placeholder="Username"
                className="!bg-[#27272a] !border-[#3f3f46] !text-[#fafafa] placeholder:!text-[#71717a]"
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
                prefix={<LockOutlined className="text-[#71717a]" />}
                placeholder="Password"
                className="!bg-[#27272a] !border-[#3f3f46] !text-[#fafafa] placeholder:!text-[#71717a]"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-[#71717a]" />}
                placeholder="Confirm Password"
                className="!bg-[#27272a] !border-[#3f3f46] !text-[#fafafa] placeholder:!text-[#71717a]"
              />
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
                className="h-12 !bg-[#fafafa] !text-[#0a0a0a] hover:!bg-[#e4e4e7] !border-none !rounded-md !font-medium"
              >
                Create Account
              </Button>
            </Form.Item>
          </Form>

          <Divider plain className="!border-[#27272a]">
            <Text className="text-[#71717a]">or</Text>
          </Divider>

          <div className="text-center">
            <Text className="text-[#a1a1aa]">Already have an account? </Text>
            <Link
              onClick={() => router.push("/login")}
              className="text-[#fafafa] hover:text-[#e4e4e7] transition-colors font-medium"
            >
              Sign in
            </Link>
          </div>
        </Space>
      </Card>
    </div>
  );
}
