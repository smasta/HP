import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import ServiceDetail from "@/components/ServiceDetail";
import { buildMetadata } from "@/lib/seo";
import { findService, servicesOf } from "@/lib/site";

const HUB = "reaxion" as const;

type Params = { params: Promise<{ service: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return servicesOf(HUB).map((service) => ({ service: service.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { service: slug } = await params;
  const service = findService(HUB, slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/${HUB}/${slug}/`,
  });
}

export default async function Page({ params }: Params) {
  const { service: slug } = await params;
  const service = findService(HUB, slug);
  if (!service) notFound();

  return (
    <PageShell>
      <ServiceDetail service={service} />
    </PageShell>
  );
}
