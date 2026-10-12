import { getLinkByShortCode } from "@/data/links";

interface ShortLinkRouteContext {
  params: Promise<{ shortCode: string }>;
}

export async function GET(
  _request: Request,
  { params }: ShortLinkRouteContext,
) {
  const { shortCode } = await params;
  const link = await getLinkByShortCode(shortCode);

  if (!link) {
    return new Response("Short link not found.", { status: 404 });
  }

  return Response.redirect(link.url, 302);
}
