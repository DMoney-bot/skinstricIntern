import Image from "next/image";
import ButtonArrow from "./components/buttonArrow";

export default function Home() {
  return (
    <div className="container">
      <div className="pageWrapper">
        <svg
          className="chevron chevronLeft"
          viewBox="0 0 320 640"
          aria-hidden="true"
        >
          <polyline points="0,0 320, 320 0, 640" />
        </svg>
        <svg
          className="chevron chevronRight"
          viewBox="0 0 320 640"
          aria-hidden="true"
        >
          <polyline points="0,0 320, 320 0, 640" />
        </svg>
        <button className="discoverWrapper">
          <ButtonArrow direction="left" />
          <div className="discoverButton">Discover A.I.</div>
        </button>
        <div className="homeTitle">
          <h1 className="homeTitleText">Sophisticated</h1>
          <h1 className="homeTitleText">Skincare</h1>
        </div>
        <button className="testWrapper">
          <div className="testButton">Take Test</div>
          <ButtonArrow direction="right" />
        </button>
      {/* <div className="homePageText">
        <p>Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.</p>
      </div> */}
      </div>
    </div>
  );
}
