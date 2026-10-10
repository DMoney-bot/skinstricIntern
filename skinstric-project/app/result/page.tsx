"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/header";
import Squares from "../components/squares";
import ScanOption from "../components/scanOption";
import GalleryOption from "../components/galleryOption";
import Link from "next/dist/client/link";
import ButtonArrow from "../components/buttonArrow";

export default function result() {
  const router = useRouter();
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const openGallery = () => galleryInputRef.current?.click();

  const API_URL = "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo"

  const fileToBase64 = (file: File) => 
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const handleFile = async (e:React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      e.target.value = "";

      setFileName(file.name);
      setPreview(URL.createObjectURL(file));
      setLoading(true);

      try {
        const image = await fileToBase64(file);
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image }),
        });
        if (!res.ok) throw new Error(`failed: ${res.status}`);

        const json = await res.json();
        sessionStorage.setItem("analysis", JSON.stringify(json.data));
        router.push("/select");
      } catch(err) {
        console.error(err);
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="loadingScreen">
        <Squares scale={0.8} inline />
        <p className="loadingScreenText robotoText">
          Analyzing Image <span className="dots"></span>
        </p>
        <div className="previewFile">
          <p className="robotoText">Preview</p>
          {preview && <img src={preview} alt="selected upload" width={120} />}
          {fileName && <p className="fileName">{fileName}</p>}
        </div>
      </div>
    );
  }

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
        <Link href="/camera" className="scanButton">
          <ScanOption />
        </Link>
        <button type="button" className="galleryButton" onClick={openGallery}>
          <GalleryOption />
        </button>
      </div>
      {/* <div className="previewFile">
        <p className="robotoText">Preview</p>
        {preview && <img src={preview} alt="selected upload" width={120} />}
        {fileName && <p className="fileName">{fileName}</p>}
      </div> */}
      <Link href="/testing" className="backButton">
        <ButtonArrow />
        <div className="backButtonText">Back</div>
      </Link>
    </div>
  );
}
