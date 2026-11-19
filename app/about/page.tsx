import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex-1 bg-white px-6 py-20 text-[#18181B] sm:px-10">
      <section className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium text-[#71717A]">About NovaMotion</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Motion that makes interfaces feel alive.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#52525B]">
          NovaMotion is a collection of interactive React components designed
          to make polished motion easier to add to your projects. Preview each
          component, explore its options, and copy a JSX or TSX example.
        </p>
        <Link
          href="/components"
          className="mt-8 inline-flex rounded-full bg-[#18181B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#27272A]"
        >
          Explore components
        </Link>
      </section>
    </main>
  );
}
