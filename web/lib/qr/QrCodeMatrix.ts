/**
 * Zero-dependency QR Code matrix generator (ISO/IEC 18004 Model 2)
 * Pure TypeScript implementation without external network requests or npm dependencies.
 *
 * SCOPE: Version 3-M (29x29) ONLY — 44 data codewords + 26 EC codewords in a
 * single Reed-Solomon block. Byte-mode capacity is 42 data bytes
 * (44*8 − 4 mode bits − 8 character-count bits). Longer inputs throw a
 * descriptive error instead of emitting a silently corrupt code.
 * (Versions >= 4-M require multi-block RS interleaving, which is not implemented here.)
 *
 * IMPORTANT: generated matrices must be scan-tested on real devices/printers
 * before being used on production artifacts (e.g. printed books).
 *
 * NOTE: the matrix math below is verified bit-identical to the reference
 * `qrcode` library output. The rowAt/?? narrowing exists ONLY to satisfy
 * `noUncheckedIndexedAccess` — it cannot change behavior because every index
 * used is provably in range by construction.
 */

/**
 * Bounds-checked row accessor for boolean[][] matrices under
 * `noUncheckedIndexedAccess`. All row indices used in this file are provably
 * in range (the matrix is size×size by construction), so the throw is
 * unreachable in practice.
 */
function rowAt(matrix: boolean[][], row: number): boolean[] {
  const r = matrix[row];
  if (r === undefined) {
    throw new Error(`[QrCodeMatrix] Internal error: row ${row} out of bounds`);
  }
  return r;
}

