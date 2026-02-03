"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useContentStore } from "@/stores/contentStore";
import { Button, Drawer, Typography, Tooltip, a } from "antd";
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
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#27272a] rounded-lg flex items-center justify-center border border-[#3f3f46]">
                <DatabaseOutlined className="text-[#fafafa]" />
              </div>
              <Text className="text-lg font-semibold text-[#fafafa] hidden sm:block">
                Think Store
              </Text>
            </div>

            {/* Right side - Desktop Navigation + Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Desktop Navigation - Hidden on mobile */}
              <div className="hidden md:flex items-center gap-4">
                {/* Username */}
                <div className="flex items-center gap-3">
                  <Text className="text-sm text-[#a1a1aa]">
                    {user?.username}
                  </Text>
                </div>

                {/* Divider */}
                <div className="w-px h-6 bg-[#27272a]" />

                {/* Logout Button */}
                <Tooltip title="Logout" placement="bottom">
                  <Button
                    type="text"
                    shape="circle"
                    icon={<LogoutOutlined className="text-[#71717a]" />}
                    onClick={handleLogout}
                    loading={isLoggingOut}
                    className="hover:!bg-[#27272a] !border-none"
                  />
                </Tooltip>
              </div>

              {/* Mobile Menu Button - Only visible on mobile */}
              <div className="block md:hidden">
                <Button
                  type="text"
                  icon={
                    mobileMenuOpen ? (
                      <CloseOutlined className="text-[#fafafa]" />
                    ) : (
                      <MenuOutlined className="text-[#fafafa]" />
                    )
                  }
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="!border-none hover:!bg-[#27272a]"
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
        size="default"
        closable={false}
        className="mobile-nav-drawer"
        styles={{
          body: { padding: 0, background: "#0a0a0a" },
          header: { display: "none" },
          mask: { background: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        <div className="flex flex-col h-full bg-[#0a0a0a]">
          {/* Drawer Header */}
          <div className="p-4 border-b border-[#27272a]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#27272a] rounded-lg flex items-center justify-center border border-[#3f3f46]">
                  <DatabaseOutlined className="text-[#fafafa]" />
                </div>
                <Text className="text-lg font-semibold text-[#fafafa]">
                  Think Store
                </Text>
              </div>
              <Button
                type="text"
                icon={<CloseOutlined className="text-[#fafafa]" />}
                onClick={() => setMobileMenuOpen(false)}
                className="!border-none"
              />
            </div>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 p-4">
            <div className="flex items-center gap-3 p-4 bg-[#18181b] rounded-lg border border-[#27272a]">
              <div>
                <Text className="text-[#fafafa] font-medium block">
                  {user?.username}
                </Text>
                <Text className="text-xs text-[#71717a]">
                  {contentCount} items saved
                </Text>
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-[#27272a]">
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              loading={isLoggingOut}
              block
              size="large"
              className="!bg-[#fafafa] !text-[#0a0a0a] hover:!bg-[#e4e4e7] !border-none !rounded-md !font-medium"
            >
              Logout
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
