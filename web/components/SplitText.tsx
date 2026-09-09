import { Fragment } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

/** 行頭に置けない約物。直前の文字と同じ nowrap 塊にまとめる */
const NO_LINE_START =
  "。、，．・：；？！）」』】〕〉》”’ぁぃぅぇぉっゃゅょァィゥェォッャュョーヽヾ々…‥";

/** 行末に置けない約物。次の文字と同じ nowrap 塊にまとめる */
const NO_LINE_END = "「『（【〈《〔“‘［｛(";

/** 単語の途中で折り返したくない欧文・数字とその内部約物 */
const LATIN = /[A-Za-z0-9&@#$%'’\-.,/()+:]/;

type Group = { text: string; nowrap: boolean; space: boolean };

/**
 * 1行を「折り返し可能な塊」に分ける。
 * 欧文は単語ごと、和文は1文字ごと。約物は直前の塊にぶら下げる。
 */
function groupLine(line: string): Group[] {
  const groups: Group[] = [];

  for (const char of Array.from(line)) {
    const last = groups[groups.length - 1];

    if (char === " " || char === "　") {
      groups.push({ text: char, nowrap: false, space: true });
      continue;
    }

    if (last && !last.space && NO_LINE_START.includes(char)) {
      last.text += char;
      last.nowrap = true;
      continue;
    }

    // 直前が始め括弧なら、そこで行を折らずに次の文字までを一塊にする
    if (last && !last.space && NO_LINE_END.includes(last.text.slice(-1))) {
      last.text += char;
      last.nowrap = true;
      continue;
    }

    if (LATIN.test(char) && last && last.nowrap && !last.space) {
      last.text += char;
      continue;
    }

    groups.push({ text: char, nowrap: LATIN.test(char), space: false });
  }

  return groups;
}

/**
 * 見出しや短いリード文を1文字ずつ立ち上げる。
 *
 * サーバー側で文字に分解して出すため追加の JS は不要で、
 * 表示のきっかけは既存の ScrollReveal（[data-reveal] → .is-revealed）に乗る。
 * 読み上げ用に元のテキストを sr-only で残し、分解した文字は aria-hidden にする。
 */
export default function SplitText({
  text,
  as: Tag = "span",
  className,
  style,
  delay = 0,
  stagger = 26,
  maxTotal = 900,
  reveal = true,
}: {
  text: string;
  /** 改行は "\n" で指定する。行ごとにマスクが分かれる */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** 1文字目が動き出すまでの待ち時間 (ms) */
  delay?: number;
  /** 1文字あたりのずらし幅 (ms) */
  stagger?: number;
  /** 最後の1文字が動き出すまでの上限 (ms)。長文でも待たされないよう詰める */
  maxTotal?: number;
  /** false にすると親要素の .is-revealed に合わせて動く */
  reveal?: boolean;
}) {
  const charCount = Array.from(text).filter(
    (char) => char !== "\n" && char !== " " && char !== "　"
  ).length;
  const step =
    charCount > 1 ? Math.min(stagger, maxTotal / (charCount - 1)) : stagger;

  let index = 0;

  const lines: ReactNode[] = text.split("\n").map((line, lineIndex) => (
    <span key={lineIndex} className="split-parent">
      {groupLine(line).map((group, groupIndex) => {
        if (group.space) return <Fragment key={groupIndex}> </Fragment>;

        const chars = Array.from(group.text).map((char) => {
          const charDelay = delay + index * step;
          index += 1;
          return (
            <span
              key={`${groupIndex}-${index}`}
              className="split-char"
              style={{ "--char-delay": `${charDelay}ms` } as CSSProperties}
            >
              {char}
            </span>
          );
        });

        return group.nowrap ? (
          <span key={groupIndex} style={{ whiteSpace: "nowrap" }}>
            {chars}
          </span>
        ) : (
          <Fragment key={groupIndex}>{chars}</Fragment>
        );
      })}
    </span>
  ));

  return (
    <Tag className={className} style={style} {...(reveal ? { "data-reveal": "chars" } : {})}>
      <span className="sr-only">{text.replace(/\n/g, " ")}</span>
      <span aria-hidden="true">{lines}</span>
    </Tag>
  );
}
