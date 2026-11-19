import Link from "next/link";

export default function McpPage() {
  return (
    <main className="flex-1 bg-white px-6 py-20 text-[#18181B] sm:px-10">
      <section className="mx-auto max-w-3xl">
        <p className="text-sm font-medium text-[#71717A]">NovaMotion tools</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Model Context Protocol
        </h1>
        <p className="mt-6 text-base leading-7 text-[#52525B]">
          This workspace does not have a NovaMotion MCP server configured yet.
          You can still browse the component library and copy ready-to-use
          React examples from each component&apos;s detail page.
        </p>
        <Link
          href="/components"
          className="mt-8 inline-flex rounded-full bg-[#18181B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#27272A]"
        >
          Browse the library
        </Link>
      </section>
    </main>
  );
}
