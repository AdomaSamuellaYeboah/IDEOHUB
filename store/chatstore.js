import axios from "axios";
import { create } from "zustand";
import api from "./api";

export const useChatStore = create((set, get) => ({
  messages: [],
  error: null,
  isLoading: false,

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  fetchMessages: async (jwt) => {
    console.log("Fetching messages...");
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${api}/api/chat/messages`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Messages fetched", response.data);
      if (response.data.success) {
        set({ messages: response.data.data });
      } else {
        throw new Error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error?.data?.message);
      set({ error: error?.data?.message || "Failed to fetch messages" });
    } finally {
      set({ isLoading: false });
      console.log("Messages fetched successfully");
    }
  },

  reLoadMessages: async (jwt) => {
    console.log("reloading messages...");
    set({ error: null });
    try {
      const response = await axios.get(`${api}/api/chat/messages`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Messages fetched", response.data);
      if (response.data.success) {
        set({ messages: response.data.data });
      } else {
        throw new Error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error?.data?.message);
      set({ error: error?.data?.message || "Failed to fetch messages" });
    } finally {
      set({ isLoading: false });
      console.log("Messages fetched successfully");
    }
  },

  sendRequest: async (message, jwt) => {
    set({ error: null });
    try {
      if (!message) throw new Error("Request cannot be empty");

      const data = { message: message };
      const response = await axios.post(`${api}/api/chat/messages`, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Message sent", response.data);
      if (response.data.success) {
        set({ messages: [...get().messages, response.data.data] });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      set({ error: error?.data?.message || "Failed to send message" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
