"use client"
import React, { useEffect } from "react";
import Header from "../components/header";
import Squares from "../components/squares";
import ScanOption from "../components/scanOption";
import { useRouter } from "next/dist/client/components/navigation";

const minDisplay = 3000;

export default function camera() {
    const router = useRouter();

    useEffect(() => {
        router.prefetch("/camera/capture")
        
        const minDelay = new Promise((r) => setTimeout(r, minDisplay));
        const camera = navigator.mediaDevices.getUserMedia({ video: true });

        Promise.all([minDelay, camera])
        .then(([, stream]) => {
            stream.getTracks().forEach((t) => t.stop());
            router.replace("/camera/capture");
        })
        .catch(() => {
            router.replace("/result");
        });
    }, [router]);

  return (
    <div className="cameraWrapper">
      <Header />
      <div className="cameraStage">
        <div className="cameraSquares">
          <Squares scale={0.5} inline />
          <div className="cameraStageIcon">
            <ScanOption />
          </div>
        </div>
        <h1 className="cameraSetup robotoText">Setting Up Camera</h1>
      </div>
      <div className="cameraInstructions">
        <p className="robotoText">to get better results make sure you have</p>
        <div className="textRow">
          <p>◇ Neutral Expression</p>
          <p>◇ Frontal Pose</p>
          <p>◇ Adequare Lighting</p>
        </div>
      </div>
    </div>
  );
}
