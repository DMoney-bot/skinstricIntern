"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Link from "next/dist/client/link";
import ButtonArrow from "../components/buttonArrow";

type Scores = Record<string, number>;
type Analysis = { race: Scores; age: Scores; gender: Scores };
type Category = "race" | "age" | "gender";

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "race", label: "Race" },
  { key: "age", label: "Age" },
  { key: "gender", label: "Sex" },
];

const topKey = (scores: Scores) =>
  Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];

const R = 92;
const C = 2 * Math.PI * R;

export default function summary() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<Analysis | null>(null);
  const [category, setCategory] = useState<Category>("race");
  const [selected, setSelected] = useState<Record<Category, string>>({
    race: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("analysis");
      if (raw) {
        const parsed: Analysis = JSON.parse(raw);
        setData(parsed);
        setSelected({
          race: topKey(parsed.race),
          age: topKey(parsed.age),
          gender: topKey(parsed.gender),
        });
      }
    } catch {}
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (!data) {
    return (
      <div className="summaryWrapper">
        <Header />
        <p className="titleWrapper">
          No analysis found <Link href="/result">Upload an image</Link> first
        </p>
      </div>
    );
  }

  const scores = data[category];
  const entries =
    category === "age"
      ? Object.entries(scores)
      : Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const current = selected[category];
  const value = scores[current] ?? 0;
  const percent = Math.round(value * 100);

  const heading = category === "age" ? `${current} y.o.` : current;

  return (
    <div className="summaryWrapper">
      <Header />
      <div className="titleWrapper">
        <h1 className="summarySubTitle robotoText">A.I. Analysis</h1>
        <h1 className="summaryTitle robotoText">DEMOGRAPHICS</h1>
        <p className="summarySubTitle2 robotoText">predicted race & age</p>
      </div>
      <div className="demoBoxes">
        {/* Left boxes */}
        <div className="demoBoxesSection1">
          {CATEGORIES.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={`demoBox smallBox ${category === key ? "demoBoxActive" : ""}`}
              onClick={() => setCategory(key)}
            >
              <div className="innerSmallBox">
                <p className="robotoText">{selected[key]}</p>
                <p className="robotoText">{label}</p>
              </div>
            </button>
          ))}
        </div>
        {/* Big middle box */}
        <div className="demoBoxesSection2">
          <div className="demoBox bigBox">
            <h2 className="bigBoxTitle">{heading}</h2>
            <div className="ringWrap">
              <svg viewBox="0 0 200 200" className="ringSvg">
                <circle className="ringTrack" cx="100" cy="100" r={R} />
                <circle
                  className="ringValue"
                  cx="100"
                  cy="100"
                  r={R}
                  transform="rotate(-90 100 100)"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - value)}
                />
              </svg>
              <span className="ringText">
                {percent}
                <small>%</small>
              </span>
            </div>
          </div>
        </div>
        {/* Medium right box */}
        <div className="demoBoxesSection3">
          <div className="demoBox mediumBox">
            <div className="confidenceHeader robotoText">
              <span>{category === "gender" ? "Sex" : category}</span>
              <span>A.I. Confidence</span>
            </div>
            {entries.map(([name, score]) => (
              <button
                key={name}
                type="button"
                className={`confidenceRow ${name === current ? "confidenceRowActive" : ""}`}
                onClick={() => setSelected((s) => ({ ...s, [category]: name }))}
              >
                <span>◇ {name}</span>
                <span>{Math.round(score * 100)}%</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="summaryHint">
        If A.I. estimate is wrong, select the correct one.
      </p>
      <Link href="/result" className="backButton">
        <ButtonArrow />
        <div className="backButtonText robotoText">Back</div>
      </Link>
      <Link href="/" className="summaryButton">
        <div className="proceedButtonText robotoText">Home</div>
        <ButtonArrow direction="right" />
      </Link>
    </div>
  );
}
