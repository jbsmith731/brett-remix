/**
  More info:
  https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/
 */
const DEFAULT_MIN_SCREEN = 400;
const DEFAULT_MAX_SCREEN = 1439;

const HTML_FONT_SIZE = 16;

/**
 * It returns a CSS `clamp` function string that will fluidly
 * transition between a `minSize` and `maxSize` based on the screen size
 * @param {number} [minSize=1] - Defines the lower limit of your fluid value.
 * @param {number} [maxSize=1] - Defines the upper limit of your fluid value.
 * @param {number} [minScreenSize] - When the fluid value should stop shrinking.
 * @param {number} [maxScreenSize] - When the fluid value should stop growing.
 * @returns A string that is a css `clamp()` function
 */
const createFluidValue = (
  minSize = 1,
  maxSize = 1,
  minScreenSize = DEFAULT_MIN_SCREEN,
  maxScreenSize = DEFAULT_MAX_SCREEN,
) => {
  return `clamp(${pxToRem(minSize)}, ${getPreferredValue(
    minSize,
    maxSize,
    minScreenSize,
    maxScreenSize,
  )}, ${pxToRem(maxSize)})`;
};

/**
 * Determines how fluid typography scales
 */
const getPreferredValue = (minSize, maxSize, minScreenSize, maxScreenSize) => {
  const vwCalc = roundNumber(
    (100 * (maxSize - minSize)) / (maxScreenSize - minScreenSize),
  );
  const remCalc = roundNumber(
    (minScreenSize * maxSize - maxScreenSize * minSize) /
      (minScreenSize - maxScreenSize),
  );

  return `${vwCalc}vw + ${pxToRem(remCalc)}`;
};

/**
 * It takes a pixel value and returns a rem value
 * @param {number} px - The pixel value you want to convert to rem.
 */
const pxToRem = (px) => `${roundNumber(Number(px) / HTML_FONT_SIZE)}rem`;

/**
 {@link https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary}
 *
 * It takes a number, adds a very small number to it, multiplies it by 100, rounds
 * it, and then divides it by 100
 * @param {number} num - The number to be rounded.
 */
const roundNumber = (num) => Math.round((num + Number.EPSILON) * 1000) / 1000;

module.exports = createFluidValue;
