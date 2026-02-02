import { ThemeConfig } from "antd";

export const blossomTheme: ThemeConfig = {
  token: {
    colorPrimary: "#ff85a2",
    colorPrimaryHover: "#ff9eb5",
    colorPrimaryActive: "#ff6b8a",
    colorLink: "#ff85a2",
    colorLinkHover: "#ff9eb5",
    colorSuccess: "#95de64",
    colorWarning: "#ffc53d",
    colorError: "#ff4d4f",
    colorTextBase: "#262626",
    colorBgBase: "#fff0f3",
    borderRadius: 8,
    wireframe: false,
  },
  components: {
    Button: {
      borderRadius: 8,
      controlHeight: 40,
    },
    Card: {
      borderRadius: 12,
    },
    Input: {
      borderRadius: 8,
      controlHeight: 40,
    },
    Modal: {
      borderRadius: 12,
    },
    Tag: {
      borderRadius: 6,
    },
  },
};
