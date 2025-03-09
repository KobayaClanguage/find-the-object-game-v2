import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");

/* 
  テストエントリポイント
  デプロイ時の動作確認などで使う
 */
app.get("/hello", (c) => {
  return c.json({
    message: "Hello! find the object game v2 !",
  });
});

app.post("/auth/login", async (c) => {
  const body = await c.req.json();
  const message = "success";
  console.log(body);

  // TODO: ログイン処理の記述

  return c.json({
    message: message,
    body: body,
  });
});

export const GET = handle(app);
export const POST = handle(app);
