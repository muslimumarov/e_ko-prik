export const UzbekistanMapLogo: React.FC = () => {
  return (
    <svg
      width="300"
      height="200"
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Uzbekistan map shape (simplified abstract form) */}
      <path
        d="M10 80 L60 60 L90 90 L130 70 L160 100 L200 90 L240 110 L260 100 L280 120 L270 150 L230 160 L180 150 L150 160 L120 150 L90 160 L50 140 L30 120 Z"
        fill="#4CAF50"
        stroke="#388E3C"
        strokeWidth="2"
      />

      {/* Location pin (smaller) */}
      <g transform="translate(145, 95)">
        <circle cx="0" cy="0" r="10" fill="#D32F2F" />
        <circle cx="0" cy="0" r="4" fill="white" />
        <path
          d="M0 0 L0 20"
          stroke="#D32F2F"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
