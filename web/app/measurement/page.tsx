import PageShell from "@/components/PageShell";
import HubDetail from "@/components/HubDetail";
import { buildMetadata } from "@/lib/seo";
import { hubs } from "@/lib/site";

const hub = hubs.find((item) => item.slug === "measurement")!;

export const metadata = buildMetadata({
  title: hub.seo.title,
  description: hub.seo.description,
  path: "/measurement/",
});

export default function Page() {
  return (
    <PageShell>
      <HubDetail hub={hub} />
    </PageShell>
  );
}
