import Image from "next/image";

/**
 * ブランドロゴ。
 * 明るい面ではオレンジ版、暗い面では白版を出し分ける。
 * 原本: public/brand/logo.png / logo-white.png（公式ロゴのアルファを保持）
 */
export default function Logo({
  variant = "color",
  className = "",
  priority = false,
}: {
  variant?: "color" | "white";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={variant === "white" ? "/brand/logo-white.png" : "/brand/logo.png"}
      alt="SmartStart"
      width={1077}
      height={301}
      priority={priority}
      className={className}
    />
  );
}
