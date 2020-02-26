let last_known_scroll_position = 0;
let ticking = false;
let redTarget = 200;

function doSomething(scroll_pos) {
    let ratio = scroll_pos / document.documentElement.clientHeight;
    console.log(ratio);
    let inverseRatio = 1 - ratio;
    let bgRed = 255 * Math.pow(inverseRatio, 1.4);
    let bgGB = 255 * inverseRatio;
    let backgroundColorStyle = "rgb(" + bgRed + "," + bgGB + "," + bgGB + ")";
    document.body.style.backgroundColor = backgroundColorStyle;
    let textColor = Math.min(redTarget * ratio * 1.4, redTarget);
    //console.log(textColor);
    let textColorStyle = "rgb(" + textColor + ",0,0)";
    document.body.style.color = textColorStyle;
}

window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});