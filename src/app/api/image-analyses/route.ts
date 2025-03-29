import { currentUser } from "@clerk/nextjs/server";
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const imageAnalyses = await prisma.imageAnalysis.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(imageAnalyses);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}