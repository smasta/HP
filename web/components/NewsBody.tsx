import Image from "next/image";
import type { NewsBlock } from "@/lib/content";

/** 記事本文のブロックを描画する */
export default function NewsBody({ blocks }: { blocks: NewsBlock[] }) {
  return (
    <div className="mt-12">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === "h") {
          return (
            <h2
              key={key}
              data-reveal
              className="display-jp mt-14 border-l-[3px] border-ink pl-4 text-[1.15rem] leading-[1.6] text-ink first:mt-0 md:mt-16 md:text-[1.35rem]"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "ul") {
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
        }

        if (block.type === "dl") {
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
        }

        if (block.type === "table") {
          return (
            <div key={key} data-reveal className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left">
                <thead>
                  <tr>
                    {block.head.map((cell, cellIndex) => (
                      <th
                        key={cell || `head-${cellIndex}`}
                        scope="col"
                        className={[
                          "border-b-2 border-ink px-3 py-3 text-[0.78rem] tracking-[0.06em]",
                          cellIndex === 0 ? "text-graphite-600" : "text-ink",
                        ].join(" ")}
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={`${row[0]}-${cellIndex}`}
                          className={[
                            "border-b border-black/10 px-3 py-4 align-top text-[0.86rem] leading-[1.85]",
                            cellIndex === 0
                              ? "display-jp whitespace-nowrap text-ink"
                              : "text-graphite-600",
                          ].join(" ")}
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
        }

        if (block.type === "image") {
          return (
            <figure key={key} data-reveal className="mt-8">
              <div className="overflow-hidden rounded-2xl border border-black/10 bg-paper">
                <Image
                  src={block.src}
                  alt={block.alt}
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="h-auto w-full object-contain"
                />
              </div>
              {block.caption ? (
                <figcaption className="mt-3 text-[0.78rem] leading-[1.8] text-graphite-400">
                  {block.caption}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        if (block.type === "quote") {
          return (
            <figure key={key} data-reveal className="mt-7">
              <blockquote className="rounded-2xl border border-black/10 bg-paper px-7 py-8 md:px-9 md:py-10">
                <p className="display-jp text-[0.98rem] leading-[1.95] text-ink md:text-[1.1rem]">
                  「{block.text}」
                </p>
              </blockquote>
              {block.author ? (
                <figcaption className="mt-3 text-[0.8rem] text-graphite-600">
                  — {block.author}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        if (block.type === "note") {
          return (
            <ul
              key={key}
              data-reveal
              className="mt-12 space-y-1.5 border-t border-black/10 pt-6"
            >
              {block.items.map((item) => (
                <li
                  key={item}
                  className="text-[0.76rem] leading-[1.9] text-graphite-400"
                >
                  ※ {item}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "link") {
          return (
            <p key={key} data-reveal className="mt-5">
              <a
                href={block.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[0.88rem] text-ink underline decoration-black/25 underline-offset-4 transition-colors duration-300 hover:decoration-emerald-glow"
              >
                {block.label}
                <span aria-hidden="true" className="text-[0.76rem] text-graphite-400">
                  ↗
                </span>
                <span className="sr-only">（外部サイトが新しいタブで開きます）</span>
              </a>
            </p>
          );
        }

        return (
          <p
            key={key}
            data-reveal
            className="mt-6 text-[0.94rem] leading-[2.15] text-ink"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
