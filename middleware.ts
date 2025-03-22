import type { NextRequest } from "next/server";
import { auth } from "./auth";

export default auth(async (req: NextRequest) => {
  console.log("req", req);
});

// ミドルウェアを適用するページを指定
export const config = {
  matcher: [],
};
