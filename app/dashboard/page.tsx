import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getLinksForUser } from "@/data/links";
import { CreateLinkDialog } from "./components/create-link-dialog";
import { LinkItemActions } from "./components/link-item-actions";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const userLinks = await getLinksForUser(userId);

  return (
    <main className="flex-1 bg-white px-6 py-12 text-[#15243a] dark:bg-[#0c151d] dark:text-[#e8edf4] sm:px-10 lg:px-16 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#58789d] dark:text-[#9bbce2]">
              Workspace
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              Your links
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#687689] dark:text-[#aab6c5]">
              View the short links you have created.
            </p>
          </div>
          <CreateLinkDialog />
        </div>

        {userLinks.length > 0 ? (
          <ul className="divide-y divide-[#e0e6ed] border-y border-[#e0e6ed] dark:divide-[#344456] dark:border-[#344456]">
            {userLinks.map((link) => (
              <li
                key={link.id}
                className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <a
                    className="block break-all font-medium text-[#25476e] hover:underline dark:text-[#d5e5f7]"
                    href={`/${link.shortCode}`}
                  >
                    {link.shortCode}
                  </a>
                  <p className="break-all text-sm leading-6 text-[#687689] dark:text-[#aab6c5]">
                    {link.url}
                  </p>
                  <p className="mt-2 text-xs text-[#687689] dark:text-[#aab6c5]">
                    Added{" "}
                    {new Intl.DateTimeFormat("en", {
                      dateStyle: "medium",
                    }).format(link.createdAt)}
                  </p>
                </div>
                <LinkItemActions
                  id={link.id}
                  shortCode={link.shortCode}
                  url={link.url}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="border border-[#e0e6ed] bg-[#f7f9fb] px-6 py-10 text-center dark:border-[#344456] dark:bg-[#141f2b]">
            <h2 className="text-base font-semibold">No links yet</h2>
            <p className="mt-2 text-sm leading-6 text-[#687689] dark:text-[#aab6c5]">
              Your shortened links will appear here once you create them.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}