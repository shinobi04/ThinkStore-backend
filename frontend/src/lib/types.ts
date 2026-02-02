export type ContentType = "document" | "tweet" | "youtube" | "link";

export interface Tag {
  id: number;
  name: string;
}

export interface Content {
  id: number;
  type: ContentType;
  link: string | null;
  title: string;
  userId: number;
  tags: Tag[];
  createdAt: string;
}

export interface User {
  id: number;
  username: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  password: string;
}

export interface AddContentData {
  type: ContentType;
  title: string;
  tags: string[];
}

export interface ShareContent {
  user: {
    username: string;
  };
  type: ContentType;
  title: string;
  tags: Tag[];
  createdAt: string;
}
