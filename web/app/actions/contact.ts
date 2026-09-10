"use server";

import nodemailer from "nodemailer";
import { contactTypes } from "@/lib/content";

/** 受信先。環境変数で上書きできる。 */
const TO = process.env.CONTACT_TO_EMAIL || "oxy@smasta.co.jp";
/**
 * 送信元。多くのメールサーバーは、認証したアカウント（またはその別名）以外を
 * 差出人にすると拒否するか勝手に書き換える。Google Workspace もそうなので、
 * 明示指定がなければ認証アカウントをそのまま差出人にする。
 */
const FROM =
  process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER || "no-reply@smasta.co.jp";

export type ContactInput = {
  type: string;
  company: string;
  department: string;
  name: string;
  kana: string;
  email: string;
  tel: string;
  body: string;
  agree: boolean;
  /** スパム対策の隠しフィールド。人間は入力しない。 */
  website?: string;
};

export type ContactResult =
  | { ok: true }
  | { ok: false; errors?: Record<string, string>; message?: string };

/** クライアントと同じ基準でサーバー側でも検証する */
function validate(input: ContactInput) {
  const errors: Record<string, string> = {};

  if (!input.type) errors.type = "問い合わせ種別を選択してください。";
  else if (!contactTypes.includes(input.type))
    errors.type = "問い合わせ種別をもう一度お選びください。";

  if (!input.company?.trim()) errors.company = "会社・団体名を入力してください。";
  if (!input.name?.trim()) errors.name = "氏名を入力してください。";

  if (!input.email?.trim()) errors.email = "メールアドレスを入力してください。";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim()))
    errors.email = "メールアドレスの形式をご確認ください。";

  if (input.tel && !/^[0-9+\-()\s]{8,}$/.test(input.tel.trim()))
    errors.tel = "電話番号は数字とハイフンで入力してください。";

  if (!input.body?.trim()) errors.body = "問い合わせ内容を入力してください。";
  else if (input.body.trim().length < 10)
    errors.body = "問い合わせ内容は10文字以上で入力してください。";

  if (!input.agree) errors.agree = "個人情報の取り扱いへの同意が必要です。";

  return errors;
}

function buildTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT || 587);
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

const line = (label: string, value: string) => `${label}：${value || "（未記入）"}`;

export async function submitContact(
  input: ContactInput
): Promise<ContactResult> {
  // 隠しフィールドが埋まっているものはボットとみなし、静かに成功を返す
  if (input.website) return { ok: true };

  const errors = validate(input);
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const text = [
    "Webサイトのお問い合わせフォームから送信がありました。",
    "",
    line("問い合わせ種別", input.type),
    line("会社・団体名", input.company),
    line("部署名", input.department),
    line("氏名", input.name),
    line("フリガナ", input.kana),
    line("メールアドレス", input.email),
    line("電話番号", input.tel),
    "",
    "■ 問い合わせ内容",
    input.body,
    "",
    `送信日時：${new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}`,
  ].join("\n");

  const transport = buildTransport();

  if (!transport) {
    // SMTP未設定でも入力内容を失わないよう、サーバーログに残して失敗を返す
    const missing = ["SMTP_HOST", "SMTP_USER", "SMTP_PASSWORD"].filter(
      (key) => !process.env[key]
    );
    console.error(
      `[contact] SMTPが未設定のため送信できませんでした。未設定の環境変数: ${missing.join(", ")}`
    );
    console.error("[contact] 受信できなかった内容:\n" + text);
    return {
      ok: false,
      message:
        "現在、送信処理が一時的にご利用いただけません。お手数ですが、お電話（03-3556-9988）またはメール（info@smasta.co.jp）でご連絡ください。",
    };
  }

  try {
    await transport.sendMail({
      from: `SMARTSTART Webサイト <${FROM}>`,
      to: TO,
      replyTo: `${input.name} <${input.email.trim()}>`,
      subject: `【お問い合わせ】${input.type}／${input.company}　${input.name}様`,
      text,
    });

    // 送信者への自動返信（失敗しても本体の受付は成功として扱う）
    try {
      await transport.sendMail({
        from: `株式会社スマートスタート <${FROM}>`,
        to: input.email.trim(),
        replyTo: TO,
        subject: "【株式会社スマートスタート】お問い合わせを受け付けました",
        text: [
          `${input.name} 様`,
          "",
          "お問い合わせいただきありがとうございます。",
          "以下の内容で受け付けいたしました。内容を確認のうえ、担当者より3営業日以内にご連絡いたします。",
          "",
          "--------------------------------------------------",
          text.split("\n").slice(2).join("\n"),
          "--------------------------------------------------",
          "",
          "※ 本メールは自動送信です。ご返信いただいても対応できない場合があります。",
          "",
          "株式会社スマートスタート",
          "〒102-0072 東京都千代田区飯田橋1-5-6 協和西ビル2階",
          "TEL 03-3556-9988 / info@smasta.co.jp",
          "https://smasta.co.jp/",
        ].join("\n"),
      });
    } catch (error) {
      console.error("[contact] 自動返信の送信に失敗しました", error);
    }

    return { ok: true };
  } catch (error) {
    console.error("[contact] 送信に失敗しました", error);
    return {
      ok: false,
      message:
        "送信に失敗しました。お手数ですが、時間をおいて再度お試しいただくか、お電話（03-3556-9988）でご連絡ください。",
    };
  }
}
