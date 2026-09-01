"use client";

import { useRef, useState, useTransition } from "react";
import { submitContact } from "@/app/actions/contact";
import SectionHead from "./SectionHead";
import { brand, contactTypes } from "@/lib/content";

type Field =
  | "type"
  | "company"
  | "department"
  | "name"
  | "kana"
  | "email"
  | "tel"
  | "body"
  | "agree";

type Values = Record<Exclude<Field, "agree">, string> & { agree: boolean };

const initialValues: Values = {
  type: "",
  company: "",
  department: "",
  name: "",
  kana: "",
  email: "",
  tel: "",
  body: "",
  agree: false,
};

const selectArrow =
  "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none' stroke='%235b5b57' stroke-width='1.4'%3E%3Cpath d='M1 1.5 6 6.5 11 1.5'/%3E%3C/svg%3E\")";

const fieldClass =
  "w-full rounded-lg border border-black/15 bg-white px-4 py-3.5 text-[0.92rem] text-ink placeholder:text-graphite-400/70 transition-all duration-300 hover:border-black/35 focus:border-ink focus:outline-none focus:ring-2 focus:ring-emerald-glow/35";

export default function Contact() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [website, setWebsite] = useState(""); // スパム対策の隠しフィールド
  const [pending, startTransition] = useTransition();
  const statusRef = useRef<HTMLDivElement>(null);

  const update = (field: Field, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [field]: value }) as Values);
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const next: Partial<Record<Field, string>> = {};
    if (!values.type) next.type = "問い合わせ種別を選択してください。";
    if (!values.company.trim()) next.company = "会社・団体名を入力してください。";
    if (!values.name.trim()) next.name = "氏名を入力してください。";
    if (!values.email.trim()) {
      next.email = "メールアドレスを入力してください。";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "メールアドレスの形式をご確認ください。";
    }
    if (values.tel && !/^[0-9+\-()\s]{8,}$/.test(values.tel.trim())) {
      next.tel = "電話番号は数字とハイフンで入力してください。";
    }
    if (!values.body.trim()) {
      next.body = "問い合わせ内容を入力してください。";
    } else if (values.body.trim().length < 10) {
      next.body = "問い合わせ内容は10文字以上で入力してください。";
    }
    if (!values.agree) next.agree = "個人情報の取り扱いへの同意が必要です。";
    return next;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError(null);

    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      statusRef.current?.focus();
      return;
    }

    startTransition(async () => {
      const result = await submitContact({ ...values, website });

      if (result.ok) {
        setSent(true);
        return;
      }

      if (result.errors) setErrors(result.errors);
      if (result.message) setServerError(result.message);
      statusRef.current?.focus();
    });
  };

  const errorList = Object.entries(errors);

  return (
    <section id="contact" className="block-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1560px] px-5 md:px-8 lg:px-10">
        <SectionHead en="Contact" ja="お問い合わせ" />

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16 md:mt-20">
          {/* ------------------------------------------------ intro */}
          <div className="lg:col-span-5">
            <h3
              data-reveal
              className="display-jp text-[1.5rem] leading-[1.55] text-ink md:text-[2.1rem]"
            >
              まず、
              <br />
              測ってみませんか。
            </h3>
            <p
              data-reveal
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
              className="mt-7 text-[0.92rem] leading-[2.1] text-graphite-600"
            >
              導入相談、資料請求、研究連携、採用に関するお問い合わせを承っています。現場の状況をお聞かせいただければ、適した測定・支援の形をご提案します。
            </p>

            <dl
              data-reveal
              style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              className="mt-12"
            >
              <div className="flex flex-wrap items-baseline gap-x-6 border-t border-black/10 py-5">
                <dt className="display-en w-16 text-[0.62rem] font-semibold tracking-[0.24em] text-graphite-400">
                  TEL
                </dt>
                <dd>
                  <a
                    href={`tel:${brand.tel.replace(/-/g, "")}`}
                    className="num text-[1.7rem] text-ink transition-colors duration-300 hover:text-graphite-600"
                  >
                    {brand.tel}
                  </a>
                  <span className="ml-3 text-[0.72rem] text-graphite-400">
                    FAX {brand.fax}
                  </span>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-6 border-t border-black/10 py-5">
                <dt className="display-en w-16 text-[0.62rem] font-semibold tracking-[0.24em] text-graphite-400">
                  MAIL
                </dt>
                <dd>
                  <a
                    href={`mailto:${brand.email}`}
                    className="text-[1.02rem] text-ink underline decoration-black/20 underline-offset-4 transition-colors duration-300 hover:decoration-emerald-glow"
                  >
                    {brand.email}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-6 border-y border-black/10 py-5">
                <dt className="display-en w-16 text-[0.62rem] font-semibold tracking-[0.24em] text-graphite-400">
                  OFFICE
                </dt>
                <dd className="text-[0.88rem] leading-[1.9] text-graphite-600">
                  {brand.zip} {brand.address}
                </dd>
              </div>
            </dl>
          </div>

          {/* ------------------------------------------------- form */}
          <div className="lg:col-span-7">
            <div
              data-reveal
              style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
              className="rounded-2xl border border-black/10 bg-paper p-6 md:p-10"
            >
              {sent ? (
                <div
                  role="status"
                  className="flex min-h-[24rem] flex-col items-center justify-center text-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-xl text-emerald-glow">
                    ✓
                  </span>
                  <h3 className="display-jp mt-7 text-[1.3rem] text-ink md:text-[1.7rem]">
                    お問い合わせを受け付けました
                  </h3>
                  <p className="mt-5 max-w-md text-[0.9rem] leading-[2] text-graphite-600">
                    内容を確認のうえ、担当者より
                    <span className="text-ink">3営業日以内</span>
                    にご連絡いたします。お急ぎの場合はお電話でもご相談を承ります。
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setValues(initialValues);
                      setServerError(null);
                      setSent(false);
                    }}
                    className="btn-base pill-outline-ink mt-9 px-7 py-3 text-[0.82rem] hover:scale-105 active:scale-95"
                  >
                    別の内容で問い合わせる
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="relative">
                  <div
                    ref={statusRef}
                    tabIndex={-1}
                    aria-live="polite"
                    className="focus:outline-none"
                  >
                    {serverError ? (
                      <div
                        role="alert"
                        className="mb-8 rounded-xl border border-red-500/30 bg-red-50 px-5 py-4"
                      >
                        <p className="text-[0.86rem] leading-[1.9] text-red-700">
                          {serverError}
                        </p>
                      </div>
                    ) : null}

                    {errorList.length > 0 ? (
                      <div className="mb-8 rounded-xl border border-red-500/30 bg-red-50 px-5 py-4">
                        <p className="text-[0.86rem] font-semibold text-red-700">
                          {errorList.length}件の入力内容をご確認ください
                        </p>
                        <ul className="mt-2 space-y-1 text-[0.8rem] text-red-700/85">
                          {errorList.map(([field, message]) => (
                            <li key={field}>・{message}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field
                      className="sm:col-span-2"
                      id="type"
                      label="問い合わせ種別"
                      required
                      error={errors.type}
                    >
                      <select
                        id="type"
                        name="type"
                        required
                        value={values.type}
                        aria-invalid={Boolean(errors.type)}
                        aria-describedby={errors.type ? "type-error" : undefined}
                        onChange={(event) => update("type", event.target.value)}
                        className={`${fieldClass} appearance-none pr-10`}
                        style={{
                          backgroundImage: selectArrow,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 1rem center",
                          backgroundSize: "12px 8px",
                        }}
                      >
                        <option value="">選択してください</option>
                        {contactTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field id="company" label="会社・団体名" required error={errors.company}>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={values.company}
                        placeholder="株式会社スマートスタート"
                        aria-invalid={Boolean(errors.company)}
                        aria-describedby={errors.company ? "company-error" : undefined}
                        onChange={(event) => update("company", event.target.value)}
                        className={fieldClass}
                      />
                    </Field>

                    <Field id="department" label="部署名" error={errors.department}>
                      <input
                        id="department"
                        name="department"
                        type="text"
                        value={values.department}
                        placeholder="人事部"
                        onChange={(event) => update("department", event.target.value)}
                        className={fieldClass}
                      />
                    </Field>

                    <Field id="name" label="氏名" required error={errors.name}>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={values.name}
                        placeholder="山田 太郎"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        onChange={(event) => update("name", event.target.value)}
                        className={fieldClass}
                      />
                    </Field>

                    <Field id="kana" label="フリガナ" error={errors.kana}>
                      <input
                        id="kana"
                        name="kana"
                        type="text"
                        value={values.kana}
                        placeholder="ヤマダ タロウ"
                        onChange={(event) => update("kana", event.target.value)}
                        className={fieldClass}
                      />
                    </Field>

                    <Field id="email" label="メールアドレス" required error={errors.email}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        placeholder="name@example.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        onChange={(event) => update("email", event.target.value)}
                        className={fieldClass}
                      />
                    </Field>

                    <Field id="tel" label="電話番号" error={errors.tel}>
                      <input
                        id="tel"
                        name="tel"
                        type="tel"
                        autoComplete="tel"
                        value={values.tel}
                        placeholder="03-0000-0000"
                        aria-invalid={Boolean(errors.tel)}
                        aria-describedby={errors.tel ? "tel-error" : undefined}
                        onChange={(event) => update("tel", event.target.value)}
                        className={fieldClass}
                      />
                    </Field>

                    <Field
                      className="sm:col-span-2"
                      id="body"
                      label="問い合わせ内容"
                      required
                      error={errors.body}
                    >
                      <textarea
                        id="body"
                        name="body"
                        rows={5}
                        value={values.body}
                        placeholder="ご検討中の内容、対象人数、実施時期などをご記入ください。"
                        aria-invalid={Boolean(errors.body)}
                        aria-describedby={errors.body ? "body-error" : undefined}
                        onChange={(event) => update("body", event.target.value)}
                        className={`${fieldClass} resize-y leading-[1.9]`}
                      />
                    </Field>
                  </div>

                  <div className="mt-8">
                    <label className="group flex cursor-pointer items-start gap-3.5">
                      <input
                        type="checkbox"
                        name="agree"
                        checked={values.agree}
                        aria-invalid={Boolean(errors.agree)}
                        aria-describedby={errors.agree ? "agree-error" : undefined}
                        onChange={(event) => update("agree", event.target.checked)}
                        className="mt-1 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded border border-black/30 bg-white transition-all duration-300 checked:border-ink checked:bg-ink"
                      />
                      <span className="text-[0.86rem] leading-[1.85] text-graphite-600 transition-colors duration-300 group-hover:text-ink">
                        <a
                          href="/privacy-policy/"
                          className="text-ink underline decoration-black/25 underline-offset-4 transition-colors duration-300 hover:decoration-emerald-glow"
                        >
                          個人情報の取り扱い
                        </a>
                        に同意します
                        <span className="ml-2 rounded-[3px] bg-ink px-1.5 py-0.5 text-[0.6rem] text-white">
                          必須
                        </span>
                      </span>
                    </label>
                    {errors.agree ? (
                      <p id="agree-error" className="mt-2 text-[0.78rem] text-red-700">
                        {errors.agree}
                      </p>
                    ) : null}
                  </div>

                  {/* スパム対策：人間には見えない。埋まっていた場合は送信を破棄する */}
                  <div aria-hidden="true" className="absolute left-[-9999px] top-0">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(event) => setWebsite(event.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={pending}
                    aria-busy={pending}
                    className="btn-base pill-ink group mt-10 w-full px-8 py-4 text-[0.88rem] font-semibold hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:w-auto sm:px-12"
                  >
                    {pending ? "送信しています…" : "この内容で送信する"}
                    <span
                      aria-hidden="true"
                      className={
                        pending
                          ? "opacity-0"
                          : "transition-transform duration-300 group-hover:translate-x-1"
                      }
                    >
                      →
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  required,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2.5 flex items-center gap-2.5 text-[0.78rem] tracking-[0.06em] text-ink"
      >
        {label}
        {required ? (
          <span className="rounded-[3px] bg-ink px-1.5 py-0.5 text-[0.6rem] text-white">
            必須
          </span>
        ) : (
          <span className="text-[0.62rem] text-graphite-400">任意</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-[0.78rem] text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
