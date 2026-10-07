"use client";
import React, { useRef, useState } from "react";
import Header from "../components/header";
import Squares from "../components/squares";
import ScanOption from "../components/scanOption";
import GalleryOption from "../components/galleryOption";
import Link from "next/dist/client/link";
import ButtonArrow from "../components/buttonArrow";

export default function result() {
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");

  const openGallery = () => galleryInputRef.current?.click();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  return (
    <div className="resultWrapper">
      <Header />
      <div className="resultTitle">
        <h1 className="robotoText resultTitleText">To start analysis</h1>
      </div>
      <div className="resultSquares">
        <Squares scale={0.5} inline />
        <Squares scale={0.5} inline />
      </div>
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        hidden
      />
      <div className="resultButtons">
        <button className="scanButton">
          <ScanOption />
        </button>
        <button type="button" className="galleryButton" onClick={openGallery}>
          <GalleryOption />
        </button>
      </div>
      <div className="previewFile">
        <p className="robotoText">Preview</p>
        {preview && <img src={preview} alt="selected upload" width={120} />}
        {fileName && <p className="fileName">{fileName}</p>}
      </div>
      <Link href="/testing" className="backButton">
        <ButtonArrow />
        <div className="backButtonText">Back</div>
      </Link>
    </div>
  );
}
