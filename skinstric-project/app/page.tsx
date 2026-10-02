import Image from "next/image";
import ButtonArrow from "./components/buttonArrow";
import Header from "./components/header";
import Link from "next/dist/client/link";

export default function Home() {
  return (
    <div className="container">
      <Header />
      <div className="pageWrapper">
        <svg
          className="chevron chevronLeft"
          viewBox="40 0 320 640"
          aria-hidden="true"
        >
          <polyline points="0,0 320, 320 0, 640" />
        </svg>
        <svg
          className="chevron chevronRight"
          viewBox="40 0 320 640"
          aria-hidden="true"
        >
          <polyline points="0,0 320, 320 0, 640" />
        </svg>
        <button className="discoverWrapper">
          <ButtonArrow direction="left" />
          <div className="discoverButton">Discover A.I.</div>
        </button>
        <div className="homeTitle">
          <h1 className="homeTitleText home">Sophisticated</h1>
          <h1 className="homeTitleText home2">Skincare</h1>
        </div>
        <Link href="/testing" className="testWrapper">
          <div className="testButton">Take Test</div>
          <ButtonArrow direction="right" />
        </Link>
      </div>
      <div className="homePageText">
        <p>Skinstric developed an A.I. that creates a <br /> highly-personalized routine tailored to <br /> what your skin needs.</p>
      </div>
    </div>
  );
}
