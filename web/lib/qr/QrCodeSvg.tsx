'use client';

import React, { useMemo } from 'react';

export interface QrCodeSvgProps {
  value: string;
  size?: number;
  className?: string;
  fgColor?: string;
  bgColor?: string;
}

import { generateQrMatrix } from './QrCodeMatrix';
export { generateQrMatrix };

// Must match QrCodeMatrix's V3-M byte-mode capacity.
const MAX_QR_BYTES = 42;

export default function QrCodeSvg({
  value,
  size = 96,
  className = '',
  fgColor = '#000000',
  bgColor = '#FFFFFF',
}: QrCodeSvgProps) {
  // Validate BEFORE useMemo so an over-long payload never throws during
  // render — the component degrades to an honest fallback instead.
  const byteLength = new TextEncoder().encode(value).length;
  const isTooLong = byteLength > MAX_QR_BYTES;

  const matrix = useMemo(
    () => (isTooLong ? null : generateQrMatrix(value)),
    [value, isTooLong]
  );

  if (!matrix) {
    return (
      <div
        className={className}
        role="img"
        aria-label="QR code unavailable for this link"
        style={{
          width: size,
          height: size,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: bgColor,
          color: fgColor,
          fontSize: 10,
          textAlign: 'center',
          padding: 4,
        }}
      >
        QR code unavailable for this link
      </div>
    );
  }

  const matrixSize = matrix.length;
  const padding = 4; // Quiet zone (ISO/IEC 18004 recommends 4 modules)
  const viewBoxSize = matrixSize + padding * 2;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      width={size}
      height={size}
      className={className}
      shapeRendering="crispEdges"
      role="img"
      aria-label="Audio narration QR code"
    >
      <rect width={viewBoxSize} height={viewBoxSize} fill={bgColor} />
      {matrix.map((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect
              key={`${r}-${c}`}
              x={c + padding}
              y={r + padding}
              width={1}
              height={1}
              fill={fgColor}
            />
          ) : null
        )
      )}
    </svg>
  );
}
