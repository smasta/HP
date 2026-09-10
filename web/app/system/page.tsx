import PageShell from "@/components/PageShell";
import HubDetail from "@/components/HubDetail";
import { photos } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { hubs } from "@/lib/site";

const hub = hubs.find((item) => item.slug === "system")!;

export const metadata = buildMetadata({
  title: hub.seo.title,
  description: hub.seo.description,
  path: "/system/",
  image: hub.cover ?? photos[hub.photo],
});

export default function Page() {
  return (
    <PageShell>
      <HubDetail hub={hub} />
    </PageShell>
  );
}
