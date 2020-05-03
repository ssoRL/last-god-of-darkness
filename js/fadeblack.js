// Set global variables and constants
// This is the final red color of the text when the user has finished scrolling
let redTarget = 200;

// This is the smallest contrast ratio that I'll be allowing for readability
let MIN_CONTRAST_AA = 4.5;
let IMIN_CONTRAST_AA = 1 / 4.5
let ANIMATION_FREQ = 10;
// How long the animation should last in ms
let ANIMATION_SPEED = 1300;
let is_animating = false;
// true if currently using the high constant for bg color, or will be when the animation is done
let using_high_bg_c = true;
let high_c;
let low_c;
let current_c;


window.addEventListener("contentLoaded", () => {
  // This fader will generally set the color of the font and background according to functions
  // text_color = f(ratio) and bg_color = high_c *g(ratio) for ratio < low-readability-limit
  // text_color = f(ratio) and bg_color = low_c *g(ratio) for ratio < high-readability-limit
  // when the contrast ratio drops below minContrast, shift to using and animation to move
  // quickly thru the low contrast section
  // First calculate high_c and low_c such that at low-readability-limit the contrast ratio is
  // MIN_CONTRAST_AA. Achieve this with a simple interpolation function
  // param target_page_postion_ratio: where thru the page to hit MIN_CONTRAST_AA
  // param try_c: The value of c to try with
  // param contrastF: a function taking ratio and c and outputting contrast ratio
  // param jitter: How much to try changing c to get a better approximation
  // param allowed_error: How close the output of contrastF must get to MIN_CONTRAST_AA
  // returns: the constant that will make your dreams come true
  function interpolate_c(target_page_postion_ratio, try_c, contrastF, target, jitter, allowed_error) {
    let output = contrastF(target_page_postion_ratio, try_c);
    let diff = output - target;
    count=0;
    while (Math.abs(diff) > allowed_error && count < 1000) {
      count++;
      if(diff > 0) {
        try_c += jitter;
      } else {
        try_c -= jitter;
      }
      jitter /= 2;

      output = contrastF(target_page_postion_ratio, try_c);
      diff = output - target;
      //console.log(`diff: ${diff}, try_c: ${try_c}, contrast: ${output}`);
    }

    return try_c;
  }

  // Now use the interpolation
  // For the constant used in the upper portion of the story
  let high_f  = (ratio, c) => {
    return calculateContrast(getBGColor(ratio, c), getTextColor(ratio, c));
  }
  let low_readability_limit = document.getElementById("low-readability-limit").offsetTop /document.getElementById("tlgotd-body").clientHeight;

  high_c = interpolate_c(low_readability_limit, 1, high_f, MIN_CONTRAST_AA, -0.4, 0.01);
  console.log(`high_c: ${high_c}`);

  // and then the constant used in the lower half
  let low_f  = (ratio, c) => {
    return calculateContrast(getBGColor(ratio, c), getTextColor(ratio, c));
  }
  let high_readability_limit = document.getElementById("high-readability-limit").offsetTop /document.getElementById("tlgotd-body").clientHeight;

  low_c = interpolate_c(high_readability_limit, 1, high_f, IMIN_CONTRAST_AA, -0.4, 0.01);
  console.log(`low_c: ${low_c}`);

  current_c = high_c;
});

// run an animation changing the bg color smoothly to a color that supports easier
// reading of the text
function animateBgColor() {
  is_animating = true;
  // that amount that the current_c changes between steps
  let total_delta = using_high_bg_c ? low_c - high_c : high_c - low_c;
  let step_delta = total_delta * ANIMATION_FREQ / ANIMATION_SPEED;
  let target = using_high_bg_c ? low_c : high_c;
  using_high_bg_c = !using_high_bg_c;
  let stepFunction = () => {
    current_c += step_delta;
    let contrastRatio = setTextAndBgColor();
    console.log(`contrast: ${contrastRatio}`);
    if(step_delta > 0 && current_c > target || step_delta < 0 && current_c < target) {
      // then the animation is done
      current_c = target;
      is_animating = false;
      return;
    } else {
      window.setTimeout(stepFunction, ANIMATION_FREQ);
    }
  }

  // start animating
  stepFunction();
}


// calculates the luminance component of a color
// formula from https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
function luminanceComponent(part) {
  let part01 = part/255;
  if (part01 <= 0.03928){
    return part01/12.92;
  } else {
    return Math.pow((part01+0.055)/1.055, 2.4);
  } 
}

// calculates the luminance of a color object with r,g,b between 0-255
function luminance(c) {
  return 0.2126 * luminanceComponent(c.r) + 0.7152 * luminanceComponent(c.g) + 0.0722 * luminanceComponent(c.b);
}

/** compares to colors defined as objects with values r,g,b each between 0-255 */
function calculateContrast(c1, c2) {
  let l1 = luminance(c1);
  let l2 = luminance(c2);
  return l1/l2;
}

// gets the background color, depending on the page ratio and a constant c
function getBGColor(r, c) {
  let inverseRatio = 1 - Math.pow(r, c);
  return {
    r: c * 255 * Math.pow(inverseRatio, 2),
    g: c * 255 * inverseRatio,
    b: c * 255 * Math.pow(inverseRatio, 2)
  }
}

// gets the text color, depending on the page ratio and a constant c
function getTextColor(r, c) {
  tr = Math.pow(r, c);
  return {
    r: Math.min(redTarget * tr, redTarget),
    g: 0,
    b: 0
  }
}

function setTextAndBgColor() {
  // Change the color of the color of the background, approach 0 (black) as the user scrolls
  let bgc = getBGColor(ratio, current_c);
  let backgroundColorStyle = `rgb(${bgc.r},${bgc.g},${bgc.b})`;
  document.body.style.backgroundColor = backgroundColorStyle;
  // Next change the text to be redder the further the user scrolls
  // Multiply by 1.4 so the text is fully red a bit before the bottom (again readability)
  // But use min so that the red never goes past target
  let text_c = getTextColor(ratio, current_c);
  let textColorStyle = `rgb(${text_c.r},0,0)`;
  document.body.style.color = textColorStyle;

  return calculateContrast(bgc, text_c);
}

window.addEventListener("auxScroll", () => {
  // Don't do anything if currently animating
  if(is_animating) return;
  // set the colors
  let contrastRatio = setTextAndBgColor();
  console.log(`contrast: ${contrastRatio}`);
  // if the contrast ratio is too low, flip to the other c value
  if(contrastRatio < MIN_CONTRAST_AA && contrastRatio > IMIN_CONTRAST_AA) {
    animateBgColor();
  }
});