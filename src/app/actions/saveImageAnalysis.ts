'use server'

import prisma  from "../../../lib/prisma"
export async function saveImageAnalysis(userId: string, imageUrl: string, predictions: any[]) {
  try {
    const analysis = await prisma.imageAnalysis.create({
      data: {
        userId,
        imageUrl,
        predictions: predictions,
      },
    })
    return { success: true, analysis }
  } catch (error) {
    console.error('Failed to save image analysis:', error)
    return { success: false, error: 'Failed to save image analysis' }
  }
}