/* eslint-disable no-bitwise */
export const generateColor = (): string => `#${((1 << 24) * Math.random() | 0).toString(16).padStart(6, '0')}`;

export const generateDarkColor = (): string => {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }
  return color;
};

function padZero(str: string): string {
  const zeros = new Array(2).join('0');
  return (zeros + str).slice(-2);
}

export function invertColor(hex: string, toBlackOrWhite?: boolean): string {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  let r: string | number = parseInt(hex.slice(0, 2), 16);
  let g: string | number = parseInt(hex.slice(2, 4), 16);
  let b: string | number = parseInt(hex.slice(4, 6), 16);
  if (toBlackOrWhite) {
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186
      ? '#000000'
      : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return `#${padZero(r)}${padZero(g)}${padZero(b)}`;
}
