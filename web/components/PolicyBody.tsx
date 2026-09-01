import type { PolicyBlock } from "@/lib/policies";

/** ポリシー文書の本文を描画する */
export default function PolicyBody({ blocks }: { blocks: PolicyBlock[] }) {
  const nodes: React.ReactNode[] = [];
  let list: string[] = [];

  const flush = (key: string) => {
    if (list.length === 0) return;
    nodes.push(
      <ul key={`ul-${key}`} data-reveal className="mt-5 space-y-2.5">
        {list.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-[0.9rem] leading-[2] text-ink"
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
    list = [];
  };

  blocks.forEach((block, index) => {
    if (block.type === "li") {
      list.push(block.text);
      return;
    }
    flush(String(index));

    if (block.type === "h") {
      nodes.push(
        <h2
          key={`h-${index}`}
          data-reveal
          className="display-jp mt-14 border-l-[3px] border-ink pl-4 text-[1.1rem] leading-[1.6] text-ink first:mt-0 md:text-[1.25rem]"
        >
          {block.text}
        </h2>
      );
      return;
    }

    nodes.push(
      <p
        key={`p-${index}`}
        data-reveal
        className="mt-5 text-[0.92rem] leading-[2.15] text-ink"
      >
        {block.text}
      </p>
    );
  });

  flush("end");
  return <div>{nodes}</div>;
}
