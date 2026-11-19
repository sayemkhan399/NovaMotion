import ComponentDetail from "@/components/ComponentDetail";
import { COMPONENT_SLUGS } from "@/components/searchItems";

export function generateStaticParams() {
  return COMPONENT_SLUGS.map((slug) => ({ slug }));
}

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ComponentDetail slug={slug} />;
}
