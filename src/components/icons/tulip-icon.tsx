import type { SVGProps } from "react";

export function TulipIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 2c-3.33 3.33-5 8-5 10 0 2.22 1.21 4.15 3 5 .3.14.5.38.5.68V22h7v-4.32c0-.3.2-.54.5-.68 1.79-.85 3-2.78 3-5 0-2-1.67-6.67-5-10z" />
      <path d="M7 22h10" />
    </svg>
  );
}
