import react from 'react'

export default function GalleryOption() {
  return (
    <div className="galleryOption">
      <svg className="cameraIcon" width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <clipPath id="galleryClip">
            <circle cx="60" cy="60" r="50" />
          </clipPath>
        </defs>

        <circle cx="60" cy="60" r="58" fill="none" stroke="#111" strokeWidth="1" />
        <circle cx="60" cy="60" r="50" fill="#fafafa" stroke="#111" strokeWidth="1" />

        <g clipPath="url(#galleryClip)" fill="#1a1b1c">
          <circle cx="80" cy="40" r="12" />
          <path d="M0 78 L24 58 Q30 53 37 57 L60 71 L84 56 Q90 52 96 56 L120 72 L120 120 L0 120 Z" />
        </g>
      </svg>

      <div className="galleryLine"></div>
      <p className="galleryLabel">
        Allow A.I.<br />
        Access gallery
      </p>
    </div>
  );
}