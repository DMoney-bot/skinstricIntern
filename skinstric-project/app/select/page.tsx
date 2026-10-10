import React from "react";
import Header from "../components/header";
import Link from "next/dist/client/link";
import ButtonArrow from "../components/buttonArrow";

export default function select() {
  return (
    <div className="selectWrapper">
      <Header />
      <div className="selectTitleWrapper">
        <h1 className="selectTitle robotoText">A.I. Analysis</h1>
        <h1 className="selectSubtitle">
          A.I. has estimated the following <br /> Fix estimated information if
          needed{" "}
        </h1>
      </div>
      <div className="diamondGrid">
        <Link href="/summary" className="selectIcon">
          <p className="robotoText selectText1">Demographics</p>
        </Link>
        <div className="selectIcon none">
          <p className="robotoText selectText2">Skin type details</p>
        </div>
        <div className="selectIcon none">
          <p className="robotoText selectText3">cosmetic concers</p>
        </div>
        <div className="selectIcon none">
          <p className="robotoText selectText4">weather</p>
        </div>
        <div className="hiddenSquare"></div>
      </div>
      <Link href="/result" className="backButton">
        <ButtonArrow />
        <div className="backButtonText robotoText">Back</div>
      </Link>
      <Link href="/summary" className="summaryButton">
        <div className="proceedButtonText robotoText">Get Summary</div>
        <ButtonArrow direction="right" />
      </Link>
    </div>
  );
}
