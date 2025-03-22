import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { postPatchSchema } from "@/lib/validations/post";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
});

export async function PATCH(
  req: NextRequest,
  context: { params: { postId: string } }
) {
  const resolvedParams = await Promise.resolve(context.params);
  const { postId } = routeContextSchema.shape.params.parse(resolvedParams);

  try {
    if (!(await verifyCurrentUserHasAccessToPost(postId))) {
      return NextResponse.json(null, { status: 403 });
    }

    const json = await req.json();
    const body = postPatchSchema.parse(json);

    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        tags: body.tags,
      },
    });

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    if (error) {
      return NextResponse.json(error, { status: 400 });
    } else {
      return NextResponse.json(null, { status: 500 });
    }
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { postId: string } }
) {
  const resolvedParams = await Promise.resolve(context.params);
  const { postId } = routeContextSchema.shape.params.parse(resolvedParams);

  try {
    if (!(await verifyCurrentUserHasAccessToPost(postId))) {
      return NextResponse.json(null, { status: 403 });
    }

    await db.post.delete({
      where: {
        id: postId,
      },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error) {
      return NextResponse.json(error, { status: 400 });
    } else {
      return NextResponse.json(null, { status: 500 });
    }
  }
}

// 外部からAPIを叩かれないようにするための関数（記事を持っているか確認する）
async function verifyCurrentUserHasAccessToPost(postId: string) {
  const user = await getCurrentUser();
  const count = await db.post.count({
    where: {
      id: postId,
      authorId: user?.id,
    },
  });
  if (!user) {
    return false;
  }

  return count > 0;
}
