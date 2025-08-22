// app/api/exit-preview/route.ts
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export const runtime = "nodejs";

export async function GET() {
  (draftMode() as ReturnType<typeof draftMode> & { disable: () => void }).disable();
  redirect("/");
}
