import  prisma  from "../../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const userData = await req.json();
    
    await prisma.user.upsert({
      where: { id: userData.id },
      create: {
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileImage: userData.profileImage,
      },
      update: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileImage: userData.profileImage,
      },
    });

    return new Response('User synced', { status: 200 });
  } catch (error) {
    console.error('Error syncing user:', error);
    return new Response('Error syncing user', { status: 500 });
  }
}