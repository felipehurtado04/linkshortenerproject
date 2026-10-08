import { SignUpButton } from "@clerk/nextjs";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Link2,
  PanelsTopLeft,
  Share2,
} from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

const features = [
  {
    number: "01",
    title: "Create concise links",
    description:
      "Turn long URLs into short links that are easier to read, remember, and share.",
    icon: Link2,
  },
  {
    number: "02",
    title: "Present with confidence",
    description:
      "Keep links tidy in client emails, internal documents, and presentations.",
    icon: Share2,
  },
  {
    number: "03",
    title: "Keep your workflow organized",
    description:
      "Access your link-shortening workspace whenever you need to create or manage a link.",
    icon: PanelsTopLeft,
  },
];

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex-1 bg-white text-[#15243a] dark:bg-[#0c151d] dark:text-[#e8edf4]">
      <section className="relative overflow-hidden border-b border-[#e7ebf0] dark:border-[#263544]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f3f5f8_1px,transparent_1px),linear-gradient(to_bottom,#f3f5f8_1px,transparent_1px)] bg-[size:64px_64px] opacity-55 dark:bg-[linear-gradient(to_right,#24313e_1px,transparent_1px),linear-gradient(to_bottom,#24313e_1px,transparent_1px)] dark:opacity-35" />
        <div className="relative mx-auto grid min-h-[640px] max-w-7xl items-center gap-14 px-6 py-20 sm:px-10 lg:min-h-[680px] lg:grid-cols-[1fr_0.92fr] lg:gap-16 lg:px-16 lg:py-24">
          <div className="max-w-xl">
            <p className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.17em] text-[#456b9a] dark:text-[#9bbce2]">
              <span className="h-px w-7 bg-[#456b9a] dark:bg-[#9bbce2]" />
              Link management, made clear
            </p>
            <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#15243a] dark:text-[#edf2f7] sm:text-6xl lg:text-[4.25rem]">
              Make every link
              <br />
              <span className="text-[#41658f] dark:text-[#9bbce2]">work harder.</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-[#647184] dark:text-[#aab6c5] sm:text-lg sm:leading-8">
              Create concise, professional links that are easier to share
              across your business. A straightforward tool for a more
              organized workflow.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  className="h-12 rounded-md bg-[#1d3554] px-6 text-sm font-semibold text-white shadow-sm hover:bg-[#28486e] dark:bg-[#a9c5e4] dark:text-[#132338] dark:hover:bg-[#c0d5ec]"
                >
                  Create your account
                  <ArrowRight aria-hidden="true" className="ml-1 size-4" />
                </Button>
              </SignUpButton>
              <a
                className="inline-flex h-12 items-center justify-center gap-2 px-4 text-sm font-medium text-[#526176] transition-colors hover:text-[#1d3554] dark:text-[#b8c4d2] dark:hover:text-white"
                href="#features"
              >
                Explore the platform
                <ArrowDown aria-hidden="true" className="size-4" />
              </a>
            </div>
            <div className="mt-9 flex items-center gap-2 border-t border-[#e7ebf0] pt-5 text-xs text-[#728094] dark:border-[#2a3948] dark:text-[#9caabc]">
              <Check aria-hidden="true" className="size-4 text-[#49755f] dark:text-[#8fc4a7]" />
              Simple link shortening, without unnecessary complexity.
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[510px] lg:ml-auto">
            <div className="absolute -inset-5 bg-[#eaf0f6] blur-2xl dark:bg-[#24364a]/60" />
            <div className="relative border border-[#dfe5ec] bg-white shadow-[0_24px_70px_-38px_rgba(24,42,65,0.35)] dark:border-[#344456] dark:bg-[#141f2b] dark:shadow-black/30">
              <div className="flex items-center justify-between border-b border-[#e8ecf1] px-6 py-5 dark:border-[#2a3948]">
                <div>
                  <p className="text-sm font-semibold text-[#1d2d43] dark:text-[#e6edf5]">
                    Link preview
                  </p>
                  <p className="mt-1 text-xs text-[#7a8798] dark:text-[#a0adbd]">
                    A clearer way to share
                  </p>
                </div>
                <span                 className="border border-[#e1e7ee] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#718096] dark:border-[#3b4b5e] dark:text-[#a8b6c8]">
                  Example
                </span>
              </div>

              <div className="space-y-4 px-6 py-6">
                <div className="border border-[#e6eaf0] bg-[#fafbfd] p-4 dark:border-[#344456] dark:bg-[#101923]">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8290a1] dark:text-[#9eacbd]">
                    Original URL
                  </p>
                  <p className="break-all text-sm leading-6 text-[#667487] dark:text-[#b2becc]">
                    example.com/resources/quarterly-business-review
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-[#e3e8ee]" />
                  <ArrowDown
                    aria-hidden="true"
                    className="size-4 text-[#8492a3] dark:text-[#9eacbd]"
                  />
                  <span className="h-px flex-1 bg-[#e3e8ee]" />
                </div>

                <div className="border border-[#d9e3ee] bg-[#f5f8fb] p-4 dark:border-[#3b526b] dark:bg-[#1b2b3b]">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#58789d] dark:text-[#a9c5e4]">
                    Short link
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-semibold text-[#25476e] dark:text-[#d5e5f7]">
                      your-domain.com/qbr
                    </p>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-[#58789d] dark:text-[#a9c5e4]"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-[#e8ecf1] bg-[#fafbfd] px-6 py-4 dark:border-[#2a3948] dark:bg-[#111a24]">
                <p className="text-xs leading-5 text-[#778597] dark:text-[#a3b0c0]">
                  Long destination. Concise, presentation-ready link.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="border-b border-[#e7ebf0] bg-[#f7f9fb] px-6 py-20 dark:border-[#263544] dark:bg-[#101a25] sm:px-10 lg:px-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-5 md:grid-cols-[1fr_0.7fr] md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#58789d] dark:text-[#9bbce2]">
                Built for everyday work
              </p>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.035em] text-[#192b43] dark:text-[#e7edf5] sm:text-4xl">
                The details that make sharing easier.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#687689] dark:text-[#aab6c5] md:ml-auto">
              Bring a little more clarity to the links you send, publish, and
              share with your team.
            </p>
          </div>

          <div className="grid border border-[#e0e6ed] bg-white dark:border-[#344456] dark:bg-[#141f2b] md:grid-cols-3">
            {features.map(({ number, title, description, icon: Icon }, index) => (
              <article
                key={number}
                className={`p-6 sm:p-8 ${index > 0 ? "border-t border-[#e0e6ed] dark:border-[#344456] md:border-l md:border-t-0" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center border border-[#e2e8ef] bg-[#f7f9fb] text-[#456b9a] dark:border-[#3b4b5e] dark:bg-[#1b2b3b] dark:text-[#a9c5e4]">
                    <Icon aria-hidden="true" className="size-[18px]" />
                  </div>
                  <span className="font-mono text-xs text-[#96a1af] dark:text-[#8695a8]">
                    {number}
                  </span>
                </div>
                <h3 className="mt-7 text-base font-semibold text-[#20324a] dark:text-[#dce5ef]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#6b788a] dark:text-[#aab6c5]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 border border-[#e0e6ed] bg-white p-7 dark:border-[#344456] dark:bg-[#141f2b] sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#58789d] dark:text-[#9bbce2]">
              Get started
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#192b43] dark:text-[#e7edf5] sm:text-3xl">
              Bring more clarity to every link.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#687689] dark:text-[#aab6c5]">
              Create your account and start shortening links in a few simple
              steps.
            </p>
          </div>
          <SignUpButton mode="modal">
            <Button
              size="lg"
              className="h-12 shrink-0 rounded-md bg-[#1d3554] px-6 text-sm font-semibold text-white shadow-sm hover:bg-[#28486e] dark:bg-[#a9c5e4] dark:text-[#132338] dark:hover:bg-[#c0d5ec]"
            >
              Create your account
              <ArrowRight aria-hidden="true" className="ml-1 size-4" />
            </Button>
          </SignUpButton>
        </div>
      </section>
    </main>
  );
}
