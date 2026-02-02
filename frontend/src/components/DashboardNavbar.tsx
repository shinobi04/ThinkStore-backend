"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useContentStore } from "@/stores/contentStore";
import {
  Button,
  Badge,
  Drawer,
  Typography,
  Space,
  Divider,
} from "antd";
import {
  LogoutOutlined,
  MenuOutlined,
  DatabaseOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

export function DashboardNavbar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { contents } = useContentStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push("/login");
    } catch {
      setIsLoggingOut(false);
    }
  };

  const contentCount = contents.length;

  return (
    <>
      {/* Desktop & Mobile Navbar */}
      <nav className="sticky top-0 z-50 h-16 backdrop-blur-md bg-white/70 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center shadow-sm">
                <DatabaseOutlined className="text-white text-sm" />
              </div>
              <Text className="text-lg font-semibold text-gray-800 hidden sm:block">
                Think Store
              </Text>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              {/* Stats Badge */}
              <Badge
                count={contentCount}
                showZero
                color="#ff85a2"
                overflowCount={999}
              >
                <div className="px-3 py-1.5 bg-white/50 rounded-full border border-white/30">
                  <Text className="text-sm text-gray-600">
                    {contentCount === 1 ? "item saved" : "items saved"}
                  </Text>
                </div>
              </Badge>

              <Divider type="vertical" className="h-6 bg-gray-200" />

              {/* Username */}
              <Text className="text-sm text-gray-700 font-medium">
                {user?.username}
              </Text>

              {/* Logout Button */}
              <Button
                type="primary"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                loading={isLoggingOut}
                className="bg-pink-400 hover:bg-pink-500 border-none rounded-full px-4"
              >
                Logout
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              type="text"
              icon={mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
              size="large"
            />
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
        closable={false}
        className="mobile-nav-drawer"
        styles={{
          body: {
            padding: 0,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          },
          header: {
            display: "none",
          },
        }}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center shadow-sm">
                <DatabaseOutlined className="text-white text-sm" />
              </div>
              <Text className="text-lg font-semibold text-gray-800">
                Think Store
              </Text>
            </div>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 p-4">
            <Space direction="vertical" size="large" className="w-full">
              {/* User Info */}
              <div className="p-4 bg-pink-50/50 rounded-xl border border-pink-100">
                <Text className="text-xs text-gray-500 block mb-1">
                  Logged in as
                </Text>
                <Text className="text-base font-semibold text-gray-800">
                  {user?.username}
                </Text>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-100">
                <Space>
                  <DatabaseOutlined className="text-pink-400" />
                  <Text className="text-gray-600">Saved Items</Text>
                </Space>
                <Badge
                  count={contentCount}
                  color="#ff85a2"
                  overflowCount={999}
                  showZero
                />
              </div>
            </Space>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-gray-100">
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              loading={isLoggingOut}
              block
              size="large"
              className="bg-pink-400 hover:bg-pink-500 border-none rounded-full"
            >
              Logout
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
