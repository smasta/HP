// GA4 へのカスタムイベント送信。gtag は app/layout.tsx のインラインスクリプトで定義される。
// 広告ブロッカー等で gtag が無い環境でも落ちないよう、存在チェックしてから送る。

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: EventParams) => void;
  }
}

export function trackEvent(eventName: string, params: EventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}
