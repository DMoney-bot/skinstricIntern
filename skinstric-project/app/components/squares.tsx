import React from 'react'
import type { CSSProperties } from 'react';

type Props = {
  scale?: number;
  inline?: boolean;
};

export default function squares({ scale = 1, inline = false }: Props) {
  const style = { "--square-scale": scale } as CSSProperties;
  
  return (
    <div className={`squareWrapper ${inline ? "squareWrapperInline" : ""}`} style={style}>
        <div className="square1"></div>
        <div className="square2"></div>
        <div className="square3"></div>
    </div>
  )
}