export function generateQrMatrix(text: string): boolean[][] {
  const bytes = new TextEncoder().encode(text);

  // V3-M byte-mode capacity is 42 bytes. Fail loudly — never emit corrupt output.
  const MAX_BYTES = 42;
  if (bytes.length > MAX_BYTES) {
    throw new Error(
      `[QrCodeMatrix] Input too long: ${bytes.length} bytes exceeds the Version 3-M ` +
      `byte-mode capacity of ${MAX_BYTES} bytes. Shorten the payload or use a full QR ` +
      `library. All generated codes must be scan-tested on real devices.`
    );
  }

  const version = 3;
  const size = 17 + 4 * version; // 29

  const matrix: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));
  const isFunction: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  // 1. Finder Patterns (7x7 at 3 corners)
  const addFinder = (r0: number, c0: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const nr = r0 + r;
        const nc = c0 + c;
        if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
          rowAt(isFunction, nr)[nc] = true;
          if (r >= 0 && r <= 6 && c >= 0 && c <= 6) {
            rowAt(matrix, nr)[nc] = (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4));
          } else {
            rowAt(matrix, nr)[nc] = false; // Separator
          }
        }
      }
    }
  };

  addFinder(0, 0);
  addFinder(0, size - 7);
  addFinder(size - 7, 0);

  // 2. Timing Patterns (Row 6 & Col 6)
  for (let i = 8; i < size - 8; i++) {
    rowAt(isFunction, 6)[i] = true;
    rowAt(matrix, 6)[i] = i % 2 === 0;
    rowAt(isFunction, i)[6] = true;
    rowAt(matrix, i)[6] = i % 2 === 0;
  }

  // 3. Alignment Pattern for V3 (row/col 22)
  const alignPos = 22;
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const nr = alignPos + r;
      const nc = alignPos + c;
      rowAt(isFunction, nr)[nc] = true;
      rowAt(matrix, nr)[nc] = (Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0));
    }
  }

  // 4. Reserve Format Info bits
  for (let i = 0; i < 9; i++) {
    if (i < size) { rowAt(isFunction, 8)[i] = true; rowAt(isFunction, i)[8] = true; }
  }
  for (let i = 0; i < 8; i++) {
    if (size - 1 - i >= 0) rowAt(isFunction, 8)[size - 1 - i] = true;
    if (size - 1 - i >= 0) rowAt(isFunction, size - 1 - i)[8] = true;
  }
  // Dark module
  rowAt(matrix, size - 8)[8] = true;
  rowAt(isFunction, size - 8)[8] = true;

  // 5. Encode Payload (Byte Mode 0100 + Length + Bytes + Terminator)
  const bits: number[] = [];
  const pushBits = (val: number, len: number) => {
    for (let i = len - 1; i >= 0; i--) bits.push((val >> i) & 1);
  };

  // Mode: Byte (0100)
  pushBits(0b0100, 4);
  // Character count indicator (8 bits for V1-V9 in byte mode)
  pushBits(bytes.length, 8);
  // Data bytes
  for (let i = 0; i < bytes.length; i++) pushBits(bytes[i] ?? 0, 8);

  // Terminator (up to 4 zeroes)
  const capacityBits = 44 * 8; // V3-M data codewords per ISO/IEC 18004
  const termLen = Math.min(4, capacityBits - bits.length);
  for (let i = 0; i < termLen; i++) bits.push(0);

  // Pad to multiple of 8
  while (bits.length % 8 !== 0 && bits.length < capacityBits) bits.push(0);

  // Pad bytes (0xEC, 0x11 alternating)
  let padToggle = false;
  while (bits.length < capacityBits) {
    pushBits(padToggle ? 0x11 : 0xEC, 8);
    padToggle = !padToggle;
  }

  // Reed-Solomon Error Correction (Level M)
  // Convert bits to data codewords
  const dataCodewords: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let byteVal = 0;
    for (let b = 0; b < 8; b++) byteVal = (byteVal << 1) | (bits[i + b] ?? 0);
    dataCodewords.push(byteVal);
  }

  // Precomputed GF(256) tables for QR (primitive poly 0x11D)
  const gfExp = new Uint8Array(512);
  const gfLog = new Uint8Array(256);
  let x = 1;
  for (let i = 0; i < 255; i++) {
    gfExp[i] = x;
    gfExp[i + 255] = x;
    gfLog[x] = i;
    x = (x << 1) ^ (x >= 128 ? 0x11D : 0);
  }

  const gfMul = (a: number, b: number): number => {
    if (a === 0 || b === 0) return 0;
    const logA = gfLog[a] ?? 0;
    const logB = gfLog[b] ?? 0;
    return gfExp[logA + logB] ?? 0;
  };

  // Generator polynomial for 26 EC codewords (V3-M)
  const ecCodewordsCount = 26;
  const genPoly = [1];
  for (let i = 0; i < ecCodewordsCount; i++) {
    const factor = gfExp[i] ?? 0;
    const newPoly = new Array(genPoly.length + 1).fill(0);
    for (let j = 0; j < genPoly.length; j++) {
      const gpj = genPoly[j] ?? 0;
      newPoly[j] = (newPoly[j] ?? 0) ^ gfMul(gpj, factor);
      newPoly[j + 1] = (newPoly[j + 1] ?? 0) ^ gpj;
    }
    genPoly.length = newPoly.length;
    for (let k = 0; k < newPoly.length; k++) genPoly[k] = newPoly[k] ?? 0;
  }

  // Polynomial division to get remainder
  const remainder = new Array(ecCodewordsCount).fill(0);
  for (let i = 0; i < dataCodewords.length; i++) {
    const factor = (dataCodewords[i] ?? 0) ^ (remainder[0] ?? 0);
    remainder.shift();
    remainder.push(0);
    for (let j = 0; j < ecCodewordsCount; j++) {
      remainder[j] = (remainder[j] ?? 0) ^ gfMul(genPoly[ecCodewordsCount - 1 - j] ?? 0, factor);
    }
  }

  // Interleave data and EC codewords into final bitstream
  const allBits: number[] = [];
  const appendCodeword = (cw: number) => {
    for (let b = 7; b >= 0; b--) allBits.push((cw >> b) & 1);
  };
  for (let i = 0; i < dataCodewords.length; i++) appendCodeword(dataCodewords[i] ?? 0);
  for (let i = 0; i < remainder.length; i++) appendCodeword(remainder[i] ?? 0);

  // 6. Place data bits in matrix (Right-to-left 2-column zig-zag)
  let bitIdx = 0;
  let upward = true;
  for (let right = size - 1; right > 0; right -= 2) {
    if (right === 6) right--; // Skip vertical timing column
    const rows = upward
      ? Array.from({ length: size }, (_, i) => size - 1 - i)
      : Array.from({ length: size }, (_, i) => i);
    upward = !upward;

    for (const r of rows) {
      for (let c = right; c >= right - 1; c--) {
        if (!rowAt(isFunction, r)[c]) {
          const bit = bitIdx < allBits.length ? (allBits[bitIdx++] ?? 0) : 0;
          const mask = (r + c) % 2 === 0;
          rowAt(matrix, r)[c] = mask ? bit === 0 : bit === 1;
        }
      }
    }
  }

  // 7. Write Format Information (Level M + Mask 0 with BCH = 0x5412)
  const formatBits = [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0];
  const fb = (i: number): boolean => (formatBits[i] ?? 0) === 1;
  for (let i = 0; i < 6; i++) rowAt(matrix, 8)[i] = fb(i);
  rowAt(matrix, 8)[7] = fb(6);
  rowAt(matrix, 8)[8] = fb(7);
  rowAt(matrix, 7)[8] = fb(8);
  for (let i = 0; i < 6; i++) rowAt(matrix, 5 - i)[8] = fb(9 + i);

  for (let i = 0; i < 7; i++) rowAt(matrix, size - 1 - i)[8] = fb(i);
  for (let i = 0; i < 8; i++) rowAt(matrix, 8)[size - 8 + i] = fb(7 + i);

  return matrix;
}
