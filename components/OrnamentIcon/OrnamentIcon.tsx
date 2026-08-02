type OrnamentIconProps = {
  className?: string;
};

export default function OrnamentIcon({ className }: OrnamentIconProps) {
  return (
    <svg
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M21.7 4.5A11.8 11.8 0 1 0 27.5 23.6 10.2 10.2 0 1 1 21.7 4.5Z"
        fill="currentColor"
      />
      <circle cx="25" cy="8" r="2" fill="currentColor" opacity="0.82" />
    </svg>
  );
}
