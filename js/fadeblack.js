// Set global variables and constants
// This is the final red color of the text when the user has finished scrolling
let redTarget = 200;

window.addEventListener("auxScroll", () => {
  let inverseRatio = 1 - ratio;
  // Change the color of the color of the background, approach 0 (black) as the user scrolls
  // Remove red from the palate faster so that the text remains readable
  let bgRed = 255 * Math.pow(inverseRatio, 2);
  let bgGB = 255 * inverseRatio;
  let backgroundColorStyle = `rgb(${bgRed},${bgGB},${bgGB})`;
  document.body.style.backgroundColor = backgroundColorStyle;
  // Next change the text to be redder the further the user scrolls
  // Multiply by 1.4 so the text is fully red a bit before the bottom (again readability)
  // But use min so that the red never goes past target
  let textColor = Math.min(redTarget * ratio * 1.4, redTarget);
  let textColorStyle = `rgb(${textColor},0,0)`;
  document.body.style.color = textColorStyle;
});