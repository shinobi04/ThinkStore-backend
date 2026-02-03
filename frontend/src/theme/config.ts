import { ThemeConfig } from "antd";

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: "#fafafa",
    colorPrimaryHover: "#e4e4e7",
    colorPrimaryActive: "#d4d4d8",
    colorLink: "#a1a1aa",
    colorLinkHover: "#fafafa",
    colorSuccess: "#22c55e",
    colorWarning: "#f59e0b",
    colorError: "#ef4444",
    colorTextBase: "#fafafa",
    colorBgBase: "#09090b",
    colorBgContainer: "#09090b",
    colorBgElevated: "#18181b",
    colorBorder: "#27272a",
    colorBorderSecondary: "#27272a",
    borderRadius: 6,
    wireframe: true,
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
    colorTextLightSolid: "#0a0a0a",
  },
  components: {
    Button: {
      borderRadius: 6,
      controlHeight: 40,
      colorPrimary: "#fafafa",
      colorPrimaryHover: "#e4e4e7",
      colorPrimaryActive: "#d4d4d8",
    },
    Card: {
      borderRadius: 8,
      colorBgContainer: "#18181b",
      colorBorder: "#27272a",
    },
    Input: {
      borderRadius: 6,
      controlHeight: 40,
      colorBgContainer: "#18181b",
      colorBorder: "#27272a",
    },
    Modal: {
      borderRadius: 8,
      colorBgElevated: "#18181b",
      headerBg: "#18181b",
      contentBg: "#18181b",
    },
    Tag: {
      borderRadius: 4,
    },
    Alert: {
      colorBgElevated: "#18181b",
    },
    Empty: {
      colorTextDescription: "#71717a",
    },
    Segmented: {
      colorBgContainer: "#18181b",
      colorBgLayout: "#27272a",
      itemSelectedBg: "#27272a",
    },
    Select: {
      borderRadius: 6,
      controlHeight: 40,
      colorBgContainer: "#18181b",
      colorBorder: "#27272a",
      optionSelectedBg: "#27272a",
      optionActiveBg: "#27272a",
    },
  },
};
