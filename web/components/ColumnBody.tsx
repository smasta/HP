import Image from "next/image";
import type { CSSProperties } from "react";
import type { ColumnBlock } from "@/lib/columns";

/**
 * 解説記事の本文を描画する。
 * h2 には目次から飛ぶための id を振る（tableOfContents と採番を合わせている）。
 */
export default function ColumnBody({ blocks }: { blocks: ColumnBlock[] }) {
  let headingIndex = 0;

  return (
    <div className="mt-12">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case "h2": {
            headingIndex += 1;
            return (
              <h2
                key={key}
                id={`section-${headingIndex}`}
                data-reveal
                className="display-jp mt-16 scroll-mt-28 border-l-[3px] border-ink pl-4 text-[1.25rem] leading-[1.55] text-ink first:mt-0 md:text-[1.5rem]"
              >
                {block.text}
              </h2>
            );
          }

          case "h3":
            return (
              <h3
                key={key}
                data-reveal
                className="display-jp mt-10 text-[1.05rem] leading-[1.6] text-ink md:text-[1.15rem]"
              >
                {block.text}
              </h3>
            );

          case "p":
            return (
              <p
                key={key}
                data-reveal
                className="mt-6 text-[0.95rem] leading-[2.05] text-ink"
              >
                {block.text}
              </p>
            );

          case "ul":
            return (
              <ul key={key} data-reveal className="mt-6 space-y-2.5">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[0.92rem] leading-[2] text-ink"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.72em] h-[6px] w-[6px] shrink-0 rounded-full bg-emerald-glow"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={key} data-reveal className="mt-6 space-y-3">
                {block.items.map((item, itemIndex) => (
                  <li
                    key={item}
                    className="flex items-start gap-3.5 text-[0.92rem] leading-[2] text-ink"
                  >
                    <span
                      aria-hidden="true"
                      className="num mt-[0.15em] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-[0.7rem] text-white"
                    >
                      {itemIndex + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            );

          case "dl":
            return (
              <dl key={key} data-reveal className="mt-6 border-t border-black/10">
                {block.items.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-1 border-b border-black/10 py-3.5 sm:grid-cols-12 sm:gap-5"
                  >
                    <dt className="display-jp text-[0.8rem] text-graphite-600 sm:col-span-4">
                      {label}
                    </dt>
                    <dd className="text-[0.9rem] leading-[1.9] text-ink sm:col-span-8">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            );

          case "table":
            return (
              <div key={key} data-reveal className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-left">
                  <thead>
                    <tr className="border-y border-black/12 bg-paper">
                      {block.head.map((cell) => (
                        <th
                          key={cell}
                          scope="col"
                          className="display-jp px-4 py-3 text-[0.78rem] text-ink"
                        >
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-black/10">
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="px-4 py-3.5 text-[0.86rem] leading-[1.85] text-ink"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "quote":
            return (
              <figure key={key} data-reveal className="mt-8 border-l-2 border-emerald-glow pl-5">
                <blockquote className="text-[0.92rem] leading-[2] text-graphite-600">
                  {block.text}
                </blockquote>
                {block.source ? (
                  <figcaption className="mt-2 text-[0.76rem] text-graphite-400">
                    — {block.source}
                  </figcaption>
                ) : null}
              </figure>
            );

          case "note":
            return (
              <ul key={key} data-reveal className="mt-8 space-y-1.5">
                {block.items.map((item) => (
                  <li key={item} className="text-[0.76rem] leading-[1.9] text-graphite-400">
                    ※ {item}
                  </li>
                ))}
              </ul>
            );

          case "callout":
            return (
              <aside
                key={key}
                data-reveal
                className="mt-10 rounded-2xl border border-black/10 bg-paper p-6 md:p-7"
              >
                <p className="display-jp text-[0.95rem] text-ink">{block.title}</p>
                <ul className="mt-4 space-y-2">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[0.88rem] leading-[1.95] text-graphite-600"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.7em] h-[2px] w-3 shrink-0 bg-gradient-to-r from-indigo-glow to-emerald-glow"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>
            );

          case "cta":
            return (
              <aside
                key={key}
                data-reveal="scale"
                className="on-ink relative mt-12 overflow-hidden rounded-[22px] bg-ink p-7 md:p-9"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-indigo-glow to-emerald-glow"
                />
                <p className="display-jp text-[1.05rem] leading-[1.6] text-white md:text-[1.2rem]">
                  {block.title}
                </p>
                <p className="mt-3 text-[0.88rem] leading-[2] text-mist-300">{block.body}</p>
                <a
                  href={block.href}
                  className="btn-base pill-paper group mt-6 px-7 py-3 text-[0.82rem] font-semibold hover:scale-105 active:scale-95"
                >
                  {block.label}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </aside>
            );

          case "image":
            return (
              <figure key={key} data-reveal className="mt-10">
                <div className="clip-reveal relative aspect-[16/9] overflow-hidden rounded-xl bg-ink">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover"
                  />
                </div>
                {block.caption ? (
                  <figcaption className="mt-3 text-[0.76rem] leading-[1.8] text-graphite-400">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
