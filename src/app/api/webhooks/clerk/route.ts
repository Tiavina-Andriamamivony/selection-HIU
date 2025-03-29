import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '../../../../../lib/prisma';

export async function POST(req: Request) {
  const payload = await req.json()
  const evt = payload as WebhookEvent
  
  try {
    if (evt.type === 'user.created' || evt.type === 'user.updated') {
      await prisma.user.upsert({
        where: { 
          id: evt.data.id as string 
        },
        create: {
          id: evt.data.id as string,
          firstName: evt.data.first_name as string || "",
          lastName: evt.data.last_name as string || "",
          profileImage: evt.data.image_url as string || null,
        },
        update: {
          firstName: evt.data.first_name as string || "",
          lastName: evt.data.last_name as string || "",
          profileImage: evt.data.image_url as string || null,
        },
      });
    }

    if (evt.type === 'user.deleted') {
      await prisma.user.delete({
        where: { id: evt.data.id as string },
      });
    }

    return new Response('Success', { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response('Error', { status: 500 })
  }
}