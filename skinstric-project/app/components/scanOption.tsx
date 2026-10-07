import React from "react";

export default function ScanOption() {
  return (
    <div className="scanOption">
      {/* Camera icon */}
      <svg className="cameraIcon" width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="58" fill="none" stroke="#111" strokeWidth="1" />
        <circle cx="60" cy="60" r="46" fill="#fafafa" stroke="#111" strokeWidth="5" />

        <g stroke="#111" strokeWidth="2" strokeLinecap="round">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <line
              key={deg}
              x1="60" y1="46" x2="102.7" y2="70.65"
              transform={`rotate(${deg} 60 60)`}
            />
          ))}
        </g>

        <polygon
          points="60,46 72.12,53 72.12,67 60,74 47.88,67 47.88,53"
          fill="#111"
        />
      </svg>

      <div className="scanLine"></div>
      <p className="scanLabel">
        Allow A.I.<br />
        To scan your face
      </p>
    </div>
  );
}