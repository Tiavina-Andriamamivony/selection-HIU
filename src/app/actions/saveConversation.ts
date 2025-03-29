'use server'

import  prisma  from "../../../lib/prisma"
export async function saveConversation(title: string, content: string, userId: string) {
  try {
    const conversation = await prisma.conversation.create({
      data: {
        title,
        content,
        userId,
      },
    })
    return { success: true, conversation }
  } catch (error) {
    console.error('Failed to save conversation:', error)
    return { success: false, error: 'Failed to save conversation' }
  }
}