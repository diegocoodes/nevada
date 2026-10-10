const imageShape =
  "M .028 0 H .965 C .991 0 1 .025 .997 .065 L .938 .964 Q .935 1 .909 1 H .028 Q 0 1 0 .958 V .042 Q 0 0 .028 0 Z";

export function SlantedImageClip({ id }: { id: string }) {
  return (
    <svg
      className="slanted-image-clip"
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={id} clipPathUnits="objectBoundingBox">
          <path d={imageShape} />
        </clipPath>
      </defs>
    </svg>
  );
}

export function SlantedImageOutline({ id }: { id: string }) {
  const gradientId = `${id}-outline-gradient`;
  return (
    <svg
      className="slanted-image-outline"
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#79CEC3" stopOpacity="0.9" />
          <stop offset="0.45" stopColor="#79CEC3" stopOpacity="0.22" />
          <stop offset="1" stopColor="#79CEC3" stopOpacity="0.65" />
        </linearGradient>
      </defs>
      <path
        d={imageShape}
        fill="none"
        stroke="#79CEC3"
        strokeOpacity="0.08"
        strokeWidth="7"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={imageShape}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
