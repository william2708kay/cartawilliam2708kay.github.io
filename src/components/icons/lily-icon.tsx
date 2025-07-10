import type { SVGProps } from "react";

export function LilyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 16.5V22l-6-3-6 3v-5.5" />
      <path d="M12 2c-3.5 3.5-3.5 9.5 0 13" />
      <path d="M12 2c3.5 3.5 3.5 9.5 0 13" />
      <path d="M12 2a8.9 8.9 0 0 0-6.1 2.9" />
      <path d="M12 2a8.9 8.9 0 0 1 6.1 2.9" />
    </svg>
  );
}
