import { prisma } from "@/lib/prisma";

export class ChatService {
  /** ------------------------  
   * Create a new conversation
   * @param {string} userId - User ID
   * @param {string} mode - chat, tool, or agent
   * @param {string} title - Optional conversation title
   ------------------------ */
  async createConversation(userId: string, mode = "chat", title = null) {
    return await prisma.conversation.create({
      data: {
        userId,
        mode,
        title: title || `New ${mode} conversation`,
      },
    });
  }

  /** ------------------------
   * Get or create a conversation for user
   * @param {string} userId - User ID
   * @param {string} conversationId - Optional conversation ID
   * @param {string} mode - chat, tool, or agent
   ------------------------ */
  async getOrCreateConversation(
    userId: string,
    conversationId = null,
    mode = "chat",
  ) {
    if (conversationId) {
      const conversation = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          userId,
        },
        include: {
          message: {
            orderBy: { createdAt: "asc" },
          },
        },
      });

      if (conversation) return conversation;
    }

    // Create new conversation if not found or not provided
    return await this.createConversation(userId, mode);
  }

  /** ------------------------
   * Add a message to conversation
   * @param {string} conversationId - Conversation ID
   * @param {string} role - user, assistant, system, tool
   * @param {string|object} content - Message content
   ------------------------ */
  async addMessage(conversationId: string, role: string, content: string) {
    // Convert content to JSON string if it's an object
    const contentStr =
      typeof content === "string" ? content : JSON.stringify(content);

    return await prisma.message.create({
      data: {
        conversationId,
        role,
        content: contentStr,
      },
    });
  }

  /** ------------------------
   * Get conversation messages
   * @param {string} conversationId - Conversation ID
   ------------------------*/
  async getMessages(conversationId: string) {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });

    // Parse JSON content back to objects if needed
    return messages.map((msg) => ({
      ...msg,
      content: JSON.parse(msg.content),
    }));
  }

  /** ------------------------
   * Get all conversations for a user
   * @param {string} userId - User ID
   ------------------------ */
  async getUserConversations(userId: string) {
    return await prisma.conversation.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: {
        message: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
    });
  }

  /** ------------------------
   * Delete a conversation
   * @param {string} conversationId - Conversation ID
   * @param {string} userId - User ID (for security)
   ------------------------ */
  async deleteConversation(conversationId: string, userId: string) {
    return await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userId,
      },
    });
  }

  /** ------------------------
   * Update conversation title
   * @param {string} conversationId - Conversation ID
   * @param {string} title - New title
   ------------------------ */
  async updateTitle(conversationId: string, title: string) {
    return await prisma.conversation.update({
      where: { id: conversationId },
      data: { title },
    });
  }

  /** ------------------------
   * Format messages for AI SDK
   * @param {Array} messages - Database messages
   ------------------------ */
  formatMessagesForAI(messages: any[]) {
    return messages.map((msg) => ({
      role: msg.role,
      content:
        typeof msg.content === "string"
          ? msg.content
          : JSON.stringify(msg.content),
    }));
  }
}
