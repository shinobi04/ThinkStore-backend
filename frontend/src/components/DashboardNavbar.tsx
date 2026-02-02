"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useContentStore } from "@/stores/contentStore";
import {
  Button,
  Drawer,
  Typography,
  Avatar,
  Tooltip,
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
      <nav className="sticky top-0 z-50 h-20 bg-white/90 backdrop-blur-xl border-b border-gray-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg shadow-pink-200/80">
                <DatabaseOutlined className="text-white text-lg" />
              </div>
              <Text className="text-xl font-bold text-gray-800 tracking-tight hidden sm:block">
                Think Store
              </Text>
            </div>

            {/* Right side - Desktop Navigation + Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Desktop Navigation - Hidden on mobile */}
              <div className="hidden md:flex items-center gap-5">
                {/* Username */}
                <div className="flex items-center gap-2">
                  <Avatar className="bg-purple-500 text-white font-semibold">
                    {user?.username?.[0].toUpperCase()}
                  </Avatar>
                  <Text className="text-sm text-gray-700 font-medium">
                    {user?.username}
                  </Text>
                </div>

                {/* Logout Button */}
                <Tooltip title="Logout" placement="bottom">
                  <Button
                    type="text"
                    shape="circle"
                    icon={<LogoutOutlined className="text-gray-600" />}
                    onClick={handleLogout}
                    loading={isLoggingOut}
                    className="hover:bg-gray-100"
                    size="large"
                  />
                </Tooltip>
              </div>

              {/* Mobile Menu Button - Only visible on mobile */}
              <div className="block md:hidden">
                <Button
                  type="text"
                  icon={mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-700"
                  size="large"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Drawer
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
        closable={false}
        className="mobile-nav-drawer"
        styles={{
          body: { padding: 0 },
          header: { display: "none" },
        }}
      >
        <div className="flex flex-col h-full bg-gray-50">
          {/* Drawer Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg shadow-pink-200/80">
                <DatabaseOutlined className="text-white text-lg" />
              </div>
              <Text className="text-lg font-bold text-gray-800">
                Think Store
              </Text>
            </div>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 p-4">
             <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                <Avatar size="large" className="bg-purple-500 text-white font-semibold">
                  {user?.username?.[0].toUpperCase()}
                </Avatar>
                <div>
                  <Text className="font-semibold text-gray-800 block">
                    {user?.username}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {contentCount} items saved
                  </Text>
                </div>
              </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-gray-200">
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              loading={isLoggingOut}
              block
              size="large"
              className="bg-gradient-to-r from-pink-500 to-purple-500 border-none rounded-full shadow-lg shadow-pink-500/30 hover:shadow-xl hover:scale-105 transition-all"
            >
              Logout
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
