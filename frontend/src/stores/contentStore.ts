import { create } from "zustand";
import { Content, AddContentData, ContentType } from "@/lib/types";
import { apiClient } from "@/lib/api";

interface ContentState {
  contents: Content[];
  filteredContents: Content[];
  isLoading: boolean;
  error: string | null;
  selectedType: ContentType | "all";
  fetchContents: () => Promise<void>;
  addContent: (data: AddContentData) => Promise<void>;
  deleteContent: (id: number) => Promise<void>;
  createShareLink: (id: number) => Promise<string>;
  filterByType: (type: ContentType | "all") => void;
  clearError: () => void;
}

export const useContentStore = create<ContentState>((set, get) => ({
  contents: [],
  filteredContents: [],
  isLoading: false,
  error: null,
  selectedType: "all",

  fetchContents: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.getContents();
      const contents = response.data.contents;
      set({
        contents,
        filteredContents: contents,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch contents";
      set({ isLoading: false, error: errorMessage });
      throw error;
    }
  },

  addContent: async (data: AddContentData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.addContent(data);
      const newContent = response.data;
      set((state) => {
        const updatedContents = [newContent, ...state.contents];
        return {
          contents: updatedContents,
          filteredContents:
            state.selectedType === "all" || state.selectedType === newContent.type
              ? [newContent, ...state.filteredContents]
              : state.filteredContents,
          isLoading: false,
          error: null,
        };
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to add content";
      set({ isLoading: false, error: errorMessage });
      throw error;
    }
  },

  deleteContent: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.deleteContent(id);
      set((state) => {
        const updatedContents = state.contents.filter((c) => c.id !== id);
        const updatedFiltered = state.filteredContents.filter((c) => c.id !== id);
        return {
          contents: updatedContents,
          filteredContents: updatedFiltered,
          isLoading: false,
          error: null,
        };
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete content";
      set({ isLoading: false, error: errorMessage });
      throw error;
    }
  },

  createShareLink: async (id: number) => {
    try {
      const response = await apiClient.createShareLink(id);
      const shareLink = response.data.link;
      if (!shareLink) {
        throw new Error("Failed to create share link");
      }
      set((state) => {
        const updatedContents = state.contents.map((c) =>
          c.id === id ? { ...c, link: shareLink } : c
        );
        const updatedFiltered = state.filteredContents.map((c) =>
          c.id === id ? { ...c, link: shareLink } : c
        );
        return {
          contents: updatedContents,
          filteredContents: updatedFiltered,
        };
      });
      return shareLink;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create share link";
      set({ error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  filterByType: (type: ContentType | "all") => {
    set((state) => {
      const filtered =
        type === "all"
          ? state.contents
          : state.contents.filter((c) => c.type === type);
      return {
        selectedType: type,
        filteredContents: filtered,
      };
    });
  },

  clearError: () => set({ error: null }),
}));
