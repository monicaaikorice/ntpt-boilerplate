// app/api/preview/route.ts
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/prismicio";
import { linkResolver } from "@/lib/utils/linkResolver";

export const runtime = "nodejs";

export async function GET(request: Request): Promise<Response> {
  const client = createClient();

  const { searchParams } = new URL(request.url);
  const previewToken = searchParams.get("token") ?? undefined;
  const documentID = searchParams.get("documentId") ?? undefined;

  const url = await client.resolvePreviewURL({
    linkResolver,
    defaultURL: "/",
    previewToken,
    documentID,
  });

  // Narrow the type if TS is still grumpy:
  (draftMode() as ReturnType<typeof draftMode> & { enable: () => void }).enable();

  redirect(url); // throws, satisfies the handler
}
