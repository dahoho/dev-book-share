import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/prisma";

export async function PUT(req: Request) {
  // ユーザーのセッション情報を取得
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.error();
  }

  const { name, bio } = await req.json();

  try {
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: { name, bio },
    });

    return NextResponse.json(updatedUser);
  } catch {
    return NextResponse.error();
  }
}
