// Set global variables and constants
let last_known_scroll_position = 0;
// This is the final red color of the text when the user has finished scrolling
let redTarget = 200;
// This is the number of pixels to let pass before recoloring everything
let scrollLag = 100;

function doSomething(scroll_pos) {
  // First determine the portion of the page that's been scrolled thru
  let ratio = scroll_pos / document.documentElement.clientHeight;
  let inverseRatio = 1 - ratio;
  // Change the color of the color of the background, approach 0 (black) as the user scrolls
  // Remove red from the palate faster so that the text remains readable
  let bgRed = 255 * Math.pow(inverseRatio, 1.4);
  let bgGB = 255 * inverseRatio;
  let backgroundColorStyle = `rgb(${bgRed},${bgGB},${bgGB})`;
  document.body.style.backgroundColor = backgroundColorStyle;
  // Next change the text to be redder the further the user scrolls
  // Multiply by 1.4 so the text is fully red a bit before the bottom (again readability)
  // But use min so that the red never goes past target
  let textColor = Math.min(redTarget * ratio * 1.4, redTarget);
  let textColorStyle = `rgb(${textColor},0,0)`;
  document.body.style.color = textColorStyle;
}

window.addEventListener('scroll', function(e) {
  let current_scroll_position = window.scrollY;
  let scroll_diff = current_scroll_position - last_known_scroll_position;
  if(scroll_diff > scrollLag || scroll_diff < -scrollLag){
    last_known_scroll_position = current_scroll_position;
    doSomething(last_known_scroll_position);
  } else {
    // Don't bother if there's only been a small change. Conserve compute!
    return;
  }
});