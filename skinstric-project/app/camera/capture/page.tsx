"use client";
import React, { useEffect, useRef, useState } from "react";
import Header from "@/app/components/header";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ButtonArrow from "@/app/components/buttonArrow";

const apiUrl =
  "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

export default function capture() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" }, audio: false })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() =>
        setError("Camera access was denied or no camera was found."),
      );

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !video.videoWidth) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);

    setPhoto(canvas.toDataURL("image/jpeg", 0.9));
  };

  const retake = () => setPhoto(null);

  const confirmPhoto = async () => {
    if (!photo) return;
    setUploading(true);
    setError("");

    try {
      const image = photo.split(",")[1];
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const json = await res.json();
      sessionStorage.setItem("analysis", JSON.stringify(json.data));
      streamRef.current?.getTracks().forEach((t) => t.stop());
      router.push("/select");
    } catch (err) {
      console.error(err);
      setError("Something went wrong analyzing the photo. Please try again.");
      setUploading(false);
    }
  };

  return (
    <div className="captureWrapper">
      <Header />
      <div className="captureStage">
        <video
          ref={videoRef}
          className="captureVideo"
          style={{ display: photo ? "none" : "block" }}
          autoPlay
          playsInline
          muted
        />
        {photo && <img src={photo} alt="Captured" className="captureVideo" />}
        <div className="captureText">
          <p className="robotoText">to get better results make sure you have</p>
          <div className="textRow">
            <p>◇ Neutral Expression</p>
            <p>◇ Frontal Pose</p>
            <p>◇ Adequate Lighting</p>
          </div>
        </div>
        <canvas ref={canvasRef} hidden />
        {error && <p className="captureError">{error}</p>}

        {uploading ? (
          <p className="robotoText captureStatus">
            Analyzing image <span className="dots"></span>
          </p>
        ) : photo ? (
          <div className="captureActions">
            <p className="robotoText">Use this photo</p>
            <div className="captureButtons">
              <button type="button" className="captureBtn" onClick={retake}>
                Retake
              </button>
              <button
                type="button"
                className="captureBtn captureBtnPrimary"
                onClick={confirmPhoto}
              >
                Use Photo
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="captureShutter"
            onClick={takePhoto}
            aria-label="Take Picture"
          />
        )}
      </div>
      <Link href="/result" className="backButton">
        <ButtonArrow />
        <div className="backButtonText robotoText">Back</div>
      </Link>
    </div>
  );
}
