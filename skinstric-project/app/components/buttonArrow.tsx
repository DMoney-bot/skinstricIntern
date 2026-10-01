type Props = {
  direction?: "left" | "right";
};

export default function ButtonArrow({ direction = "left" }: Props) {
  const points =
    direction === "left" ? "17,22 25,18 25,26" : "27,22 19,18 19,26";

  return (
    <svg
      className="buttonArrow"
      width="44"
      height="44"
      viewBox="0 0 44 44"
      aria-hidden="true"
    >
      <rect
        className="diamond"
        x="7"
        y="7"
        width="30"
        height="30"
        transform="rotate(45 22 22)"
      />
      <polygon className="arrow" points={points} />
    </svg>
  );
}