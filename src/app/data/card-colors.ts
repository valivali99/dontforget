/** Preset swatches offered in the editor; any hex color can also be picked. */
export const CARD_COLORS: string[] = [
  '#4f7cff',
  '#22a6b3',
  '#2ecc71',
  '#a3cb38',
  '#f9ca24',
  '#f0932b',
  '#eb4d4b',
  '#e84393',
  '#9b59b6',
  '#636e72',
];

export const DEFAULT_COLOR = CARD_COLORS[0];

/** Picks black or white text depending on how light the background is. */
export function readableTextColor(hex: string): string {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? '#1b1b1f' : '#ffffff';
}
