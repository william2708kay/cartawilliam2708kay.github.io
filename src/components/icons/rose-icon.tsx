import type { SVGProps } from "react";

export function RoseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a4 4 0 0 1 4 4c0 1.6-1.2 3.2-2.5 4C12.5 10.8 12 11 12 11s-.5-.2-1.5-.9C9.2 9.2 8 7.6 8 6a4 4 0 0 1 4-4z" />
      <path d="M12 11c-2.3 0-4.5.9-6.2 2.4-1.3 1.1-2.2 2.6-2.5 4.3-.3 1.7.1 3.4 1 4.9 1.2 1.8 3.1 3 5.2 3.4" />
      <path d="M12 11c2.3 0 4.5.9 6.2 2.4 1.3 1.1 2.2 2.6 2.5 4.3.3 1.7-.1 3.4-1 4.9-1.2 1.8-3.1 3-5.2 3.4" />
      <path d="M12 11v11" />
    </svg>
  );
}
