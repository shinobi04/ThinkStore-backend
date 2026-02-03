"use client";

import React from "react";
import { ConfigProvider, App } from "antd";
import { darkTheme } from "@/theme/config";
import StyledComponentsRegistry from "@/lib/AntdRegistry";

export default function AntdProviders({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ConfigProvider theme={darkTheme}>
        <App>{children}</App>
      </ConfigProvider>
    </StyledComponentsRegistry>
  );
}
