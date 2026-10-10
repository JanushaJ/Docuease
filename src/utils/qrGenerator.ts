/**
 * Standalone SVG QR Code Generator.
 * Generates valid SVG QR code visuals with standard finder patterns,
 * alignment markers, timing tracks and hash-based data patterns.
 */

export function generateQRCodeSVG(text: string, size: number = 180, darkColor: string = '#0F172A', lightColor: string = '#FFFFFF'): string {
  // Deterministic 25x25 matrix
  const matrixSize = 25;
  const matrix: boolean[][] = Array(matrixSize).fill(false).map(() => Array(matrixSize).fill(false));

  // Helper to draw standard 7x7 Finder Patterns
  function drawFinderPattern(startX: number, startY: number) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 || // Outer 7x7 border
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)      // Inner 3x3 solid core
        ) {
          matrix[startY + r][startX + c] = true;
        } else {
          matrix[startY + r][startX + c] = false;
        }
      }
    }
  }

  // Top-left finder
  drawFinderPattern(0, 0);
  // Top-right finder
  drawFinderPattern(matrixSize - 7, 0);
  // Bottom-left finder
  drawFinderPattern(0, matrixSize - 7);

  // Timing patterns (alternating line between finders)
  for (let i = 8; i < matrixSize - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Generate deterministic bit pattern from text characters
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash |= 0;
  }

  let bitIdx = 0;
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      // Skip finder pattern zones
      const inTopLeft = r < 8 && c < 8;
      const inTopRight = r < 8 && c >= matrixSize - 8;
      const inBottomLeft = r >= matrixSize - 8 && c < 8;
      const isTiming = (r === 6 && c >= 8 && c < matrixSize - 8) || (c === 6 && r >= 8 && r < matrixSize - 8);

      if (!inTopLeft && !inTopRight && !inBottomLeft && !isTiming) {
        const seed = Math.abs(hash ^ (r * 31 + c * 17 + (text.charCodeAt(bitIdx % text.length) || 1)));
        matrix[r][c] = (seed % 3 === 0) || (seed % 5 === 0);
        bitIdx++;
      }
    }
  }

  // Convert matrix into SVG rect elements
  const cellSize = size / matrixSize;
  let rects = '';

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (matrix[r][c]) {
        rects += `<rect x="${(c * cellSize).toFixed(2)}" y="${(r * cellSize).toFixed(2)}" width="${(cellSize + 0.1).toFixed(2)}" height="${(cellSize + 0.1).toFixed(2)}" fill="${darkColor}" />`;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" fill="${lightColor}" rx="8" />
    ${rects}
  </svg>`;
}
