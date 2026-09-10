import type { ColumnItem } from "@/lib/columns";
import { tableOfContents } from "@/lib/columns";

/** 目次。h2 に振った id と対応する */
export function ColumnToc({ item }: { item: ColumnItem }) {
  const entries = tableOfContents(item.body);
  if (entries.length < 2) return null;

  return (
    <nav
      data-reveal
      aria-label="目次"
      className="rounded-2xl border border-black/10 bg-paper p-6 md:p-7"
    >
      <p className="eyebrow text-graphite-400">目次</p>
      <ol className="mt-4 space-y-2.5">
        {entries.map((entry, index) => (
          <li key={entry.id} className="flex items-start gap-3">
            <span className="num mt-[0.2em] text-[0.7rem] text-graphite-400">
              {String(index + 1).padStart(2, "0")}
            </span>
            <a
              href={`#${entry.id}`}
              className="text-[0.86rem] leading-[1.8] text-ink underline-offset-4 transition-colors duration-300 hover:text-graphite-600 hover:underline"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * 監修者。労働安全や介護は専門性が厳しく見られる領域のため、
 * 誰が内容を確認したのかを明示する。
 */
export function ColumnReviewer({ item }: { item: ColumnItem }) {
  if (!item.reviewer) return null;

  return (
    <aside
      data-reveal
      className="mt-14 rounded-2xl border border-black/10 p-6 md:p-7"
    >
      <p className="eyebrow text-graphite-400">監修</p>
      <p className="display-jp mt-3 text-[1rem] text-ink">
        {item.reviewer.name}
        <span className="ml-3 text-[0.78rem] font-medium text-graphite-600">
          {item.reviewer.role}
        </span>
      </p>
      <p className="mt-3 text-[0.84rem] leading-[1.95] text-graphite-600">
        {item.reviewer.profile}
      </p>
    </aside>
  );
}

/** よくある質問。FAQPage の構造化データと同じ内容を表示する */
export function ColumnFaq({ item }: { item: ColumnItem }) {
  if (!item.faq?.length) return null;

  return (
    <section data-reveal className="mt-16">
      <h2 className="display-jp border-l-[3px] border-ink pl-4 text-[1.25rem] leading-[1.55] text-ink md:text-[1.5rem]">
        よくある質問
      </h2>
      <dl className="mt-8 border-t border-black/10">
        {item.faq.map((entry) => (
          <div key={entry.q} className="border-b border-black/10 py-6">
            <dt className="display-jp flex items-start gap-3 text-[0.95rem] leading-[1.7] text-ink">
              <span aria-hidden="true" className="display-en text-emerald-glow">
                Q
              </span>
              {entry.q}
            </dt>
            <dd className="mt-3 flex items-start gap-3 text-[0.88rem] leading-[2] text-graphite-600">
              <span aria-hidden="true" className="display-en text-graphite-400">
                A
              </span>
              {entry.a}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** 出典。制度や統計を扱う記事では必ず示す */
export function ColumnSources({ item }: { item: ColumnItem }) {
  if (!item.sources?.length) return null;

  return (
    <section data-reveal className="mt-14 border-t border-black/10 pt-8">
      <p className="eyebrow text-graphite-400">出典</p>
      <ul className="mt-4 space-y-2.5">
        {item.sources.map((source) => (
          <li key={source.href}>
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-start gap-2 text-[0.82rem] leading-[1.8] text-graphite-600 transition-colors duration-300 hover:text-ink"
            >
              {source.label}
              <span
                aria-hidden="true"
                className="mt-[0.2em] text-[0.72rem] text-graphite-400 transition-transform duration-300 group-hover:translate-x-0.5"
              >
                ↗
              </span>
              <span className="sr-only">（外部サイトが新しいタブで開きます）</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
