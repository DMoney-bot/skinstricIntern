"use client";
import React, { useState, useEffect } from "react";
import Squares from "../components/squares";
import ButtonArrow from "../components/buttonArrow";
import Link from "next/link";
import Header from "../components/header";

type Step = "name" | "city" | "loading" | "done";

export default function TestingPage() {
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (step !== "loading") return;
    const timer = setTimeout(() => setStep("done"), 2500);
    return () => clearTimeout(timer);
  }, [step]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const trimmed = value.trim();
    if (!trimmed) return;

    if (step === "name") {
      setName(trimmed);
      setValue("");
      setStep("city");
    } else if (step === "city") {
      setCity(trimmed);
      setValue("");
      setStep("loading");
    }
  };

  return (
    <div className="testingWrapper">
      <Header />
      <div className="testingTitle">
        <h1 className="robotoText testingTitleText">To Start Analysis</h1>
      </div>
      <Squares />
      <div className="testingTextWrapper">
        {(step === "name" || step === "city") && (
          <>
            <p className="clickText">Click To Type</p>
            <textarea
              key={step}
              autoFocus
              name="introInput"
              id="text"
              placeholder={
                step === "name" ? "Introduce Yourself" : "Your city name"
              }
              className="testingNameBox"
              rows={1}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
            ></textarea>
          </>
        )}

        {step === "loading" && (
          <p className="statusText loadingText">
            Processing Submission <span className="dots"></span>
          </p>
        )}

        {step === "done" && (
          <div className="thankYou">
            <p className="statusText">Thank You{name ? `, ${name}` : ""}</p>
            <p className="clickText">Proceed to the next step</p>
          </div>
        )}
      </div>
      <Link href="/" className="backButton">
        <ButtonArrow />
        <div className="backButtonText">Back</div>
      </Link>
      {step === "done" && (
        <Link href="/result" className="proceedButton">
          <div className="proceedButtonText">Proceed</div>
          <ButtonArrow direction="right" />
        </Link>
      )}
    </div>
  );
}
